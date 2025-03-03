import { ReactComponent as Action } from './action.svg';
import { ReactComponent as Plus } from './plus.svg';
import { ReactComponent as Audio } from './audio.svg';

export function ChatInput() {
  return (
    <label className="input rounded-4xl">
      <Action />
      <Plus />
      <input type="search" className="grow" placeholder="Write a message" />
      <Audio />
    </label>
  );
}
