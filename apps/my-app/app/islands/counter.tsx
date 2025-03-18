import { observer } from 'mobx-react-lite';
import { container } from './container';
import { CounterModel } from './counter.model';

export const Counter = observer(() => {
  const store = container.get(CounterModel);
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
