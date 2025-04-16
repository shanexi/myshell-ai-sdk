import { useEffect, useState } from 'react';
import Uppy from '@uppy/core';
// import DragDrop from '@uppy/drag-drop';
import DropTarget from '@uppy/drop-target';
import XHR from '@uppy/xhr-upload';
import ThumbnailGenerator from '@uppy/thumbnail-generator';

import '@uppy/core/dist/style.min.css';
import '@uppy/drag-drop/dist/style.min.css';

export const UppyDemo = () => {
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
  useEffect(() => {
    uppy.on('thumbnail:generated', (file, preview) =>
      console.log('thumbnail:generated', file, preview),
    );

    uppy.use(DropTarget, {
      target: '#drag-drop',
    });

    // uppy.use(DragDrop, {
    //   target: '#drag-drop',
    // });
    return () => uppy.destroy();
  }, []);

  return <div id="drag-drop" className="h-[50px] border border-sky-100"></div>;
};
