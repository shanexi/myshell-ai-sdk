import { BotInfo } from '../../../../src/common/constants/interfaces/bot.js';
export default function useChangeBotList(botInfo?: BotInfo | null): {
    setBotPinned: (pinned: boolean) => Promise<void>;
    removing: boolean;
    removeBot: (callback?: () => void) => Promise<void>;
    pinActing: boolean;
};
