"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWeb3Store = void 0;
const zustand_1 = require("zustand");
const zustand_computed_1 = __importDefault(require("zustand-computed"));
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
exports.useWeb3Store = (0, zustand_1.create)()((0, zustand_computed_1.default)((set, get) => ({
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
