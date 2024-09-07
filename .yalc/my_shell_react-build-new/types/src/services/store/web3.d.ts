interface Web3State {
    swapping: boolean;
    staking: boolean;
    unstaking: boolean;
    claiming: boolean;
    openNeedReLoginModal: boolean;
    switchingChain: boolean;
}
type Web3Store = Web3State & {
    toggleSwapping: (status: boolean) => void;
    toggleStaking: (status: boolean) => void;
    toggleUnstaking: (status: boolean) => void;
    toggleClaiming: (status: boolean) => void;
    toggleNeedReLoginModal: (status: boolean) => void;
    toggleSwitchingChain: (status: boolean) => void;
};
type ComputedStore = {
    history: unknown;
};
export declare const useWeb3Store: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<Web3Store>, "getState" | "getInitialState" | "subscribe" | "destroy"> & Omit<import("zustand").StoreApi<Web3State & {
    toggleSwapping: (status: boolean) => void;
    toggleStaking: (status: boolean) => void;
    toggleUnstaking: (status: boolean) => void;
    toggleClaiming: (status: boolean) => void;
    toggleNeedReLoginModal: (status: boolean) => void;
    toggleSwitchingChain: (status: boolean) => void;
} & ComputedStore>, "setState">>;
export {};
