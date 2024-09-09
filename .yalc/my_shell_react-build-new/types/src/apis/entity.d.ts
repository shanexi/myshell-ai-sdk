import { ChatSetting, Message } from '../../../src/chat-new/model/definitions';
import { ChatModuleType } from '../../../src/chat/ChatStaticContext';
import { ListItem } from '../../../src/common/constants/interfaces/entity';
import { ResponseType } from '../../../src/core/request/APIFetch';
export declare function getChatList(): Promise<ResponseType<ListItem[]>>;
export declare function getWidgetList(): Promise<ResponseType<ListItem[]>>;
export declare function getUgcBotList(): Promise<ResponseType<ListItem[]>>;
export declare function clearMemory(type: ChatModuleType, id: string): Promise<ResponseType<Message[]>>;
export declare function getBotChatSetting(id: string): Promise<ResponseType<ChatSetting>>;
export declare function updateBotChatSetting(id: string, params: ChatSetting): Promise<ResponseType<ChatSetting & {
    energyPerChat: number;
    energyPerLevelByPass: number[];
}>>;
