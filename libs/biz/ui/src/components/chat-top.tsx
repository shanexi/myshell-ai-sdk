import { ArrowLeft, Ellipsis, Star, Settings } from 'lucide-react';
import { ChatTopTab } from './chat-top-tab';
import { MenuTrigger } from 'react-aria-components';
import {
  Button,
  Menu,
  MenuItem,
} from '@myshell-run/react-aria-tailwind-starter';

export const ChatTopMenu = () => {
  return (
    <MenuTrigger>
      <Button variant="icon" className="rounded-full-v1 p-spacing-xs-v1">
        <Ellipsis className="text-text-brand-light-v1" />
      </Button>
      <Menu>
        <MenuItem id="new">
          <Star className="h-5 w-5" />
          Favorite
        </MenuItem>
        <MenuItem id="open">
          <Settings className="h-5 w-5" />
          Chat Settings
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
};

export function ChatTopRoot(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <div className="flex items-center justify-between px-spacing-md-v1 py-[10px]">
      <a href="/bots">
        <ArrowLeft className="text-text-brand-light-v1" />
      </a>
      <ChatTopTab />
      {children}
    </div>
  );
}
