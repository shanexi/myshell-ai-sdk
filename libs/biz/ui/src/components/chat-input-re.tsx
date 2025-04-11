import { useInjection } from '@myshell-run/ui-primitives';
import { AlignJustify, CirclePlus } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { ReactComponent as Audio } from './audio.svg';
import { ChatModel } from './chat.model';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { reaction } from 'mobx';

export const ChatInput = observer<{ placeholder?: string }>(
  ({ placeholder }) => {
    const model = useInjection(ChatModel);
    const ref = useRef<HTMLTextAreaElement>(null);

    // mobx 就不依赖 useEffect deps， 使用 mobx 自带的 reaction
    useEffect(() => {
      const disposer = reaction(
        () => model.isInputFocus,
        (isInputFocus) => {
          if (isInputFocus) {
            setTimeout(() => {
              ref.current?.focus();
            }); // 先让 input blur 再 textarea focus
          }
        },
      );
      return () => disposer();
    }, []);

    return (
      <ChatInputRoot>
        {model.isInputFocus && (
          <TextareaAutosize
            placeholder={placeholder}
            ref={ref}
            maxRows={8}
            className="text-sm-regular w-full resize-none outline-none"
            value={model.inputText}
            onChange={(e) => model.setInputText(e.target.value)}
          />
        )}
        <ChatInputActions placeholder={placeholder} />
      </ChatInputRoot>
    );
  },
);

export const ChatInputRoot = observer<PropsWithChildren>(({ children }) => {
  const model = useInjection(ChatModel);
  const ref = useDetectClickOutside({
    onTriggered: () => {
      model.setInputFocus(false);
    },
  });
  return (
    <div ref={ref} className="mx-[8px]">
      <div className="rounded-4xl border-border-default-light bg-surface-container-special-subtle-light">
        {model.isInputFocus && <ChatInputHandlebar />}
        <div className="p-spacing-lg">{children}</div>
      </div>
    </div>
  );
});

export const ChatInputHandlebar = () => {
  return (
    <div className="flex justify-center pt-spacing-md">
      <div className="w-[44px] rounded-full border-2 border-border-hovered-light"></div>
    </div>
  );
};

export const ChatInputActions = observer<{ placeholder?: string }>(
  ({ placeholder }) => {
    const model = useInjection(ChatModel);
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
      const disposer = reaction(
        () => model.isInputFocus,
        (isInputFocus) => {
          if (isInputFocus) {
            ref.current?.blur();
          }
        },
      );
      return () => disposer();
    }, []);
    return (
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center">
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
            ref={ref}
            className="text-sm-regular mx-spacing-sm w-full caret-transparent outline-none"
            placeholder={model.isNotInputFocus ? placeholder : ''}
            onClick={(e) => {
              model.setInputFocus(true);
            }}
          ></input>
        </div>
        <Audio className="" />
      </div>
    );
  },
);
