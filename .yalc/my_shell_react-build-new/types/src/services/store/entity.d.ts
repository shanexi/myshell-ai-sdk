import { PartialDetail } from '../../../../src/chat-new/context/StaticContext.js';
import { ChatSetting } from '../../../../src/chat-new/model/definitions.js';
import { MapKey } from '../../../../src/chat-new/services/useNewChatStore.js';
import { ChatModuleType } from '../../../../src/chat/ChatStaticContext.js';
import { BotInfo } from '../../../../src/common/constants/interfaces/bot.js';
import { ListItem } from '../../../../src/common/constants/interfaces/entity.js';
import { WidgetInfo } from '../../../../src/common/constants/interfaces/workshop.js';
import { Room } from '../../../../src/components/room/models/definitions.js';
export type GetListWithTypeFn<T> = (ListType: ListType, type?: ListActionMode) => Promise<T[]>;
export type ListActionMode = 'initialize' | 'append' | 'remove' | 'silent_update';
export type ListType = Extract<ChatModuleType, 'ugc' | 'widget'> | 'bot-room';
export declare enum ListStatus {
    UNINITIALIZED = 0,
    LOADING = 1,
    READY = 2,
    APPENDING = 3,
    REMOVING = 4,
    ERROR = 5
}
type ListData = {
    status: ListStatus;
    listItems: ListItem[];
};
export type EntityState = {
    listDataMap: Record<ListType, ListData>;
    detailMap: Map<MapKey, BotInfo | WidgetInfo | Room>;
    chatSettingMap: Record<MapKey, ChatSetting>;
};
type EntityActions = {
    setChatList: (type: ListType, list: ListItem[]) => void;
    updateChatListItem: (type: ListType, item: ListItem) => void;
    getChatList: GetListWithTypeFn<ListItem>;
    setDetail: (type: ChatModuleType, id: string, detail: BotInfo | Room | WidgetInfo) => void;
    partialUpdateDetail: (type: ChatModuleType, id: string, partialDetail: PartialDetail) => void;
    setChatSetting: (type: ChatModuleType, id: string, setting: ChatSetting) => void;
};
type EntityStore = EntityState & EntityActions;
type ComputedStore = {
    sumUnReadMessageCount: number;
    chatListStatus: ListStatus;
    chatList: ListItem[];
};
export declare const useEntityStore: import("zustand").UseBoundStore<Omit<Omit<Omit<import("zustand").StoreApi<EntityStore>, "getState" | "getInitialState" | "subscribe" | "destroy"> & Omit<import("zustand").StoreApi<EntityState & EntityActions & ComputedStore>, "setState">, "setState"> & {
    setState(nextStateOrUpdater: (EntityState & EntityActions & ComputedStore) | Partial<EntityState & EntityActions & ComputedStore> | ((state: import("immer").WritableDraft<EntityState & EntityActions & ComputedStore>) => void), shouldReplace?: boolean | undefined): void;
}, "setState"> & {
    setState<A extends string | {
        type: string;
    }>(nextStateOrUpdater: (EntityState & EntityActions & ComputedStore) | Partial<EntityState & EntityActions & ComputedStore> | ((state: import("immer").WritableDraft<EntityState & EntityActions & ComputedStore>) => void), shouldReplace?: boolean | undefined, action?: A | undefined): void;
}>;
export {};
