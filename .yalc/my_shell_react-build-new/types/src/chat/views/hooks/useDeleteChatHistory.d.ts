import { BotInfo } from '../../../../../src/common/constants/interfaces/bot.js';
export default function useDeleteChatHistory(): {
    deleting: boolean;
    deleteAll: (bot: BotInfo, successCb?: () => void) => Promise<void>;
    deleteSelectedChatHistory: (successCb?: () => void) => Promise<void>;
};
