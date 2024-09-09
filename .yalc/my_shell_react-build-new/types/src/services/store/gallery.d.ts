import { IGalleryItem } from '../../../../src/gallery/modal/interfaces';
interface GalleryState {
    galleryList: IGalleryItem[];
    galleryUserList: IGalleryItem[];
}
type GalleryStore = GalleryState & {
    setGalleryList(list: IGalleryItem[] | []): void;
    setGalleryUserList(list: IGalleryItem[] | []): void;
};
type ComputedStore = {
    history: unknown;
};
export declare const useGalleryStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<GalleryStore>, "getState" | "getInitialState" | "subscribe" | "destroy"> & Omit<import("zustand").StoreApi<GalleryState & {
    setGalleryList(list: IGalleryItem[] | []): void;
    setGalleryUserList(list: IGalleryItem[] | []): void;
} & ComputedStore>, "setState">>;
export {};
