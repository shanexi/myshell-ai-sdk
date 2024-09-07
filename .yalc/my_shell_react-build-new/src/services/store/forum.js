"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForumStore = void 0;
const zustand_1 = require("zustand");
const zustand_computed_1 = __importDefault(require("zustand-computed"));
const DEFAULT_STATE = {
    searchList: [],
    tagFilters: { tagList: [], sortList: [] },
    postFullView: undefined,
    showPost: undefined,
    postDetail: {},
    postLoading: true,
    setPostDetail: () => { },
    setPostLoading: () => { }
};
const computeState = (state) => ({
    history: []
});
exports.useForumStore = (0, zustand_1.create)()((0, zustand_computed_1.default)((set, get) => ({
    ...DEFAULT_STATE,
    setSearchList: (searchList) => {
        set({ searchList });
    },
    setTagFilters: (tagFilters) => {
        set({ tagFilters });
    },
    setPostFullView: (postFullView) => {
        set({ postFullView });
    },
    setShowPost: (showPost) => {
        set({ showPost });
    },
    setPostDetail: (postDetail) => {
        set({ postDetail });
    },
    setPostLoading: (postLoading) => {
        set({ postLoading });
    }
}), computeState));
