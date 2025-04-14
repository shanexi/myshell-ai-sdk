import { cn, useInjection } from '@myshell-run/ui-primitives';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import TextareaAutosize from 'react-textarea-autosize';
import { useTransitionState } from 'react-transition-state';
import { ChatModel } from './chat.model';
import { ChatInputActions } from './chat-input/chat-input-actions';
import { createPortal } from 'react-dom';
import * as Slot from '@radix-ui/react-slot';

export const ChatInput = observer<{ placeholder?: string }>(
  ({ placeholder }) => {
    return (
      <ChatInputRoot>
        <ChatInputActions placeholder={placeholder} />
      </ChatInputRoot>
    );
  },
);

export const Wrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <Slot.Root className="rounded-4xl border-border-default-light bg-surface-container-special-subtle-light">
    <Slot.Slottable>{children}</Slot.Slottable>
  </Slot.Root>
);

export const ChatInputRoot = observer<PropsWithChildren>(({ children }) => {
  const model = useInjection(ChatModel);
  const containerRef = useDetectClickOutside({
    onTriggered: () => {
      model.setInputFocus(false);
    },
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [{ status, isMounted }, toggle] = useTransitionState({
    timeout: 500,
    mountOnEnter: true,
    unmountOnExit: true,
    preEnter: true,
    onStateChange: (ev) => {
      if (ev.current.isMounted) {
        model.setIsAnimatingInputFocus(true);
      } else {
        model.setIsAnimatingInputFocus(false);
      }
    },
  });

  // mobx 就不依赖 useEffect deps， 使用 mobx 自带的 reaction
  useEffect(() => {
    const disposer = reaction(
      () => model.isInputFocus,
      (isInputFocus) => {
        if (isInputFocus) {
          toggle(true);
          setTimeout(() => {
            textareaRef.current?.focus();
          }); // 先让 input blur 再 textarea focus
        } else {
          toggle(false);
        }
      },
    );
    return () => disposer();
  }, [toggle]);

  return (
    <div ref={containerRef} className="relative mx-[8px]">
      <div className="relative z-10 chat-input-base">
        <div className="p-spacing-lg">{children}</div>
      </div>

      {createPortal(
        <div className="w-full px-[8px]">
          <div
            className={cn(
              'fixed bottom-[26px] w-full chat-input-base px-spacing-lg pb-[26px] transition-all',
              {
                'translate-y-full opacity-0':
                  status === 'preEnter' ||
                  status === 'exiting' ||
                  status === 'unmounted',

                'translate-y-0 opacity-100':
                  status === 'entering' || status === 'entered',
              },
            )}
          >
            <ChatInputHandlebar />
            <TextareaAutosize
              className="text-sm-regular w-full resize-none outline-none"
              ref={textareaRef}
              maxRows={8}
              value={model.inputText}
              onChange={(e) => model.setInputText(e.target.value)}
            />
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
});

export const ChatInputHandlebar = () => {
  return (
    <div className="flex justify-center pt-spacing-md pb-spacing-lg">
      <div className="w-[44px] rounded-full border-2 border-border-hovered-light"></div>
    </div>
  );
};
