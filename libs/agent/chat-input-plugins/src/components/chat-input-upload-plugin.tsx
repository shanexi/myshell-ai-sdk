import { cn, UploadItem } from '@myshell-run/common-ui';
import { createId } from '@paralleldrive/cuid2';
import { FileKind } from 'human-filetypes';
import { useInjection } from 'inversify-react';
import { File, X } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { AgentChatInputModel } from './agent-chat-input.model';
import { DEFAULT_AVATAR } from '@myshell-run/common-def';

export const ChatInputUploadPlugin = observer(() => {
  const model = useInjection(AgentChatInputModel);
  if (model.uppy.previewItems.length === 0) return <span />;

  return (
    <div
      className={cn(
        'flex flex-nowrap gap-spacing-md-v2 overflow-x-auto',
        'px-spacing-xs-v2 pt-spacing-md-v2 pb-spacing-xs-v2',
      )}
    >
      {model.uppy.previewItems.map((item) => {
        if (item.fileKind === FileKind.Image) {
          return (
            <ImagePreview
              key={item.name}
              id={item.id || createId()}
              previewItem={item}
            />
          );
        }
        if (
          [
            FileKind.Document,
            FileKind.Text,
            FileKind.Presentation,
            FileKind.Spreadsheet,
          ].indexOf(item.fileKind) > -1
        ) {
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
  previewItem: UploadItem;
  id: string;
}> = ({ previewItem, id }) => {
  const model = useInjection(AgentChatInputModel);
  return (
    <div
      className={cn(
        'h-[56px] w-[156px]',
        'border border-Cr-border-default-v2',
        'bg-Cr-Bg-normal-primary-default-v2',
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
            'rounded-C-button-sm-radius-v2 bg-Cr-utility-lake-blue-50-v2',
            'h-[32px] w-[32px]',
            'flex items-center justify-center',
            'mr-spacing-lg-v2',
          )}
        >
          <File color="#fff" />
        </div>
        <div className="overflow-hidden">
          <div className="description-lg-medium text-Cr-text-default-v2">
            {previewItem.name}
          </div>
          <div className="description-lg-regular truncate text-Cr-text-subtler-v2">
            {previewItem.label}
          </div>
        </div>
      </div>
      <Remove
        onRemove={() => model.removeImagePreview(id)}
        uploadComplete={Boolean(previewItem.uploadComplete)}
      />
    </div>
  );
};

const ImagePreview: React.FC<{
  previewItem: UploadItem;
  id: string;
}> = ({ previewItem, id }) => {
  const model = useInjection(AgentChatInputModel);
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
        'bg-CCr-button-solid-bg_default-v2',
        'border border-CCr-button-solid-border-v2',
        'flex items-center justify-center',
        // 'visible',
        // TODO 在 shellagent group 没生效 先 visible
        // 'invisible group-hover:visible',
        'cursor-pointer',
      )}
    >
      {uploadComplete ? (
        <X size={12} />
      ) : (
        <span className="loading loading-xs loading-spinner text-Cr-Fg-subtle-v2"></span>
      )}
    </div>
  );
};
