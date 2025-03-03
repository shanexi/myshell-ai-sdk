import { ReactComponent as Search } from './search.svg';
import { Energy } from '@myshell-run/ui';
import * as Portals from '@ionic/portals';

export function App() {
  // return (
  //   <button
  //     onClick={() => {
  //       Portals.publish({ topic: 'nav-to-chat', data: null });
  //     }}
  //   >
  //     Bot Item - Nav to Chat
  //   </button>
  // );
  return (
    <div>
      <div className="flex w-full items-center justify-between pt-spacing-2xl pr-spacing-xl pb-spacing-xs pl-spacing-xl">
        <div className="display-md-emphasized text-text-default-light">
          Chat
        </div>
        <Energy />
      </div>

      <div className="px-spacing-xl py-spacing-md">
        <label className="input w-full rounded-full">
          <Search />
          <input type="search" required placeholder="Search" />
        </label>
      </div>

      <ul className="list rounded-box bg-base-100 shadow-md">
        <li className="p-4 pb-2 text-xs tracking-wide opacity-60">Popular</li>

        <li
          className="list-row"
          onClick={() => {
            Portals.publish({ topic: 'nav-to-chat', data: null });
          }}
        >
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
