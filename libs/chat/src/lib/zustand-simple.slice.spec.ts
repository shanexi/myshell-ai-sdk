import {
  BearSlice,
  createBearSlice,
  createFishSlice,
  createSharedSlice,
  FishSlice,
  SharedSlice,
} from './zustand-simple.slice';
import { createStore } from 'zustand/vanilla';

describe('chat slice', () => {
  it('should initialize with 0 fishes', () => {
    const store = createStore(createFishSlice);
    const state = store.getState();
    expect(state.fishes).toBe(0);
  });

  it('should add a fish', () => {
    const store = createStore(createFishSlice);
    const state = store.getState();
    state.addFish();
    expect(store.getState().fishes).toBe(1);
  });

  it('should initialize with 0 bears', () => {
    const store = createStore<BearSlice & FishSlice>((...a) => ({
      ...createBearSlice(...a),
      ...createFishSlice(...a),
    }));
    const state = store.getState();
    expect(state.bears).toBe(0);
  });

  it('should add a bear', () => {
    const store = createStore<BearSlice & FishSlice>((...a) => ({
      ...createBearSlice(...a),
      ...createFishSlice(...a),
    }));
    const state = store.getState();
    state.addBear();
    expect(store.getState().bears).toBe(1);
  });

  it('should eat a fish', () => {
    const store = createStore<BearSlice & FishSlice>((...a) => ({
      ...createBearSlice(...a),
      ...createFishSlice(...a),
    }));
    const state = store.getState();
    state.addFish(); // Ensure there is at least one fish to eat
    state.eatFish();
    expect(store.getState().fishes).toBe(0);
  });
});

describe('createSharedSlice', () => {
  it('should add both a bear and a fish', () => {
    const store = createStore<BearSlice & FishSlice & SharedSlice>((...a) => ({
      ...createBearSlice(...a),
      ...createFishSlice(...a),
      ...createSharedSlice(...a),
    }));

    const state = store.getState();
    state.addBoth();
    expect(store.getState().bears).toBe(1);
    expect(store.getState().fishes).toBe(1);
  });

  it('should get the total number of bears and fishes', () => {
    const store = createStore<BearSlice & FishSlice & SharedSlice>((...a) => ({
      ...createBearSlice(...a),
      ...createFishSlice(...a),
      ...createSharedSlice(...a),
    }));

    const state = store.getState();
    state.addBear();
    state.addFish();
    expect(state.getBoth()).toBe(2); // 1 bear + 1 fish
  });
});
