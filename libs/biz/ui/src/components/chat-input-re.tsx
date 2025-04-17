import { useInjection } from '@myshell-run/ui-primitives';
import * as Slot from '@radix-ui/react-slot';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { ChatInputActions } from './chat-input/chat-input-actions';
import { ChatTextArea } from './chat-input/chat-textarea';
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

  return (
    <div ref={containerRef} className="relative mx-[8px] mb-2">
      <Wrapper>
        <div className="relative z-20 rounded-4xl">
          <div className="p-spacing-lg">{children}</div>
        </div>
      </Wrapper>
      {/* 遮住 input 底部一半背景色，这样后面的层 translate Y 的时候会遮挡住底部 */}
      <div className="absolute bottom-0 z-10 h-[26px] w-full bg-surface-default-light"></div>
      <ChatTextArea />
    </div>
  );
});
