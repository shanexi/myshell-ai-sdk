import { create } from 'zustand';
import computed from 'zustand-computed';
const DEFAULT_STATE = {
    swapping: false,
    staking: false,
    unstaking: false,
    claiming: false,
    openNeedReLoginModal: false,
    switchingChain: false
};
const computeState = (state) => ({
    history: []
});
export const useWeb3Store = create()(computed((set, get) => ({
    ...DEFAULT_STATE,
    toggleSwapping: (status) => {
        set({ swapping: status });
    },
    toggleStaking: (status) => {
        set({ staking: status });
    },
    toggleUnstaking: (status) => {
        set({ unstaking: status });
    },
    toggleClaiming: (status) => {
        set({ claiming: status });
    },
    toggleNeedReLoginModal: (status) => {
        set({ openNeedReLoginModal: status });
    },
    toggleSwitchingChain: (status) => {
        set({ switchingChain: status });
    }
}), computeState));
