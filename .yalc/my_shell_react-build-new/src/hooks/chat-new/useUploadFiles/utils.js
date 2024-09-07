"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processWidgetUploadFiles = exports.processUploadFiles = exports.getMediaDimension = exports.getUIFileData = exports.getAcceptTypes = exports.serverFileTypes2Local = void 0;
const common_1 = require("../../../apis/common.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const constant_1 = require("./constant.js");
const supportFiles = Object.values(constant_1.enableMIME).flatMap(category => Object.keys(category));
exports.serverFileTypes2Local = Object.fromEntries(Object.entries(constant_1.serverFileTypes).map(([key, value]) => [value, key]));
const getAcceptTypes = (serverTypes) => {
    const res = {};
    for (const type of serverTypes) {
        const localType = exports.serverFileTypes2Local[type];
        if (localType) {
            const mimeMap = constant_1.enableMIME[localType];
            const keys = Object.keys(mimeMap);
            for (const k of keys) {
                if (!res[mimeMap[k]]) {
                    res[mimeMap[k]] = [k];
                }
                else {
                    res[mimeMap[k]] = [...res[mimeMap[k]], k];
                }
            }
        }
    }
    return res;
};
exports.getAcceptTypes = getAcceptTypes;
const getUIFileData = (file) => {
    const arr = file.name.split('.');
    if (arr.length > 1) {
        const ex = arr[arr.length - 1].toLowerCase();
        const e2MIME = `.${ex}`;
        const mimeType = file.type || constant_1.ex2MIME[e2MIME];
        const mt = mimeType.split('/')[0];
        const fileUI = constant_1.fileUIData[ex] || constant_1.fileUIData.other;
        const ct = ex.toUpperCase();
        return {
            mimeType: mt,
            orginnalMIMEType: file.type,
            contentType: common_1.ContentTypeEnum[ct],
            name: file.name,
            ex,
            serverType: mt === 'text' ? constant_1.serverFileTypes.application : constant_1.serverFileTypes[mt],
            ...fileUI
        };
    }
};
exports.getUIFileData = getUIFileData;
const getObjectURL = (file) => URL.createObjectURL(file);
const loadImageDimensions = async (url) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            resolve({ width: image.width, height: image.height });
            URL.revokeObjectURL(url);
        };
        image.onerror = () => {
            reject(new Error('Failed to load image.'));
            URL.revokeObjectURL(url);
        };
        image.src = url;
    });
};
const loadVideoDimensions = async (url) => {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.onloadedmetadata = () => {
            resolve({ width: video.videoWidth, height: video.videoHeight });
            URL.revokeObjectURL(url);
        };
        video.onerror = () => {
            reject(new Error('Failed to load video.'));
            URL.revokeObjectURL(url);
        };
        video.src = url;
    });
};
const getMediaDimension = async (data) => {
    const url = getObjectURL(data.file);
    if (data.uiData.mimeType === 'image') {
        return loadImageDimensions(url);
    }
    if (data.uiData.mimeType === 'video') {
        return loadVideoDimensions(url);
    }
    return null;
};
exports.getMediaDimension = getMediaDimension;
const processFiles = async (id, files) => {
    const fs = files.map(f => ({
        file: f,
        status: 'pending',
        id: (0, common_helper_1.generateUUID)(),
        botId: id,
        uiData: (0, exports.getUIFileData)(f),
        cancelToken: {}
    }));
    const res = [];
    for (const file of fs) {
        try {
            const dimension = await (0, exports.getMediaDimension)(file);
            res.push({ ...file, meta: { ...(dimension || {}), thumbnail: '' } });
        }
        catch (error) {
            console.error(error);
            res.push(file);
        }
    }
    return res;
};
const processWidgetFiles = async (id, files) => {
    const fs = files.map(f => ({
        file: f,
        status: 'pending',
        id: (0, common_helper_1.generateUUID)(),
        widgetId: id,
        uiData: (0, exports.getUIFileData)(f),
        cancelToken: {}
    }));
    const res = [];
    for (const file of fs) {
        try {
            const dimension = await (0, exports.getMediaDimension)(file);
            res.push({ ...file, meta: { ...(dimension || {}), thumbnail: '' } });
        }
        catch (error) {
            console.error(error);
            res.push(file);
        }
    }
    return res;
};
const processUploadFiles = (botId, files) => processFiles(botId, files);
exports.processUploadFiles = processUploadFiles;
const processWidgetUploadFiles = (widgetId, files) => processWidgetFiles(widgetId, files);
exports.processWidgetUploadFiles = processWidgetUploadFiles;
