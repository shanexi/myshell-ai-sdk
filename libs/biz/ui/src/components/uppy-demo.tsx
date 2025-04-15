import { useEffect, useState } from 'react';
import Uppy from '@uppy/core';
import DragDrop from '@uppy/drag-drop';
import XHR from '@uppy/xhr-upload';

import '@uppy/core/dist/style.min.css';
import '@uppy/drag-drop/dist/style.min.css';

export const UppyDemo = () => {
  // https://uppy.io/docs/react/
  // IMPORTANT: passing an initializer function to prevent Uppy from being reinstantiated on every render.
  const [uppy] = useState(() =>
    new Uppy({
      autoProceed: true,
      debug: true,
    }).use(XHR, {
      endpoint: 'http://localhost:3333/api/upload',
    }),
  );
  useEffect(() => {
    uppy.use(DragDrop, {
      target: '#drag-drop',
      onDrop: (evt) => {
        console.log('onDrop', evt);
      },
    });
    return () => uppy.destroy();
  }, []);

  return <div id="drag-drop"></div>;
};
