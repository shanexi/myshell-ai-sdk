import { z } from 'zod';
import { content_blocks_schema } from './content-blocks-to-mdc';
import { inject, injectable, interfaces } from 'inversify';
import { Remarkable } from '@myshell-run/common-def';
import { setupMdc } from '@myshell-run/common-ui';

export const ContentBlocksToMdcTransformMap = Symbol.for(
  'ContentBlocksToMdcTransformMap',
);

export type ContentBlocksToMdcTransformMap = Map<
  string,
  (
    content_block: unknown,
    chunk: z.infer<typeof content_blocks_schema>,
  ) => string
>;

@injectable()
export class ContentBlocksToMdcTransformManager {
  constructor(
    @inject(ContentBlocksToMdcTransformMap)
    private transformMap: ContentBlocksToMdcTransformMap,
  ) {
    this.transformMap = transformMap;
  }

  transform(chunk: z.infer<typeof content_blocks_schema>) {
    return chunk.args.content_blocks
      .map((block) => {
        const transform = this.transformMap.get('x-' + block.type);
        if (transform) return transform(block, chunk);
        else {
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
  let transformMap: ContentBlocksToMdcTransformMap;
  if (!isBound(ContentBlocksToMdcTransformMap)) {
    transformMap = new Map();
    bind(ContentBlocksToMdcTransformMap).toConstantValue(transformMap);
  }
  const registerMdc = setupMdc(bind, unbind, isBound, rebind);

  function registerMdcTransform<T, S>(
    directiveName: string,
    component: React.ComponentType<T>,
    transform: (
      content_block: S,
      chunk: z.infer<typeof content_blocks_schema>,
    ) => string,
    model?: interfaces.Newable<Remarkable>,
  ) {
    const register = registerMdc(directiveName, component, model);
    transformMap.set(
      directiveName,
      // type cast
      transform as (content_block: unknown) => string,
    );
    return register;
  }

  return {
    registerMdc,
    registerMdcTransform,
  };
};
