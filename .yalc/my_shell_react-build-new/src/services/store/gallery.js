import { create } from 'zustand';
import computed from 'zustand-computed';
const DEFAULT_STATE = {
    galleryList: [],
    galleryUserList: []
};
const computeState = (state) => ({
    history: []
});
export const useGalleryStore = create()(computed((set, get) => ({
    ...DEFAULT_STATE,
    setGalleryList: (galleryList) => {
        set({ galleryList });
    },
    setGalleryUserList: (galleryUserList) => {
        set({ galleryUserList });
    }
}), computeState));
