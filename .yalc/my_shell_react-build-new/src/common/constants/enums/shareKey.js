"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarningDetailChartTimeEnum = exports.StakeDetailOrderByEnum = exports.StakeEarnDataTabEnum = exports.MyStakeDataOrderByEnum = exports.DataChangeStatus = exports.ShareKeyTradeError = exports.ShareKeyStatus = void 0;
var ShareKeyStatus;
(function (ShareKeyStatus) {
    ShareKeyStatus["STATUS_UNSPECIFIED"] = "STATUS_UNSPECIFIED";
    ShareKeyStatus["STATUS_ACTIVE"] = "STATUS_ACTIVE";
    ShareKeyStatus["STATUS_DESTROYED"] = "STATUS_DESTROYED";
})(ShareKeyStatus || (exports.ShareKeyStatus = ShareKeyStatus = {}));
var ShareKeyTradeError;
(function (ShareKeyTradeError) {
    ShareKeyTradeError["ERROR_REASON_SHELL_COIN_NOT_ENOUGH"] = "ERROR_REASON_SHELL_COIN_NOT_ENOUGH";
    ShareKeyTradeError["ERROR_REASON_SHARE_KEY_PRICE_CHANGED"] = "ERROR_REASON_SHARE_KEY_PRICE_CHANGED";
    ShareKeyTradeError["ERROR_REASON_SHARE_KEY_BUY_CD_PER_USER"] = "ERROR_REASON_SHARE_KEY_BUY_CD_PER_USER";
    ShareKeyTradeError["ERROR_REASON_SHARE_KEY_BUY_CD_PER_USER_AND_BOT"] = "ERROR_REASON_SHARE_KEY_BUY_CD_PER_USER_AND_BOT";
    ShareKeyTradeError["ERROR_REASON_SHARE_KEY_STATUS_IS_INVALID"] = "ERROR_REASON_SHARE_KEY_STATUS_IS_INVALID";
    ShareKeyTradeError["ERROR_REASON_SHARE_KEY_NOT_FOUND"] = "ERROR_REASON_SHARE_KEY_NOT_FOUND";
})(ShareKeyTradeError || (exports.ShareKeyTradeError = ShareKeyTradeError = {}));
var DataChangeStatus;
(function (DataChangeStatus) {
    DataChangeStatus["CHANGE_STATUS_NO_CHANGE"] = "CHANGE_STATUS_NO_CHANGE";
    DataChangeStatus["CHANGE_STATUS_INCR"] = "CHANGE_STATUS_INCR";
    DataChangeStatus["CHANGE_STATUS_DECR"] = "CHANGE_STATUS_DECR";
})(DataChangeStatus || (exports.DataChangeStatus = DataChangeStatus = {}));
var MyStakeDataOrderByEnum;
(function (MyStakeDataOrderByEnum) {
    MyStakeDataOrderByEnum["ORDER_BY_UNSPECIFIED"] = "ORDER_BY_UNSPECIFIED";
    MyStakeDataOrderByEnum["ORDER_BY_STAKE_PRICE"] = "ORDER_BY_STAKE_PRICE";
    MyStakeDataOrderByEnum["ORDER_BY_STAKE_AMOUNT"] = "ORDER_BY_STAKE_AMOUNT";
    MyStakeDataOrderByEnum["ORDER_BY_PER_STAKE_EARN_POINT_LAST_7_DAYS"] = "ORDER_BY_PER_STAKE_EARN_POINT_LAST_7_DAYS";
    MyStakeDataOrderByEnum["ORDER_BY_PER_STAKE_EARN_POINT_YESTERDAY"] = "ORDER_BY_PER_STAKE_EARN_POINT_YESTERDAY";
    MyStakeDataOrderByEnum["ORDER_BY_STAKED_SHELL_COIN_CHANGE_RATE_VS_YESTERDAY"] = "ORDER_BY_STAKED_SHELL_COIN_CHANGE_RATE_VS_YESTERDAY";
    MyStakeDataOrderByEnum["ORDER_BY_USER_TOTAL_EARNED_POINTS"] = "ORDER_BY_USER_TOTAL_EARNED_POINTS";
    MyStakeDataOrderByEnum["ORDER_BY_USER_STAKED_SHELL_COIN"] = "ORDER_BY_USER_STAKED_SHELL_COIN";
    MyStakeDataOrderByEnum["ORDER_BY_USER_ROI"] = "ORDER_BY_USER_ROI";
})(MyStakeDataOrderByEnum || (exports.MyStakeDataOrderByEnum = MyStakeDataOrderByEnum = {}));
var StakeEarnDataTabEnum;
(function (StakeEarnDataTabEnum) {
    StakeEarnDataTabEnum["STAT_RANKING_TAB_UNSPECIFIED"] = "STAT_RANKING_TAB_UNSPECIFIED";
    StakeEarnDataTabEnum["STAT_RANKING_TAB_TOP_EARN"] = "STAT_RANKING_TAB_TOP_EARN";
    StakeEarnDataTabEnum["STAT_RANKING_TAB_TOP_ROI"] = "STAT_RANKING_TAB_TOP_ROI";
    StakeEarnDataTabEnum["STAT_RANKING_TAB_TVL"] = "STAT_RANKING_TAB_TVL";
    StakeEarnDataTabEnum["STAT_RANKING_TAB_TVL_SOAR"] = "STAT_RANKING_TAB_TVL_SOAR";
    StakeEarnDataTabEnum["STAT_RANKING_TAB_HOT_BOT"] = "STAT_RANKING_TAB_HOT_BOT";
    StakeEarnDataTabEnum["STAT_RANKING_TAB_TURN_OVER"] = "STAT_RANKING_TAB_TURN_OVER";
    StakeEarnDataTabEnum["STAT_RANKING_TAB_SOAR"] = "STAT_RANKING_TAB_SOAR";
})(StakeEarnDataTabEnum || (exports.StakeEarnDataTabEnum = StakeEarnDataTabEnum = {}));
var StakeDetailOrderByEnum;
(function (StakeDetailOrderByEnum) {
    StakeDetailOrderByEnum["ORDER_BY_RANKING"] = "ORDER_BY_RANKING";
    StakeDetailOrderByEnum["ORDER_BY_TOTAL_EARN_POINT_LAST_7_DAYS"] = "ORDER_BY_TOTAL_EARN_POINT_LAST_7_DAYS";
})(StakeDetailOrderByEnum || (exports.StakeDetailOrderByEnum = StakeDetailOrderByEnum = {}));
var EarningDetailChartTimeEnum;
(function (EarningDetailChartTimeEnum) {
    EarningDetailChartTimeEnum["SEARCH_CHART_TIME_UNSPECIFIED"] = "SEARCH_CHART_TIME_UNSPECIFIED";
    EarningDetailChartTimeEnum["SEARCH_CHART_TIME_ALL_TIME"] = "SEARCH_CHART_TIME_ALL_TIME";
    EarningDetailChartTimeEnum["SEARCH_CHART_TIME_7D"] = "SEARCH_CHART_TIME_7D";
    EarningDetailChartTimeEnum["SEARCH_CHART_TIME_15D"] = "SEARCH_CHART_TIME_15D";
    EarningDetailChartTimeEnum["SEARCH_CHART_TIME_30D"] = "SEARCH_CHART_TIME_30D";
})(EarningDetailChartTimeEnum || (exports.EarningDetailChartTimeEnum = EarningDetailChartTimeEnum = {}));
