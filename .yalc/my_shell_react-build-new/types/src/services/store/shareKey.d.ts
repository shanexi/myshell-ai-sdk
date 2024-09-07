export type CurrentViewTable = 'stakeDetail' | 'topEarn' | 'soarBot' | 'hotBot' | 'potential' | 'turnoverBot';
export type ShareKeyState = {
    currentViewTable: CurrentViewTable | null;
    stakeDetailTableActed: boolean;
    topEarnTableActed: boolean;
    soarBotTableActed: boolean;
    hotBotTableActed: boolean;
    potentialTableActed: boolean;
    turnoverBotTableActed: boolean;
};
type ShareKeyActions = {
    setCurrentViewTable(table: CurrentViewTable | null): void;
    setTableActed(acted: boolean): void;
};
type ShareKeyStore = ShareKeyState & ShareKeyActions;
export declare const useShareKeyStore: import("zustand").UseBoundStore<Omit<Omit<import("zustand").StoreApi<ShareKeyStore>, "setState"> & {
    setState(nextStateOrUpdater: ShareKeyStore | Partial<ShareKeyStore> | ((state: import("immer").WritableDraft<ShareKeyStore>) => void), shouldReplace?: boolean | undefined): void;
}, "setState"> & {
    setState<A extends string | {
        type: string;
    }>(nextStateOrUpdater: ShareKeyStore | Partial<ShareKeyStore> | ((state: import("immer").WritableDraft<ShareKeyStore>) => void), shouldReplace?: boolean | undefined, action?: A | undefined): void;
}>;
export {};
