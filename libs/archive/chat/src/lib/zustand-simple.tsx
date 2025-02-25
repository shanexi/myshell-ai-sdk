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

export const useBoundStore = create<BearSlice & FishSlice & SharedSlice>(
  computed((...a) => ({
    ...createBearSlice(...a),
    ...createFishSlice(...a),
    ...createSharedSlice(...a),
  }))
);

function BearCounter() {
  const { bears, fishes, ySq } = useBoundStore((state) => ({
    bears: state.bears,
    fishes: state.fishes,
    ySq: state.ySq,
  }));
  return (
    <div>
      <div>{bears} bears around here...</div>
      <div>{fishes} fishes around here...</div>
      <div>{ySq} ySq around here...</div>
    </div>
  );
}

function AddBear() {
  const addBear = useBoundStore((state) => state.addBear);
  return <button onClick={addBear}>add bear</button>;
}

function AddFish() {
  const addFish = useBoundStore((state) => state.addFish);
  return <button onClick={addFish}>add fish</button>;
}

function AddBoth() {
  const addBoth = useBoundStore((state) => state.addBoth);
  return <button onClick={addBoth}>add both</button>;
}

function EatFish() {
  const eatFish = useBoundStore((state) => state.eatFish);
  return <button onClick={eatFish}>eat fish</button>;
}

export function Simple() {
  return (
    <div>
      <h1>Zustand simple!</h1>
      <BearCounter />
      <AddBear />
      <EatFish />
      <AddFish />
      <AddBoth />
    </div>
  );
}

export default Simple;
