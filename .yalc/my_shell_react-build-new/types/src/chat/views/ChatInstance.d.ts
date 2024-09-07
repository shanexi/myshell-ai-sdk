import { BotInfo } from '../../../../src/common/constants/interfaces/bot.js';
type P = {
    id: string;
    botInfo?: BotInfo;
    className?: string;
};
export default function ChatInstance({ id, botInfo, className }: P): import("react/jsx-runtime").JSX.Element;
export {};
