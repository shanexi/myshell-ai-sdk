import { TagInfo } from '../../../../src/common/constants/interfaces/bot.js';
import { IForumItem, IPostDetail } from '../../../../src/forum/models/interfaces.js';
interface ForumState {
    searchList: IForumItem[];
    tagFilters: {
        tagList: TagInfo[];
        sortList: Array<{
            val: string;
            name: string;
        }>;
    };
    postFullView: boolean | undefined;
    postDetail: IPostDetail;
    postLoading: boolean;
    showPost: boolean | undefined;
    setPostDetail(postDetail: IPostDetail): void;
    setPostLoading(loading: boolean): void;
}
type ForumStore = ForumState & {
    setSearchList(info: IForumItem[] | []): void;
    setTagFilters(tags: {
        tagList: TagInfo[];
        sortList: Array<{
            val: string;
            name: string;
        }>;
    }): void;
    setPostFullView(postFullView: boolean): void;
    setShowPost(showPost: boolean): void;
    setPostDetail(postDetail: IPostDetail): void;
    setPostLoading(loading: boolean): void;
};
type ComputedStore = {
    history: unknown;
};
export declare const useForumStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<ForumStore>, "getState" | "getInitialState" | "subscribe" | "destroy"> & Omit<import("zustand").StoreApi<ForumState & {
    setSearchList(info: IForumItem[] | []): void;
    setTagFilters(tags: {
        tagList: TagInfo[];
        sortList: Array<{
            val: string;
            name: string;
        }>;
    }): void;
    setPostFullView(postFullView: boolean): void;
    setShowPost(showPost: boolean): void;
    setPostDetail(postDetail: IPostDetail): void;
    setPostLoading(loading: boolean): void;
} & ComputedStore>, "setState">>;
export {};
