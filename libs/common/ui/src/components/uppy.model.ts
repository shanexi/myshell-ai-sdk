import { UploadEndpoint } from '@myshell-run/common-def';
import { Body, Meta, Uppy, UppyFile } from '@uppy/core';
import { Restrictions } from '@uppy/core/lib/Restricter';
import DropTarget from '@uppy/drop-target';
import ThumbnailGenerator from '@uppy/thumbnail-generator';
import getTimeStamp from '@uppy/utils/lib/getTimeStamp';
import XHR from '@uppy/xhr-upload';
import { inject, injectable } from 'inversify';
import { computed, makeObservable, observable } from 'mobx';
import {
  formatFileSize,
  fromMime2,
  getAllowedFileTypesDisplay,
  mimeData2,
} from './uppy.utils';
import { FileKind } from 'human-filetypes';

// 后端上传接口返回结构
// export interface UploadResBody extends Body {
//   file: {
//     filename: string;
//     mimetype: string;
//     originalname: string;
//     size: number;
//     url: string;
//   };
// }

export type UploadItem = UppyState & {
  fileKind: FileKind;
  label?: string;
};

// 目前 python 返回的结构
export interface UploadResBody extends Body {
  code: number;
  data: {
    file_path: string;
  };
  message: string;
  success: boolean;
}

export type UppyState = Partial<UppyFile<Meta, UploadResBody>> &
  // 增加的都是为了 observable，因为嵌套无法被 observer 到
  Partial<{
    uploadComplete: boolean;
    progressPercentage: number;
    eta: number;
    startTime: number;
  }>;

@injectable()
export class UppyModel {
  /**
   * 多文件的状态管理
   */
  @observable uppyStateMap = new Map<string, UppyState>();
  @observable isDragging = false;
  @observable isDraggingError = false;
  @observable draggingErrorDisplay: string | null = null;
  @observable errorText: string | null = null;

  @observable allowedFileTypes?: string[] | null;
  @observable maxNumberOfFiles?: number | null;
  @observable maxFileSize?: number | null;

  constructor(@inject(UploadEndpoint) private uploadEndpoint: string) {
    makeObservable(this);
  }

  @computed get previewItems() {
    const items = this.uppyState.map<UploadItem>(([id, item]) => ({
      ...item,
      fileKind: item.type != null ? fromMime2(item.type) : FileKind.Unknown,
      label: item.type && mimeData2[item.type]?.label,
    }));
    return items;
  }

  private _uppy?: Uppy<Meta, UploadResBody>;

  get uppy() {
    if (!this._uppy) {
      throw new Error('uppy is not initialized, check if setup is called');
    }
    return this._uppy;
  }

  @computed get uppyState() {
    return Array.from(this.uppyStateMap as Map<string, UppyState>);
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

  get multiple() {
    return this.maxNumberOfFiles !== 1;
  }

  removeFile(id?: string) {
    if (id == null) return;

    this.uppy?.removeFile(id);
    this.uppyStateMap.delete(id);
  }

  /**
   * @description 暂时禁用 dnd
   */
  setup(
    // dropTarget: HTMLDivElement,
    restrictions?: Partial<Restrictions>,
  ) {
    this.allowedFileTypes = restrictions?.allowedFileTypes;
    this.maxNumberOfFiles = restrictions?.maxNumberOfFiles;
    this.maxFileSize = restrictions?.maxFileSize;

    this._uppy = new Uppy<Meta, UploadResBody>({
      autoProceed: true,
      restrictions,
      // debug: true,
      logger: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        debug: (...args: any[]): void => {
          console.debug(`[Uppy] [${getTimeStamp()}]`, ...args);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        warn: (...args: any[]): void => {
          if (args[0].isRestriction > -1) {
            this.errorText = args[0].message;
          } else {
            this.errorText = null;
          }
          console.warn(`[Uppy] [${getTimeStamp()}]`, ...args);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (...args: any[]): void => {
          console.error(`[Uppy] [${getTimeStamp()}]`, ...args);
        },
      },
      // 这两个都是 uppy 的默认实现，explicitly 拿出来是为了可能做些校验
      onBeforeFileAdded: (file, files) => {
        return !Object.hasOwn(files, file.id);
      },
      // 这两个都是 uppy 的默认实现
      onBeforeUpload: (files) => {
        return files;
      },
    })
      .use(ThumbnailGenerator)
      .use(XHR, {
        endpoint: this.uploadEndpoint,
        // TODO: 外部注入
        headers: {
          'myshell-service-name': 'organics-api',
          'x-call-from': 'myshell-ssr',
        },
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
      const now = Date.now();

      Object.keys(this._uppy?.getState().files || {}).forEach((fileId) => {
        const file = this._uppy?.getState().files[fileId];
        const prev = this.uppyStateMap.get(fileId) || {
          uploadComplete: false,
        };

        const progressPercentage = file?.progress.percentage || 0;
        const startTime = prev.startTime || now;

        // 计算 ETA
        let eta: number | undefined;
        if (progressPercentage > 0 && progressPercentage < 100) {
          const elapsedTime = (now - startTime) / 1000; // 转换为秒
          const remainingProgress = 100 - progressPercentage;
          eta = Math.round(
            (elapsedTime / progressPercentage) * remainingProgress,
          );
        }

        this.uppyStateMap.set(fileId, {
          ...prev,
          uploadComplete: file?.progress.uploadComplete || false,
          progressPercentage,
          eta,
          startTime,
        });
      });
    });
    // TODO 暂时先注释 dnd
    // this._uppy.use(DropTarget, {
    //   target: dropTarget,
    //   onDragOver: (event) => {
    //     /*
    //     image/png
    //     video/webm
    //     也就是 Mime
    //     */
    //     const a = this.uppy.validateSingleFile({
    //       // 不一定有效 观察一段时间
    //       type: event.dataTransfer?.items[0].type || '',
    //       name: '',
    //       extension: '',
    //       size: 0,
    //     });
    //     if (a != null) {
    //       this.isDraggingError = true;
    //       this.draggingErrorDisplay = a;
    //     } else {
    //       this.isDraggingError = false;
    //       this.draggingErrorDisplay = null;
    //     }
    //     this.isDragging = true;
    //   },
    //   onDragLeave: (event) => {
    //     this.isDragging = false;
    //     this.isDraggingError = false;
    //   },
    //   onDrop: (event) => {
    //     this.isDragging = false;
    //     this.isDraggingError = false;
    //   },
    // });
    this._uppy.on('complete', (result) => {
      result.successful?.forEach((file) => {
        const prev = this.uppyStateMap.get(file.id);
        this.uppyStateMap.set(file.id, {
          ...prev,
          ...file,
        });
      });
      // console.log('failed files:', result.failed);
    });
    return () => {
      this._uppy = undefined;
    };
  }

  clear() {
    this.uppyStateMap = new Map<string, UppyState>();
    this.uppy.clear();
  }
}
