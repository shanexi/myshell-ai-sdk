import { BotInfo } from '../../../../../../src/common/constants/interfaces/bot.js';
type P = {
    botId: string;
    botInfo?: BotInfo | null;
    showPin?: boolean;
};
declare function MobileTopActions({ botId, showPin, botInfo }: P): import("react/jsx-runtime").JSX.Element;
export default MobileTopActions;
