import { UploadEndpoint } from '@myshell-run/common-def';
import { Uppy } from '@uppy/core';
import { Restrictions } from '@uppy/core/lib/Restricter';
import DropTarget from '@uppy/drop-target';
import ThumbnailGenerator from '@uppy/thumbnail-generator';
import XHR from '@uppy/xhr-upload';
import { inject, injectable } from 'inversify';
import { computed, makeObservable, observable } from 'mobx';
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
  /**
   * 多文件的状态管理
   */
  @observable uppyStateMap = new Map<string, FileState>();
  @observable isDragging = false;

  @observable allowedFileTypes?: string[] | null;
  @observable maxNumberOfFiles?: number | null;
  @observable maxFileSize?: number | null;

  private _uppy?: Uppy;

  constructor(@inject(UploadEndpoint) private uploadEndpoint: string) {
    makeObservable(this);
  }

  @computed get accept() {
    const accept = this.allowedFileTypes?.join(', ');
    return accept;
  }

  get uppy() {
    if (!this._uppy) {
      throw new Error('uppy is not initialized, check if setupUppy is called');
    }
    return this._uppy;
  }

  get multiple() {
    return this.maxNumberOfFiles !== 1;
  }

  removeFile(id: string) {
    this.uppy?.removeFile(id);
    this.uppyStateMap.delete(id);
  }

  setup(dropTarget: HTMLDivElement, restrictions?: Partial<Restrictions>) {
    this.allowedFileTypes = restrictions?.allowedFileTypes;
    this.maxNumberOfFiles = restrictions?.maxNumberOfFiles;
    this.maxFileSize = restrictions?.maxFileSize;

    this._uppy = new Uppy({
      autoProceed: true,
      debug: true,
      restrictions,
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
    this._uppy.on('thumbnail:generated', (file, preview) => {
      this.uppy.log(`thumbnail:generated file ${file.name} preview ${preview}`);
      // TODO: 这里需要区分是图片还是文件
      this.uppyStateMap.set(file.id, {
        type: 'image',
        preview,
        uploadComplete: false,
      });
    });
    this._uppy.on('progress', (progress) => {
      this.uppy.log(`progress ${progress}`);
      Object.keys(this._uppy?.getState().files || {}).forEach((fileId) => {
        const file = this._uppy?.getState().files[fileId];
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
    this._uppy.use(DropTarget, {
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

    return () => {
      this._uppy = undefined;
      this.allowedFileTypes = undefined;
      this.maxNumberOfFiles = undefined;
      this.maxFileSize = undefined;
      this.uppyStateMap = new Map();
      this.isDragging = false;
    };
  }
}
