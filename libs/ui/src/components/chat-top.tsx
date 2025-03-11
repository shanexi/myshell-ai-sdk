import { ArrowLeft, Ellipsis } from 'lucide-react';
import { ChatTopTab } from './chat-top-tab';

export function ChatTop() {
  return (
    <div className="flex items-center justify-between px-spacing-md py-[10px]">
      <ArrowLeft className="text-text-brand-light" />
      <ChatTopTab />
      <Ellipsis className="text-text-brand-light" />
    </div>
  );
}
