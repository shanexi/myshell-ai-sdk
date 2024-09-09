import dayjs from 'dayjs';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import computed from 'zustand-computed';
import { NsfwEnum, UserSettingEnum, UserSourceEnum, VisitorEnum } from '../../common/constants/enums/user.js';
import { identityService } from '../../common/services/identityService.js';
import { useTaskStore } from './task.js';
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
            name: UserSettingEnum.FLAG_ICON_REWARD,
            value: '1'
        },
        {
            name: UserSettingEnum.FLAG_ICON_FORUM,
            value: '1'
        },
        {
            name: UserSettingEnum.FLAG_TAG_NOTICE,
            value: '1'
        },
        {
            name: UserSettingEnum.FLAG_USET_FIRST_PUBLISH_GALLERY,
            value: '1'
        },
        {
            name: UserSettingEnum.FLAG_LLM_MODEL_CONFIG,
            value: '1'
        },
        {
            name: UserSettingEnum.SHOW_NSFW,
            value: '0'
        },
        {
            name: UserSettingEnum.FLAG_NSFW_CONFIRMED,
            value: '0'
        },
        {
            name: UserSettingEnum.FLAG_VOICE_CALL_USED,
            value: '0'
        },
        {
            name: UserSettingEnum.FLAG_VIDEO_CALL_USED,
            value: '0'
        },
        {
            name: UserSettingEnum.LAST_SEASON,
            value: '0'
        },
        {
            name: UserSettingEnum.FLAG_stake_earn_VIEWED,
            value: '1'
        },
        { name: UserSettingEnum.FLAG_SHARE_KEY_EARN_POPUP_CONFIRMED, value: '0' },
        { name: UserSettingEnum.NOTIFICATION, value: '0' }
    ],
    rewardsCenterVisited: false,
    forumVisited: false,
    tagNoticeVisited: false,
    flagUserFirstPublishGallery: false,
    flagUserFirstVisitGallery: '0',
    modelConfigClicked: false,
    showNsfw: NsfwEnum.INIT,
    nsfwConfirmed: false,
    nsfwSwitch: true,
    isVisitor: VisitorEnum.INIT,
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
                    isVisitor: !state.token || user?.source === UserSourceEnum.VISITOR ? VisitorEnum.YES : VisitorEnum.NO
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
                state.isVisitor = !token ? VisitorEnum.YES : VisitorEnum.NO;
                identityService.setToken(token);
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
    rewardsCenterVisited: state.userSettingsInfo.some(s => s.name === UserSettingEnum.FLAG_ICON_REWARD && s.value === '1'),
    forumVisited: state.userSettingsInfo.some(s => s.name === UserSettingEnum.FLAG_ICON_FORUM && s.value === '1'),
    tagNoticeVisited: state.userSettingsInfo.some(s => s.name === UserSettingEnum.FLAG_TAG_NOTICE && s.value === '1'),
    flagUserFirstPublishGallery: state.userSettingsInfo.some(s => s.name === UserSettingEnum.FLAG_USET_FIRST_PUBLISH_GALLERY && s.value === '1'),
    flagUserFirstVisitGallery: state.userSettingsInfo.find(s => s.name === UserSettingEnum.FLAG_USET_FIRST_VISIT_GALLERY)?.value || '2',
    modelConfigClicked: state.userSettingsInfo.some(s => s.name === UserSettingEnum.FLAG_LLM_MODEL_CONFIG),
    nsfwConfirmed: state.userSettingsInfo.some(s => s.name === UserSettingEnum.FLAG_NSFW_CONFIRMED && s.value === '1'),
    voiceCallUsed: state.userSettingsInfo.some(s => s.name === UserSettingEnum.FLAG_VOICE_CALL_USED && s.value === '1'),
    videoCallUsed: state.userSettingsInfo.some(s => s.name === UserSettingEnum.FLAG_VIDEO_CALL_USED && s.value === '1'),
    blockChainGuruTaskOnceCompleted: state.userSettingsInfo.some(s => s.name === UserSettingEnum.FLAG_COMPLETED_OPBNB_CHAIN_TASK && s.value === '1'),
    silentPeriodConfirmed: state.userSettingsInfo.find(s => s.name === UserSettingEnum.FLAG_SILENT_PERIOD_CONFIRMED)
        ? state.userSettingsInfo.some(s => s.name === UserSettingEnum.FLAG_SILENT_PERIOD_CONFIRMED && s.value !== useTaskStore.getState().seasons?.[1].id)
        : null,
    deductionConfirmed: state.userSettingsInfo.find(({ name }) => name === 'flagDeductionConfirmed')
        ? state.userSettingsInfo.some(s => {
            return s.name === UserSettingEnum.DEDUCTION_CONFIRMED && s.value !== useTaskStore.getState().seasons?.[1].id;
        })
        : null,
    subscribingEarnViewed: state.userSettingsInfo.some(s => s.name === UserSettingEnum.FLAG_stake_earn_VIEWED && s.value === '1'),
    shareKeyEarnPopupConfirmed: state.userSettingsInfo.some(s => s.name === UserSettingEnum.FLAG_SHARE_KEY_EARN_POPUP_CONFIRMED && s.value === '0') ||
        state.userSettingsInfo.some(s => s.name === UserSettingEnum.FLAG_SHARE_KEY_EARN_POPUP_CONFIRMED &&
            s.value !== '0' &&
            dayjs().isBefore(dayjs(Number(s.value)))),
    nsfwSwitch: state.nsfwSwitch,
    timezone: state.userSettingsInfo.find(s => s.name === UserSettingEnum.TIME_ZONE)?.value,
    notification: state.userSettingsInfo.find(s => s.name === UserSettingEnum.NOTIFICATION)?.value === '1'
});
export const useUserStore = create()(computed(immer(devtools(createUSerSlice, { store: 'user' })), computeState));
