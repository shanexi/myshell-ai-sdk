import { cn, useInjection } from '@myshell-run/ui-primitives';
import { AlignJustify, CirclePlus } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { ReactComponent as Audio } from './audio.svg';
import { ChatModel } from './chat.model';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { reaction } from 'mobx';
import { useTransitionState } from 'react-transition-state';

export const ChatInput = observer<{ placeholder?: string }>(
  ({ placeholder }) => {
    const model = useInjection(ChatModel);
    const ref = useRef<HTMLTextAreaElement>(null);

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
              ref.current?.focus();
            }); // 先让 input blur 再 textarea focus
          } else {
            toggle(false);
          }
        },
      );
      return () => disposer();
    }, [toggle]);

    return (
      <ChatInputRoot>
        {isMounted && (
          <div
            className={cn('transition-height overflow-hidden duration-500', {
              'max-h-0': status === 'preEnter' || status === 'exiting',
              // TODO 等根据父容器调整 maxRows 之后要逻辑更新
              // 160 是 line-height (20) * maxRows (8)
              'max-h-[160px]': status === 'entering' || status === 'entered',
            })}
          >
            <TextareaAutosize
              className={cn('text-sm-regular w-full resize-none outline-none')}
              ref={ref}
              placeholder={placeholder}
              maxRows={8}
              value={model.inputText}
              onChange={(e) => model.setInputText(e.target.value)}
            />
          </div>
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
            readOnly
            value={model.isAnimatingInputFocus ? '' : model.inputText}
            placeholder={model.isAnimatingInputFocus ? '' : placeholder}
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
