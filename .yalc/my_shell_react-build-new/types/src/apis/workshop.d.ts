import { BannerItemProps } from '../../../src/common/components/banner/types.js';
import { TTSInfo, TagInfo } from '../../../src/common/constants/interfaces/bot.js';
import { ListResponse } from '../../../src/common/constants/interfaces/common.js';
import { WidgetInfo, WidgetMessageDetail } from '../../../src/common/constants/interfaces/workshop.js';
import { NormalCardProps, RecommendInfo } from '../../../src/common/model/interfaces.js';
import { ResponseType } from '../../../src/core/request/APIFetch.js';
export declare function getWorkshopRecommend(): Promise<ResponseType<{
    banners: BannerItemProps[];
    list: RecommendInfo[];
}>>;
export declare function getWidgetSearchList({ query, pageToken, pageSize, includeTagIds, excludeTagIds, signal }: {
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
export declare function getWidgetFilterTags(): Promise<ResponseType<TagInfo[]>>;
export declare function getWidgetsInChatList(pageToken: string, pageSize: number): Promise<ResponseType<{
    listResponse: {
        hasMore: boolean;
        nextPageToken: string;
    };
    widgets: WidgetInfo[];
}>>;
export declare function getFeaturePageDetailInfo({ pageId }: {
    pageId: string;
}): Promise<ResponseType<any>>;
export declare function listWidgetChatHistory(widgetId: string, pageToken: string, pageSize: number): Promise<ResponseType<{
    data: WidgetMessageDetail[];
    offset: number;
}>>;
export declare function addWidgetToChatList(widgetId: string, pinned?: boolean): Promise<ResponseType<WidgetMessageDetail>>;
export declare function getWidgetInfo(widgetId: string | string[]): Promise<ResponseType<WidgetInfo | undefined>>;
export declare function getWidgetsInfo(widgetIds: string[]): Promise<ResponseType<WidgetInfo[] | undefined>>;
export declare function ttsWidgetTrail(widgetId: string): Promise<ResponseType<string>>;
export declare function getTTSListOld(): Promise<ResponseType<TTSInfo[]>>;
export declare function getTTSList({ botId, languageId, pageSize, pageToken }: {
    botId?: string;
    languageId?: string;
    pageSize?: number;
    pageToken?: string;
}): Promise<ResponseType<{
    list: TTSInfo[];
    nextPageToken: string;
    hasMore: boolean;
}>>;
export declare function publishWidgetVoice(widgetId: string, description: string): Promise<ResponseType<any>>;
export declare function unpublishWidgetVoice(widgetId: string): Promise<ResponseType<any>>;
export declare function deleteWidgetVoice(widgetId: string): Promise<ResponseType<any>>;
export declare function pinnedWidgetInList(widgetId: string, pinned: boolean): Promise<ResponseType<void>>;
export declare function getWidgetSharingCode(widgetId: string): Promise<string>;
export declare function getWidgetSharingCodeByWidgetId(widgetId: string): Promise<ResponseType<unknown>>;
export declare function getWidgetProConfig(widgetId: string): Promise<{
    template?: string;
    reason?: string;
} | undefined>;
export declare function getWidgetProConfigByWidgetId(widgetId: string): Promise<ResponseType<{
    template?: string;
}>>;
export declare function getWidgetSharedDetail(code: string): Promise<ResponseType<any>>;
export declare function deleteHistoryMessageByMsgIds(ids: string[]): Promise<ResponseType<unknown>>;
export declare function deleteAllWidgetHistory(widgetId: string): Promise<ResponseType<unknown>>;
export declare function resetWidgetHistory(widgetId: string): Promise<ResponseType<unknown>>;
export declare function removeWidgetFromChatList(widgetId: string): Promise<ResponseType<void>>;
