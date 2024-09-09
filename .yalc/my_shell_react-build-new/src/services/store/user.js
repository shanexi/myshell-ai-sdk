"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserStore = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
const immer_1 = require("zustand/middleware/immer");
const zustand_computed_1 = __importDefault(require("zustand-computed"));
const user_1 = require("../../common/constants/enums/user");
const identityService_1 = require("../../common/services/identityService");
const task_1 = require("./task");
const DEFAULT_STATE = {
    user: null,
    token: null,
    inviteCode: '',
    invitationCount: 0,
    validInvitationCount: 0,
    tgValidInvitationCount: 0,
    inviteLink: '',
    retriveEnergySuccess: false,
    energy: 0,
    dailyEnergy: 0,
    isEnergyOverflow: false,
    tgInfo: null,
    connectedAccounts: null,
    userSettingsInfo: [
        {
            name: user_1.UserSettingEnum.FLAG_ICON_REWARD,
            value: '1'
        },
        {
            name: user_1.UserSettingEnum.FLAG_ICON_FORUM,
            value: '1'
        },
        {
            name: user_1.UserSettingEnum.FLAG_TAG_NOTICE,
            value: '1'
        },
        {
            name: user_1.UserSettingEnum.FLAG_USET_FIRST_PUBLISH_GALLERY,
            value: '1'
        },
        {
            name: user_1.UserSettingEnum.FLAG_LLM_MODEL_CONFIG,
            value: '1'
        },
        {
            name: user_1.UserSettingEnum.SHOW_NSFW,
            value: '0'
        },
        {
            name: user_1.UserSettingEnum.FLAG_NSFW_CONFIRMED,
            value: '0'
        },
        {
            name: user_1.UserSettingEnum.FLAG_VOICE_CALL_USED,
            value: '0'
        },
        {
            name: user_1.UserSettingEnum.FLAG_VIDEO_CALL_USED,
            value: '0'
        },
        {
            name: user_1.UserSettingEnum.LAST_SEASON,
            value: '0'
        },
        {
            name: user_1.UserSettingEnum.FLAG_stake_earn_VIEWED,
            value: '1'
        },
        { name: user_1.UserSettingEnum.FLAG_SHARE_KEY_EARN_POPUP_CONFIRMED, value: '0' },
        { name: user_1.UserSettingEnum.NOTIFICATION, value: '0' }
    ],
    rewardsCenterVisited: false,
    forumVisited: false,
    tagNoticeVisited: false,
    flagUserFirstPublishGallery: false,
    flagUserFirstVisitGallery: '0',
    modelConfigClicked: false,
    showNsfw: user_1.NsfwEnum.INIT,
    nsfwConfirmed: false,
    nsfwSwitch: true,
    isVisitor: user_1.VisitorEnum.INIT,
    shellCoins: null,
    frozenShellCoins: null,
    shareKeysBotMap: new Map(),
    myStakeData: [],
    topEarnData: [],
    soarBotData: [],
    hotBotData: [],
    potentialData: [],
    turnoverData: [],
    stakeDetail: [],
    earningDetail: null,
    earningChartData: [],
    loginMethod: undefined
};
const createUSerSlice = set => {
    return {
        ...DEFAULT_STATE,
        setUser(user) {
            set(state => {
                return {
                    user,
                    isVisitor: !state.token || user?.source === user_1.UserSourceEnum.VISITOR ? user_1.VisitorEnum.YES : user_1.VisitorEnum.NO
                };
            }, false, 'setUser');
        },
        setUserInviteCode(inviteCode) {
            set({ inviteCode }, false, 'setUserInviteCode');
        },
        setInvitationCount(invitationCount) {
            set({ invitationCount }, false, 'setInvitationCount');
        },
        setValidInvitationCount(validInvitationCount) {
            set({ validInvitationCount }, false, 'setValidInvitationCount');
        },
        setTgValidInvitationCount(tgValidInvitationCount) {
            set({ tgValidInvitationCount }, false, 'setTgValidInvitationCount');
        },
        setInviteLink(inviteLink) {
            set({ inviteLink }, false, 'setInviteLink');
        },
        setEnergyInfo(data) {
            set(state => {
                state.energy = data.energy;
                state.dailyEnergy = data.dailyEnergy || state.dailyEnergy;
                state.retriveEnergySuccess = true;
            }, false, 'setEnergyInfo');
        },
        setTgInfo(tgInfo) {
            set({ tgInfo }, false, 'setTgInfo');
        },
        setConnectedAccounts(connectedAccounts) {
            set({ connectedAccounts }, false, 'setConnectedAccounts');
        },
        setUserSettingsInfo(userSettingsInfo) {
            set({ userSettingsInfo }, false, 'setUserSettingsInfo');
        },
        clearUser() {
            set(DEFAULT_STATE, false, 'clearUser');
        },
        setIsVisitor(isVisitor) {
            set({ isVisitor }, false, 'setIsVisitor');
        },
        setShowNsfw(showNsfw) {
            set({ showNsfw }, false, 'setShowNsfw');
        },
        setToken(token) {
            set(state => {
                state.token = token;
                state.isVisitor = !token ? user_1.VisitorEnum.YES : user_1.VisitorEnum.NO;
                identityService_1.identityService.setToken(token);
            });
        },
        setShellCoins(coins) {
            set(state => {
                state.shellCoins = coins;
            }, false, 'setShellCoins');
        },
        setFrozenShellCoins(coins) {
            set(state => {
                state.frozenShellCoins = coins;
            }, false, 'setFrozenShellCoins');
        },
        setBotShareKeyInfo(botId, shareKeyInfo) {
            set(state => {
                state.shareKeysBotMap.set(botId, shareKeyInfo);
            }, false, 'setBotShareKeyInfo');
        },
        setMyStakeData(data) {
            set({ myStakeData: data }, false, 'setMyStakeData');
        },
        appendMyStakeData(data) {
            set(state => {
                state.myStakeData = [...state.myStakeData, ...data];
            }, false, 'appendMyStakeData');
        },
        setTopEarnData(data) {
            set({ topEarnData: data }, false, 'setTopEarnData');
        },
        setSoarBotData(data) {
            set({ soarBotData: data }, false, 'setSoarBotData');
        },
        setHotBotData(data) {
            set({ hotBotData: data }, false, 'setHotBotData');
        },
        setPotentialData(data) {
            set({ potentialData: data }, false, 'setPotentialData');
        },
        setTurnoverData(data) {
            set({ turnoverData: data }, false, 'setTurnoverData');
        },
        setStakeDetail(data) {
            set({ stakeDetail: data }, false, 'setStakeDetail');
        },
        appendStakeDetail(data) {
            set(state => {
                state.stakeDetail = [...state.stakeDetail, ...data];
            }, false, 'appendStakeDetail');
        },
        setEarningDetail(data) {
            set({ earningDetail: data }, false, 'setEarningDetail');
        },
        setEarningChartData(data) {
            set({ earningChartData: data }, false, 'setEarningChartData');
        },
        setLoginMethod(method) {
            set({ loginMethod: method }, false, 'setLoginMethod');
        },
        setLoginTimestamp(timestamp) {
            set({ loginTimestamp: timestamp }, false, 'setLoginTimestamp');
        }
    };
};
const computeState = (state) => ({
    userId: state.user?.id,
    premiumInfo: state.user
        ? state.user.premiumInfo
        : {
            level: 0,
            totalExp: 0,
            nextLevelNeedExp: 0,
            currentLevelExp: 5
        },
    isEnergyOverflow: state.energy > state.dailyEnergy,
    rewardsCenterVisited: state.userSettingsInfo.some(s => s.name === user_1.UserSettingEnum.FLAG_ICON_REWARD && s.value === '1'),
    forumVisited: state.userSettingsInfo.some(s => s.name === user_1.UserSettingEnum.FLAG_ICON_FORUM && s.value === '1'),
    tagNoticeVisited: state.userSettingsInfo.some(s => s.name === user_1.UserSettingEnum.FLAG_TAG_NOTICE && s.value === '1'),
    flagUserFirstPublishGallery: state.userSettingsInfo.some(s => s.name === user_1.UserSettingEnum.FLAG_USET_FIRST_PUBLISH_GALLERY && s.value === '1'),
    flagUserFirstVisitGallery: state.userSettingsInfo.find(s => s.name === user_1.UserSettingEnum.FLAG_USET_FIRST_VISIT_GALLERY)?.value || '2',
    modelConfigClicked: state.userSettingsInfo.some(s => s.name === user_1.UserSettingEnum.FLAG_LLM_MODEL_CONFIG),
    nsfwConfirmed: state.userSettingsInfo.some(s => s.name === user_1.UserSettingEnum.FLAG_NSFW_CONFIRMED && s.value === '1'),
    voiceCallUsed: state.userSettingsInfo.some(s => s.name === user_1.UserSettingEnum.FLAG_VOICE_CALL_USED && s.value === '1'),
    videoCallUsed: state.userSettingsInfo.some(s => s.name === user_1.UserSettingEnum.FLAG_VIDEO_CALL_USED && s.value === '1'),
    blockChainGuruTaskOnceCompleted: state.userSettingsInfo.some(s => s.name === user_1.UserSettingEnum.FLAG_COMPLETED_OPBNB_CHAIN_TASK && s.value === '1'),
    silentPeriodConfirmed: state.userSettingsInfo.find(s => s.name === user_1.UserSettingEnum.FLAG_SILENT_PERIOD_CONFIRMED)
        ? state.userSettingsInfo.some(s => s.name === user_1.UserSettingEnum.FLAG_SILENT_PERIOD_CONFIRMED && s.value !== task_1.useTaskStore.getState().seasons?.[1].id)
        : null,
    deductionConfirmed: state.userSettingsInfo.find(({ name }) => name === 'flagDeductionConfirmed')
        ? state.userSettingsInfo.some(s => {
            return s.name === user_1.UserSettingEnum.DEDUCTION_CONFIRMED && s.value !== task_1.useTaskStore.getState().seasons?.[1].id;
        })
        : null,
    subscribingEarnViewed: state.userSettingsInfo.some(s => s.name === user_1.UserSettingEnum.FLAG_stake_earn_VIEWED && s.value === '1'),
    shareKeyEarnPopupConfirmed: state.userSettingsInfo.some(s => s.name === user_1.UserSettingEnum.FLAG_SHARE_KEY_EARN_POPUP_CONFIRMED && s.value === '0') ||
        state.userSettingsInfo.some(s => s.name === user_1.UserSettingEnum.FLAG_SHARE_KEY_EARN_POPUP_CONFIRMED &&
            s.value !== '0' &&
            (0, dayjs_1.default)().isBefore((0, dayjs_1.default)(Number(s.value)))),
    nsfwSwitch: state.nsfwSwitch,
    timezone: state.userSettingsInfo.find(s => s.name === user_1.UserSettingEnum.TIME_ZONE)?.value,
    notification: state.userSettingsInfo.find(s => s.name === user_1.UserSettingEnum.NOTIFICATION)?.value === '1'
});
exports.useUserStore = (0, zustand_1.create)()((0, zustand_computed_1.default)((0, immer_1.immer)((0, middleware_1.devtools)(createUSerSlice, { store: 'user' })), computeState));
