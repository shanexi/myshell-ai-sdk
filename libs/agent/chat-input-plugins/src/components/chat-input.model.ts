import { AGENT_CHAT, ChatCommonModelFactory } from '@myshell-run/common-def';
import { ChatCommonModel, MOCK_IMG } from '@myshell-run/common-ui';
import { inject, injectable } from 'inversify';
import { computed, makeObservable, observable } from 'mobx';
import { isEmpty } from 'radash';
import { RefObject } from 'react';
import { z } from 'zod';
import { Delete, editable, EditableHandle, plainSchema } from 'edix';

export const ChatInputHandlers = Symbol.for('ChatInputHandlers');
export type ContextType = 'file' | 'text' | 'json' | 'todo' | 'message';
export interface ChatInputHandlers {
  clear(): AsyncGenerator;
  sendText(text: string): AsyncGenerator;
  removeImagePreview(id: string): Generator;
}

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

@injectable()
export class ChatInputModel {
  @observable contextItems = observable.array<{
    type: ContextType;
    name: string;
  }>([
    { type: 'file', name: 'requirement.feature1' },
    { type: 'json', name: 'canvas.state1.inputs.variable1' },
    { type: 'todo', name: 'test.test_suite1' },
    { type: 'message', name: 'preview.message1' },
  ]);

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

  private edixRef?: RefObject<HTMLDivElement>;
  private edixHandle: EditableHandle | null = null;
  public edixRefPromise: Promise<boolean>;
  private edixRefResolve?: (value: boolean | PromiseLike<boolean>) => void;

  @observable edixReadonly = false;

  constructor(
    @inject(ChatInputHandlers) private handlers: ChatInputHandlers,
    @inject(ChatCommonModelFactory)
    public factory: (id: symbol) => ChatCommonModel,
  ) {
    makeObservable(this);

    this.edixRefPromise = new Promise<boolean>((resolve) => {
      this.edixRefResolve = resolve;
    });

    this.setEdixReadonly();
  }

  setEdixRef(ref: RefObject<HTMLDivElement>) {
    if (!ref.current) return;

    this.edixRef = ref;
    if (this.edixRefResolve) {
      this.edixRefResolve(true);
    }

    const dispose = (this.edixHandle = editable(ref.current, {
      schema: plainSchema({ multiline: true }),
      onChange: this.chatCommon.setInputText,
    })).dispose;

    return () => {
      this.resetEdixRef();
      dispose();
    };
  }

  resetEdixRef() {
    this.edixRef = undefined;
    this.edixHandle = null;
    this.edixRefPromise = new Promise<boolean>((resolve) => {
      this.edixRefResolve = resolve;
    });
  }

  @computed get isContextItemsEmpty() {
    return this.contextItems.length === 0;
  }

  get chatCommon() {
    return this.factory(AGENT_CHAT);
  }

  get showSendButton() {
    return !isEmpty(this.chatCommon.inputText);
  }

  async sendText() {
    if (isEmpty(this.chatCommon.inputText)) {
      return;
    }

    for await (const _ of this.handlers.sendText(this.chatCommon.inputText)) {
      // TODO 不能，全部交给 edix#onChange 管理了
      // 应该封装下，不让外部操作
      // this.chatCommon.setInputText('');
      await this.clearEdix();
    }
  }

  /**
   * @deprecated 暂时还没使用 目前用的 plainSchema 会在内部转换成 string（`js`）
   */
  async sendChatInputDoc() {
    if (isEmpty(this.chatCommon.chatInputDoc)) {
      return;
    }
    const text = this.chatCommon.chatInputDoc
      .map((line) => line.map((v) => v.text).join(' '))
      .join('\n');

    for await (const _ of this.handlers.sendText(text)) {
      // this.chatCommon.setInputText('');
      this.chatCommon.setChatInputDoc([]);
    }
  }

  async clear() {
    for await (const _ of this.handlers.clear()) {
      //
    }
  }

  removeImagePreview(id: string) {
    for (const _ of this.handlers.removeImagePreview(id)) {
      // 其他操作
    }
  }

  async setEdixReadonly() {
    await this.edixRefPromise;
    this.edixHandle?.readonly(this.edixReadonly);
  }

  async clearEdix() {
    await this.edixRefPromise;
    // todo: 这种方式会有选中，而且不会清空 history，如果不满足需求，需要进一步 patch
    // 核心是不能通过外部 setValue(更新) value，而应该是 edix -> setValue -> value(render) 这样，所有 modification 都必须从 edix
    if (this.edixRef?.current && this.edixHandle) {
      this.edixRef?.current.focus();
      window.getSelection()?.selectAllChildren(this.edixRef.current);
      this.edixHandle.syncSelection();
      setTimeout(() => {
        if (this.edixHandle) {
          this.edixHandle.command(Delete);
        }
      });
    }
  }
}
