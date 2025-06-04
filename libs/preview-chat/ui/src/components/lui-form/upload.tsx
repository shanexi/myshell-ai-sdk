import { cn } from '@myshell-run/common-ui';
import { Upload as UploadIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { UploadModel } from './upload.model';

export const Upload = observer<{
  model: UploadModel;
}>(({ model }) => {
  const dropTargetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!dropTargetRef.current) return;
    return model.uppy.setup(dropTargetRef.current);
  }, []);
  return (
    <div
      ref={dropTargetRef}
      className={cn(
        'rounded-C-button-lg-radius-v2',
        'p-spacing-lg-v2',
        'border-2 border-dashed border-Cr-Bg-neutral-on-surface-alt-light-v2',
      )}
    >
      {model.uppy.isDragging ? (
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
    </div>
  );
});
