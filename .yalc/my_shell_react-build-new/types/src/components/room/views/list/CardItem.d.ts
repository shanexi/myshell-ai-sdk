import { ChatModuleType } from '../../../../../../src/chat/ChatStaticContext.js';
import { ListLastMessage } from '../../../../../../src/common/constants/interfaces/entity.js';
type CardItemProps = {
    type: ChatModuleType;
    active: boolean;
    id: string;
    name: string;
    logoUrl?: string;
    logoUrls?: string[];
    isOfficial?: boolean;
    desc?: string;
    lastMsg?: ListLastMessage;
    unreadCount?: number;
    pinned?: boolean;
    isChannelEntry?: boolean;
};
export default function CardItem({ type, active, id, name, logoUrl, logoUrls, isOfficial, desc, lastMsg, unreadCount, pinned, isChannelEntry }: CardItemProps): import("react/jsx-runtime").JSX.Element;
export {};
