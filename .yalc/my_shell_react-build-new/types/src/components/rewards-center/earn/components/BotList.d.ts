import { BotInfo, ReturnedBotInfo } from '../../../../../../src/common/constants/interfaces/bot.js';
export declare function BotListItem({ data, goToChat, isMobile }: {
    index: number;
    isMobile: boolean;
    data: BotInfo;
    goToChat: (botId: string, botName: string, botUid?: string, callback?: () => void) => void;
}): import("react/jsx-runtime").JSX.Element;
export declare function BotList({ isMobile, bots, goToChat }: {
    isMobile: boolean;
    bots: ReturnedBotInfo[];
    goToChat: (botId: string, botName: string, botUid?: string, callback?: () => void) => void;
}): import("react/jsx-runtime").JSX.Element;
