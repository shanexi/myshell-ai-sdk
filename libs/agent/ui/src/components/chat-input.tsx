import {
  cn,
  FilePreviewState,
  ImageState,
  useInjection,
} from '@myshell-run/common-ui';
import TextareaAutosize from 'react-textarea-autosize';
import {
  AtSign,
  CirclePlus,
  Mic,
  X,
  File,
  FileText,
  FileJson2,
  ListCheck,
  MessagesSquare,
} from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { AgentChatModel } from './agent-chat.model';
import { MOCK_IMG } from '@myshell-run/common-ui';

const IconMap = {
  atSign: AtSign,
  file: File,
  fileText: FileText,
  fileJson: FileJson2,
  listCheck: ListCheck,
  messagesSquare: MessagesSquare,
};

export const ChatInput = () => {
  return (
    <div className={cn('px-spacing-xl-v2 py-spacing-sm-v2')}>
      <div
        className={cn(
          'rounded-lg-v2 border border-CCr-input-border-light-v2',
          'bg-CCr-input-bg_default-light-v2',
          'p-spacing-xs-v2',
        )}
      >
        <ReferenceLayer />
        <UploadLayer />
        <ChatTextareaLayer />
        <ChatActionsLayer />
      </div>
    </div>
  );
};

const ReferenceLayer = () => {
  return (
    <div className={cn('flex flex-wrap gap-spacing-md-v2', 'p-spacing-xs-v2')}>
      <ReferenceItem icon="atSign" title="Add context" />
      <ReferenceItem icon="file" title="requirement.feature1" />
      <ReferenceItem icon="fileJson" title="canvas.state1.inputs.variable1" />
      <ReferenceItem icon="listCheck" title="test.test_suite1" />
      <ReferenceItem icon="messagesSquare" title="preview.message1" />
    </div>
  );
};

const ReferenceItem: React.FC<{
  title: string;
  icon: keyof typeof IconMap;
}> = ({ title, icon }) => {
  const Icon = IconMap[icon];
  return (
    <div
      className={cn(
        'flex items-center gap-[6px]',
        'bg-Cr-Bg-normal-secondary-alt-light-v2',
        'border border-Cr-border-default-light-v2',
        'rounded-md-v2',
        'p-spacing-md-v2',
        'w-fit',
      )}
    >
      <Icon
        strokeWidth={1.5}
        size={16}
        className="text-Cr-Fg-subtle-light-v2"
      />
      <div className="text-sm-medium">{title}</div>
      <X strokeWidth={1.5} size={16} className="text-Cr-Fg-subtle-light-v2" />
    </div>
  );
};

const ChatTextareaLayer = observer(() => {
  const model = useInjection(AgentChatModel);
  return (
    <TextareaAutosize
      className={cn(
        'my-spacing-xs-v2 w-full resize-none px-spacing-sm-v2 outline-none',
      )}
      maxRows={8}
      placeholder="Write a message"
      value={model.chatCommon.inputText}
      onChange={(e) => {
        model.chatCommon.setInputText(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          model.sendText();
        }
      }}
    />
  );
});

const UploadLayer = () => {
  return (
    <div
      className={cn(
        'flex flex-nowrap gap-spacing-md-v2 overflow-x-auto',
        'px-spacing-xs-v2 pt-spacing-md-v2 pb-spacing-xs-v2',
      )}
    >
      <Image
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

const ChatActionsLayer = () => {
  return (
    <div className="my-spacing-xs-v2 flex items-center justify-between">
      <CirclePlus strokeWidth={1.5} size={36} className="p-[7px]" />
      <Mic strokeWidth={1.5} size={36} className="p-[7px]" />
    </div>
  );
};

export const FilePreview: React.FC<{
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

export const Image: React.FC<{ fileState: ImageState; id: string }> = ({
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
