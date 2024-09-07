"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ShareKeyInfo;
const jsx_runtime_1 = require("react/jsx-runtime");
const navigation_1 = require("next/navigation");
const react_use_1 = require("react-use");
const sensors_1 = require("../../../../../../../../lib/sensors/index.js");
const TradingDetailTab_1 = __importDefault(require("../../modal/TradingDetailTab.js"));
const ShareKeySkeleton_1 = __importDefault(require("./skeleton/ShareKeySkeleton.js"));
const stake_trend_1 = __importDefault(require("./stake-trend/index.js"));
function ShareKeyInfo(props) {
    const { loading, id, name, topTradeOrders = [], topHolers = [], ticker, price, priceInUSD, holdersCount, openPrice, isSticky, curve } = props;
    const sensors = (0, sensors_1.useSensors)();
    const pathname = (0, navigation_1.usePathname)();
    (0, react_use_1.useEffectOnce)(() => {
        if (pathname.includes('robot-workshop')) {
            sensors.track('EnterStakeBotFromDetail', {
                bot_id: id,
                bot_name: name
            });
        }
        if (pathname.includes('rewards-aipp-store')) {
            sensors.track('EnterStakeBotFromDashboard', {
                bot_id: id,
                bot_name: name
            });
        }
        if (pathname.includes('chat')) {
            sensors.track('EnterStakeBotFromChat', {
                bot_id: id,
                bot_name: name
            });
        }
    });
    if (loading)
        return (0, jsx_runtime_1.jsx)(ShareKeySkeleton_1.default, {});
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "overflow-y-hidden", children: (0, jsx_runtime_1.jsx)(stake_trend_1.default, { ticker: ticker, tickerPrice: price, tickerPriceInUsd: priceInUSD, curve: curve, openPrice: openPrice }) }), (0, jsx_runtime_1.jsx)(TradingDetailTab_1.default, { curve: curve, topHolers: topHolers, topTradeOrders: topTradeOrders, holdersCount: holdersCount, isSticky: isSticky })] }));
}
