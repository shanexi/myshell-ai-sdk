import { observer } from 'mobx-react-lite';
import { container } from './container';
import { CounterModel } from './counter.model';
import { InversifyProvider, useInjection } from './inversify-context';

export const Counter1 = observer(() => {
  const store = useInjection(CounterModel);
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

export const Counter = () => {
  return (
    <InversifyProvider container={container}>
      <Counter1 />
    </InversifyProvider>
  );
};
