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
  <Slot.Root className="border-border-default-light bg-surface-container-special-subtle-light">
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

  const timeout = 400;
  const [{ status, isMounted }, toggle] = useTransitionState({
    timeout,
    mountOnEnter: true,
    unmountOnExit: true,
    preEnter: true,
    // TODO: 更细腻的 timeline 得用 GSAP 了
    // onStateChange: (ev) => {
    //   if (ev.current.isMounted) {
    //     model.setIsAnimatingInputFocus(true);
    //   } else {
    //     model.setIsAnimatingInputFocus(false);
    //   }
    // },
  });
  console.log(status);
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
      <Wrapper>
        <div className="relative z-10 rounded-4xl">
          <div className="p-spacing-lg">{children}</div>
        </div>
      </Wrapper>

      {isMounted &&
        createPortal(
          <div
            style={{
              // 使用 inline style 是为了和 react transition-state 的 transitionDuration 保持一致
              transitionDuration: timeout + 'ms',
            }}
            className={cn(
              `fixed bottom-[26px] w-full px-spacing-md transition-all`,
              {
                'translate-y-full opacity-0':
                  status === 'preEnter' ||
                  status === 'unmounted' ||
                  status === 'exiting',

                'translate-y-0 opacity-100':
                  status === 'entering' || status === 'entered',
              },
            )}
          >
            <Wrapper>
              <div
                className={cn(
                  // 26px 是 chat input + actions 的高度 52px 的一半，目的是 border radius 视觉上统一
                  // TODO 去除 magic number 处理这种 直接用 style + const 好一点
                  'rounded-tl-4xl rounded-tr-4xl px-spacing-lg pb-[26px]',
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
            </Wrapper>
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
