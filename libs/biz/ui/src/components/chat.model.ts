import {
  EventSourceMessage,
  fetchEventSource,
} from '@microsoft/fetch-event-source';
import { DbBot } from '@myshell-run/biz-def';
import { Message, MessageListContext } from '@myshell-run/def';
import { createId } from '@paralleldrive/cuid2';
import Uppy from '@uppy/core';
import DropTarget from '@uppy/drop-target';
import ThumbnailGenerator from '@uppy/thumbnail-generator';
import XHR from '@uppy/xhr-upload';
import { VirtuosoMessageListMethods } from '@virtuoso.dev/message-list';
import { injectable } from 'inversify';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { RefObject } from 'react';

const UPLOAD_ENDPOINT = 'http://localhost:3333/api/upload';

export type FileState = {
  preview: string;
  uploadComplete: boolean;
};

@injectable()
export class ChatModel {
  virtuosoRef?: RefObject<
    VirtuosoMessageListMethods<Message, MessageListContext>
  >;
  bot?: DbBot;
  @observable inputText = '';
  @observable isInputFocus = false;
  @observable isShowUploadArea = false;
  #uppy?: Uppy;
  @observable uppyStateMap = new Map<string, FileState>();
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

  /**
   * @deprecated 相关 UI 代码已经 archive
   */
  @computed get layers(): Record<string, { sort: number; height: number }> {
    console.warn('layers is deprecated, will throw error in next version');
    return {
      upload: {
        sort: 1,
        height: 0,
      },
      textarea: {
        sort: 2,
        height: 0,
      },
    };
  }
  @computed get isNotInputFocus() {
    return !this.isInputFocus;
  }
  @computed get notHaveInputText() {
    return this.inputText.length < 1;
  }
  @computed get isShowInputMenu() {
    return this.isNotInputFocus && this.notHaveInputText;
  }
  constructor() {
    // @inject(MyAppTrpcClient) public trpc: TRPCClient<AppRouter>,
    makeObservable(this);
  }

  setupUppy(dropTarget: HTMLDivElement) {
    this.#uppy = new Uppy({
      autoProceed: true,
      debug: true,
    })
      .use(ThumbnailGenerator)
      .use(XHR, {
        endpoint: UPLOAD_ENDPOINT,
      });
    // TODO: UI Plugin extends PReact 会报错 先不用 plugin 方式，先裸写
    // uppy.use(FileInput, {
    //   target: fileInput,
    //   pretty: true,
    // });
    this.#uppy.on('thumbnail:generated', (file, preview) => {
      // console.log('thumbnail:generated', file, preview);
      this.uppyStateMap.set(file.id, {
        preview,
        uploadComplete: false,
      });
    });
    this.#uppy.on('progress', (progress) => {
      // console.log('progress', progress);
      Object.keys(this.#uppy?.getState().files || {}).forEach((fileId) => {
        const file = this.#uppy?.getState().files[fileId];
        const prev = this.uppyStateMap.get(fileId) || {
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
        console.log('onDragOver', event);
      },
      onDragLeave: (event) => {
        console.log('onDragLeave', event);
      },
      onDrop: (event) => {
        console.log('onDrop', event);
      },
    });
  }

  removeFile(id: string) {
    this.uppy?.removeFile(id);
    this.uppyStateMap.delete(id);
  }

  @action.bound
  setInputFocus(focus: boolean) {
    this.isInputFocus = focus;
  }
  @action.bound
  toggleUploadArea() {
    this.isShowUploadArea = !this.isShowUploadArea;
  }

  appendMsg(message: Message) {
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

  isMsgNoExists(key: string) {
    return (
      this.virtuosoRef?.current?.data.find((m) => m.key === key) === undefined
    );
  }

  @action.bound
  sendText() {
    const msgId = createId();
    const replyMsgId = createId();

    this.appendMsg({
      key: msgId,
      text: this.inputText,
      user: 'me',
    });
    // TODO replicache 确保不会漏消息

    const abortController = new AbortController();
    fetchEventSource('/api/chat', {
      method: 'POST',
      headers: {
        method: 'POST',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        msgId,
        replyMsgId,
        prompt: this.inputText,
        botId: this.bot?.id,
      }),
      signal: abortController.signal,
      openWhenHidden: true,
      onerror: (err) => {
        //
      },
      onmessage: (ev: EventSourceMessage) => {
        if (this.isMsgNoExists(replyMsgId)) {
          this.appendMsg({
            key: replyMsgId,
            text: ev.data,
            user: 'other',
            avatar: this.bot?.avatar,
          });
        } else {
          this.virtuosoRef?.current?.data.map((message) => {
            return message.key === replyMsgId
              ? { ...message, text: message.text + ev.data }
              : message;
          }, 'smooth');
        }
      },
      onopen: async () => {
        //
      },
    });
    runInAction(() => {
      this.inputText = '';
      this.setInputFocus(false);
    });
  }

  @action.bound
  setInputText(text: string) {
    this.inputText = text;
    // this.trpc.hello.query({
    //   message: text,
    // });
  }
  setVirtuosoRef = (
    ref: RefObject<VirtuosoMessageListMethods<Message, MessageListContext>>,
  ) => {
    this.virtuosoRef = ref;
  };

  setBot = (bot?: DbBot) => {
    this.bot = bot;
  };
}
