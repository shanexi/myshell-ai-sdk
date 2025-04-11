import { useInjection } from '@myshell-run/ui-primitives';
import { AlignJustify, CirclePlus } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { ReactComponent as Audio } from './audio.svg';
import { ChatModel } from './chat.model';

export const ChatInput = observer(() => {
  const model = useInjection(ChatModel);
  // TODO 给定高度
  return (
    <ChatInputRoot>
      <TextareaAutosize
        className="text-sm-regular w-full resize-none outline-none"
        value={model.inputText}
        onChange={(e) => model.setInputText(e.target.value)}
      />
      <ChatInputActions />
    </ChatInputRoot>
  );
});

export const ChatInputRoot: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="mx-[8px]">
      <div className="rounded-4xl border-border-default-light bg-surface-container-special-subtle-light">
        <ChatInputHandlebar />
        <div className="p-spacing-lg">{children}</div>
      </div>
    </div>
  );
};

export const ChatInputHandlebar = () => {
  return (
    <div className="flex justify-center pt-spacing-md">
      <div className="w-[44px] rounded-full border-2 border-border-hovered-light"></div>
    </div>
  );
};

export const ChatInputActions = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <AlignJustify
          strokeWidth={1.5}
          className="m-[2px] text-text-brand-light"
        />
        <CirclePlus
          strokeWidth={1.5}
          className="m-[2px] text-text-brand-light"
          size={24}
        />
        <input
          placeholder="Write a message"
          className="text-sm-regular mx-spacing-sm"
        ></input>
      </div>
      <Audio className="" />
    </div>
  );
};
