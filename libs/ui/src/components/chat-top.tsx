import { ReactComponent as ArrowLeft } from './arrow-left.svg';
import { ReactComponent as Ellipsis } from './ellipsis.svg';
import { ChatTopTab } from './chat-top-tab';

export function ChatTop() {
  return (
    <div className="flex items-center justify-between px-spacing-md py-[10px]">
      <ArrowLeft />
      <ChatTopTab />
      <Ellipsis />
    </div>
  );
}
