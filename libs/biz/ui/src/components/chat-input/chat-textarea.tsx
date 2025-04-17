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
    // isMounted &&
    <div
      style={{
        // 使用 inline style 是为了和 react transition-state 的 transitionDuration 保持一致
        transitionDuration: timeout + 'ms',
      }}
      className={cn(`absolute bottom-[26px] w-full transition-all`, {
        // 'translate-y-full opacity-0':
        //   status === 'preEnter' ||
        //   status === 'unmounted' ||
        //   status === 'exiting',
        // 'translate-y-0 opacity-100':
        //   status === 'entering' || status === 'entered',
      })}
    >
      <ChatInputHandlebar />
      <Wrapper>
        <TextareaAutosize
          className="text-sm-regular mx-[8px] box-border w-full resize-none px-spacing-lg outline-none"
          ref={textareaRef}
          maxRows={8}
          value={model.inputText}
          onChange={(e) => model.setInputText(e.target.value)}
        />
      </Wrapper>
    </div>
  );
});

export const ChatInputHandlebar = () => {
  return (
    <Wrapper>
      {/* absolute top-0 -translate-y-full 永远在上方 像个屋顶 */}
      <div className="absolute top-0 flex w-full -translate-y-full justify-center pt-spacing-md pb-spacing-lg">
        <div className="w-[44px] rounded-full border-2 border-border-hovered-light"></div>
      </div>
    </Wrapper>
  );
};
