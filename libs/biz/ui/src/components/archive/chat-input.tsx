import {
  Button,
  Menu,
  MenuItem,
} from '@myshell-run/react-aria-tailwind-starter';
import { cn, useInjection } from '@myshell-run/ui-primitives';
import { AlignJustify, CirclePlus } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { MenuTrigger } from 'react-aria-components';
import { ReactComponent as Audio } from '../audio.svg';
import { ChatModel } from '../chat.model';
import { ReactComponent as Clear } from '../clear.svg';
import { ReactComponent as Send } from '../send.svg';
import { ReactComponent as Trash } from '../trash.svg';

export const ChatInputMenu = (props: { className?: string }) => {
  const { className } = props;
  return (
    <MenuTrigger>
      <Button
        variant="icon"
        className={cn(
          'x-custom-react-aria-Button z-10 data-hovered:bg-transparent',
          className,
        )}
        // 指定 id 否则 hydrate 会报错
        id={'chat-input-menu-btn'}
      >
        <AlignJustify strokeWidth={1.5} className="text-text-brand-light-v1" />
      </Button>
      <Menu>
        <MenuItem id="clear">
          <Clear className="h-5 w-5" />
          Clear Memory
        </MenuItem>
        <MenuItem id="delete">
          <Trash className="h-5 w-5" />
          Delete Chat History
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
};

export function ChatInputRoot(props: { children?: React.ReactNode }) {
  const { children } = props;
  return (
    <div className="mx-[8px] my-spacing-md-v1">
      <div className="input w-full rounded-4xl-v1 border-border-default-light-v1 bg-surface-container-special-subtle-light-v1 focus-within:ring-0 focus-within:outline-none focus:ring-0 focus:outline-none">
        {children}
      </div>
    </div>
  );
}

export const ChatInput = observer(() => {
  const model = useInjection(ChatModel);
  return (
    <ChatInputRoot>
      <AnimatedChatInputMenu />
      {model.notHaveInputText ? (
        <>
          <ChatInputAudio />
          <ChatInputFile />
        </>
      ) : (
        <ChatInputSend />
      )}
    </ChatInputRoot>
  );
});

export const AnimatedChatInputMenu = observer(() => {
  const model = useInjection(ChatModel);
  return (
    <div className="relative flex min-h-[36px] flex-1 items-center">
      {model.isShowInputMenu && <ChatInputMenu />}
      <ChatInputText />
    </div>
  );
});

export function ChatInputFile() {
  return (
    <div className="flex h-[24px] w-[24px] flex-none items-center justify-center">
      <CirclePlus
        strokeWidth={1.5}
        className="text-text-brand-light-v1"
        size={24}
      />
    </div>
  );
}

export function ChatInputAudio() {
  return (
    <div className="flex h-[22px] w-[22px] flex-none items-center justify-center">
      <Audio className="h-full w-full" />
    </div>
  );
}

export function ChatInputSend() {
  return (
    <div className="flex h-[28px] w-[28px] flex-none items-center justify-center rounded-full-v1 bg-icon-brand-light-v1">
      <Send />
    </div>
  );
}

export const ChatInputText = observer((props: { className?: string }) => {
  const { className } = props;
  const model = useInjection(ChatModel);
  return (
    <input
      onFocus={(e) => {
        model.setInputFocus(true);
      }}
      onBlur={(e) => {
        model.setInputFocus(false);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          model.sendText();
        }
      }}
      type="search"
      className={cn('[&::-webkit-search-cancel-button]:hidden', className)}
      placeholder="Write a message"
      value={model.inputText}
      onChange={(e) => model.setInputText(e.target.value)}
    />
  );
});
