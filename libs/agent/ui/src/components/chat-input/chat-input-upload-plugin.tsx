import {
  cn,
  FilePreviewState,
  ImageState,
  MOCK_IMG,
} from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import { File, X } from 'lucide-react';
import { AgentChatModel } from '../agent-chat.model';

export const ChatInputUploadPlugin = () => {
  return (
    <div
      className={cn(
        'flex flex-nowrap gap-spacing-md-v2 overflow-x-auto',
        'px-spacing-xs-v2 pt-spacing-md-v2 pb-spacing-xs-v2',
      )}
    >
      <ImagePreview
        id="1"
        fileState={{
          type: 'image',
          preview: MOCK_IMG,
          uploadComplete: true,
        }}
      />
      <FilePreview
        id="2"
        fileState={{
          type: 'file',
          name: 'Untitled.rtf',
          desc: 'Rich Text File',
          uploadComplete: true,
        }}
      />
    </div>
  );
};

const FilePreview: React.FC<{
  fileState: FilePreviewState;
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
          {fileState.desc}
        </div>
      </div>
    </div>
  );
};

const ImagePreview: React.FC<{ fileState: ImageState; id: string }> = ({
  fileState,
  id,
}) => {
  const model = useInjection(AgentChatModel);
  return (
    <div className="relative flex-none">
      <img
        className={cn('h-[56px] w-[56px] rounded-xl-v2')}
        alt=""
        src={fileState.preview}
      />
      <div
        onClick={() => model.chatCommon.removeFile(id)}
        className={cn(
          'absolute top-[-6px] right-[-6px]',
          'h-[20px] w-[20px] rounded-full-v2',
          'bg-CCr-button-solid-bg_default-light-v2',
          'border border-CCr-button-solid-border-light-v2',
          'flex items-center justify-center',
        )}
      >
        {fileState.uploadComplete ? (
          <X size={12} />
        ) : (
          <span className="loading loading-xs loading-spinner text-white"></span>
        )}
      </div>
    </div>
  );
};
