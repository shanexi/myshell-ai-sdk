import { ArrowLeft, Ellipsis, Star, Settings } from 'lucide-react';
import { ChatTopTab } from './chat-top-tab';
import { MenuTrigger } from 'react-aria-components';
import {
  Button,
  Menu,
  MenuItem,
} from '@myshell-run/react-aria-tailwind-starter';

export function ChatTop() {
  return (
    <div className="flex items-center justify-between px-spacing-md py-[10px]">
      <ArrowLeft className="text-text-brand-light" />
      <ChatTopTab />
      <MenuTrigger>
        <Button variant="icon" className="rounded-full p-spacing-xs">
          <Ellipsis className="text-text-brand-light" />
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
    </div>
  );
}
