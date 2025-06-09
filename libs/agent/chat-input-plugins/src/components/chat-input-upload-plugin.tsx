import { cn, UppyState } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import { File, X } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { ChatInputModel } from './chat-input.model';
import { Meta, UppyFile, Body } from '@uppy/core';

export const ChatInputUploadPlugin = observer(() => {
  const model = useInjection(ChatInputModel);
  return (
    <div
      className={cn(
        'flex flex-nowrap gap-spacing-md-v2 overflow-x-auto',
        'px-spacing-xs-v2 pt-spacing-md-v2 pb-spacing-xs-v2',
      )}
    >
      {model.previewItems.map((item) => {
        if (item.previewType === 'image') {
          return (
            <ImagePreview
              key={item.name}
              id={item.name}
              fileState={{
                type: item.previewType,
                preview: item.previewUrl,
                uploadComplete: true,
              }}
            />
          );
        }
        if (item.previewType === 'file') {
          return (
            <FilePreview
              key={item.name}
              id={item.name}
              fileState={{
                type: item.previewType,
                name: item.name,
                desc: item || '',
                uploadComplete: true,
              }}
            />
          );
        }
        return null;
      })}
    </div>
  );
});

const FilePreview: React.FC<{
  fileState: UppyState;
  id: string;
}> = ({ fileState, id }) => {
  return (
    <div
      className={cn(
        'h-[56px] w-[156px] px-spacing-lg-v2',
        'border border-Cr-border-default-light-v2',
        'bg-Cr-Bg-normal-primary-default-light-v2',
        'rounded-lg-v2',
        'py-spacing-lg-v2',
        'flex items-center',
        'relative',
        'group',
      )}
    >
      <div
        className={cn(
          'rounded-C-button-sm-radius-v2 bg-Cr-utility-lake-blue-50-light-v2',
          'h-[32px] w-[32px]',
          'flex items-center justify-center',
          'mr-spacing-lg-v2',
        )}
      >
        <File color="#fff" />
      </div>
      <div>
        <div className="description-lg-medium text-Cr-text-default-light-v2">
          {fileState.name}
        </div>
        <div className="description-lg-regular text-Cr-text-subtler-light-v2">
          {fileState.type}
        </div>
      </div>
      <Remove
        onRemove={() => {
          //
        }}
        uploadComplete={fileState.uploadComplete}
      />
    </div>
  );
};

const ImagePreview: React.FC<{
  fileState: UppyState;
  id: string;
}> = ({ fileState, id }) => {
  const model = useInjection(ChatInputModel);
  return (
    <div className="group relative flex-none">
      <img
        className={cn('h-[56px] w-[56px] rounded-xl-v2')}
        alt=""
        src={fileState.preview}
      />
      <Remove
        onRemove={() => model.removeImagePreview(id)}
        uploadComplete={fileState.uploadComplete}
      />
    </div>
  );
};

export const Remove: React.FC<{
  onRemove: () => void;
  uploadComplete: boolean;
}> = ({ onRemove, uploadComplete }) => {
  return (
    <div
      onClick={onRemove}
      className={cn(
        'absolute top-[-6px] right-[-6px]',
        'h-[20px] w-[20px] rounded-full-v2',
        'bg-CCr-button-solid-bg_default-light-v2',
        'border border-CCr-button-solid-border-light-v2',
        'flex items-center justify-center',
        // 'visible',
        'invisible group-hover:visible',
        'cursor-pointer',
      )}
    >
      {uploadComplete ? (
        <X size={12} />
      ) : (
        <span className="loading loading-xs loading-spinner text-white"></span>
      )}
    </div>
  );
};
