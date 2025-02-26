import { ReactComponent as Search } from './search.svg';
import { ReactComponent as Zap } from './zap.svg';

export function App() {
  return (
    <div>
      <div className="flex w-full items-center justify-between pt-spacing-2xl pr-spacing-xl pb-spacing-xs pl-spacing-xl">
        <div className="display-md-emphasized text-text-default-light">
          Chat
        </div>
        <div className="flex items-center">
          <div className="rounded-md border border-surface-lemon-default-light bg-surface-default-light p-[1.81px]">
            <Zap />
          </div>
          <div className="relative left-[-1px] -z-10 inline-flex h-5 items-center justify-center gap-2.5 overflow-hidden rounded-r-md border-t border-r border-b border-surface-lemon-default-light bg-linear-[90deg,var(--color-surface-lemon-default-light)_32%,var(--color-surface-lemon-subtle-light)_32%,var(--color-surface-lemon-subtle-light)] px-2.5 py-2.5">
            <div className="font-['Mona Sans'] text-center text-xs leading-none font-medium text-surface-lemon-bold-light">
              32/100
            </div>
          </div>
        </div>
      </div>

      <div className="px-spacing-xl py-spacing-md">
        <label className="input w-full rounded-full">
          <Search />
          <input type="search" required placeholder="Search" />
        </label>
      </div>

      <ul className="list rounded-box bg-base-100 shadow-md">
        <li className="p-4 pb-2 text-xs tracking-wide opacity-60">Popular</li>

        <li className="list-row">
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/1@94.webp"
            />
          </div>
          <div>
            <div>Samantha</div>
            <div className="text-xs font-semibold uppercase opacity-60">
              Hey there, not much is up on my end, just hanging out. How about
              you?
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;
