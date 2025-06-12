import { cn } from '@myshell-run/common-ui';
import { createId } from '@paralleldrive/cuid2';
import { FileKind } from 'human-filetypes';
import { useInjection } from 'inversify-react';
import { File, X } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { ChatInputModel, PreviewItem } from './chat-input.model';
import { DEFAULT_AVATAR } from '@myshell-run/common-def';

export const ChatInputUploadPlugin = observer(() => {
  const model = useInjection(ChatInputModel);
  if (model.previewItems.length === 0) return <span />;

  return (
    <div
      className={cn(
        'flex flex-nowrap gap-spacing-md-v2 overflow-x-auto',
        'px-spacing-xs-v2 pt-spacing-md-v2 pb-spacing-xs-v2',
      )}
    >
      {model.previewItems.map((item) => {
        if (item.fileKind === FileKind.Image) {
          return (
            <ImagePreview
              key={item.name}
              id={item.id || createId()}
              previewItem={item}
            />
          );
        }
        if (item.fileKind === FileKind.Document) {
          return (
            <FilePreview
              key={item.name}
              id={item.id || createId()}
              previewItem={item}
            />
          );
        }
        return null;
      })}
    </div>
  );
});

const FilePreview: React.FC<{
  previewItem: PreviewItem;
  id: string;
}> = ({ previewItem, id }) => {
  return (
    <div
      className={cn(
        'h-[56px] w-[156px]',
        'border border-Cr-border-default-light-v2',
        'bg-Cr-Bg-normal-primary-default-light-v2',
        'rounded-lg-v2',
        'relative',
        'group',
      )}
    >
      <div
        className={cn(
          'px-spacing-lg-v2 py-spacing-lg-v2',
          'flex items-center',
          'overflow-hidden',
          'h-full',
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
        <div className="overflow-hidden">
          <div className="description-lg-medium text-Cr-text-default-light-v2">
            {previewItem.name}
          </div>
          <div className="description-lg-regular truncate text-Cr-text-subtler-light-v2">
            {previewItem.label}
          </div>
        </div>
      </div>
      <Remove
        onRemove={() => {
          //
        }}
        uploadComplete={Boolean(previewItem.uploadComplete)}
      />
    </div>
  );
};

const ImagePreview: React.FC<{
  previewItem: PreviewItem;
  id: string;
}> = ({ previewItem, id }) => {
  const model = useInjection(ChatInputModel);
  return (
    <div className="group relative flex-none">
      <img
        className={cn('h-[56px] w-[56px] rounded-xl-v2')}
        alt=""
        src={previewItem.preview || previewItem.uploadURL || DEFAULT_AVATAR}
      />
      <Remove
        onRemove={() => model.removeImagePreview(id)}
        uploadComplete={Boolean(previewItem.uploadComplete)}
      />
    </div>
  );
};

const Remove: React.FC<{
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
        <span className="loading loading-xs loading-spinner text-Cr-Fg-subtle-light-v2"></span>
      )}
    </div>
  );
};
