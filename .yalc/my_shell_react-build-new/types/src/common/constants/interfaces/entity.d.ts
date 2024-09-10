import { ChatModuleType } from '../../../chat/ChatStaticContext';
export interface EntityBase {
    id: string;
    name: string;
    description?: string;
    logoUrl?: string;
}
export interface BotInfoV2 extends EntityBase {
    isOfficial?: boolean;
}
export type ServerListItem = {
    bot?: {
        botId: string;
        name: string;
        logoUrl: string;
        isOfficial: boolean;
        visitorCanChat: boolean;
        pinned: boolean;
        isChannelEntry: boolean;
        unreadMessageCount: number;
        lastMessage?: ListLastMessage;
    };
    room?: {
        roomId: string;
        name: string;
        logoUrls: string[];
        unreadMessageCount: number;
        lastMessage?: ListLastMessage;
    };
};
export type ListLastMessage = {
    createdDateUnix: string;
    text: string;
};
export type ListItem = {
    type: ChatModuleType;
    id: string;
    name: string;
    unreadMessageCount?: number;
    lastMessage?: ListLastMessage;
    logoUrl?: string;
    isOfficial?: boolean;
    visitorCanChat?: boolean;
    pinned?: boolean;
    isChannelEntry?: boolean;
    logoUrls?: string[];
};
string[];
};
