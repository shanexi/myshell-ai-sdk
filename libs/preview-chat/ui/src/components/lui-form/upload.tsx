import { cn } from '@myshell-run/common-ui';
import { Upload as UploadIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { UploadModel } from './upload.model';
import toArray from '@uppy/utils/lib/toArray';

export const Upload = observer<{
  model: UploadModel;
}>(({ model }) => {
  const dropTargetRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hiddenInputStyle = {
    width: '0.1px',
    height: '0.1px',
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1,
  } satisfies React.CSSProperties;

  useEffect(() => {
    if (!dropTargetRef.current) return;
    return model.uppyModel.setup(dropTargetRef.current);
  }, []);
  return (
    <div
      ref={dropTargetRef}
      className={cn(
        'rounded-C-button-lg-radius-v2',
        'p-spacing-lg-v2',
        'border-2 border-dashed border-Cr-Bg-neutral-on-surface-alt-light-v2',
      )}
      onClick={() => inputRef.current?.click()}
    >
      {model.uppyModel.isDragging ? (
        <div
          className={cn(
            'text-sm-medium flex items-center justify-center text-Cr-text-default-light-v2',
            'h-[42px]',
          )}
        >
          Move you files here
        </div>
      ) : (
        <div className="flex items-center gap-spacing-md-v2">
          <div className="rounded-md-v2 bg-Cr-alpha-black-5-light-v2 p-[8px]">
            <UploadIcon
              className="text-Cr-Fg-subtle-light-v2"
              size={24}
              strokeWidth={1.5}
            />
          </div>
          <div className="flex flex-col gap-spacing-xxs-v2">
            <div className="text-sm-medium text-Cr-text-default-light-v2">
              Drop a file or click to upload
            </div>
            <div className="text-sm-regular text-Cr-text-subtlest-light-v2">
              PNG, JPG, GIF up to 10MB
            </div>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        name="files[]"
        multiple={model.uppyModel.maxNumberOfFiles}
        accept={model.uppyModel.accept}
        onChange={(e) => {
          model.uppyModel.uppy.log(
            '[FileInput] Something selected through input...',
          );
          const files = toArray(e.target.files || []);

          const descriptors = files.map((file) => ({
            source: 'FileInput',
            name: file.name,
            type: file.type,
            data: file,
          }));

          try {
            model.uppyModel.uppy.addFiles(descriptors);
          } catch (err) {
            model.uppyModel.uppy.log(err);
          }
        }}
        style={hiddenInputStyle}
      />
    </div>
  );
});
