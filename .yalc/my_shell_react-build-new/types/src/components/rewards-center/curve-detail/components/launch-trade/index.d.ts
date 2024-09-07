import { ICurve } from '../../../../../../../src/apis/apiTypes.js';
import { BotInfo } from '../../../../../../../src/common/constants/interfaces/bot.js';
interface LaunchTradeProps {
    curve?: ICurve;
    botInfo?: BotInfo | null;
    isBlock?: boolean;
}
export default function LaunchTrade(props: LaunchTradeProps): import("react/jsx-runtime").JSX.Element;
export {};
