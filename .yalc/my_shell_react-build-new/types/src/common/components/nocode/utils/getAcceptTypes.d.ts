import { Accept } from 'react-dropzone';
import { ContentTypeEnum } from '../../../../../../src/apis/common.js';
export declare const ENABLE_MIME: {
    audio: {
        '.mp3': string;
        '.wav': string;
        '.ogg': string;
        '.wma': string;
        '.flac': string;
        '.ape': string;
    };
    video: {
        '.mp4': string;
        '.avi': string;
        '.mov': string;
        '.wmv': string;
        '.flv': string;
    };
    other: {
        '.rtf': string;
        '.md': string;
        '.markdown': string;
        '.pdf': string;
        '.docx': string;
        '.doc': string;
        '.txt': string;
        '.csv': string;
    };
    image: {
        '.apng': string;
        '.png': string;
        '.jpeg': string;
        '.jpg': string;
        '.webp': string;
        '.gif': string;
        '.bmp': string;
        '.tiff': string;
    };
    all: {
        '*': string;
    };
};
export declare const ENABLE_PREVIEW_FILE: string[];
export declare enum IServerFileType {
    MESSAGE_METADATA_TYPE_AUDIO_FILE = "MESSAGE_METADATA_TYPE_AUDIO_FILE",
    MESSAGE_METADATA_TYPE_IMAGE_FILE = "MESSAGE_METADATA_TYPE_IMAGE_FILE",
    MESSAGE_METADATA_TYPE_TEXT_FILE = "MESSAGE_METADATA_TYPE_TEXT_FILE",
    MESSAGE_METADATA_TYPE_VIDEO_FILE = "MESSAGE_METADATA_TYPE_VIDEO_FILE",
    MESSAGE_METADATA_TYPE_ALL_FILE = "MESSAGE_METADATA_TYPE_ALL_FILE"
}
export declare const SERVER_FILE_TYPE: {
    audio: IServerFileType;
    image: IServerFileType;
    other: IServerFileType;
    video: IServerFileType;
    all: IServerFileType;
};
export declare const getLocalTypeBySuffix: (suffix: string) => string;
declare const getAcceptTypes: (serverFileTypes: IServerFileType | IServerFileType[]) => Accept;
declare const getContentType: (file: File) => ContentTypeEnum;
declare const getFileTypesByAccept: (accept: Accept) => string[];
export { getAcceptTypes, getContentType, getFileTypesByAccept };
