import { cn, useInjection } from '@myshell-run/ui-primitives';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useTransitionState } from 'react-transition-state';
import { Wrapper } from '../chat-input-re';
import { ChatModel } from '../chat.model';

export const ChatTextArea = observer(() => {
  const model = useInjection(ChatModel);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const timeout = 400;
  const [{ status, isMounted }, toggle] = useTransitionState({
    timeout,
    mountOnEnter: true,
    unmountOnExit: true,
    preEnter: true,
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
    isMounted && (
      <div
        style={{
          // 使用 inline style 是为了和 react transition-state 的 transitionDuration 保持一致
          transitionDuration: timeout + 'ms',
        }}
        className={cn(
          `absolute w-full px-2 transition-[translate,opacity]`,
          'top-0', // 8px 是 containerRef mb-2
          {
            'opacity-0':
              status === 'preEnter' ||
              status === 'unmounted' ||
              status === 'exiting',
            '-translate-y-[calc(100%-8px)] opacity-100':
              status === 'entering' || status === 'entered',
          },
        )}
      >
        <ChatInputHandlebar />
        <Wrapper>
          <TextareaAutosize
            onHeightChange={(height, meta) => {
              console.log('height', height);
              console.log('meta', meta);
            }}
            className="text-sm-regular w-full resize-none px-spacing-lg outline-none"
            ref={textareaRef}
            maxRows={8}
            value={model.inputText}
            onChange={(e) => model.setInputText(e.target.value)}
          />
        </Wrapper>
      </div>
    )
  );
});

export const ChatInputHandlebar = () => {
  return (
    <Wrapper>
      <div
        className={cn(
          'flex justify-center rounded-tl-4xl rounded-tr-4xl pt-spacing-md pb-spacing-lg',
          'absolute top-0 -translate-y-full', // 永远在上方 像个屋顶
          'right-0 left-0 mx-2', // 针对 absolute 的元素，比 w-full 更好，w-full 会需要配合 box-border 总是搞不出来
        )}
      >
        <div className="w-[44px] rounded-full border-2 border-border-hovered-light"></div>
      </div>
    </Wrapper>
  );
};
