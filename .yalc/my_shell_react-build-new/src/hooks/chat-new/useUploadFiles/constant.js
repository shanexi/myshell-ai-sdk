"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverFileTypes = exports.fileUIData = exports.ex2MIME = exports.enableMIME = exports.defaultMaxSize = void 0;
exports.defaultMaxSize = 50 * 1024 ** 2;
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
exports.ex2MIME = {
    ...exports.enableMIME.audio,
    ...exports.enableMIME.video,
    ...exports.enableMIME.application,
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
    }
};
exports.serverFileTypes = {
    audio: 'MESSAGE_METADATA_TYPE_AUDIO_FILE',
    image: 'MESSAGE_METADATA_TYPE_IMAGE_FILE',
    application: 'MESSAGE_METADATA_TYPE_TEXT_FILE',
    video: 'MESSAGE_METADATA_TYPE_VIDEO_FILE',
    all: 'MESSAGE_METADATA_TYPE_ALL_FILE'
};
