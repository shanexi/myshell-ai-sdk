import 'zustand/middleware/immer';
import { StateCreator, StoreMutatorIdentifier } from 'zustand/vanilla';
import { compute } from 'zustand-computed-state';

export type ImmerStateCreator<
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
  U = T
> = StateCreator<T, [...Mps, ['zustand/immer', never]], Mcs, U>;

export interface FishSlice {
  fishes: number;
  addFish: () => void;
  ySq: number;
}

export const createFishSlice: ImmerStateCreator<FishSlice> = (set, get) => ({
  fishes: 0,
  addFish: () =>
    set((state) => {
      state.fishes += 1;
    }),
  ...compute('y_slice', get, (state) => ({
    ySq: state.fishes * 2,
  })),
});

export interface BearSlice {
  bears: number;
  addBear: () => void;
  eatFish: () => void;
}

export const createBearSlice: ImmerStateCreator<
  BearSlice & FishSlice,
  [],
  [],
  BearSlice
> = (set) => ({
  bears: 0,
  addBear: () =>
    set((state) => {
      state.bears += 1;
    }),
  eatFish: () =>
    set((state) => {
      state.fishes -= 1;
    }),
});

export interface SharedSlice {
  addBoth: () => void;
  getBoth: () => void;
}

export const createSharedSlice: ImmerStateCreator<
  BearSlice & FishSlice,
  [],
  [],
  SharedSlice
> = (set, get) => ({
  addBoth: () => {
    // you can reuse previous methods
    get().addBear();
    get().addFish();
    // or do them from scratch
    // set((state) => ({ bears: state.bears + 1, fishes: state.fishes + 1 })
  },
  getBoth: () => get().bears + get().fishes,
});
