"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTaskStore = void 0;
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
const immer_1 = require("zustand/middleware/immer");
const zustand_computed_1 = __importDefault(require("zustand-computed"));
const task_1 = require("../../common/constants/enums/task");
const DEFAULT_STATE = {
    seasons: null,
    seasonIndex: 0,
    taskList: [],
    newlyPropsCount: 0,
    points: [],
    claimedPoints: 0,
    exchangePoints: [],
    myProps: [],
    deductionPoints: null,
    seasonPassUseSuccessModalVisible: false,
    holdBadges: [],
    txHash: undefined,
    blockChainInteractionState: 'not_start',
    rewardList: [],
    rewardQuerying: true,
    myPropsQuerying: true,
};
const createTaskSlice = set => {
    return {
        ...DEFAULT_STATE,
        setUnclaimedPoints(points) {
            set({ unclaimedPoints: points }, false, 'setUnclaimedPoints');
        },
        setExchangePoints(points) {
            set({ exchangePoints: points }, false, 'setExchangePoints');
        },
        setSeasons(season, lastSeason) {
            set({ seasons: [season, lastSeason] }, false, 'setSeasons');
        },
        setSeasonIndex(index) {
            set({ seasonIndex: index }, false, 'setSeasonIndex');
        },
        setTaskList(taskList) {
            set({ taskList }, false, 'setTaskList');
        },
        setPoints(points, addToClaimed = false) {
            set({ points }, false, 'setPoints');
        },
        clearClaimedPoints() {
            set({ claimedPoints: 0 }, false, 'clearClaimedPoints');
        },
        setMyProps(myProps) {
            set({ myProps }, false, 'setMyProps');
        },
        setNewlyPropsCount(newlyPropsCount) {
            set({ newlyPropsCount }, false, 'setNewlyPropsCount');
        },
        setDeductionPoints(points) {
            set({ deductionPoints: points }, false, 'setDeductionPoints');
        },
        setSeasonPassUseSuccessModalVisible(state) {
            set({ seasonPassUseSuccessModalVisible: state }, false, 'setSeasonPassUseSuccessModalVisible');
        },
        setHoldBadges(badges) {
            set(state => {
                state.holdBadges = badges;
            }, false, 'setHoldBadges');
        },
        setTxHash(hash) {
            set({ txHash: hash }, false, 'setTxHash');
        },
        setBlockChainInteractionState(state) {
            set({ blockChainInteractionState: state }, false, 'setBlockChainInteractionState');
        },
        setRewardList(rewardList) {
            set({ rewardList }, false, 'setRewardList');
        },
        setRewardQuerying(rewardQuerying) {
            set({ rewardQuerying }, false, 'setRewardQuering');
        },
        setMyPropsQuerying(myPropsQuerying) {
            set({ myPropsQuerying }, false, 'setMyPropsQuerying');
        },
    };
};
const computeState = (state) => ({
    seasonId: state.seasons ? state.seasons[state.seasonIndex]?.id : null,
    seasonName: state.seasons ? state.seasons[state.seasonIndex]?.name : null,
    isBeta: state.seasons ? state.seasons[state.seasonIndex]?.isBate : null,
    seasonBanners: state.seasons ? [state.seasons[state.seasonIndex]?.bannerPcLight, state.seasons[state.seasonIndex]?.bannerPcDark, state.seasons[state.seasonIndex]?.bannerMobileLight, state.seasons[state.seasonIndex]?.bannerMobileDark] : null,
    seasonStartDate: state.seasons ? state.seasons[state.seasonIndex]?.startDate ?? null : null,
    seasonEndDate: state.seasons ? state.seasons[state.seasonIndex]?.endDate ?? null : null,
    claimableStartDate: state.seasons ? state.seasons[state.seasonIndex]?.claimableStart ?? null : null,
    claimableEndDate: state.seasons ? state.seasons[state.seasonIndex]?.claimableEnd ?? null : null,
    silentPeriodEndDate: state.seasons ? state.seasons[state.seasonIndex]?.silentPeriodEnd ?? null : null,
    hasClaimableTask: state.taskList.some(task => task.status === task_1.GolangUserTaskStatusEnum.SEASON_TASK_ITEM_STATUS_CLAIMABLE),
    seasonPoints: Array.isArray(state.points) ? state.points[state.seasonIndex] : undefined
});
exports.useTaskStore = (0, zustand_1.create)()((0, zustand_computed_1.default)((0, immer_1.immer)((0, middleware_1.devtools)(createTaskSlice, { store: 'task' })), computeState));
