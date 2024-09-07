import { BotInfo } from '../../../../src/common/constants/interfaces/bot.js';
interface P {
    botId: string;
    botInfo: BotInfo;
    className?: string;
}
export default function GalleryPage({ botId, botInfo, className }: P): import("react/jsx-runtime").JSX.Element;
export {};
