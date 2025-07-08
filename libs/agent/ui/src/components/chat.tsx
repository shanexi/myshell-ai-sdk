import { useEffect, useRef } from 'react';
import { ChatInput } from './chat-input';
import { ChatMessageList, cn } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import { AgentChatModel } from './agent-chat.model';
import { observer } from 'mobx-react-lite';
import { ReactComponent as Dragging } from './dragging.svg';
import { NO_MESSAGE_ID_AGENT_CHAT_INPUT } from '@myshell-run/agent-chat-input-plugins';

export const Chat = observer(() => {
  const model = useInjection(AgentChatModel);
  // const dropTargetRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   // if (!dropTargetRef.current) return;
  //   return model
  //     .chatInputFactory(NO_MESSAGE_ID_AGENT_CHAT_INPUT)
  //     .uppy.setup(dropTargetRef.current);
  // }, []);
  return (
    <div
      // ref={dropTargetRef}
      className="relative flex h-full flex-col"
    >
      <ChatMessageList
        chatCommonModel={model.chatCommon}
        className="flex flex-grow flex-col overflow-auto px-[8px]"
        initialMessages={[]}
        onClick={model.enableChatInputMessage}
      />
      <ChatInput />
      {model.chatInputFactory(NO_MESSAGE_ID_AGENT_CHAT_INPUT).uppy
        .isDragging && <Mask />}
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
      <div className="display-md-emphasized mt-[12px] text-center text-Cr-text-default-v2">
        Add any content
      </div>
      <div className="text-sm-regular mt-[4px] text-center">
        Drag and drop any file here to add it to the conversation.
      </div>
    </div>
  );
};
