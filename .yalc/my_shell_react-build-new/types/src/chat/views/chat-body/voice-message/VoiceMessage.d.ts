import type { MessageDetail } from '../../../../../../src/chat/model/interfaces.js';
import { BotInfo } from '../../../../../../src/common/constants/interfaces/bot.js';
import { WidgetMessageDetail } from '../../../../../../src/common/constants/interfaces/workshop.js';
interface Props {
    chat: MessageDetail | WidgetMessageDetail;
    blobDuration?: number;
    botInfo?: BotInfo | null;
}
export default function VoiceMessage({ chat, blobDuration, botInfo }: Props): import("react/jsx-runtime").JSX.Element;
export {};
