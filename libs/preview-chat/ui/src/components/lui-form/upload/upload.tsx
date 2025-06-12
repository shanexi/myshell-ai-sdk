import { cn, formatEta, formatFileSize } from '@myshell-run/common-ui';
import { Upload as UploadIcon, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import toArray from '@uppy/utils/lib/toArray';
import { UploadModel, upload_schema } from './upload.model';
import { z } from 'zod';
import { FieldProps } from 'formik';

export const Upload = observer<
  z.infer<typeof upload_schema> & { model: UploadModel; fieldProps: FieldProps }
>(({ model, fieldProps, ...props }) => {
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
    return model.uppyModel.setup(dropTargetRef.current, {
      maxFileSize: props.items.properties.file.properties.size?.maxLength,
      maxNumberOfFiles: props.maxItems,
      allowedFileTypes: props.items.properties.file.properties.type?.enum,
    });
  }, []);

  return (
    <div
      ref={dropTargetRef}
      className={cn(
        'rounded-C-button-lg-radius-v2',
        'p-spacing-lg-v2',
        model.uppyModel.isDraggingError
          ? 'border border-Cr-border-critical-light-v2'
          : 'border-2 border-dashed border-Cr-Bg-neutral-on-surface-alt-light-v2',
      )}
      onClick={() => {
        if (model.uppyModel.uppyState.length > 0) {
          return;
        }
        inputRef.current?.click();
      }}
    >
      {model.file != null ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-spacing-md-v2">
            <div className="relative">
              <img
                className={cn('h-[40px] w-[40px]', 'rounded-md-v2')}
                alt={model.file?.name || 'uploaded file'}
                src={model.file?.preview}
              />
              {/* 上传遮罩层表示进度 */}
              {Boolean(model.file?.uploadComplete) === false && (
                <div
                  className="absolute right-0 bottom-0 left-0 bg-white/50 transition-all duration-300"
                  style={{
                    height: `${100 - (model.file?.progressPercentage || 0)}%`,
                  }}
                />
              )}
            </div>
            <div className="flex flex-col gap-spacing-xxs-v2">
              <div className="text-sm-medium text-Cr-text-default-light-v2">
                {model.file?.uploadComplete ? model.file?.name : 'Uploading...'}
              </div>
              <div className="text-sm-regular text-Cr-text-subtlest-light-v2">
                {model.file?.uploadComplete
                  ? `(${formatFileSize(model.file?.size)})`
                  : formatEta(model.file.eta)}
              </div>
            </div>
          </div>
          <X
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              model.uppyModel.removeFile(model.file?.id);
            }}
            size={28}
            strokeWidth={1.5}
            className={cn(
              'text-CCr-icon-button-plain-gray-fg_default-light-v2',
              'hover:bg-Cr-alpha-black-5-light-v2 hover:text-Cr-text-critical-default-light-v2',
              'cursor-pointer rounded-md-v2 p-1 transition-colors duration-200',
            )}
          />
        </div>
      ) : model.uppyModel.isDragging ? (
        <div
          className={cn(
            'text-sm-medium flex items-center justify-center',
            'h-[42px]',
          )}
        >
          {model.uppyModel.isDraggingError ? (
            <div className="text-Cr-text-critical-default-light-v2">
              {model.uppyModel.draggingErrorDisplay}
            </div>
          ) : (
            <div className="text-Cr-text-default-light-v2">
              Move you files here
            </div>
          )}
        </div>
      ) : (
        <EmptyUpload model={model} {...props} />
      )}

      <input
        ref={inputRef}
        type="file"
        name="files[]"
        multiple={model.uppyModel.multiple}
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

const EmptyUpload = observer<
  z.infer<typeof upload_schema> & { model: UploadModel }
>(({ model, ...props }) => {
  const { description = 'Drop a file or click to upload' } = props;
  return (
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
          {description}
        </div>
        <div className="text-sm-regular text-Cr-text-subtlest-light-v2">
          {model.uppyModel.allowedFileTypesDisplay}{' '}
          {model.uppyModel.maxFileSizeDisplay &&
            `up to ${model.uppyModel.maxFileSizeDisplay}`}
        </div>
      </div>
    </div>
  );
});
