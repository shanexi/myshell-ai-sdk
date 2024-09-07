import { PersistOptions } from 'zustand/middleware';
type FlagState = {
    luiButtonGuideClicked: boolean;
};
type FlagActions = {
    setLuiButtonGuideClicked: (value: boolean) => void;
};
type FlagStore = FlagState & FlagActions;
type PersistedState = {
    luiButtonGuideClicked: boolean;
};
export declare const useFlagStore: import("zustand").UseBoundStore<Omit<Omit<Omit<import("zustand").StoreApi<FlagStore>, "setState"> & {
    setState(nextStateOrUpdater: FlagStore | Partial<FlagStore> | ((state: import("immer").WritableDraft<FlagStore>) => void), shouldReplace?: boolean | undefined): void;
}, "setState"> & {
    setState<A extends string | {
        type: string;
    }>(nextStateOrUpdater: FlagStore | Partial<FlagStore> | ((state: import("immer").WritableDraft<FlagStore>) => void), shouldReplace?: boolean | undefined, action?: A | undefined): void;
}, "persist"> & {
    persist: {
        setOptions: (options: Partial<PersistOptions<FlagStore, PersistedState>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: FlagStore) => void) => () => void;
        onFinishHydration: (fn: (state: FlagStore) => void) => () => void;
        getOptions: () => Partial<PersistOptions<FlagStore, PersistedState>>;
    };
}>;
export {};
