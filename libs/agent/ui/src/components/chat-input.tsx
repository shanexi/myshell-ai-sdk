import { cn, FileState, useInjection } from '@myshell-run/common-ui';
import TextareaAutosize from 'react-textarea-autosize';
import { AtSign, CirclePlus, Mic, X } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { AgentChatModel } from './agent-chat.model';
import { MOCK_IMG } from '@myshell-run/common-def';

export const ChatInput = observer(() => {
  const model = useInjection(AgentChatModel);

  return (
    <div className={cn('px-spacing-xl-v2 py-spacing-sm-v2')}>
      <div
        className={cn(
          'rounded-lg-v2 border border-component-colors-input-border-light-v2',
          'bg-component-colors-input-bg_default-light-v2',
          'p-spacing-xs-v2',
        )}
      >
        <div
          className={cn(
            'flex flex-nowrap gap-spacing-md-v2 overflow-x-auto',
            'px-spacing-md-v2 pt-spacing-md-v2 pb-spacing-xs-v2',
          )}
        >
          <Image
            id="1"
            fileState={{
              preview: MOCK_IMG,
              uploadComplete: true,
            }}
          />
        </div>
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
        <div className="my-spacing-xs-v2 flex items-center justify-between">
          <div className="flex items-center gap-[2px]">
            <AtSign strokeWidth={1.5} size={36} className="p-[7px]" />
            <CirclePlus strokeWidth={1.5} size={36} className="p-[7px]" />
          </div>
          <Mic strokeWidth={1.5} size={36} className="p-[7px]" />
        </div>
      </div>
    </div>
  );
});

export const Image: React.FC<{ fileState: FileState; id: string }> = ({
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
          'bg-component-colors-button-solid-bg_default-light-v2',
          'border border-component-colors-button-solid-border-light-v2',
          'flex items-center justify-center',
        )}
      >
        {fileState.uploadComplete ? (
          <X size={16} />
        ) : (
          <span className="loading loading-xs loading-spinner text-white"></span>
        )}
      </div>
    </div>
  );
};
