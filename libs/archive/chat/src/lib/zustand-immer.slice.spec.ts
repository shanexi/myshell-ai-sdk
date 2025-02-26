import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';
import {
  BearSlice,
  createBearSlice,
  createFishSlice,
  createSharedSlice,
  FishSlice,
  SharedSlice,
} from './zustand-immer.slice';

describe('createFishSlice', () => {
  it('should initialize with 0 fishes', () => {
    const store = createStore<FishSlice, [['zustand/immer', never]]>(
      immer(createFishSlice),
    );
    const { fishes } = store.getState();
    expect(fishes).toBe(0);
  });

  it('should add a fish', () => {
    const store = createStore<FishSlice, [['zustand/immer', never]]>(
      immer(createFishSlice),
    );
    store.getState().addFish();
    const { fishes } = store.getState();
    expect(fishes).toBe(1);
  });

  it('should initialize with 0 bears and 0 fishes', () => {
    const store = createStore<
      BearSlice & FishSlice,
      [['zustand/immer', never]]
    >(
      immer((...a) => ({
        ...createBearSlice(...a),
        ...createFishSlice(...a),
      })),
    );
    const { bears, fishes } = store.getState();
    expect(bears).toBe(0);
    expect(fishes).toBe(0);
  });

  it('should add a bear', () => {
    const store = createStore<
      BearSlice & FishSlice,
      [['zustand/immer', never]]
    >(
      immer((...a) => ({
        ...createBearSlice(...a),
        ...createFishSlice(...a),
      })),
    );
    store.getState().addBear();
    const { bears } = store.getState();
    expect(bears).toBe(1);
  });

  it('should eat a fish', () => {
    const store = createStore<
      BearSlice & FishSlice,
      [['zustand/immer', never]]
    >(
      immer((...a) => ({
        ...createBearSlice(...a),
        ...createFishSlice(...a),
      })),
    );
    store.getState().addFish(); // Ensure there is at least one fish
    store.getState().eatFish();
    const { fishes } = store.getState();
    expect(fishes).toBe(0);
  });
});

describe('createSharedSlice', () => {
  it('should add both a bear and a fish', () => {
    const store = createStore<
      BearSlice & FishSlice & SharedSlice,
      [['zustand/immer', never]]
    >(
      immer((...a) => ({
        ...createBearSlice(...a),
        ...createFishSlice(...a),
        ...createSharedSlice(...a),
      })),
    );

    const state = store.getState();
    state.addBoth();
    expect(store.getState().bears).toBe(1);
    expect(store.getState().fishes).toBe(1);
  });

  it('should get the total number of bears and fishes', () => {
    const store = createStore<
      BearSlice & FishSlice & SharedSlice,
      [['zustand/immer', never]]
    >(
      immer((...a) => ({
        ...createBearSlice(...a),
        ...createFishSlice(...a),
        ...createSharedSlice(...a),
      })),
    );

    const state = store.getState();
    state.addBear();
    state.addFish();
    expect(state.getBoth()).toBe(2); // 1 bear + 1 fish
  });
});
