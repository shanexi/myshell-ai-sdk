"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishGallery = publishGallery;
exports.getGalleryList = getGalleryList;
exports.deleteGallery = deleteGallery;
exports.checkGalleryUpdate = checkGalleryUpdate;
exports.setGalleryVisitTime = setGalleryVisitTime;
exports.getGallerySharingCode = getGallerySharingCode;
exports.getGallerySharingCodeById = getGallerySharingCodeById;
exports.getGalleryDetailById = getGalleryDetailById;
const APIFetch_1 = require("../../core/request/APIFetch");
function publishGallery(list) {
    return APIFetch_1.APIFetch.post('/v1/bot/gallery/publish', {
        body: {
            list
        },
        hideErrorToast: true,
        isGoLang: true
    });
}
function getGalleryList({ pageToken, pageSize = 15, botId, userId }) {
    return APIFetch_1.APIFetch.post('/v1/bot/gallery/get_list', {
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
function deleteGallery(id) {
    return APIFetch_1.APIFetch.post('/v1/bot/gallery/delete', {
        body: {
            ids: [id]
        },
        isGoLang: true
    });
}
function checkGalleryUpdate(botId) {
    return APIFetch_1.APIFetch.post('/v1/bot/gallery/check_gallery_update', {
        body: {
            botIds: [botId]
        },
        isGoLang: true
    });
}
function setGalleryVisitTime(botId) {
    return APIFetch_1.APIFetch.post('/v1/bot/gallery/set_gallery_visit_time', {
        body: {
            botId
        },
        isGoLang: true
    });
}
const shareCodeCacheMap$ = new Map();
async function getGallerySharingCode(galleryId) {
    if (!shareCodeCacheMap$.has(galleryId)) {
        const res = (await getGallerySharingCodeById(galleryId));
        if (res.success && res.data) {
            shareCodeCacheMap$.set(galleryId, res.data.code);
        }
    }
    return shareCodeCacheMap$.get(galleryId);
}
function getGallerySharingCodeById(galleryId) {
    return APIFetch_1.APIFetch.post('/v1/shared/generate_shared_code', {
        body: {
            bizId: galleryId,
            bizType: 'BIZ_TYPE_GALLERY_IMAGE'
        },
        isGoLang: true
    });
}
function getGalleryDetailById(galleryId) {
    return APIFetch_1.APIFetch.post('/v1/bot/gallery/get_detail', {
        body: {
            id: galleryId
        },
        isGoLang: true
    });
}
