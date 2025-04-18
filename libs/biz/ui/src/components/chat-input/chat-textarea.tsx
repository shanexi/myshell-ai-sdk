import { cn, useInjection } from '@myshell-run/ui-primitives';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useTransitionState } from 'react-transition-state';
import { Wrapper } from '../chat-input-re';
import { ChatModel } from '../chat.model';

// 这个 6px 是 parent element 比 children elements (目前只有textarea) 多出的 6px
// 原因不明
const UNKNOWN_6px = '6px';

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
          // `setTimeout` 先让 input blur 再 textarea focus
          setTimeout(() => {
            textareaRef.current?.focus();
            textareaRef.current?.setSelectionRange(
              model.inputText.length,
              model.inputText.length,
            );
          });
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
            [`-translate-y-[calc(100%-${UNKNOWN_6px})]`]:
              status === 'entering' || status === 'entered',
          },
        )}
      >
        <ChatInputHandlebar />
        <Wrapper>
          <TextareaAutosize
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

export const ChatInputHandlebar: React.FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <Wrapper>
      <div
        className={cn(
          'flex justify-center rounded-tl-4xl rounded-tr-4xl pt-spacing-md pb-spacing-lg',
          'absolute top-0 -translate-y-full', // 永远在上方 像个屋顶
          'right-0 left-0 mx-2', // 针对 absolute 的元素，比 w-full 更好，w-full 会需要配合 box-border 总是搞不出来
          className,
        )}
      >
        <div className="w-[44px] rounded-full border-2 border-border-hovered-light"></div>
      </div>
    </Wrapper>
  );
};
