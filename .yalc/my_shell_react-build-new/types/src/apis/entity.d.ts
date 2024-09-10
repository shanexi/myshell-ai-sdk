import { ChatSetting, Message } from '../chat-new/model/definitions';
import { ChatModuleType } from '../chat/ChatStaticContext';
import { ListItem } from '../common/constants/interfaces/entity';
import { WidgetInfo } from '../common/constants/interfaces/workshop';
import { ResponseType } from '../core/request/APIFetch';
export declare function getChatList(): Promise<ResponseType<ListItem[]>>;
export declare function getToolboxList(): Promise<ResponseType<ListItem[]>>;
export declare function getWidgetList(): Promise<ResponseType<ListItem[]>>;
export declare function getUgcBotList(): Promise<ResponseType<ListItem[]>>;
export declare function clearMemory(type: ChatModuleType, id: string): Promise<ResponseType<Message[]>>;
export declare function getBotChatSetting(id: string): Promise<ResponseType<ChatSetting>>;
export declare function updateBotChatSetting(id: string, params: ChatSetting): Promise<ResponseType<ChatSetting & {
    energyPerChat: number;
    energyPerLevelByPass: number[];
}>>;
export declare function getWidgetInfo(widgetId: string): Promise<ResponseType<WidgetInfo | undefined>>;
idgetId: string): Promise<ResponseType<WidgetInfo | undefined>>;
