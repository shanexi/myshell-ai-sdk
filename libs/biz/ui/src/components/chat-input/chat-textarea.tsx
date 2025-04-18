import { cn, useInjection } from '@myshell-run/ui-primitives';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Wrapper } from '../chat-input-re';
import { ChatModel } from '../chat.model';
import { useTransitionState } from 'react-transition-state';

// 这个 6px 是 parent element 比 children elements (目前只有textarea) 多出的 6px
// 原因不明
const UNKNOWN_6px = '6px';

export interface MyMotionRef {
  toggle: (toEnter?: boolean) => void;
}

export const MyMotion = forwardRef<MyMotionRef, PropsWithChildren>(
  ({ children }, ref) => {
    const timeout = 400;
    const [{ status, isMounted }, toggle] = useTransitionState({
      timeout,
      mountOnEnter: true,
      unmountOnExit: true,
      preEnter: true,
    });

    useImperativeHandle(ref, () => ({
      toggle,
    }));

    if (!isMounted) return null;

    return (
      <div
        style={{
          transitionDuration: `${timeout}ms`,
        }}
        className={cn(
          `absolute w-full px-2 transition-[translate,opacity] ease-in-out`,
          'top-0',
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
        {children}
      </div>
    );
  },
);

export const ChatTextArea = observer(() => {
  const model = useInjection(ChatModel);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const myMotionRef = useRef<MyMotionRef>(null);

  useEffect(() => {
    const disposer = reaction(
      () => model.isInputFocus,
      (isInputFocus) => {
        if (isInputFocus) {
          myMotionRef.current?.toggle(true);
          setTimeout(() => {
            textareaRef.current?.focus();
            textareaRef.current?.setSelectionRange(
              model.inputText.length,
              model.inputText.length,
            );
          });
        } else {
          myMotionRef.current?.toggle(false);
        }
      },
    );
    return () => disposer();
  }, []);

  return (
    <MyMotion ref={myMotionRef}>
      <Wrapper>
        <TextareaAutosize
          className="text-sm-regular w-full resize-none px-spacing-lg outline-none"
          ref={textareaRef}
          maxRows={8}
          value={model.inputText}
          onChange={(e) => model.setInputText(e.target.value)}
        />
      </Wrapper>
    </MyMotion>
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
