import { AlignJustify, CirclePlus } from 'lucide-react';
import { ReactComponent as Audio } from './audio.svg';

export function ChatInput() {
  return (
    <div className="mx-[8px] my-spacing-md">
      <label className="input w-full rounded-4xl border-border-default-light focus-within:ring-0 focus-within:outline-none focus:ring-0 focus:outline-none">
        <AlignJustify className="text-text-brand-light" />
        <CirclePlus className="text-text-brand-light" />
        <input type="search" className="grow" placeholder="Write a message" />
        <Audio />
      </label>
    </div>
  );
}
