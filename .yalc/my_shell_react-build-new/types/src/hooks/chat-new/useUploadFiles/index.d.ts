import React from 'react';
import { Message } from '../../../../../src/chat-new/model/definitions.js';
import { BotInfo } from '../../../../../src/common/constants/interfaces/bot.js';
type IProps = {
    imPanelConfig?: BotInfo['imPanelConfig'];
    disabled?: boolean;
    isChoosingFile?: React.MutableRefObject<boolean>;
    onFileDialogCancel?: () => void;
    uploadSettings?: Message['uploadSetting'];
    onTrack?: (fileType: string, fileSize: string) => void;
    botId: string;
};
export declare const useUploadFiles: ({ imPanelConfig, isChoosingFile, onFileDialogCancel, onTrack, uploadSettings, botId, disabled }: IProps) => {
    getDragRootProps: <T extends import("react-dropzone").DropzoneRootProps>(props?: T) => T;
    getClickRootProps: <T extends import("react-dropzone").DropzoneRootProps>(props?: T) => T;
    getInputProps: <T extends import("react-dropzone").DropzoneInputProps>(props?: T) => T;
};
export {};
