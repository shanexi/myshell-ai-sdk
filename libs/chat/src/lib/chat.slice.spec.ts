import {
  BearSlice,
  chat,
  createBearSlice,
  createFishSlice,
  createSharedSlice,
  FishSlice,
  SharedSlice,
} from './chat.slice';
import { create } from 'zustand';

describe('chat slice', () => {
  it('should work', () => {
    expect(chat()).toEqual('chat');
  });
  it('should initialize with 0 fishes', () => {
    const useStore = create(createFishSlice);
    const state = useStore.getState();
    expect(state.fishes).toBe(0);
  });

  it('should add a fish', () => {
    const useStore = create(createFishSlice);
    const state = useStore.getState();
    state.addFish();
    expect(useStore.getState().fishes).toBe(1);
  });

  it('should initialize with 0 bears', () => {
    const useStore = create<BearSlice & FishSlice>((...a) => ({
      ...createBearSlice(...a),
      ...createFishSlice(...a),
    }));
    const state = useStore.getState();
    expect(state.bears).toBe(0);
  });

  it('should add a bear', () => {
    const useStore = create<BearSlice & FishSlice>((...a) => ({
      ...createBearSlice(...a),
      ...createFishSlice(...a),
    }));
    const state = useStore.getState();
    state.addBear();
    expect(useStore.getState().bears).toBe(1);
  });

  it('should eat a fish', () => {
    const useStore = create<BearSlice & FishSlice>((...a) => ({
      ...createBearSlice(...a),
      ...createFishSlice(...a),
    }));
    const state = useStore.getState();
    state.addFish(); // Ensure there is at least one fish to eat
    state.eatFish();
    expect(useStore.getState().fishes).toBe(0);
  });
});

describe('createSharedSlice', () => {
  it('should add both a bear and a fish', () => {
    const useStore = create<BearSlice & FishSlice & SharedSlice>((...a) => ({
      ...createBearSlice(...a),
      ...createFishSlice(...a),
      ...createSharedSlice(...a),
    }));

    const state = useStore.getState();
    state.addBoth();
    expect(useStore.getState().bears).toBe(1);
    expect(useStore.getState().fishes).toBe(1);
  });

  it('should get the total number of bears and fishes', () => {
    const useStore = create<BearSlice & FishSlice & SharedSlice>((...a) => ({
      ...createBearSlice(...a),
      ...createFishSlice(...a),
      ...createSharedSlice(...a),
    }));

    const state = useStore.getState();
    state.addBear();
    state.addFish();
    expect(state.getBoth()).toBe(2); // 1 bear + 1 fish
  });
});
