import { ContentTypeEnum } from '../../../../../src/apis/common.js';
import { FileProps, WidgetFileProps } from '../../../../../src/services/store/index.js';
import { serverFileTypes } from './constant';
export declare const serverFileTypes2Local: {
    [k: string]: string;
};
export type ServerFileType = keyof typeof serverFileTypes;
type LocalServerFileType = keyof typeof serverFileTypes | 'text';
export declare const getAcceptTypes: (serverTypes: string[]) => any;
export declare const getUIFileData: (file: File) => {
    icon: string;
    type: string;
    bg: string;
    iconUrl: string;
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
export declare const processUploadFiles: (botId: string, files: File[]) => Promise<{
    file: File;
    status: string;
    id: string;
    botId: string;
    uiData: {
        icon: string;
        type: string;
        bg: string;
        iconUrl: string;
        mimeType: LocalServerFileType;
        orginnalMIMEType: string;
        contentType: ContentTypeEnum;
        name: string;
        ex: string;
        serverType: string;
    } | undefined;
    cancelToken: {};
}[]>;
export declare const processWidgetUploadFiles: (widgetId: string, files: File[]) => Promise<{
    file: File;
    status: string;
    id: string;
    widgetId: string;
    uiData: {
        icon: string;
        type: string;
        bg: string;
        iconUrl: string;
        mimeType: LocalServerFileType;
        orginnalMIMEType: string;
        contentType: ContentTypeEnum;
        name: string;
        ex: string;
        serverType: string;
    } | undefined;
    cancelToken: {};
}[]>;
export {};
