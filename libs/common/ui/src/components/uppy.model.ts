import { UploadEndpoint } from '@myshell-run/common-def';
import { Meta, Uppy, UppyFile, Body } from '@uppy/core';
import { Restrictions } from '@uppy/core/lib/Restricter';
import DropTarget from '@uppy/drop-target';
import ThumbnailGenerator from '@uppy/thumbnail-generator';
import XHR from '@uppy/xhr-upload';
import { inject, injectable } from 'inversify';
import { computed, makeObservable, observable } from 'mobx';
import { formatFileSize, getAllowedFileTypesDisplay } from './uppy.utils';
import getTimeStamp from '@uppy/utils/lib/getTimeStamp';

@injectable()
export class UppyModel {
  /**
   * 多文件的状态管理
   */
  @observable uppyStateMap = new Map<
    string,
    Partial<UppyFile<Meta, Body>> & {
      uploadComplete: boolean;
    }
  >();
  @observable isDragging = false;
  @observable isDraggingError = false;
  @observable draggingErrorDisplay: string | null = null;
  @observable errorText: string | null = null;

  @observable allowedFileTypes?: string[] | null;
  @observable maxNumberOfFiles?: number | null;
  @observable maxFileSize?: number | null;

  private _uppy?: Uppy;

  constructor(@inject(UploadEndpoint) private uploadEndpoint: string) {
    makeObservable(this);
  }

  @computed get uppyState() {
    return Array.from(this.uppyStateMap as Map<string, UppyFile<Meta, Body>>);
  }

  @computed get accept() {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file#unique_file_type_specifiers
    const accept = this.allowedFileTypes?.join(',');
    return accept;
  }

  @computed get allowedFileTypesDisplay() {
    return getAllowedFileTypesDisplay(this.allowedFileTypes);
  }

  @computed get maxFileSizeDisplay() {
    return formatFileSize(this.maxFileSize);
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
      restrictions,
      // debug: true,
      logger: {
        debug: (...args: any[]): void => {
          console.debug(`[Uppy] [${getTimeStamp()}]`, ...args);
        },
        warn: (...args: any[]): void => {
          if (args[0].isRestriction > -1) {
            this.errorText = args[0].message;
          } else {
            this.errorText = null;
          }
          console.warn(`[Uppy] [${getTimeStamp()}]`, ...args);
        },
        error: (...args: any[]): void => {
          console.error(`[Uppy] [${getTimeStamp()}]`, ...args);
        },
      },
      onBeforeFileAdded: (file, files) => {
        return !Object.hasOwn(files, file.id);
      },
      onBeforeUpload: (files) => {
        return files;
      },
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
        ...file,
        uploadComplete: false,
      });
    });
    this._uppy.on('progress', (progress) => {
      this.uppy.log(`progress ${progress}`);
      Object.keys(this._uppy?.getState().files || {}).forEach((fileId) => {
        const file = this._uppy?.getState().files[fileId];
        const prev = this.uppyStateMap.get(fileId) || {
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
        const a = this.uppy.validateSingleFile({
          // 不一定有效 观察一段时间
          type: event.dataTransfer?.items[0].type || '',
          name: '',
          extension: '',
          size: 0,
        });
        if (a != null) {
          this.isDraggingError = true;
          this.draggingErrorDisplay = a;
        } else {
          this.isDraggingError = false;
          this.draggingErrorDisplay = null;
        }
        this.isDragging = true;
      },
      onDragLeave: (event) => {
        this.isDragging = false;
        this.isDraggingError = false;
      },
      onDrop: (event) => {
        this.isDragging = false;
        this.isDraggingError = false;
      },
    });

    return () => {
      this._uppy = undefined;
    };
  }
}
