import { AlignJustify, CirclePlus } from 'lucide-react';
import { ReactComponent as Audio } from './audio.svg';
import { ReactComponent as Clear } from './clear.svg';
import { ReactComponent as Trash } from './trash.svg';
import { MenuTrigger } from 'react-aria-components';
import {
  Button,
  Menu,
  MenuItem,
} from '@myshell-run/react-aria-tailwind-starter';

export function ChatInput() {
  return (
    <div className="mx-[8px] my-spacing-md">
      <div className="input w-full rounded-4xl border-border-default-light focus-within:ring-0 focus-within:outline-none focus:ring-0 focus:outline-none">
        <MenuTrigger>
          <Button
            variant="icon"
            className="x-custom-react-aria-Button data-hovered:bg-transparent"
          >
            <AlignJustify className="text-text-brand-light" />
          </Button>
          <Menu>
            <MenuItem id="new">New…</MenuItem>
            <MenuItem id="open">Open…</MenuItem>
            <MenuItem id="save">Save</MenuItem>
            <MenuItem id="saveAs">Save as…</MenuItem>
            <MenuItem id="print">Print…</MenuItem>
          </Menu>
        </MenuTrigger>
        <CirclePlus className="text-text-brand-light" />
        <input type="search" className="grow" placeholder="Write a message" />
        <Audio />
      </div>
    </div>
  );
}
