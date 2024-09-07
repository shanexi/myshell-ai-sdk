"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDropFiles = exports.processUploadFiles = exports.getMediaDimension = exports.getUIFileData = exports.getFileTypes = exports.getAcceptTypes = exports.serverFileTypes = exports.fileUIData = exports.ex2MIME = exports.enableMIME = void 0;
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_dropzone_1 = require("react-dropzone");
const common_1 = require("../../../../apis/common.js");
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const store_1 = require("../../../../services/store/index.js");
const defaultMaxSize = 50 * 1024 ** 2;
exports.enableMIME = {
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
        '.png': 'image/png',
        '.jpeg': 'image/jpeg',
        '.jpg': 'image/jpg'
    },
    all: {
        '*': '*/*'
    }
};
exports.ex2MIME = {
    ...exports.enableMIME.audio,
    ...exports.enableMIME.video,
    ...exports.enableMIME.other,
    ...exports.enableMIME.image,
    ...exports.enableMIME.all
};
exports.fileUIData = {
    md: {
        icon: 'other',
        type: 'Markdown File',
        bg: '#6F8BB5',
        iconUrl: 'https://image.myshell.ai/image/bot/icon/2023112610/embed_icon/Other.svg'
    },
    markdown: {
        icon: 'other',
        type: 'Markdown File',
        bg: '#6F8BB5',
        iconUrl: 'https://image.myshell.ai/image/bot/icon/2023112610/embed_icon/Other.svg'
    },
    pdf: {
        icon: 'PDF',
        type: 'PDF',
        bg: '#EA3434',
        iconUrl: 'https://image.myshell.ai/image/bot/icon/2023112610/embed_icon/PDF.svg'
    },
    docx: {
        icon: 'W',
        type: 'Word File',
        bg: '#2684FF',
        iconUrl: 'https://image.myshell.ai/image/bot/icon/2023112610/embed_icon/Word.svg'
    },
    doc: {
        icon: 'W',
        type: 'Word File',
        bg: '#2684FF',
        iconUrl: 'https://image.myshell.ai/image/bot/icon/2023112610/embed_icon/Word.svg'
    },
    txt: {
        icon: 'T',
        type: 'TXT',
        bg: '#6F8BB5',
        iconUrl: 'https://image.myshell.ai/image/bot/icon/2023112610/embed_icon/TXT.svg'
    },
    csv: {
        icon: 'CSV',
        type: 'CSV',
        bg: '#079455',
        iconUrl: 'https://image.myshell.ai/image/bot/icon/2024053011/embed_icon/CSV.svg'
    },
    other: {
        icon: 'other',
        type: 'Rich Text File',
        bg: '#6F8BB5',
        iconUrl: 'https://image.myshell.ai/image/bot/icon/2023112610/embed_icon/Other.svg'
    },
    all: {
        icon: 'all',
        type: 'All File',
        bg: '#6F8BB5',
        iconUrl: 'https://image.myshell.ai/image/bot/icon/2023112610/embed_icon/Other.svg'
    }
};
const supportFiles = Object.values(exports.enableMIME).flatMap(category => {
    return Object.keys(category);
});
exports.serverFileTypes = {
    audio: 'MESSAGE_METADATA_TYPE_AUDIO_FILE',
    image: 'MESSAGE_METADATA_TYPE_IMAGE_FILE',
    other: 'MESSAGE_METADATA_TYPE_TEXT_FILE',
    video: 'MESSAGE_METADATA_TYPE_VIDEO_FILE',
    all: 'MESSAGE_METADATA_TYPE_ALL_FILE'
};
const serverFileTypes2Local = Object.fromEntries(Object.entries(exports.serverFileTypes).map(([key, value]) => [value, key]));
const getAcceptTypes = (serverTypes) => {
    const res = {};
    for (const type of serverTypes) {
        const localType = serverFileTypes2Local[type];
        if (localType) {
            const mimeMap = exports.enableMIME[localType];
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
const getFileTypes = (serverTypes) => {
    const res = [];
    for (const type of serverTypes) {
        const localType = serverFileTypes2Local[type];
        if (localType) {
            const mimeMap = exports.enableMIME[localType];
            const keys = Object.keys(mimeMap);
            res.push(...keys);
        }
    }
    return res;
};
exports.getFileTypes = getFileTypes;
const getUIFileData = (file) => {
    const arr = file.name.split('.');
    if (arr.length > 1) {
        const ex = arr[arr.length - 1];
        const e2MIME = `.${ex.toLowerCase()}`;
        const mimeType = file.type;
        const mt = (mimeType || exports.ex2MIME[e2MIME]).split('/')[0];
        const fileUI = exports.fileUIData[ex.toLowerCase()];
        const ui = ['text', 'application', 'other'].includes(mt) ? fileUI || exports.fileUIData.other : {};
        const ct = ex.toUpperCase();
        return {
            mimeType: mt,
            orginnalMIMEType: mimeType,
            contentType: common_1.ContentTypeEnum[ct],
            name: file.name,
            ex,
            serverType: mt === 'text' ? exports.serverFileTypes.other : exports.serverFileTypes[mt],
            ...ui
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
    let dimensions = null;
    if (data.uiData.mimeType === 'image') {
        dimensions = await loadImageDimensions(url);
    }
    if (data.uiData.mimeType === 'video') {
        dimensions = await loadVideoDimensions(url);
    }
    return dimensions;
};
exports.getMediaDimension = getMediaDimension;
const processUploadFiles = async (botId, files) => {
    const fs = files.map(f => {
        return {
            file: f,
            status: 'pending',
            id: (0, common_helper_1.generateUUID)(),
            botId,
            uiData: (0, exports.getUIFileData)(f),
            cancelToken: {}
        };
    });
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
exports.processUploadFiles = processUploadFiles;
const useDropFiles = ({ onFileChange, from, botId, isChoosingFile, types, setFile, fileMaxSize }) => {
    const showDragModal = (0, store_1.useChatStore)(state => state.showDragModal);
    const uploadedFilesLength = (0, store_1.useChatStore)(state => (state.fileUpload.filesMap[botId] || []).length);
    const { warning } = (0, useNotification_1.useNotification)();
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const maxFiles = 1;
    const acceptTypes = (0, react_1.useMemo)(() => {
        const supportTypes = Array.isArray(types) ? types : ['MESSAGE_METADATA_TYPE_IMAGE_FILE'];
        return (0, exports.getAcceptTypes)(supportTypes);
    }, []);
    const maxSize = fileMaxSize || defaultMaxSize;
    const { getRootProps, getInputProps } = (0, react_dropzone_1.useDropzone)({
        accept: acceptTypes,
        maxFiles: 1,
        noKeyboard: true,
        disabled: Object.keys(acceptTypes).length === 0,
        maxSize,
        onDragOver: e => {
            showDragModal(true);
        },
        validator: (file) => {
            const arr = file.name ? file.name.split('.') : [];
            if (file.size > maxSize) {
                setFile({
                    status: 'error',
                    type: 'filesize'
                });
                return {
                    code: '401',
                    message: `Size is larger than ${maxSize}!`
                };
            }
            if (arr.length > 1) {
                const ex = arr[arr.length - 1];
                if (!supportFiles.includes(`.${ex.toLowerCase()}`) && !acceptTypes['*/*']) {
                    return {
                        code: '402',
                        message: `${ex} is not support yet!`
                    };
                }
                return null;
            }
            return {
                code: '402',
                message: `${file.type} is not support yet!`
            };
        },
        onDrop: acceptedFiles => {
            if (isChoosingFile) {
                isChoosingFile.current = false;
            }
            showDragModal(false);
            const nextLen = uploadedFilesLength + acceptedFiles.length;
            if (nextLen <= maxFiles) {
                onFileChange(acceptedFiles);
            }
            else {
                warning({ content: chatT('replicate.maxfiles') });
            }
        },
        onDropRejected: fileRejections => {
            const tooMany = fileRejections.every(file => {
                return file.errors[0].code === 'too-many-files';
            });
            const invalidfile = fileRejections.every(file => {
                return file.errors[0].code === 'file-invalid-type';
            });
            const filesize = fileRejections.every(file => {
                return file.errors[0].code === 'file-too-large';
            });
            if (tooMany) {
                setFile({
                    status: 'error',
                    type: 'maxfiles'
                });
            }
            else if (invalidfile) {
                setFile({
                    status: 'error',
                    type: 'invalid'
                });
            }
            else if (filesize) {
                setFile({
                    status: 'error',
                    type: 'filesize'
                });
            }
        }
    });
    return {
        getRootProps,
        getInputProps
    };
};
exports.useDropFiles = useDropFiles;
