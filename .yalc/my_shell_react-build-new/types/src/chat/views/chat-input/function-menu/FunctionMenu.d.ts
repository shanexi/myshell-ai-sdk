import { BotInfo } from '../../../../../../src/common/constants/interfaces/bot.js';
type P = {
    isWorkshop?: boolean;
    botInfo?: BotInfo | null;
};
declare function FunctionMenu({ isWorkshop, botInfo }: P): import("react/jsx-runtime").JSX.Element;
export default FunctionMenu;
