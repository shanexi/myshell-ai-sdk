import { ChatSetting, Message } from '../../../src/chat-new/model/definitions.js';
import { ChatModuleType } from '../../../src/chat/ChatStaticContext.js';
import { ListItem } from '../../../src/common/constants/interfaces/entity.js';
import { ResponseType } from '../../../src/core/request/APIFetch.js';
export declare function getChatList(): Promise<ResponseType<ListItem[]>>;
export declare function getWidgetList(): Promise<ResponseType<ListItem[]>>;
export declare function getUgcBotList(): Promise<ResponseType<ListItem[]>>;
export declare function clearMemory(type: ChatModuleType, id: string): Promise<ResponseType<Message[]>>;
export declare function getBotChatSetting(id: string): Promise<ResponseType<ChatSetting>>;
export declare function updateBotChatSetting(id: string, params: ChatSetting): Promise<ResponseType<ChatSetting & {
    energyPerChat: number;
    energyPerLevelByPass: number[];
}>>;
