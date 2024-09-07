import { ArticleInfo } from '../../../src/article/model/definitions.js';
import { BannerItemProps } from '../../../src/common/components/banner/types.js';
import { ListResponse } from '../../../src/common/constants/interfaces/common.js';
import { NormalCardProps, RecommendInfo } from '../../../src/common/model/interfaces.js';
import { ResponseType } from '../../../src/core/request/APIFetch.js';
export declare function getPost(id: string): Promise<ResponseType<ArticleInfo>>;
export declare function getExploreRecommend(containNsfw: boolean, serverContext?: {
    headers: {
        get(name: string): string | null | undefined;
    };
    cookies: {
        get(name: string): {
            value: string | null | undefined;
        } | null | undefined;
    };
    locale?: string | null | undefined;
}): Promise<ResponseType<{
    banners: BannerItemProps[];
    list: RecommendInfo[];
}>>;
export declare function getBotSearchList({ query, pageToken, pageSize, includeTagIds, excludeTagIds, signal }: {
    includeTagIds?: string[];
    excludeTagIds?: string[];
    query?: string;
    pageToken: string;
    pageSize?: number;
    signal?: AbortSignal;
}): Promise<ResponseType<{
    listResponse: ListResponse;
    list: NormalCardProps[];
}>>;
