import { ChatSettingAudioSpeed, FeedbackState, ImageGenDetail, JobStatusEnum, JobTypeEnum, ServerMessage } from '../chat-new/model/definitions';
import { ChatModuleType } from '../chat/ChatStaticContext';
import { EnergyInfo } from '../common/constants/interfaces/user';
import { ResponseType } from '../core/request/APIFetch';
import { Room, RoomMini } from '../components/room/models/definitions';
export declare function createRoom(): Promise<ResponseType<RoomMini>>;
export declare function removeRoomFromList(id: string): Promise<ResponseType<void>>;
export declare function joinRoom(id: string): Promise<ResponseType<{
    channelId: string;
    joinedAt: string;
}>>;
export declare function getUserCreatedRoomList(): Promise<ResponseType<Room[]>>;
export declare function getRoomInfo(id: string): Promise<ResponseType<Room>>;
export declare function getRoomMessage(id: string, pageSize?: number, nextPageToken?: string): Promise<ResponseType<{
    listResponse: {
        hasMore: boolean;
        nextPageToken: string;
    };
    messageList: ServerMessage[];
}>>;
export declare function markAsRead(id: string): Promise<ResponseType<{
    channelId: string;
    readCount: number;
}>>;
export declare function getBotMessage(id: string, pageSize?: number, nextPageToken?: string): Promise<ResponseType<{
    listResponse: {
        hasMore: boolean;
        nextPageToken: string;
    };
    messageList: ServerMessage[];
}>>;
export declare function clearHistory(type: ChatModuleType, id: string): Promise<ResponseType<void>>;
export declare function deleteHistory(type: ChatModuleType, msgId: string): Promise<ResponseType<void>>;
export declare function messageReport(action: FeedbackState, messageId: string): Promise<ResponseType<void>>;
export declare function messageFeedback(issueType: any, messageId: string, issues: string[], otherDetail: string): Promise<ResponseType<void>>;
export declare function ttsRegen(msgId: string): Promise<ResponseType<{
    duration: number;
    audioUrl: string;
    audioSpeed: ChatSettingAudioSpeed;
    energyInfo: EnergyInfo;
}>>;
export declare function getAsynJobInfo(jobId: string): Promise<ResponseType<{
    data: {
        botId?: string;
        imageGenMessageResponse?: ImageGenDetail;
        message?: ServerMessage;
    };
    jobId: string;
    jobType: JobTypeEnum;
    status: JobStatusEnum;
}>>;
export declare function markMessageAsHandled(msgId: string): Promise<ResponseType<void>>;
export declare function getWidgetMessage(widgetId: string, pageSize?: number, pageToken?: string): Promise<ResponseType<{
    listResponse: {
        hasMore: boolean;
        nextPageToken: string;
    };
    messageList: ServerMessage[];
}>>;
ring;
    };
    messageList: ServerMessage[];
}>>;
