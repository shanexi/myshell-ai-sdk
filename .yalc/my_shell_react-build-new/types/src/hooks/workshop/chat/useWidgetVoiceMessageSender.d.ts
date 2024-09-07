import { WidgetInfo } from '../../../../../src/common/constants/interfaces/workshop.js';
type P = {
    audioType: string;
    clearRecord: () => void;
    widgetInfo?: WidgetInfo | null;
};
export default function useWidgetVoiceMessageSender({ audioType, clearRecord, widgetInfo }: P): {
    sendVoiceMessage: ({ retryText, callback, recordState }?: {
        retryText?: string;
        callback?: () => void;
        recordState?: any;
    }) => Promise<unknown>;
};
export {};
