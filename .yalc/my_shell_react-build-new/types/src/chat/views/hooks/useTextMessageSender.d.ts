import { BotInfo } from '../../../../../src/common/constants/interfaces/bot.js';
export declare const LangMap: {
    [key: string]: string;
};
export default function useTextMessageSender(botInfo?: BotInfo | null): {
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
    setTextInput: (botId: string, text: string) => void;
};
export declare const getHeaders: () => Promise<{
    Authorization: string;
    platform: string;
    version: string;
    'Accept-Language': string;
} | {
    'Visitor-Id': string;
    'sc-device-id'?: string;
    'sc-cookie-id'?: string;
    platform: string;
    version: string;
    'Accept-Language': string;
}>;
