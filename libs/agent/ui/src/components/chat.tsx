import { useEffect, useRef } from 'react';
import { ChatInput } from './chat-input';
import { ChatMessageList, cn } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import { AgentChatModel } from './agent-chat.model';
import { observer } from 'mobx-react-lite';
import { ReactComponent as Dragging } from './dragging.svg';

export const Chat = observer(() => {
  const model = useInjection(AgentChatModel);
  const dropTargetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!dropTargetRef.current) return;
    return model.chatCommon.uppyModel.setup(dropTargetRef.current);
  }, []);
  return (
    <div ref={dropTargetRef} className="relative flex h-full flex-col">
      <ChatMessageList
        chatCommonModel={model.chatCommon}
        className="flex flex-grow flex-col overflow-auto px-[8px]"
        initialMessages={[]}
      />
      <ChatInput />
      {model.chatCommon.uppyModel.isDragging && <Mask />}
    </div>
  );
});

const Mask = () => {
  return (
    <div
      className={cn(
        'absolute h-full w-full',
        'bg-white/90',
        'flex flex-col items-center justify-center',
      )}
    >
      <Dragging />
      <div className="display-md-emphasized mt-[12px] text-center text-Cr-text-default-light-v2">
        Add any content
      </div>
      <div className="text-sm-regular mt-[4px] text-center">
        Drag and drop any file here to add it to the conversation.
      </div>
    </div>
  );
};
