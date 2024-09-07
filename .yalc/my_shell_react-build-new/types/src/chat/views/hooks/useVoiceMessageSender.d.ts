import { BotInfo } from '../../../../../src/common/constants/interfaces/bot.js';
type P = {
    audioType: string;
    clearRecord: () => void;
    botInfo?: BotInfo | null;
};
export default function useVoiceMessageSender({ audioType, clearRecord, botInfo }: P): {
    sendVoiceMessage: ({ retryText, callback, recordState }?: {
        retryText?: string;
        callback?: () => void;
        recordState?: any;
    }) => Promise<unknown>;
};
export {};
