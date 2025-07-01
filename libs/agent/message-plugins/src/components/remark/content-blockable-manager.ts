import { z } from 'zod';
import {
  content_block_schema,
  content_blocks_schema,
} from './content-blocks-to-mdc';
import { injectable, interfaces } from 'inversify';
import { Remarkable } from '@myshell-run/common-def';
import { setupMdc } from '@myshell-run/common-ui';
import { ContentBlockable, ContentBlockableFactory } from './content-blockable';
import { TextModel } from '../text.model';

/**
 * 用来存储 interfaces.Newable<ContentBlockable>，注意非 instance
 * 需要额外 factory 来获取实例
 */
export const ContentBlockableMap = Symbol.for('ContentBlockableMap');
export type ContentBlockableMap = Map<
  string,
  interfaces.Newable<ContentBlockable>
>;

@injectable()
export class ContentBlockableManager {
  private blockableMap = new Map<string, ContentBlockable>();

  set(id: string, blockable: ContentBlockable) {
    this.blockableMap.set(id, blockable);
  }

  get<T extends ContentBlockable>(id: string) {
    return this.blockableMap.get(id) as T;
  }

  transform(chunk: z.infer<typeof content_blocks_schema>, id: string) {
    return chunk.args.content_blocks
      .map((block) => {
        const contentBlockable = this.blockableMap.get('x-' + block.type);
        if (contentBlockable) {
          return contentBlockable.transform(block, chunk);
        } else {
          return block.content.text;
        }
      })
      .join(' ');
  }
}

/**
 * @description 针对 setupMdc 进行一层 wrapper，增加 transform
 */
export const setUpMdcCotentBlock = (
  bind: interfaces.Bind,
  unbind: interfaces.Unbind,
  isBound: interfaces.IsBound,
  rebind: interfaces.Rebind,
) => {
  if (!isBound(ContentBlockableManager)) {
    bind(ContentBlockableManager).toSelf().inSingletonScope();
  }
  let blockableMap: ContentBlockableMap;
  if (!isBound(ContentBlockableMap)) {
    blockableMap = new Map();
    bind(ContentBlockableMap).toConstantValue(blockableMap);
    // 为了统一处理，额外 bind 一个 `x-text` 可以 refactor （fallback default 逻辑）
    blockableMap.set('x-text', TextModel);
    bind(TextModel).toSelf().inTransientScope();
  }

  if (!isBound(ContentBlockableFactory)) {
    bind<interfaces.Factory<ContentBlockable>>(
      ContentBlockableFactory,
    ).toFactory<ContentBlockable, Parameters<ContentBlockableFactory>>(
      (context) => {
        return (identifier: string, id: string) => {
          const manager = context.container.get(ContentBlockableManager);
          const model = manager.get<ContentBlockable>(id);
          if (model) {
            return model;
          } else {
            const modelIdentifier = blockableMap.get('x-' + identifier);
            if (!modelIdentifier) throw new Error(`${identifier} is missing`);
            // 因为在 setupMdc 中已经 bind(model)
            const newModel =
              context.container.get<ContentBlockable>(modelIdentifier);
            manager.set(id, newModel);
            return newModel;
          }
        };
      },
    );
  }

  const registerMdc = setupMdc(bind, unbind, isBound, rebind);

  function registerMdcContentBlock<T>(
    directiveName: string,
    component: React.ComponentType<T>,
    model: interfaces.Newable<Remarkable & ContentBlockable>,
  ) {
    const register = registerMdc(directiveName, component, model);
    blockableMap.set(directiveName, model);
    return register;
  }

  return {
    registerMdc,
    registerMdcContentBlock,
  };
};

@injectable()
export abstract class ContentBlockableImpl implements ContentBlockable {
  // FIXME 其实 textAtrVal/chunkIdSet 按道理不应该参与到 transform 之外的 method 里
  // implements 两个 interface 会内聚，但是有点耦合了，特别是 update 这块逻辑非常 fragile
  // 使用一个 abstract 方法就是为了解耦 textAttrVal/chunkIdSet 两个字段
  /**
   * 存储上一次的值
   */
  private textAttrVal?: string;
  /**
   * 确保 idempotent
   */
  private chunkIdSet: Set<number> = new Set();

  transform(
    block: z.infer<typeof content_block_schema>,
    chunk: z.infer<typeof content_blocks_schema>,
  ) {
    if (this.chunkIdSet.has(chunk.id)) {
      return `::x-think{#${chunk.message_id} chunk_id="${chunk.id}" text="${this.textAttrVal}"}`;
    }
    this.chunkIdSet.add(chunk.id);

    return this.doTransform(block, chunk);
  }

  /**
   * child class 组装 mdc 的逻辑
   */
  abstract doTransform(
    block: z.infer<typeof content_block_schema>,
    chunk: z.infer<typeof content_blocks_schema>,
  ): string;

  /**
   * 获取 content_block 需要的 text 字段，
   * 这个 text 会根据 cause 有 append/replace 两种 behavior
   */
  abstract textField(block: z.infer<typeof content_block_schema>): string;

  /**
   * 封装根据 cause append/replace 的逻辑，child class 只需要 invoke getText 即可
   */
  protected getText(
    block: z.infer<typeof content_block_schema>,
    chunk: z.infer<typeof content_blocks_schema>,
  ) {
    const text = this.textField(block);
    if (chunk.cause) {
      this.textAttrVal = text;
    } else {
      this.textAttrVal = [this.textAttrVal, text]
        .filter((i) => i != null)
        .join('&#10;');
    }
    return this.textAttrVal;
  }
}
