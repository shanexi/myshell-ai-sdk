import { z } from 'zod';
import { content_blocks_schema } from './content-blocks-to-mdc';
import { injectable, interfaces } from 'inversify';
import { Remarkable } from '@myshell-run/common-def';
import { setupMdc } from '@myshell-run/common-ui';
import { ContentBlockable, ContentBlockableFactory } from './content-blockable';

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
export const setUpMdcTransform = (
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

  function registerMdcTransform<T>(
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
    registerMdcTransform,
  };
};
