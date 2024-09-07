"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWidgetDropFiles = exports.useDropFiles = exports.processWidgetUploadFiles = exports.processUploadFiles = exports.getMediaDimension = exports.getUIFileData = void 0;
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_dropzone_1 = require("react-dropzone");
const common_1 = require("../../../apis/common.js");
const useNotification_1 = require("../../../common/hooks/useNotification.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const store_1 = require("../../../services/store/index.js");
const defaultMaxSize = 50 * 1024 ** 2;
const enableMIME = {
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
    application: {
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
        '.gif': 'image/gif',
        '.bmp': 'image/bmp',
        '.tiff': 'image/tiff',
        '.tif': 'image/tiff',
        '.heic': 'image/heic'
    },
    all: {
        '*': '*/*'
    }
};
const ex2MIME = {
    ...enableMIME.audio,
    ...enableMIME.video,
    ...enableMIME.application,
    ...enableMIME.image,
    ...enableMIME.all
};
const fileUIData = {
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
    }
};
const supportFiles = Object.values(enableMIME).flatMap(category => {
    return Object.keys(category);
});
const serverFileTypes = {
    audio: 'MESSAGE_METADATA_TYPE_AUDIO_FILE',
    image: 'MESSAGE_METADATA_TYPE_IMAGE_FILE',
    application: 'MESSAGE_METADATA_TYPE_TEXT_FILE',
    video: 'MESSAGE_METADATA_TYPE_VIDEO_FILE',
    all: 'MESSAGE_METADATA_TYPE_ALL_FILE'
};
const serverFileTypes2Local = Object.fromEntries(Object.entries(serverFileTypes).map(([key, value]) => [value, key]));
const getAcceptTypes = (serverTypes) => {
    const res = {};
    for (const type of serverTypes) {
        const localType = serverFileTypes2Local[type];
        if (localType) {
            const mimeMap = enableMIME[localType];
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
const getUIFileData = (file) => {
    const arr = file.name.split('.');
    if (arr.length > 1) {
        const ex = arr[arr.length - 1];
        const e2MIME = `.${ex.toLowerCase()}`;
        const mimeType = file.type;
        const mt = (mimeType || ex2MIME[e2MIME]).split('/')[0];
        const fileUI = fileUIData[ex.toLowerCase()];
        const ui = ['text', 'application'].includes(mt) ? fileUI || fileUIData.other : {};
        const ct = ex.toUpperCase();
        return {
            mimeType: mt,
            orginnalMIMEType: mimeType,
            contentType: common_1.ContentTypeEnum[ct],
            name: file.name,
            ex,
            serverType: mt === 'text' ? serverFileTypes.application : serverFileTypes[mt],
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
const processWidgetUploadFiles = async (widgetId, files) => {
    const fs = files.map(f => {
        return {
            file: f,
            status: 'pending',
            id: (0, common_helper_1.generateUUID)(),
            widgetId,
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
exports.processWidgetUploadFiles = processWidgetUploadFiles;
const useDropFiles = ({ noDrag, noClick, onFileChange, imPanelChatConfig, from, botId, isChoosingFile, onFileDialogCancel, onTrack, uploadSettings, disabled = true, getRejectdMeassge }) => {
    const setFileAlert = (0, store_1.useChatStore)(state => state.setFileAlert);
    const showDragModal = (0, store_1.useChatStore)(state => state.showDragModal);
    const uploadedFilesLength = (0, store_1.useChatStore)(state => (state.fileUpload.filesMap[botId] || []).length);
    const { warning } = (0, useNotification_1.useNotification)();
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const maxFiles = uploadSettings?.embedNumberLimit || imPanelChatConfig?.embedNumberLimit || 10;
    const minFiles = uploadSettings?.embedNumberMinimum || imPanelChatConfig?.embedNumberMinimum || 1;
    const supportTypes = (0, react_1.useMemo)(() => {
        let result = [];
        if (Array.isArray(uploadSettings?.supportedEmbedTypes)) {
            result = uploadSettings.supportedEmbedTypes;
        }
        else if (Array.isArray(imPanelChatConfig?.supportedEmbedTypes)) {
            result = imPanelChatConfig.supportedEmbedTypes;
        }
        return result;
    }, [imPanelChatConfig?.supportedEmbedTypes, uploadSettings?.supportedEmbedTypes]);
    const acceptTypes = (0, react_1.useMemo)(() => getAcceptTypes(supportTypes), [supportTypes]);
    const supportedFileTypes = (0, react_1.useMemo)(() => {
        let res = [];
        for (const type of supportTypes) {
            const localType = serverFileTypes2Local[type];
            if (localType) {
                const mimeMap = enableMIME[localType];
                res = [...res, ...Object.keys(mimeMap)];
            }
        }
        return res;
    }, [supportTypes]);
    const maxSize = Number(uploadSettings?.embedMaxFileBytesEach) || defaultMaxSize;
    const { getRootProps, getInputProps } = (0, react_dropzone_1.useDropzone)({
        accept: acceptTypes,
        maxFiles,
        noDrag,
        noClick,
        noKeyboard: true,
        disabled: disabled && !(imPanelChatConfig && imPanelChatConfig?.embedNumberLimit > 0),
        maxSize,
        onDragOver: () => {
            showDragModal(true);
        },
        validator: (file) => {
            const arr = file.name ? file.name.split('.') : file.type ? file.type.split('/') : [];
            if (file.size > maxSize) {
                return {
                    code: '401',
                    message: `Size is larger than ${maxSize}!`
                };
            }
            if (arr.length > 1) {
                const ex = arr[arr.length - 1];
                if (!supportedFileTypes.includes(`.${ex.toLowerCase()}`) && !supportedFileTypes.includes('*')) {
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
            if (!acceptedFiles.length) {
                if (isChoosingFile) {
                    isChoosingFile.current = false;
                }
                showDragModal(false);
                return;
            }
            const fileName = acceptedFiles?.[0].name;
            const fileType = fileName?.substring(fileName.lastIndexOf('.') + 1);
            onTrack?.(fileType, acceptedFiles?.[0]?.size?.toString());
            if (isChoosingFile?.current) {
                isChoosingFile.current = false;
            }
            showDragModal(false);
            const nextLen = uploadedFilesLength + acceptedFiles.length;
            if (nextLen <= maxFiles) {
                onFileChange(acceptedFiles);
            }
            else {
                warning({ content: chatT('panel.maxfiles', { number: maxFiles }) });
            }
        },
        onDropRejected: fileRejections => {
            const tooMany = fileRejections.every(file => {
                return file.errors[0].code === 'too-many-files';
            });
            if (tooMany) {
                warning({ content: chatT('panel.maxfiles', { number: maxFiles }) });
            }
            else {
                const unSupport = fileRejections
                    .filter(file => {
                    return file.errors[0].code === 'file-invalid-type';
                })
                    .map(file => {
                    return {
                        code: file.errors[0].code,
                        name: file.file.name
                    };
                });
                const tooLarge = fileRejections
                    .filter(file => {
                    return file.errors[0].code === 'file-too-large';
                })
                    .map(file => {
                    return {
                        code: file.errors[0].code,
                        name: file.file.name
                    };
                });
                getRejectdMeassge && getRejectdMeassge(unSupport, tooLarge);
                setFileAlert({
                    visible: true,
                    data: [unSupport, tooLarge]
                });
            }
        },
        onFileDialogOpen: () => {
            if (isChoosingFile) {
                isChoosingFile.current = true;
            }
        },
        onFileDialogCancel: () => {
            if (isChoosingFile) {
                isChoosingFile.current = false;
            }
            if (onFileDialogCancel) {
                onFileDialogCancel();
            }
        }
    });
    return {
        getRootProps,
        getInputProps
    };
};
exports.useDropFiles = useDropFiles;
const useWidgetDropFiles = ({ noDrag, noClick, onFileChange, imPanelChatConfig, from, widgetId, isChoosingFile, onFileDialogCancel, onTrack, disabled = true }) => {
    const setWidgetFileAlert = (0, store_1.useWorkshopStore)(state => state.setWidgetFileAlert);
    const showWidgetDragModal = (0, store_1.useWorkshopStore)(state => state.showWidgetDragModal);
    const uploadedFilesLength = (0, store_1.useWorkshopStore)(state => (state.fileUpload.filesMap[widgetId] || []).length);
    const { success, warning } = (0, useNotification_1.useNotification)();
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const maxFiles = imPanelChatConfig?.embedNumberLimit || 10;
    const acceptTypes = (0, react_1.useMemo)(() => {
        const supportTypes = Array.isArray(imPanelChatConfig?.supportedEmbedTypes)
            ? imPanelChatConfig.supportedEmbedTypes
            : [];
        return getAcceptTypes(supportTypes);
    }, [imPanelChatConfig?.supportedEmbedTypes]);
    const supportedFileTypes = (0, react_1.useMemo)(() => {
        const supportTypes = Array.isArray(imPanelChatConfig?.supportedEmbedTypes)
            ? imPanelChatConfig.supportedEmbedTypes
            : [];
        let res = [];
        for (const type of supportTypes) {
            const localType = serverFileTypes2Local[type];
            if (localType) {
                const mimeMap = enableMIME[localType];
                res = [...res, ...Object.keys(mimeMap)];
            }
        }
        return res;
    }, [imPanelChatConfig?.supportedEmbedTypes]);
    const { fileRejections, getRootProps, getInputProps } = (0, react_dropzone_1.useDropzone)({
        accept: acceptTypes,
        maxFiles,
        noDrag,
        noClick,
        noKeyboard: true,
        disabled: disabled && !(imPanelChatConfig && imPanelChatConfig?.embedNumberLimit > 0),
        maxSize: defaultMaxSize,
        onDragOver: e => {
            showWidgetDragModal(true);
        },
        validator: (file) => {
            const arr = file.name ? file.name.split('.') : file.type ? file.type.split('/') : [];
            if (file.size > defaultMaxSize) {
                return {
                    code: '401',
                    message: `Size is larger than ${defaultMaxSize}!`
                };
            }
            if (arr.length > 1) {
                const ex = arr[arr.length - 1];
                if (!supportedFileTypes.includes(`.${ex.toLowerCase()}`) && !supportedFileTypes.includes('*')) {
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
            if (!acceptedFiles.length) {
                if (isChoosingFile) {
                    isChoosingFile.current = false;
                }
                showWidgetDragModal(false);
                return;
            }
            const fileName = acceptedFiles?.[0].name;
            const fileType = fileName?.substring(fileName.lastIndexOf('.') + 1);
            onTrack?.(fileType, acceptedFiles?.[0]?.size?.toString());
            if (isChoosingFile) {
                isChoosingFile.current = false;
            }
            showWidgetDragModal(false);
            const nextLen = uploadedFilesLength + acceptedFiles.length;
            if (nextLen <= maxFiles) {
                onFileChange(acceptedFiles);
            }
            else {
                warning({ content: chatT('panel.maxfiles', { number: maxFiles }) });
            }
        },
        onDropRejected: fileRejections => {
            const tooMany = fileRejections.every(file => {
                return file.errors[0].code === 'too-many-files';
            });
            if (tooMany) {
                warning({ content: chatT('panel.maxfiles', { number: maxFiles }) });
            }
            else {
                const unSupport = fileRejections
                    .filter(file => {
                    return file.errors[0].code === 'file-invalid-type';
                })
                    .map(file => {
                    return {
                        code: file.errors[0].code,
                        name: file.file.name
                    };
                });
                const tooLarge = fileRejections
                    .filter(file => {
                    return file.errors[0].code === 'file-too-large';
                })
                    .map(file => {
                    return {
                        code: file.errors[0].code,
                        name: file.file.name
                    };
                });
                setWidgetFileAlert({
                    visible: true,
                    data: [unSupport, tooLarge]
                });
            }
        },
        onFileDialogOpen: () => {
            if (isChoosingFile) {
                isChoosingFile.current = true;
            }
        },
        onFileDialogCancel: () => {
            if (isChoosingFile) {
                isChoosingFile.current = false;
            }
            if (onFileDialogCancel) {
                onFileDialogCancel();
            }
        }
    });
    return {
        getRootProps,
        getInputProps
    };
};
exports.useWidgetDropFiles = useWidgetDropFiles;
