import { Message, MessageListContext } from '@myshell-run/common-def';
import Uppy from '@uppy/core';
import DropTarget from '@uppy/drop-target';
import ThumbnailGenerator from '@uppy/thumbnail-generator';
import XHR from '@uppy/xhr-upload';
import { VirtuosoMessageListMethods } from '@virtuoso.dev/message-list';
import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { RefObject } from 'react';
import { UploadEndpoint } from '@myshell-run/common-def';

export type FileState = {
  preview: string;
  uploadComplete: boolean;
};

@injectable()
export class ChatCommonModel {
  virtuosoRef?: RefObject<
    VirtuosoMessageListMethods<Message, MessageListContext>
  >;
  @observable inputText = '';

  #uppy?: Uppy;

  @observable uppyStateMap = new Map<string, FileState>();

  @observable isDragging = false;

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
  }

  setVirtuosoRef = (
    ref: RefObject<VirtuosoMessageListMethods<Message, MessageListContext>>,
  ) => {
    this.virtuosoRef = ref;
  };

  @action.bound
  setInputText(text: string) {
    this.inputText = text;
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
        // TODO 做样式
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
}
