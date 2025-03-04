import { create } from 'zustand';
import {
  BearSlice,
  createBearSlice,
  createFishSlice,
  createSharedSlice,
  FishSlice,
  SharedSlice,
} from './zustand-simple.slice';
import { computed } from 'zustand-computed-state';
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';

export const useBoundStoreBase = create<BearSlice & FishSlice & SharedSlice>(
  computed((...a) => ({
    ...createBearSlice(...a),
    ...createFishSlice(...a),
    ...createSharedSlice(...a),
  })),
);

const useBoundStore = createSelectorFunctions(useBoundStoreBase);

function BearCounter() {
  const { bears, fishes, ySq } = useBoundStore.use;
  return (
    <div>
      <div>{bears()} bears around here...</div>
      <div>{fishes()} fishes around here...</div>
      <div>{ySq()} ySq around here...</div>
    </div>
  );
}

function AddBear() {
  return <button onClick={useBoundStore.use.addBear()}>add bear</button>;
}

function AddFish() {
  return <button onClick={useBoundStore.use.addFish()}>add fish</button>;
}

function AddBoth() {
  return <button onClick={useBoundStore.use.addBoth()}>add both</button>;
}

function EatFish() {
  return <button onClick={useBoundStore.use.eatFish()}>eat fish</button>;
}

export function SimpleAuto() {
  return (
    <div>
      <h1>Zustand simple auto-zustand-selectors-hook!</h1>
      <BearCounter />
      <AddBear />
      <EatFish />
      <AddFish />
      <AddBoth />
    </div>
  );
}

export default SimpleAuto;
