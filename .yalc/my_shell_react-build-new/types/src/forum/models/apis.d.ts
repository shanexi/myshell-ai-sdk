import { ActionTypes } from '../../../../src/common/constants/enums/post.js';
import { TagInfo } from '../../../../src/common/constants/interfaces/bot.js';
import { ListResponse } from '../../../../src/common/constants/interfaces/common.js';
import { ResponseType } from '../../../../src/core/request/APIFetch.js';
import { IForumItem, IPostDetail } from './interfaces';
export declare function getForumTagInfos(): Promise<ResponseType<{
    tagList: TagInfo[];
    sortList: Array<{
        val: string;
        name: string;
    }>;
}>>;
export declare function getForumPinnedPosts(): Promise<ResponseType<{
    list: IForumItem[];
}>>;
export declare function getForumSearchList({ query, pageToken, pageSize, includeTagIds, sortBy, filterPinnedPost, signal }: {
    includeTagIds?: string[];
    query?: string;
    pageToken: string;
    pageSize?: number;
    sortBy?: string;
    filterPinnedPost?: boolean;
    signal?: AbortSignal;
}): Promise<ResponseType<{
    listResponse: ListResponse;
    list: IForumItem[];
}>>;
export declare function getPostDetail(postId: string): Promise<ResponseType<{
    detail: IPostDetail;
}>>;
export declare const postDetailCacheMap$: Map<string, IPostDetail>;
export declare function getPostDetailCache(postId: string): Promise<IPostDetail>;
export declare function setPostAction(postId: string, action: ActionTypes): Promise<ResponseType<unknown>>;
export declare function generateForumShareCode(postId: string): Promise<string>;
