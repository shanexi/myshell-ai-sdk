import {
  MessageListContext,
  StrictMessage,
  UploadEndpoint,
} from '@myshell-run/common-def';
import Uppy from '@uppy/core';
import DropTarget from '@uppy/drop-target';
import ThumbnailGenerator from '@uppy/thumbnail-generator';
import XHR from '@uppy/xhr-upload';
import { VirtuosoMessageListMethods } from '@virtuoso.dev/message-list';
import {
  Delete,
  editable,
  EditableHandle,
  InferDoc,
  plainSchema,
  schema,
} from 'edix';
import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { RefObject } from 'react';
import { z } from 'zod';

export const imageStateSchema = z.object({
  type: z.literal('image'),
  preview: z.string(),
  uploadComplete: z.boolean(),
});

export type ImageState = z.infer<typeof imageStateSchema>;

export const filePreviewStateSchema = z.object({
  type: z.literal('file'),
  name: z.string(),
  desc: z.string(),
  uploadComplete: z.boolean(),
});

export type FilePreviewState = z.infer<typeof filePreviewStateSchema>;

export const fileStateSchema = z.discriminatedUnion('type', [
  imageStateSchema,
  filePreviewStateSchema,
]);

export type FileState = z.infer<typeof fileStateSchema>;

export const basicSchema = schema({ multiline: true });

export type ChatInputDoc = InferDoc<typeof basicSchema>;
@injectable()
export class ChatCommonModel {
  virtuosoRef?: RefObject<
    VirtuosoMessageListMethods<StrictMessage, MessageListContext>
  >;
  @observable inputText = '';

  /**
   * @deprecated 暂时还没使用 目前用的 plainSchema 会在内部转换成 string（`js`）
   */
  @observable chatInputDoc: ChatInputDoc = observable.array([]);

  #uppy?: Uppy;

  @observable uppyStateMap = new Map<string, FileState>();

  @observable isDragging = false;

  private edixRef?: RefObject<HTMLDivElement>;
  private edixHandle: EditableHandle | null = null;
  public edixRefPromise: Promise<boolean>;
  private edixRefResolve?: (value: boolean | PromiseLike<boolean>) => void;

  @observable edixReadonly = false;

  get uppy() {
    if (!this.#uppy) {
      throw new Error('uppy is not initialized, check setupUppy is called');
    }
    return this.#uppy;
  }

  get maxNumberOfFiles() {
    return this.#uppy?.opts.restrictions?.maxNumberOfFiles !== 1;
  }

  get accept() {
    return this.#uppy?.opts.restrictions?.allowedFileTypes?.join(', ');
  }

  constructor(@inject(UploadEndpoint) private uploadEndpoint: string) {
    makeObservable(this);
    this.edixRefPromise = new Promise<boolean>((resolve) => {
      this.edixRefResolve = resolve;
    });
  }

  setVirtuosoRef = (
    ref: RefObject<
      VirtuosoMessageListMethods<StrictMessage, MessageListContext>
    >,
  ) => {
    this.virtuosoRef = ref;
  };

  @action.bound
  setInputText(text: string) {
    this.inputText = text;
  }

  /**
   * @deprecated 暂时还没使用 目前用的 plainSchema 会在内部转换成 string（`js`）
   */
  @action.bound
  setChatInputDoc(chatInputDoc: ChatInputDoc) {
    this.chatInputDoc = chatInputDoc;
  }

  setupUppy(dropTarget: HTMLDivElement) {
    this.#uppy = new Uppy({
      autoProceed: true,
      debug: true,
    })
      .use(ThumbnailGenerator)
      .use(XHR, {
        endpoint: this.uploadEndpoint,
      });
    // TODO: UI Plugin extends PReact 会报错 先不用 plugin 方式，先裸写
    // uppy.use(FileInput, {
    //   target: fileInput,
    //   pretty: true,
    // });
    this.#uppy.on('thumbnail:generated', (file, preview) => {
      // console.log('thumbnail:generated', file, preview);
      // TODO: 这里需要区分是图片还是文件
      this.uppyStateMap.set(file.id, {
        type: 'image',
        preview,
        uploadComplete: false,
      });
    });
    this.#uppy.on('progress', (progress) => {
      // console.log('progress', progress);
      Object.keys(this.#uppy?.getState().files || {}).forEach((fileId) => {
        const file = this.#uppy?.getState().files[fileId];
        const prev = this.uppyStateMap.get(fileId) || {
          type: 'image',
          preview: file?.preview || '',
          uploadComplete: false,
        };
        this.uppyStateMap.set(fileId, {
          ...prev,
          uploadComplete: file?.progress.uploadComplete || false,
        });
      });
    });
    this.#uppy.use(DropTarget, {
      target: dropTarget,
      onDragOver: (event) => {
        this.isDragging = true;
      },
      onDragLeave: (event) => {
        this.isDragging = false;
      },
      onDrop: (event) => {
        this.isDragging = false;
      },
    });
  }

  removeFile(id: string) {
    this.uppy?.removeFile(id);
    this.uppyStateMap.delete(id);
  }

  appendMsg(message: StrictMessage) {
    this.virtuosoRef?.current?.data.append(
      [message],
      ({ scrollInProgress, atBottom }) => {
        return {
          index: 'LAST',
          align: 'end',
          behavior: atBottom || scrollInProgress ? 'smooth' : 'auto',
        };
      },
    );
  }

  updateMsg(newMsg: StrictMessage) {
    this.virtuosoRef?.current?.data.map((message: StrictMessage) => {
      return message.key === newMsg.key ? newMsg : message;
    }, 'smooth');
  }

  isMsgNoExists(key: string) {
    return (
      this.virtuosoRef?.current?.data.find((m) => m.key === key) === undefined
    );
  }

  setEdixRef(ref: RefObject<HTMLDivElement>) {
    if (!ref.current) return;

    this.edixRef = ref;
    if (this.edixRefResolve) {
      this.edixRefResolve(true);
    }

    const dispose = (this.edixHandle = editable(ref.current, {
      schema: plainSchema({ multiline: true }),
      onChange: this.setInputText,
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

  async setEdixReadonly(readonly: boolean) {
    this.edixReadonly = readonly;
    await this.edixRefPromise;
    this.edixHandle?.readonly(readonly);
  }

  /**
   * todo: 这种方式会有选中，而且不会清空 history，如果不满足需求，需要进一步 patch
   * 核心是不能通过外部 setValue(更新) value，而应该是 edix -> setValue -> value(render) 这样，所有 modification 都必须从 edix
   */
  async clearEdix() {
    await this.edixRefPromise;
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
