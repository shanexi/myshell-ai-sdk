import { AutoPromptTaskOutput } from '../../../../src/common/constants/interfaces/bot';
declare enum THEME {
    light = "light",
    dark = "dark\t"
}
export type TwitterChecker = {
    tweetId: string;
    status: string;
    date: number;
};
export type InviteCodeStep = 1 | 2 | 3 | 4 | 5;
export type GlobalState = {
    theme: THEME;
    sideBarVisible: boolean;
    isToInviteArea: boolean;
    isOpenLoginModal: boolean;
    cantCloseLogin: boolean;
    cantCloseMigrationModals: boolean;
    guiding: boolean;
    isOpenTwitterBindModal: boolean;
    emailConnectLoading: boolean;
    isOpenInvalidModal: boolean;
    isOpenInviteCodeModal: boolean;
    isOpenEmailBindingModal: boolean;
    isOpenLoginTypeTipModal: boolean;
    showForumSide: boolean;
    showChatBotRecommend: boolean;
    isOpenRecoveryFailModal: boolean;
    isOpenStartNewCoinModal: boolean;
    inviteCodeStep: InviteCodeStep;
    loadingCount: number;
    language: string;
    createAutoPromptTaskResult: AutoPromptTaskOutput | null;
    noEnergyWithUsablePropModalVisible: boolean;
    twitterChecker: TwitterChecker | null;
    onboarding: boolean;
    neteaseRequestToken?: string;
};
type GlobalActions = {
    toggleTheme(theme: THEME): void;
    toggleSideBar(visible?: boolean): void;
    goToInviteArea(state: boolean): void;
    globalLoading(): void;
    globalLoaded(): void;
    toggleLoginModal(state: boolean): void;
    toggleTwitterBindModal(state: boolean): void;
    setGuiding(state: boolean): void;
    toggleInvalidModal(state: boolean): void;
    toggleInvitecodeModal(state: boolean): void;
    toggleEmailBindingModal(state: boolean): void;
    toggleLoginTypeTipModal(state: boolean): void;
    setShowForumSide(state: boolean): void;
    setShowChatBotRecommend(state: boolean): void;
    toggleRecoveryFailModal(state: boolean): void;
    toggleStartNewCoinModal(state: boolean): void;
    setInviteCodeStep(step: InviteCodeStep): void;
    setLanguage(language: string): void;
    setAutoPromptTaskResult(val: AutoPromptTaskOutput | null): void;
    setNoEnergyWithUsablePropModalVisible(visible: boolean): void;
    showOnboarding(val: boolean): void;
    setNeteaseRequestToken(val: string): void;
};
type GlobalStore = GlobalState & GlobalActions;
type ComputedStore = {
    isGlobalLoading: boolean;
};
export declare const useGlobalStore: import("zustand").UseBoundStore<Omit<Omit<Omit<import("zustand").StoreApi<GlobalStore>, "getState" | "getInitialState" | "subscribe" | "destroy"> & Omit<import("zustand").StoreApi<GlobalState & GlobalActions & ComputedStore>, "setState">, "setState"> & {
    setState(nextStateOrUpdater: (GlobalState & GlobalActions & ComputedStore) | Partial<GlobalState & GlobalActions & ComputedStore> | ((state: import("immer").WritableDraft<GlobalState & GlobalActions & ComputedStore>) => void), shouldReplace?: boolean | undefined): void;
}, "setState"> & {
    setState<A extends string | {
        type: string;
    }>(nextStateOrUpdater: (GlobalState & GlobalActions & ComputedStore) | Partial<GlobalState & GlobalActions & ComputedStore> | ((state: import("immer").WritableDraft<GlobalState & GlobalActions & ComputedStore>) => void), shouldReplace?: boolean | undefined, action?: A | undefined): void;
}>;
export {};
