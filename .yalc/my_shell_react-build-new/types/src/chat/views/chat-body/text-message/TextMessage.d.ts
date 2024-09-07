import type { MessageDetail } from '../../../../../../src/chat/model/interfaces.js';
import { WidgetMessageDetail } from '../../../../../../src/common/constants/interfaces/workshop.js';
interface ChatMessageProps {
    chat: MessageDetail | WidgetMessageDetail;
    isMobile?: boolean;
    className?: string;
    showUserMessageActions?: boolean;
}
declare function ChatMessage({ chat, isMobile, className, showUserMessageActions }: ChatMessageProps): import("react/jsx-runtime").JSX.Element;
export default ChatMessage;
