import { APIFetch } from '../../core/request/APIFetch.js';
export function publishGallery(list) {
    return APIFetch.post('/v1/bot/gallery/publish', {
        body: {
            list
        },
        hideErrorToast: true,
        isGoLang: true
    });
}
export function getGalleryList({ pageToken, pageSize = 15, botId, userId }) {
    return APIFetch.post('/v1/bot/gallery/get_list', {
        body: {
            listRequest: {
                pageToken,
                pageSize
            },
            ...(botId && { botId }),
            ...(userId && { userId })
        },
        isGoLang: true
    });
}
export function deleteGallery(id) {
    return APIFetch.post('/v1/bot/gallery/delete', {
        body: {
            ids: [id]
        },
        isGoLang: true
    });
}
export function checkGalleryUpdate(botId) {
    return APIFetch.post('/v1/bot/gallery/check_gallery_update', {
        body: {
            botIds: [botId]
        },
        isGoLang: true
    });
}
export function setGalleryVisitTime(botId) {
    return APIFetch.post('/v1/bot/gallery/set_gallery_visit_time', {
        body: {
            botId
        },
        isGoLang: true
    });
}
const shareCodeCacheMap$ = new Map();
export async function getGallerySharingCode(galleryId) {
    if (!shareCodeCacheMap$.has(galleryId)) {
        const res = (await getGallerySharingCodeById(galleryId));
        if (res.success && res.data) {
            shareCodeCacheMap$.set(galleryId, res.data.code);
        }
    }
    return shareCodeCacheMap$.get(galleryId);
}
export function getGallerySharingCodeById(galleryId) {
    return APIFetch.post('/v1/shared/generate_shared_code', {
        body: {
            bizId: galleryId,
            bizType: 'BIZ_TYPE_GALLERY_IMAGE'
        },
        isGoLang: true
    });
}
export function getGalleryDetailById(galleryId) {
    return APIFetch.post('/v1/bot/gallery/get_detail', {
        body: {
            id: galleryId
        },
        isGoLang: true
    });
}
