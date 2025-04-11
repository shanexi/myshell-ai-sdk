import { cn, useInjection } from '@myshell-run/ui-primitives';
import { AlignJustify, CirclePlus } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { ReactComponent as Audio } from './audio.svg';
import { computeTextareaRows } from './chat-input.utils';
import { ChatModel } from './chat.model';
import TextareaAutosize from 'react-textarea-autosize';

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
        <ChatTextareaHandleBar />
        <div className="p-spacing-lg">{children}</div>
      </div>
    </div>
  );
};

export const ChatTextareaHandleBar = () => {
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

export const ChatTextarea: React.FC<{
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}> = ({ placeholder, value, onChange, className }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const [rows, setRows] = useState(1);

  const adjustHeight = () => {
    if (!textareaRef.current || !parentRef.current) return;

    const { newRows, shouldScrollToBottom } = computeTextareaRows(
      textareaRef.current,
      parentRef.current,
    );

    setRows(newRows);

    // Scroll to bottom if content exceeds parent height
    if (shouldScrollToBottom) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (!parentRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      adjustHeight();
    });
    resizeObserver.observe(parentRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={parentRef}
      className={cn('relative h-full w-full overflow-hidden', className)}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          adjustHeight();
        }}
        placeholder={placeholder}
        rows={rows}
        className="box-border w-full resize-none overflow-auto focus:outline-none"
      />
    </div>
  );
};
