import { AlignJustify, CirclePlus } from 'lucide-react';
import { ReactComponent as Audio } from './audio.svg';
import { ReactComponent as Send } from './send.svg';
import { ReactComponent as Clear } from './clear.svg';
import { ReactComponent as Trash } from './trash.svg';
import { MenuTrigger } from 'react-aria-components';
import {
  Button,
  Menu,
  MenuItem,
} from '@myshell-run/react-aria-tailwind-starter';
import { useInjection } from '@myshell-run/ui-primitives';
import { ChatModel } from './chat.model';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

export const ChatInputMenu = () => {
  return (
    <MenuTrigger>
      <Button
        variant="icon"
        className="x-custom-react-aria-Button data-hovered:bg-transparent"
        // 指定 id 否则 hydrate 会报错
        id={'chat-input-menu-btn'}
      >
        <AlignJustify className="text-text-brand-light" />
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
    <div className="mx-[8px] my-spacing-md">
      <div className="input w-full rounded-4xl border-border-default-light focus-within:ring-0 focus-within:outline-none focus:ring-0 focus:outline-none">
        {children}
      </div>
    </div>
  );
}

export const ChatInput = observer(() => {
  const model = useInjection(ChatModel);
  return (
    <ChatInputRoot>
      {model.isShowInputMenu && <ChatInputMenu />}
      <ChatInputText />
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

export function ChatInputFile() {
  return (
    <div className="flex h-[24px] w-[24px] flex-none items-center justify-center">
      <CirclePlus className="text-text-brand-light" size={24} />
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
    <div className="flex h-[28px] w-[28px] flex-none items-center justify-center rounded-full bg-icon-brand-light">
      <Send />
    </div>
  );
}

export const ChatInputText = observer(() => {
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
      className="grow [&::-webkit-search-cancel-button]:hidden"
      placeholder="Write a message"
      value={model.inputText}
      onChange={(e) => model.setInputText(e.target.value)}
    />
  );
});
