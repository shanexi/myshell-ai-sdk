import { useEffect, useRef, useState } from 'react';
import Uppy from '@uppy/core';
import DropTarget from '@uppy/drop-target';
import XHR from '@uppy/xhr-upload';
import ThumbnailGenerator from '@uppy/thumbnail-generator';
import FileInput from '@uppy/file-input';

export const UppyDemo = () => {
  // TODO 正式代码 要不要交给 class 维护？ 不是很想放在 model 层，期望 model 没有 DOM 的依赖
  // https://uppy.io/docs/react/
  // IMPORTANT: passing an initializer function to prevent Uppy from being reinstantiated on every render.
  const dndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLDivElement>(null);

  const [uppy] = useState(() =>
    new Uppy({
      autoProceed: true,
      debug: true,
    })
      .use(ThumbnailGenerator)
      .use(XHR, {
        endpoint: 'http://localhost:3333/api/upload',
      }),
  );

  uppy.on('progress', (progress) => {
    console.log('progress', progress);
  });

  useEffect(() => {
    if (uppy) {
      uppy.use(FileInput, {
        target: fileInputRef.current!,
      });
      uppy.on('thumbnail:generated', (file, preview) =>
        console.log('thumbnail:generated', file, preview),
      );

      uppy.use(DropTarget, {
        target: dndRef.current,
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
    return () => {
      if (uppy) {
        uppy.destroy();
      }
    };
  }, [uppy]);

  return (
    <div>
      <div ref={dndRef} className="h-[50px] border border-sky-100"></div>
      <div ref={fileInputRef} id="file-input"></div>
    </div>
  );
};
