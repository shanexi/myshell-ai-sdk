/** @jsxImportSource zustand-signal */

import { createStore } from 'zustand/vanilla';
import { $ } from 'zustand-signal';
import {
  BearSlice,
  createBearSlice,
  createFishSlice,
  createSharedSlice,
  FishSlice,
  SharedSlice,
} from './zustand-simple.slice';

export const boundStore = createStore<BearSlice & FishSlice & SharedSlice>(
  (...a) => ({
    ...createBearSlice(...a),
    ...createFishSlice(...a),
    ...createSharedSlice(...a),
  })
);

function BearCounter() {
  return (
    <div>
      <div>{$(boundStore).bears} bears around here...</div>
      <div>{$(boundStore).fishes} fishes around here...</div>
      {/* don't work */}
      <div>{$(boundStore).ySq} around here...</div>
    </div>
  );
}

function AddBear() {
  return <button onClick={boundStore.getState().addBear}>add bear</button>;
}

function AddFish() {
  return <button onClick={boundStore.getState().addFish}>add fish</button>;
}

function AddBoth() {
  return <button onClick={boundStore.getState().addBoth}>add both</button>;
}

function EatFish() {
  return <button onClick={boundStore.getState().eatFish}>eat fish</button>;
}

export function Signal() {
  return (
    <div>
      <h1>Zustand signal!</h1>
      <BearCounter />
      <AddBear />
      <EatFish />
      <AddFish />
      <AddBoth />
    </div>
  );
}

export default Signal;
