import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useRef } from 'react';
import { UppyModel } from './uppy.model';
import toArray from '@uppy/utils/lib/toArray';

export const hiddenInputStyle = {
  width: '0.1px',
  height: '0.1px',
  opacity: 0,
  overflow: 'hidden',
  position: 'absolute',
  zIndex: -1,
} satisfies React.CSSProperties;

export const HiddenInputFile = observer<
  PropsWithChildren<{
    uppyModel: UppyModel;
  }>
>(({ uppyModel, children }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="flex h-[28px] w-[28px] flex-none items-center justify-center"
      onClick={(e) => {
        // e.preventDefault();
        e.stopPropagation();
        inputRef.current?.click();
      }}
    >
      <input
        ref={inputRef}
        type="file"
        name="files[]"
        multiple={uppyModel.multiple}
        accept={uppyModel.accept}
        onChange={(e) => {
          uppyModel.uppy.log('[FileInput] Something selected through input...');
          const files = toArray(e.target.files || []);

          const descriptors = files.map((file) => ({
            source: 'FileInput',
            name: file.name,
            type: file.type,
            data: file,
          }));

          try {
            uppyModel.uppy.addFiles(descriptors);
          } catch (err) {
            uppyModel.uppy.log(err);
          }
        }}
        style={hiddenInputStyle}
      />
      {children}
    </div>
  );
});
