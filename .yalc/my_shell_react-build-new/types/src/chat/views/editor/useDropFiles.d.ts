import React from 'react';
import { ContentTypeEnum } from '../../../../../src/apis/common.js';
import { IUploadSettings } from '../../../../../src/chat/model/interfaces.js';
import { FileProps, WidgetFileProps } from '../../../../../src/services/store/index.js';
declare const serverFileTypes: {
    audio: string;
    image: string;
    application: string;
    video: string;
    all: string;
};
type LocalServerFileType = keyof typeof serverFileTypes | 'text';
export declare const getUIFileData: (file: File) => {
    mimeType: LocalServerFileType;
    orginnalMIMEType: string;
    contentType: ContentTypeEnum;
    name: string;
    ex: string;
    serverType: string;
} | undefined;
export declare const getMediaDimension: (data: FileProps | WidgetFileProps) => Promise<{
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
export declare const processWidgetUploadFiles: (widgetId: string, files: File[]) => Promise<(WidgetFileProps | {
    meta: {
        thumbnail: string;
        width?: number | undefined;
        height?: number | undefined;
    };
    file: File;
    status?: string;
    widgetId: string;
    progress?: number;
    type?: string;
    url?: string;
    id: string;
})[]>;
export declare const useDropFiles: ({ noDrag, noClick, onFileChange, imPanelChatConfig, from, botId, isChoosingFile, onFileDialogCancel, onTrack, uploadSettings, disabled, getRejectdMeassge }: {
    noDrag: boolean;
    noClick: boolean;
    onFileChange: (files: File[]) => void;
    imPanelChatConfig: any;
    from: string;
    botId: string;
    disabled?: boolean;
    isChoosingFile?: React.MutableRefObject<boolean>;
    onFileDialogCancel?: () => void;
    uploadSettings?: IUploadSettings;
    onTrack?: (fileType: string, fileSize: string) => void;
    getRejectdMeassge?: (unSupport: any, tooLarge: any) => void;
}) => {
    getRootProps: <T extends import("react-dropzone").DropzoneRootProps>(props?: T) => T;
    getInputProps: <T extends import("react-dropzone").DropzoneInputProps>(props?: T) => T;
};
export declare const useWidgetDropFiles: ({ noDrag, noClick, onFileChange, imPanelChatConfig, from, widgetId, isChoosingFile, onFileDialogCancel, onTrack, disabled }: {
    noDrag: boolean;
    noClick: boolean;
    onFileChange: (files: File[]) => void;
    imPanelChatConfig: any;
    from: string;
    disabled?: boolean;
    widgetId: string;
    isChoosingFile?: React.MutableRefObject<boolean>;
    onFileDialogCancel?: () => void;
    onTrack?: (fileType: string, fileSize: string) => void;
}) => {
    getRootProps: <T extends import("react-dropzone").DropzoneRootProps>(props?: T) => T;
    getInputProps: <T extends import("react-dropzone").DropzoneInputProps>(props?: T) => T;
};
export {};
