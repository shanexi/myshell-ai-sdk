import { cn, useInjection } from '@myshell-run/ui-primitives';
import * as Slot from '@radix-ui/react-slot';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { ChatInputActions } from './chat-input/chat-input-actions';
import { ChatTextArea } from './chat-input/chat-textarea';
import { ChatUploadArea } from './chat-input/chat-upload-area';
import { ChatModel } from './chat.model';

export const ChatInput = observer<{ placeholder?: string }>(
  ({ placeholder }) => {
    return (
      <ChatInputRoot>
        <ChatInputActions placeholder={placeholder} />
      </ChatInputRoot>
    );
  },
);

export const BgClz: React.FC<PropsWithChildren> = ({ children }) => (
  <Slot.Root className="border-border-default-light bg-surface-container-special-subtle-light">
    <Slot.Slottable>{children}</Slot.Slottable>
  </Slot.Root>
);

export const ChatInputRoot = observer<PropsWithChildren>(({ children }) => {
  const model = useInjection(ChatModel);
  const containerRef = useDetectClickOutside({
    onTriggered: () => {
      // model.setInputFocus(false);
    },
  });

  return (
    <div ref={containerRef} className="absolute bottom-0 mb-2 w-full">
      <BgClz>
        <div
          // border-radius 会触发 re paint
          // https://blog.coolhead.in/css-animation-performance-cheatsheet?showSharer=true
          // FIXME 比较好的做法是 transform 一块图出来，但是增加 composite layer 是不是也很费性能
          className={cn(
            'relative z-10 mx-[8px]',
            'transition-border-radius duration-400 ease-in-out',
            {
              'rounded-4xl': !model.isInputFocus,
              'rounded-br-4xl rounded-bl-4xl': model.isInputFocus,
            },
          )}
        >
          <div className="p-spacing-lg">{children}</div>
        </div>
      </BgClz>
      <ChatUploadArea />
      <ChatTextArea />
    </div>
  );
});
