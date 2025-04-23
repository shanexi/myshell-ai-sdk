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
import { motion, AnimatePresence } from 'motion/react';

export const ChatInputMenu = (props: { className?: string }) => {
  const { className } = props;
  return (
    <MenuTrigger>
      <Button
        variant="icon"
        className={cn(
          'x-custom-react-aria-Button z-10 bg-surface-container-special-subtle-light data-hovered:bg-transparent',
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

export function ChatInputRoot(props: { children?: React.ReactNode }) {
  const { children } = props;
  return (
    <div className="mx-[8px] my-spacing-md">
      <div className="input w-full rounded-4xl border-border-default-light bg-surface-container-special-subtle-light focus-within:ring-0 focus-within:outline-none focus:ring-0 focus:outline-none">
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

  console.log('model.isShowInputMenu', model.isShowInputMenu);
  return (
    <div className="relative flex min-h-[36px] flex-1 items-center">
      <AnimatePresence>
        {model.isShowInputMenu && (
          <motion.div
            layout
            initial={{ opacity: 1, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{
              opacity: { duration: 0 },
              width: { duration: 0.3 },
            }}
          >
            <ChatInputMenu />
          </motion.div>
        )}
      </AnimatePresence>
      <ChatInputText />
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
