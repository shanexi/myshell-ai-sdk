import { ListResponse } from '../../../../src/common/constants/interfaces/common.js';
import { ResponseType } from '../../../../src/core/request/APIFetch.js';
import { IGalleryItem, IPublishItem } from './interfaces';
export interface IGalleryList {
    botId?: string;
    userId?: string;
    pageToken: string;
    pageSize?: number;
}
export declare function publishGallery(list: IPublishItem[]): Promise<ResponseType<any>>;
export declare function getGalleryList({ pageToken, pageSize, botId, userId }: IGalleryList): Promise<ResponseType<{
    listResponse: ListResponse;
    list: IGalleryItem[];
}>>;
export declare function deleteGallery(id: string): Promise<ResponseType<any>>;
export declare function checkGalleryUpdate(botId: string): Promise<ResponseType<{
    info: Array<{
        botId: string;
        hasUpdate: boolean;
        updatedTime: string;
        newlyAddedCount: number;
    }>;
}>>;
export declare function setGalleryVisitTime(botId: string): Promise<ResponseType<unknown>>;
export declare function getGallerySharingCode(galleryId: string): Promise<string>;
export declare function getGallerySharingCodeById(galleryId: string): Promise<ResponseType<unknown>>;
export declare function getGalleryDetailById(galleryId: string): Promise<ResponseType<unknown>>;
