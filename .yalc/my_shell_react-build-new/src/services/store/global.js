"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGlobalStore = void 0;
const zustand_1 = require("zustand");
const zustand_computed_1 = __importDefault(require("zustand-computed"));
const middleware_1 = require("zustand/middleware");
const immer_1 = require("zustand/middleware/immer");
const identityService_1 = require("../../common/services/identityService.js");
var THEME;
(function (THEME) {
    THEME["light"] = "light";
    THEME["dark"] = "dark\t";
})(THEME || (THEME = {}));
const DEFAULT_STATE = {
    theme: THEME.light,
    sideBarVisible: true,
    isToInviteArea: false,
    isOpenLoginModal: false,
    cantCloseLogin: false,
    cantCloseMigrationModals: true,
    guiding: false,
    isOpenTwitterBindModal: false,
    emailConnectLoading: false,
    isOpenInvalidModal: false,
    isOpenInviteCodeModal: false,
    isOpenEmailBindingModal: false,
    isOpenLoginTypeTipModal: false,
    showForumSide: false,
    showChatBotRecommend: false,
    isOpenRecoveryFailModal: false,
    isOpenStartNewCoinModal: false,
    inviteCodeStep: 1,
    loadingCount: 0,
    language: 'en',
    createAutoPromptTaskResult: null,
    noEnergyWithUsablePropModalVisible: false,
    twitterChecker: null,
    onboarding: false,
    migrationTipModalDisplayed: true
};
const createGlobalSlice = set => {
    return {
        ...DEFAULT_STATE,
        toggleTheme(theme) {
            set({ theme }, false, 'toggleTheme');
        },
        toggleSideBar(sideBarVisible) {
            set({ sideBarVisible }, false, 'toggleSideBar');
        },
        goToInviteArea(isToInviteArea) {
            set({ isToInviteArea }, false, 'goToInviteArea');
        },
        globalLoading() {
            set(state => {
                state.loadingCount++;
            }, false, 'globalLoading');
        },
        globalLoaded() {
            set(state => {
                const count = state.loadingCount - 1;
                state.loadingCount = count < 0 ? 0 : count;
            }, false, 'globalLoaded');
        },
        toggleLoginModal(isOpenLoginModal) {
            set(state => {
                state.isOpenLoginModal = isOpenLoginModal;
                if (!isOpenLoginModal) {
                    state.cantCloseLogin = false;
                }
            }, false, 'toggleLoginModal');
        },
        toggleTwitterBindModal(isOpenTwitterBindModal) {
            set({ isOpenTwitterBindModal }, false, 'toggleTwitterBindModal');
        },
        setGuiding(guiding) {
            set({ guiding }, false, 'setGuiding');
        },
        toggleEmailBindingModal(isOpenEmailBindingModal) {
            set({ isOpenEmailBindingModal }, false, 'toggleEmailBindingModal');
        },
        toggleLoginTypeTipModal(isOpenLoginTypeTipModal) {
            set({ isOpenLoginTypeTipModal }, false, 'toggleLoginTypeTipModal');
        },
        setShowForumSide(showForumSide) {
            set({ showForumSide }, false, 'setShowForumSide');
        },
        setShowChatBotRecommend(showChatBotRecommend) {
            set({ showChatBotRecommend }, false, 'setShowChatBotRecommend');
        },
        toggleInvalidModal(isOpenInvalidModal) {
            set({ isOpenInvalidModal }, false, 'toggleInvalidModal');
        },
        toggleInvitecodeModal(isOpenInviteCodeModal) {
            set({ isOpenInviteCodeModal }, false, 'toggleInvitecodeModal');
        },
        toggleRecoveryFailModal(isOpenRecoveryFailModal) {
            set({ isOpenRecoveryFailModal }, false, 'toggleInvitecodeModal');
        },
        toggleStartNewCoinModal(isOpenStartNewCoinModal) {
            set({ isOpenStartNewCoinModal }, false, 'toggleStartNewCoinModal');
        },
        setInviteCodeStep(step) {
            set({ inviteCodeStep: step }, false, 'setInviteCodeStep');
        },
        setAutoPromptTaskResult(createAutoPromptTaskResult) {
            set({ createAutoPromptTaskResult }, false, 'setAutoPromptTaskResult');
        },
        setLanguage(language) {
            set(state => {
                state.language = language;
                identityService_1.identityService.setLanguage(language);
            }, false, 'setLanguage');
        },
        setNoEnergyWithUsablePropModalVisible(visible) {
            set(state => {
                state.noEnergyWithUsablePropModalVisible = visible;
            }, false, 'setNoEnergyWithUsablePropModalVisible');
        },
        showOnboarding(val) {
            set(state => {
                state.onboarding = val;
            }, false, 'showOnboarding');
        },
        setNeteaseRequestToken(val) {
            set(state => {
                state.neteaseRequestToken = val;
            }, false, 'setNeteaseRequestToken');
        }
    };
};
const computeState = (state) => ({
    isGlobalLoading: state.loadingCount > 0
});
exports.useGlobalStore = (0, zustand_1.create)()((0, zustand_computed_1.default)((0, immer_1.immer)((0, middleware_1.devtools)(createGlobalSlice, { store: 'global' })), computeState));
