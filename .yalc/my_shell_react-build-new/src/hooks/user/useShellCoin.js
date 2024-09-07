"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useShellCoin;
const react_1 = require("react");
const task_1 = require("../../apis/task.js");
const user_1 = require("../../apis/user.js");
const common_helper_1 = require("../../common/utils/common-helper.js");
const store_1 = require("../../services/store/index.js");
function useShellCoin() {
    const shellCoins = (0, store_1.useUserStore)(state => state.shellCoins);
    const exchangePoints = (0, store_1.useTaskStore)(state => state.exchangePoints);
    const setShellCoins = (0, store_1.useUserStore)(state => state.setShellCoins);
    const setFrozenShellCoins = (0, store_1.useUserStore)(state => state.setFrozenShellCoins);
    const setHoldBadges = (0, store_1.useTaskStore)(state => state.setHoldBadges);
    const setExchangePoints = (0, store_1.useTaskStore)(state => state.setExchangePoints);
    const [exchanging, setExchanging] = (0, react_1.useState)(false);
    const [badgeToCoinExchanging, setBadgeToCoinExchanging] = (0, react_1.useState)(false);
    const [querying, setQuerying] = (0, react_1.useState)(false);
    const queryShellCoins = async () => {
        try {
            const { success, data } = await (0, user_1.getShellCoins)();
            if (success) {
                setShellCoins(Number(data.balance));
                setFrozenShellCoins(Number(data.frozenBalance));
            }
        }
        catch (e) {
        }
        finally {
        }
    };
    const queryExchange = async () => {
        try {
            const { success, data } = await (0, task_1.getShellCoinExchange)();
            if (success) {
                setExchangePoints(data);
            }
        }
        catch (e) {
        }
    };
    const exchange = async () => {
        try {
            setExchanging(true);
            return await (0, task_1.exchangeShellCoin)();
        }
        catch (e) {
            return {
                success: false
            };
        }
        finally {
            setExchanging(false);
        }
    };
    const getHoldBadges = async () => {
        try {
            setQuerying(true);
            const { data } = await (0, task_1.getUserHoldBadge)();
            setHoldBadges(data);
        }
        catch (e) {
        }
        finally {
            setQuerying(false);
        }
    };
    const badgeToCoin = async (badges, onClose) => {
        try {
            setBadgeToCoinExchanging(true);
            const { data } = await (0, task_1.badgeToShellCoin)(badges.map(badge => ({
                badgeType: badge.userBackpackItem.item.subType,
                badgeCount: badge.userBackpackItem.count
            })));
            onClose && onClose((0, common_helper_1.numberArraySum)(data.map(d => Number(d.amount))));
        }
        catch (e) {
        }
        finally {
            setBadgeToCoinExchanging(false);
        }
    };
    return {
        shellCoins,
        exchangePoints,
        queryShellCoins,
        queryExchange,
        exchanging,
        exchange,
        badgeToCoinExchanging,
        badgeToCoin,
        querying,
        getHoldBadges,
        getCoinRecords: user_1.getCoinRecords,
    };
}
