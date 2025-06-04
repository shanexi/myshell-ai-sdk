import { inject, injectable } from 'inversify';
import Uppy from '@uppy/core';
import DropTarget from '@uppy/drop-target';
import ThumbnailGenerator from '@uppy/thumbnail-generator';
import XHR from '@uppy/xhr-upload';
import { UploadEndpoint } from '@myshell-run/common-def';
import { makeObservable, observable } from 'mobx';
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

@injectable()
export class UppyModel {
  @observable uppyStateMap = new Map<string, FileState>();
  @observable isDragging = false;
  #uppy?: Uppy;

  constructor(@inject(UploadEndpoint) private uploadEndpoint: string) {
    makeObservable(this);
  }

  get accept() {
    return this.#uppy?.opts.restrictions?.allowedFileTypes?.join(', ');
  }

  get uppy() {
    if (!this.#uppy) {
      throw new Error('uppy is not initialized, check setupUppy is called');
    }
    return this.#uppy;
  }

  get maxNumberOfFiles() {
    return this.#uppy?.opts.restrictions?.maxNumberOfFiles !== 1;
  }

  removeFile(id: string) {
    this.uppy?.removeFile(id);
    this.uppyStateMap.delete(id);
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
}
