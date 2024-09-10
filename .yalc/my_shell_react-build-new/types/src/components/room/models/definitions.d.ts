import { ServerMessage } from '../../../chat-new/model/definitions';
export declare enum LocalRoomStatus {
    OTHER_SIDE_NO_ENERGY = "OTHER_SIDE_NO_ENERGY"
}
export declare enum RoomStatus {
    OPEN = "CHANNEL_STATUS_OPEN",
    CLOSED = "CHANNEL_STATUS_CLOSED"
}
export declare enum RoomMemberStatus {
    ACTIVE = "CHANNEL_MEMBER_STATUS_ACTIVE",
    LEAVE = "CHANNEL_MEMBER_STATUS_LEAVE"
}
type MemberInfo = {
    memberId: string;
    memberName: string;
    isBot: boolean;
    avatar: string;
    nameTag: string;
    isVisitor: boolean;
    status: RoomMemberStatus;
};
export type Room = {
    channelId: string;
    channelName: string;
    creatorId: string;
    channelStatus: RoomStatus | LocalRoomStatus;
    invitationUrl: string;
    invitationImgUrl: string;
    isCreator: boolean;
    unreadCount: number;
    memberList: MemberInfo[];
    lastMessage?: ServerMessage;
    createdDateUnix?: string;
};
export type RoomMini = Pick<Room, 'channelId' | 'channelName' | 'channelStatus' | 'invitationUrl' | 'invitationImgUrl' | 'createdDateUnix'>;
export {};
;
export {};
