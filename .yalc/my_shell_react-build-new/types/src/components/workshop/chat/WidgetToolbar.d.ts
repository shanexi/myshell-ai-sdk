import React from 'react';
import { WidgetInfo } from '../../../../../src/common/constants/interfaces/workshop.js';
export declare const ChooseFileButton: React.MemoExoticComponent<({ onFileChange, imPanelChatConfig, widgetId, widgetName, disabled, isChoosingFile, showDialog, onFileDialogCancel }: {
    onFileChange: (files: File[]) => void;
    imPanelChatConfig: any;
    widgetId: string;
    widgetName: string;
    disabled: boolean;
    isChoosingFile?: React.MutableRefObject<boolean>;
    showDialog?: boolean;
    onFileDialogCancel: () => void;
}) => import("react/jsx-runtime").JSX.Element>;
export declare function Expand({ isFullScreen, toogleFullScreen }: {
    isFullScreen: boolean;
    toogleFullScreen: () => void;
}): import("react/jsx-runtime").JSX.Element;
type WidgetToolbarProps = {
    toolbarState: any;
    widgetId: string;
    widgetInfo: WidgetInfo | null | undefined;
    imPanelChatConfig: any;
    onSendClick: () => void;
    isMobile?: boolean;
    isChoosingFile?: React.MutableRefObject<boolean>;
    onFileChange: (files: File[]) => Promise<void>;
    onFileDialogCancel: () => void;
};
declare function WidgetToolbar({ widgetId, widgetInfo, imPanelChatConfig, onSendClick, toolbarState, isMobile, isChoosingFile, onFileChange, onFileDialogCancel }: WidgetToolbarProps): import("react/jsx-runtime").JSX.Element;
declare const _default: React.MemoExoticComponent<typeof WidgetToolbar>;
export default _default;
