import { observer } from 'mobx-react-lite';
import { action, makeObservable, observable } from 'mobx';
class CounterStore {
  count = 0;
  constructor() {
    makeObservable(this, {
      count: observable,
      increment: action,
    });
  }
  increment = () => {
    this.count++;
  };
}
const store = new CounterStore();

export const Counter = observer(() => {
  return (
    <div>
      <p className="py-2 text-2xl">{store.count}</p>
      <button
        className="cursor-pointer rounded bg-orange-400 px-4 py-2 text-white"
        onClick={() => store.increment()}
      >
        Increment
      </button>
    </div>
  );
});
