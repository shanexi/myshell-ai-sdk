import { ChatSetting, ChatSettingSpeakingLangEnum, MessageDetail } from '../../../../src/chat/model/interfaces.js';
import { BannerItemProps } from '../../../../src/common/components/banner/types.js';
import { ActiveType, BotFilters, BotInfo, KolInfo, TagInfo } from '../../../../src/common/constants/interfaces/bot.js';
import { NormalCardProps, RecommendInfo } from '../../../../src/common/model/interfaces.js';
export declare const defaultChatSetting: {
    isAutopushOn: boolean;
    isAudioOn: boolean;
    isAudioPlayOn: boolean;
    isTranscriptionOn: boolean;
    isTranslationOn: boolean;
    speakingLanguage: ChatSettingSpeakingLangEnum;
    audioSpeed: string;
};
export type BotState = {
    updatingBotList: boolean;
    botList: BotInfo[];
    botLastMessageMap: Map<string, MessageDetail>;
    selectedBotList: any[];
    tagList: any[];
    ugcBotList: BotInfo[];
    ownUgcBotList: BotInfo[];
    selectedUgcBotId: string;
    activeType: ActiveType;
    name: string;
    pageToken: string;
    dataPush: boolean;
    filters: BotFilters | null;
    checkedFiltersSet: Set<any>;
    isFromLandingPage: boolean;
    kolInfo: KolInfo | null;
    recommend: {
        banners: BannerItemProps[] | [];
        list: RecommendInfo[] | [];
    };
    tagFilters: TagInfo[];
    searchList: NormalCardProps[];
    botChatSettingMap: Map<string, ChatSetting>;
    homeData: any;
    includeTagIds: string[];
    sseCtrl?: AbortController;
};
export type BotAction = {
    setUpdatingBotList(val: boolean): void;
    setBotList(bots: BotInfo[]): void;
    setOwnUgcBotList(bots: BotInfo[]): void;
    setSelectedUgcBotId: (botId: string) => void;
    batchSetBotLastMessage: (bot: BotInfo[]) => void;
    setBotLastMessage: (botId: string, lastMessage?: MessageDetail) => void;
    reset: () => void;
    setKolInfo(info: KolInfo | null): void;
    setRecommend(recommend: {
        banners: BannerItemProps[] | [];
        list: RecommendInfo[] | [];
    }): void;
    setTagFilters(info: TagInfo[] | []): void;
    setSearchList(info: NormalCardProps[] | []): void;
    setHomeData: (homeData: any) => void;
    setPageToken: (val: string) => void;
    setDataPush: (dataPush: boolean) => void;
    setActiveType: (val: ActiveType) => void;
    setBotChatSetting: (botId: string, chatSetting: ChatSetting) => void;
    clearBotChatSetting: () => void;
    updateBotEnergyPerChat: (botId: string, energyPerChat: number, energyPerLevelByPass: number[]) => void;
    setSSECtrl: (sseCtrl?: AbortController) => void;
};
type BotStore = BotState & BotAction;
type ComputedStore = {
    sumUnReadMessageCount: number;
};
export declare const useBotStore: import("zustand").UseBoundStore<Omit<Omit<Omit<import("zustand").StoreApi<BotStore>, "getState" | "getInitialState" | "subscribe" | "destroy"> & Omit<import("zustand").StoreApi<BotState & BotAction & ComputedStore>, "setState">, "setState"> & {
    setState(nextStateOrUpdater: (BotState & BotAction & ComputedStore) | Partial<BotState & BotAction & ComputedStore> | ((state: import("immer").WritableDraft<BotState & BotAction & ComputedStore>) => void), shouldReplace?: boolean | undefined): void;
}, "setState"> & {
    setState<A extends string | {
        type: string;
    }>(nextStateOrUpdater: (BotState & BotAction & ComputedStore) | Partial<BotState & BotAction & ComputedStore> | ((state: import("immer").WritableDraft<BotState & BotAction & ComputedStore>) => void), shouldReplace?: boolean | undefined, action?: A | undefined): void;
}>;
export {};
