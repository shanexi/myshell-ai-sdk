import { MOCK_IMG } from '@myshell-run/common-ui';
import { inject, injectable } from 'inversify';
import { makeObservable, observable } from 'mobx';
import { z } from 'zod';

export const previewTypeSchema = z.discriminatedUnion('previewType', [
  z.object({
    previewType: z.literal('image'),
    name: z.string(),
    previewUrl: z.string(),
    subType: z.union([z.literal('png'), z.literal('jpeg')]),
  }),
  z.object({
    previewType: z.literal('file'),
    name: z.string(),
    desc: z.string().optional(),
    subType: z.union([z.literal('rtf'), z.literal('json')]),
  }),
]);

export const ChatInputUploadPluginHandler = Symbol.for(
  'ChatInputUploadPluginHandler',
);

export interface ChatInputUploadPluginHandler {
  removeImagePreview(id: string): Generator;
}

@injectable()
export class ChatInputUploadPluginModel {
  @observable previewItems = observable.array<
    z.infer<typeof previewTypeSchema>
  >([
    {
      previewType: 'image',
      subType: 'png',
      name: 'a mock image',
      previewUrl: MOCK_IMG,
    },
    {
      previewType: 'file',
      subType: 'rtf',
      name: 'Untitled.rtf',
      desc: 'Rich Text File',
    },
  ]);

  constructor(
    @inject(ChatInputUploadPluginHandler)
    private handler: ChatInputUploadPluginHandler,
  ) {
    makeObservable(this);
  }

  removeImagePreview(id: string) {
    for (const _ of this.handler.removeImagePreview(id)) {
      // 其他操作
    }
  }
}
