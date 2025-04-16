import { useEffect, useState } from 'react';
import Uppy from '@uppy/core';
import DropTarget from '@uppy/drop-target';
import XHR from '@uppy/xhr-upload';
import ThumbnailGenerator from '@uppy/thumbnail-generator';

export const UppyDemo = () => {
  // TODO 正式代码 要不要交给 class 维护？ 不是很想放在 model 层，期望 model 没有 DOM 的依赖
  // https://uppy.io/docs/react/
  // IMPORTANT: passing an initializer function to prevent Uppy from being reinstantiated on every render.
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
    uppy.on('thumbnail:generated', (file, preview) =>
      console.log('thumbnail:generated', file, preview),
    );

    uppy.use(DropTarget, {
      target: '#drag-drop',
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

    return () => uppy.destroy();
  }, []);

  return <div id="drag-drop" className="h-[50px] border border-sky-100"></div>;
};
