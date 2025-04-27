import {
  Button,
  Menu,
  MenuItem,
} from '@myshell-run/react-aria-tailwind-starter';
import { cn, useInjection } from '@myshell-run/ui-primitives';
import { AlignJustify, CirclePlus } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { MenuTrigger } from 'react-aria-components';
import { ReactComponent as Audio } from './audio.svg';
import { ChatModel } from './chat.model';
import { ReactComponent as Clear } from './clear.svg';
import { ReactComponent as Send } from './send.svg';
import { ReactComponent as Trash } from './trash.svg';
import TextareaAutosize from 'react-textarea-autosize';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

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
        <AlignJustify strokeWidth={1.5} className="text-text-brand-light" />
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

export const ChatTextarea = observer(() => {
  const model = useInjection(ChatModel);
  // TextareaAutosize 有 bug，SSR 传 value 会报错（其实是 warning 但是 react 通过 error 抛出了）
  // Use the `defaultValue` or `value` props instead of setting children on <textarea>.
  // 先通过 two-pass rendering 规避
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <TextareaAutosize
      className={cn(
        'text-sm-regular w-full rounded-t-4xl px-[16px] pt-spacing-md',
        'resize-none outline-none',
        'border-border-default-light bg-surface-container-special-subtle-light',
      )}
      maxRows={8}
      placeholder="Write a message"
      {...(isClient
        ? {
            value: model.inputText,
            onChange: (e) => model.setInputText(e.target.value),
          }
        : {})}
    />
  );
});

export const ChatUploadArea = observer(() => {
  return (
    <div
      className={cn(
        'flex px-spacing-lg py-spacing-sm',
        'bg-surface-container-special-subtle-light',
      )}
    >
      <Image />
    </div>
  );
});

export const Image = () => {
  return (
    <div className="relative">
      <img
        className={cn('h-[64px] w-[64px] rounded-xl')}
        alt=""
        src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
      />
      <div
        className={cn(
          'absolute top-[-6px] right-[-6px]',
          'h-[20px] w-[20px] rounded-full',
          'bg-text-subtler-light',
          'flex items-center justify-center',
        )}
      >
        <X color="#fff" size={16} />
      </div>
    </div>
  );
};

export const ChatInput = observer(() => {
  const model = useInjection(ChatModel);
  return (
    <div className="mx-[8px] my-spacing-md flex flex-col">
      <ChatTextarea />
      <ChatUploadArea />
      <div
        className={cn(
          'flex items-center rounded-b-4xl px-spacing-lg pb-spacing-md',
          'border-border-default-light bg-surface-container-special-subtle-light',
        )}
      >
        <div className="relative flex min-h-[36px] flex-1 items-center">
          <ChatInputMenu />
          <ChatInputFile />
        </div>
        {model.notHaveInputText ? <ChatInputAudio /> : <ChatInputSend />}
      </div>
    </div>
  );
});

export function ChatInputFile() {
  return (
    <div className="flex h-[24px] w-[24px] flex-none items-center justify-center">
      <CirclePlus
        strokeWidth={1.5}
        className="text-text-brand-light"
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
    <div className="flex h-[28px] w-[28px] flex-none items-center justify-center rounded-full bg-icon-brand-light">
      <Send />
    </div>
  );
}
