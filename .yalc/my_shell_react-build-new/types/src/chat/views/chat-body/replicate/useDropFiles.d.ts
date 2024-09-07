import React from 'react';
import { ContentTypeEnum } from '../../../../../../src/apis/common.js';
import { FileProps } from '../../../../../../src/services/store/index.js';
export declare const enableMIME: {
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
        '.png': string;
        '.jpeg': string;
        '.jpg': string;
    };
    all: {
        '*': string;
    };
};
export declare const ex2MIME: {
    '*': string;
    '.png': string;
    '.jpeg': string;
    '.jpg': string;
    '.rtf': string;
    '.md': string;
    '.markdown': string;
    '.pdf': string;
    '.docx': string;
    '.doc': string;
    '.txt': string;
    '.csv': string;
    '.mp4': string;
    '.avi': string;
    '.mov': string;
    '.wmv': string;
    '.flv': string;
    '.mp3': string;
    '.wav': string;
    '.ogg': string;
    '.wma': string;
    '.flac': string;
    '.ape': string;
};
export declare const fileUIData: {
    md: {
        icon: string;
        type: string;
        bg: string;
        iconUrl: string;
    };
    markdown: {
        icon: string;
        type: string;
        bg: string;
        iconUrl: string;
    };
    pdf: {
        icon: string;
        type: string;
        bg: string;
        iconUrl: string;
    };
    docx: {
        icon: string;
        type: string;
        bg: string;
        iconUrl: string;
    };
    doc: {
        icon: string;
        type: string;
        bg: string;
        iconUrl: string;
    };
    txt: {
        icon: string;
        type: string;
        bg: string;
        iconUrl: string;
    };
    csv: {
        icon: string;
        type: string;
        bg: string;
        iconUrl: string;
    };
    other: {
        icon: string;
        type: string;
        bg: string;
        iconUrl: string;
    };
    all: {
        icon: string;
        type: string;
        bg: string;
        iconUrl: string;
    };
};
export declare const serverFileTypes: {
    audio: string;
    image: string;
    other: string;
    video: string;
    all: string;
};
export type LocalServerFileType = keyof typeof serverFileTypes | 'text';
export declare const getAcceptTypes: (serverTypes: string[]) => any;
export declare const getFileTypes: (serverTypes: string[]) => string[];
export declare const getUIFileData: (file: File) => {
    mimeType: LocalServerFileType;
    orginnalMIMEType: string;
    contentType: ContentTypeEnum;
    name: string;
    ex: string;
    serverType: string;
} | undefined;
export declare const getMediaDimension: (data: FileProps) => Promise<{
    width: number;
    height: number;
} | null>;
export declare const processUploadFiles: (botId: string, files: File[]) => Promise<(FileProps | {
    meta: {
        thumbnail: string;
        width?: number | undefined;
        height?: number | undefined;
    };
    file: File;
    status?: string;
    botId: string;
    progress?: number;
    type?: string;
    url?: string;
    id: string;
})[]>;
export declare const useDropFiles: ({ onFileChange, from, botId, isChoosingFile, types, setFile, fileMaxSize }: {
    onFileChange: (files: File[]) => void;
    from: string;
    botId: string;
    isChoosingFile?: React.MutableRefObject<boolean>;
    types?: string[];
    setFile: (data?: any) => void;
    fileMaxSize?: number;
}) => {
    getRootProps: <T extends import("react-dropzone").DropzoneRootProps>(props?: T) => T;
    getInputProps: <T extends import("react-dropzone").DropzoneInputProps>(props?: T) => T;
};
