"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useShareKey;
const dayjs_1 = __importDefault(require("dayjs"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const sharekey_1 = require("../../apis/sharekey.js");
const shareKey_1 = require("../../common/constants/enums/shareKey.js");
const store_1 = require("../../services/store/index.js");
const useNotification_1 = require("../../common/hooks/useNotification.js");
const useShellCoin_1 = __importDefault(require("../user/useShellCoin.js"));
function useShareKey() {
    const [oldStakePrice, setOldStakePrice] = (0, react_1.useState)();
    const [subscribing, setSubscribing] = (0, react_1.useState)(false);
    const [subscribeError, setSubscribeError] = (0, react_1.useState)();
    const [selling, setSelling] = (0, react_1.useState)(false);
    const [sellError, setSellError] = (0, react_1.useState)();
    const [gettingInfo, setGettingInfo] = (0, react_1.useState)(false);
    const setBotShareKeyInfo = (0, store_1.useUserStore)(state => state.setBotShareKeyInfo);
    const [gettingEarnInfo, setGettingEarnInfo] = (0, react_1.useState)(true);
    const [gettingMyStakeData, setGettingMyStakeData] = (0, react_1.useState)(false);
    const [myStakeGettingMore, setMyStakeGettingMore] = (0, react_1.useState)(false);
    const setMyStakeData = (0, store_1.useUserStore)(state => state.setMyStakeData);
    const appendMySubscribeData = (0, store_1.useUserStore)(state => state.appendMyStakeData);
    const [gettingTopEarnData, setGettingTopEarnData] = (0, react_1.useState)(false);
    const setTopEarnData = (0, store_1.useUserStore)(state => state.setTopEarnData);
    const [gettingSoarBotData, setGettingSoarBotData] = (0, react_1.useState)(false);
    const setSoarBotData = (0, store_1.useUserStore)(state => state.setSoarBotData);
    const [gettingHotBotData, setGettingHotBotData] = (0, react_1.useState)(false);
    const setHotBotData = (0, store_1.useUserStore)(state => state.setHotBotData);
    const [gettingPotentialData, setGettingPotentialData] = (0, react_1.useState)(false);
    const setPotentialData = (0, store_1.useUserStore)(state => state.setPotentialData);
    const [gettingTurnoverData, setGettingTurnoverData] = (0, react_1.useState)(false);
    const setTurnoverData = (0, store_1.useUserStore)(state => state.setTurnoverData);
    const [gettingStakeDetail, setGettingStakeDetail] = (0, react_1.useState)(false);
    const [stakeDetailGettingMore, setStakeDetailGettingMore] = (0, react_1.useState)(false);
    const setStakeDetail = (0, store_1.useUserStore)(state => state.setStakeDetail);
    const appendStakeDetail = (0, store_1.useUserStore)(state => state.appendStakeDetail);
    const [gettingEarningDetail, setGettingEarningDetail] = (0, react_1.useState)(false);
    const setEarningDetail = (0, store_1.useUserStore)(state => state.setEarningDetail);
    const [gettingEarningChartData, setGettingEarningChartData] = (0, react_1.useState)(false);
    const setEarningChartData = (0, store_1.useUserStore)(state => state.setEarningChartData);
    const { warning } = (0, useNotification_1.useNotification)();
    const { queryShellCoins } = (0, useShellCoin_1.default)();
    const t = (0, next_intl_1.useTranslations)('share_key');
    const getShareKeyInfoByBotId = async (botId) => {
        try {
            setGettingInfo(true);
            const { data } = await (0, sharekey_1.getShareKeyInfo)(botId);
            setBotShareKeyInfo(botId, data);
            return data;
        }
        catch (e) {
        }
        finally {
            setGettingInfo(false);
        }
    };
    const handleSubscribe = async (wantIndex, wantPrice, botId, successCb) => {
        try {
            setSubscribing(true);
            const { success, reason, ...rest } = await (0, sharekey_1.buyShareKey)(wantIndex, wantPrice, botId);
            if (!success) {
                setSubscribeError(reason);
                if (reason === shareKey_1.ShareKeyTradeError.ERROR_REASON_SHARE_KEY_BUY_CD_PER_USER) {
                    warning({
                        content: t('error_cd', {
                            time: (0, dayjs_1.default)(Number(rest.metadata?.next_time)).format('YYYY-MM-DD HH:mm:ss')
                        })
                    });
                }
                if (reason === shareKey_1.ShareKeyTradeError.ERROR_REASON_SHARE_KEY_BUY_CD_PER_USER_AND_BOT) {
                    warning({
                        content: t('error_cd_per_bot', {
                            time: (0, dayjs_1.default)(Number(rest.metadata?.next_time)).format('YYYY-MM-DD HH:mm:ss')
                        })
                    });
                }
                if (reason === shareKey_1.ShareKeyTradeError.ERROR_REASON_SHARE_KEY_PRICE_CHANGED) {
                    setOldStakePrice(wantPrice);
                    getShareKeyInfoByBotId(botId);
                }
                if (reason === shareKey_1.ShareKeyTradeError.ERROR_REASON_SHELL_COIN_NOT_ENOUGH) {
                    queryShellCoins();
                    getShareKeyInfoByBotId(botId);
                }
                return;
            }
            queryShellCoins();
            getShareKeyInfoByBotId(botId);
            successCb && successCb();
        }
        catch (e) {
        }
        finally {
            setSubscribing(false);
        }
    };
    const handleSell = async (keyId, botId, successCb) => {
        try {
            setSelling(true);
            const { success, data, msg, reason } = await (0, sharekey_1.sellShareKey)(keyId);
            if (!success) {
                setSellError(reason);
                if (reason === shareKey_1.ShareKeyTradeError.ERROR_REASON_SHARE_KEY_PRICE_CHANGED) {
                    getShareKeyInfoByBotId(botId);
                }
                if (reason === shareKey_1.ShareKeyTradeError.ERROR_REASON_SHARE_KEY_STATUS_IS_INVALID ||
                    reason === shareKey_1.ShareKeyTradeError.ERROR_REASON_SHARE_KEY_NOT_FOUND) {
                    warning({
                        content: msg ?? ''
                    });
                }
                return;
            }
            queryShellCoins();
            getShareKeyInfoByBotId(botId);
            successCb && successCb(data.sellOrder.amount);
        }
        catch (e) {
        }
        finally {
            setSelling(false);
        }
    };
    const getMyStakeData = async (callback, pageToken, pageSize, orderBy, orderDesc) => {
        try {
            if (pageToken !== '0') {
                setMyStakeGettingMore(true);
            }
            else {
                setGettingMyStakeData(true);
            }
            const { success, data, msg } = await (0, sharekey_1.getUserStakeBotList)(pageToken ?? '0', pageSize ?? 50, orderBy ?? shareKey_1.MyStakeDataOrderByEnum.ORDER_BY_USER_TOTAL_EARNED_POINTS, orderDesc ?? true);
            if (!success) {
                warning({
                    content: msg ?? ''
                });
                return;
            }
            callback(data.listResponse);
            if (pageToken !== '0') {
                appendMySubscribeData(data.botList);
            }
            else {
                setMyStakeData(data.botList);
            }
        }
        catch (e) {
        }
        finally {
            setMyStakeGettingMore(false);
            setGettingMyStakeData(false);
        }
    };
    const getMyStakeSelectOptions = async (pageToken) => {
        try {
            const { success, data, msg } = await (0, sharekey_1.getUserStakeBotList)(pageToken, 50, shareKey_1.MyStakeDataOrderByEnum.ORDER_BY_USER_TOTAL_EARNED_POINTS, true);
            if (!success) {
                warning({
                    content: msg ?? ''
                });
                return null;
            }
            return {
                options: data.botList.map(b => ({
                    id: b.baseStatInfo.botInfo.id,
                    name: b.baseStatInfo.botInfo.name,
                    logoUrl: b.baseStatInfo.botInfo.logoUrl
                })),
                listResponse: data.listResponse
            };
        }
        catch (e) {
        }
    };
    const getTopEarnData = async () => {
        try {
            setGettingTopEarnData(true);
            const { success, data, msg } = await (0, sharekey_1.getDataByTab)(shareKey_1.StakeEarnDataTabEnum.STAT_RANKING_TAB_TOP_EARN);
            if (!success) {
                warning({
                    content: msg ?? ''
                });
                return;
            }
            setTopEarnData(data);
        }
        catch (e) {
        }
        finally {
            setGettingTopEarnData(false);
        }
    };
    const getHotBotData = async () => {
        try {
            setGettingHotBotData(true);
            const { success, data, msg } = await (0, sharekey_1.getDataByTab)(shareKey_1.StakeEarnDataTabEnum.STAT_RANKING_TAB_TVL);
            if (!success) {
                warning({
                    content: msg ?? ''
                });
                return;
            }
            setHotBotData(data);
        }
        catch (e) {
        }
        finally {
            setGettingHotBotData(false);
        }
    };
    const getPotentialData = async () => {
        try {
            setGettingPotentialData(true);
            const { success, data, msg } = await (0, sharekey_1.getDataByTab)(shareKey_1.StakeEarnDataTabEnum.STAT_RANKING_TAB_TOP_ROI);
            if (!success) {
                warning({
                    content: msg ?? ''
                });
                return;
            }
            setPotentialData(data);
        }
        catch (e) {
        }
        finally {
            setGettingPotentialData(false);
        }
    };
    const getSoarBotData = async () => {
        try {
            setGettingSoarBotData(true);
            const { success, data, msg } = await (0, sharekey_1.getDataByTab)(shareKey_1.StakeEarnDataTabEnum.STAT_RANKING_TAB_TVL_SOAR);
            if (!success) {
                warning({
                    content: msg ?? ''
                });
                return;
            }
            setSoarBotData(data);
        }
        catch (e) {
        }
        finally {
            setGettingSoarBotData(false);
        }
    };
    const getTurnoverData = async () => {
        try {
            setGettingTurnoverData(true);
            const { success, data, msg } = await (0, sharekey_1.getDataByTab)(shareKey_1.StakeEarnDataTabEnum.STAT_RANKING_TAB_TURN_OVER);
            if (!success) {
                warning({
                    content: msg ?? ''
                });
                return;
            }
            setTurnoverData(data);
        }
        catch (e) {
        }
        finally {
            setGettingTurnoverData(false);
        }
    };
    const getStakeDetail = async (callback, pageToken, pageSize, orderBy, orderDesc) => {
        try {
            if (pageToken !== '0') {
                setStakeDetailGettingMore(true);
            }
            else {
                setGettingStakeDetail(true);
            }
            const { success, data, msg } = await (0, sharekey_1.getStakeDetailData)(pageToken ?? '0', pageSize ?? 50, orderBy ?? shareKey_1.StakeDetailOrderByEnum.ORDER_BY_RANKING, orderDesc ?? false);
            if (!success) {
                warning({
                    content: msg ?? ''
                });
                return;
            }
            callback(data.listResponse, data.total);
            if (pageToken !== '0') {
                appendStakeDetail(data.stakeDetailList);
            }
            else {
                setStakeDetail(data.stakeDetailList);
            }
        }
        catch (e) {
        }
        finally {
            setStakeDetailGettingMore(false);
            setGettingStakeDetail(false);
        }
    };
    const getEarningDetail = async () => {
        try {
            setGettingEarningDetail(true);
            const { success, data, msg } = await (0, sharekey_1.getEarningDetailData)();
            if (!success) {
                warning({
                    content: msg ?? ''
                });
                return;
            }
            setEarningDetail(data);
        }
        catch (e) {
        }
        finally {
            setGettingEarningDetail(false);
        }
    };
    const getEarningChart = async (searchTime, botId) => {
        try {
            setGettingEarningChartData(true);
            const { success, data, msg } = await (0, sharekey_1.getEarningDetailChart)(searchTime, botId);
            if (!success) {
                warning({
                    content: msg ?? ''
                });
                return;
            }
            setEarningChartData(data);
        }
        catch (e) {
        }
        finally {
            setGettingEarningChartData(false);
        }
    };
    return {
        gettingInfo,
        getShareKeyInfoByBotId,
        oldStakePrice,
        subscribing,
        handleSubscribe,
        subscribeError,
        selling,
        handleSell,
        sellError,
        gettingEarnInfo,
        gettingMyStakeData,
        myStakeGettingMore,
        getMyStakeData,
        gettingTopEarnData,
        getTopEarnData,
        gettingHotBotData,
        getHotBotData,
        gettingPotentialData,
        getPotentialData,
        gettingSoarBotData,
        getSoarBotData,
        gettingTurnoverData,
        getTurnoverData,
        gettingStakeDetail,
        stakeDetailGettingMore,
        getStakeDetail,
        gettingEarningDetail,
        getEarningDetail,
        gettingEarningChartData,
        getEarningChart,
        getMyStakeSelectOptions
    };
}
