import { WidgetInfo } from '../../../../../src/common/constants/interfaces/workshop.js';
export default function useWidgetTextMessageSender(widgetInfo?: WidgetInfo | null): {
    inputLock: boolean;
    textMessage: string;
    setTextMessage: import("react").Dispatch<import("react").SetStateAction<string>>;
    clearTextMessage: () => void;
    sendTextMessage: ({ retryText, requestData, callback, errorCb, closeCb }?: {
        retryText?: string;
        callback?: () => void;
        requestData?: any;
        errorCb?: () => void;
        closeCb?: () => void;
    }) => Promise<unknown>;
};
