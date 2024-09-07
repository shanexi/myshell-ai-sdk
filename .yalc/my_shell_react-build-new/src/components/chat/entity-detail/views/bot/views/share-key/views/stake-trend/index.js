"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StakeTrend;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const image_1 = __importDefault(require("next/image"));
const react_2 = require("react");
const agentPump_1 = require("../../../../../../../../../apis/agentPump.js");
const apiTypes_1 = require("../../../../../../../../../apis/apiTypes.js");
const bnb_svg_1 = __importDefault(require("@/assets/icons/web3/bnb.svg"));
const typography_1 = require("../../../../../../../../../common/components/ui/typography.js");
const TvLightChart_1 = __importDefault(require("../../../../../../../../../components/chat/entity-detail/views/bot/views/share-key/views/stake-trend/TvLightChart.js"));
const formatPriceHistory = ({ priceHistory }) => {
    const tempList = (priceHistory ?? []).slice().map(d => ({
        timestampUnix: Number(d.dateUnix),
        value: Number(d.price)
    }));
    const timePriceMap = new Map();
    tempList.forEach(item => {
        timePriceMap.set(item.timestampUnix, item);
    });
    const pricesItems = [...timePriceMap.values()].sort((a, b) => {
        if (a.timestampUnix < b.timestampUnix) {
            return -1;
        }
        return 1;
    });
    if (pricesItems.length < 10) {
        return pricesItems;
    }
    const result = [];
    const maxRepeatCount = 1;
    for (let i = 0; i < pricesItems.length; i += 1) {
        if (i < maxRepeatCount * 2 || i === pricesItems.length - 1) {
            result.push(pricesItems[i]);
            continue;
        }
        const currentItem = pricesItems[i];
        const nextItem = pricesItems[i + 1];
        const eps = 0.0001;
        let repeatCount = 0;
        for (let j = 0; j <= maxRepeatCount; j += 1) {
            const prevItem = pricesItems[i - j * 2 - 1];
            const prevPrevItem = pricesItems[i - j * 2 - 2];
            if (!prevItem || !prevPrevItem) {
                break;
            }
            if (Math.abs(nextItem.value - prevItem.value) < eps && Math.abs(currentItem.value - prevPrevItem.value) < eps) {
                repeatCount += 1;
            }
        }
        if (repeatCount < maxRepeatCount) {
            result.push(currentItem);
        }
        else {
            i += 1;
        }
    }
    return result;
};
function StakeTrend({ ticker, tickerPrice, tickerPriceInUsd, curve }) {
    const [selectedRange, setSelectedRange] = (0, react_2.useState)(apiTypes_1.PriceDurationType.PRICE_DURATION_TYPE_ORIGINAL);
    const [chartData, setChartData] = (0, react_2.useState)();
    const [loading, setLoading] = (0, react_2.useState)(false);
    const beginAt = (0, react_2.useMemo)(() => {
        return Number(curve?.beginAtUnixStamp || 0);
    }, [curve]);
    const fetchPriceHistory = (0, react_2.useCallback)(async () => {
        if (!curve?.id || !selectedRange || !beginAt) {
            console.error('fetch params invalid');
            return;
        }
        try {
            setLoading(true);
            const requestParams = {
                curveId: curve.id,
                priceDurationType: apiTypes_1.PriceDurationType.PRICE_DURATION_TYPE_ORIGINAL,
                beginAt,
                endAt: Math.round(Date.now() / 1000)
            };
            const response = await (0, agentPump_1.get_curve_price_history)(requestParams);
            if (response.success) {
                const formattedPriceHistory = formatPriceHistory({ selectedRange, priceHistory: response?.data?.curvePrices });
                setChartData(formattedPriceHistory);
            }
        }
        catch (error) {
        }
        finally {
            setLoading(false);
        }
    }, [selectedRange, curve, beginAt]);
    (0, react_2.useEffect)(() => {
        fetchPriceHistory().then();
    }, [fetchPriceHistory]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3 relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex flex-col md:flex-row items-start md:justify-between md:items-end", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-lg", color: "brand", weight: "semibold", children: `$${ticker}` }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: bnb_svg_1.default, width: 24, height: 24, alt: "bnb", className: "rounded-full" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-2xl", color: "default", weight: "medium", children: tickerPrice })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-2", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-xs", color: "brand", weight: "medium", children: `≈$${tickerPriceInUsd}` }) })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "h-[218px] w-full flex justify-center items-center relative", children: [loading && ((0, jsx_runtime_1.jsx)(react_1.Spinner, { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !opacity-100 text-brand" })), (0, jsx_runtime_1.jsx)(TvLightChart_1.default, { data: chartData, loading: loading })] })] }));
}
