import { BotInfo } from '../../../../../../src/common/constants/interfaces/bot.js';
type P = {
    botId: string;
    botInfo?: BotInfo | null;
    showBackArrow?: boolean;
    showPin?: boolean;
};
declare function TopActions({ botId, showBackArrow, showPin, botInfo }: P): import("react/jsx-runtime").JSX.Element;
export default TopActions;
