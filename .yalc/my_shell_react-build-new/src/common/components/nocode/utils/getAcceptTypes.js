"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileTypesByAccept = exports.getContentType = exports.getAcceptTypes = exports.getLocalTypeBySuffix = exports.SERVER_FILE_TYPE = exports.IServerFileType = exports.ENABLE_PREVIEW_FILE = exports.ENABLE_MIME = void 0;
const common_1 = require("../../../../apis/common.js");
exports.ENABLE_MIME = {
    audio: {
        '.mp3': 'audio/mpeg',
        '.wav': 'audio/wav',
        '.ogg': 'audio/ogg',
        '.wma': 'audio/x-ms-wma',
        '.flac': 'audio/flac',
        '.ape': 'audio/ape'
    },
    video: {
        '.mp4': 'video/mp4',
        '.avi': 'video/x-msvideo',
        '.mov': 'video/quicktime',
        '.wmv': 'video/x-ms-wmv',
        '.flv': 'video/x-flv'
    },
    other: {
        '.rtf': 'application/rtf',
        '.md': 'text/markdown',
        '.markdown': 'text/markdown',
        '.pdf': 'application/pdf',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.doc': 'application/msword',
        '.txt': 'text/plain',
        '.csv': 'text/csv'
    },
    image: {
        '.apng': 'image/apng',
        '.png': 'image/png',
        '.jpeg': 'image/jpeg',
        '.jpg': 'image/jpg',
        '.webp': 'image/webp',
        '.gif': 'image/gif',
        '.bmp': 'image/bmp',
        '.tiff': 'image/tiff'
    },
    all: {
        '*': '*/*'
    }
};
exports.ENABLE_PREVIEW_FILE = ['audio', 'video', 'image'];
var IServerFileType;
(function (IServerFileType) {
    IServerFileType["MESSAGE_METADATA_TYPE_AUDIO_FILE"] = "MESSAGE_METADATA_TYPE_AUDIO_FILE";
    IServerFileType["MESSAGE_METADATA_TYPE_IMAGE_FILE"] = "MESSAGE_METADATA_TYPE_IMAGE_FILE";
    IServerFileType["MESSAGE_METADATA_TYPE_TEXT_FILE"] = "MESSAGE_METADATA_TYPE_TEXT_FILE";
    IServerFileType["MESSAGE_METADATA_TYPE_VIDEO_FILE"] = "MESSAGE_METADATA_TYPE_VIDEO_FILE";
    IServerFileType["MESSAGE_METADATA_TYPE_ALL_FILE"] = "MESSAGE_METADATA_TYPE_ALL_FILE";
})(IServerFileType || (exports.IServerFileType = IServerFileType = {}));
exports.SERVER_FILE_TYPE = {
    audio: IServerFileType.MESSAGE_METADATA_TYPE_AUDIO_FILE,
    image: IServerFileType.MESSAGE_METADATA_TYPE_IMAGE_FILE,
    other: IServerFileType.MESSAGE_METADATA_TYPE_TEXT_FILE,
    video: IServerFileType.MESSAGE_METADATA_TYPE_VIDEO_FILE,
    all: IServerFileType.MESSAGE_METADATA_TYPE_ALL_FILE
};
const ServerFileTypes2Local = Object.fromEntries(Object.entries(exports.SERVER_FILE_TYPE).map(([key, value]) => [value, key]));
const getLocalTypeBySuffix = (suffix) => {
    for (const [local, item] of Object.entries(exports.ENABLE_MIME)) {
        for (const type of Object.keys(item)) {
            if (type === `.${suffix?.toLowerCase()}`) {
                return local;
            }
        }
    }
    return '';
};
exports.getLocalTypeBySuffix = getLocalTypeBySuffix;
const getAcceptTypes = (serverFileTypes) => {
    const accepts = {};
    const types = Array.isArray(serverFileTypes) ? serverFileTypes : [serverFileTypes];
    types?.forEach(type => {
        const localFileType = ServerFileTypes2Local[type];
        if (localFileType) {
            const mimeMap = exports.ENABLE_MIME[localFileType];
            const keys = Object.keys(mimeMap);
            keys?.forEach(mime => {
                const accept = mimeMap?.[mime];
                if (!accepts[accept]) {
                    accepts[accept] = [mime];
                }
                else {
                    accepts[accept] = [...accepts[accept], mime];
                }
            });
        }
    });
    return accepts;
};
exports.getAcceptTypes = getAcceptTypes;
const getContentType = (file) => {
    const arr = file.type.split('/');
    const ex = arr[arr.length - 1]?.toUpperCase();
    return common_1.ContentTypeEnum[ex];
};
exports.getContentType = getContentType;
const getFileTypesByAccept = (accept) => {
    return Object.keys(accept).map(item => item.split('/')?.[1]?.toLocaleUpperCase());
};
exports.getFileTypesByAccept = getFileTypesByAccept;
