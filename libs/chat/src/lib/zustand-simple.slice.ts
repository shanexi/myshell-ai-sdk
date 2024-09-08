import { StateCreator } from 'zustand';
import { compute } from 'zustand-computed-state';

export interface FishSlice {
  fishes: number;
  ySq: number;
  addFish: () => void;
}

export const createFishSlice: StateCreator<FishSlice> = (set, get) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
  ...compute('y_slice', get, (state) => ({
    ySq: state.fishes * 2,
  })),
});

export interface BearSlice {
  bears: number;
  addBear: () => void;
  eatFish: () => void;
}

export const createBearSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  BearSlice
> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
});

export interface SharedSlice {
  addBoth: () => void;
  getBoth: () => void;
}

export const createSharedSlice: StateCreator<
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
