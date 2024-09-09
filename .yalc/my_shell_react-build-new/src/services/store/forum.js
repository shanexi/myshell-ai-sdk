import { create } from 'zustand';
import computed from 'zustand-computed';
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
export const useForumStore = create()(computed((set, get) => ({
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
