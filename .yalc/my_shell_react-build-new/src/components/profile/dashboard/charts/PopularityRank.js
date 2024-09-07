"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const CheckIcon_1 = __importDefault(require("@heroicons/react/24/outline/CheckIcon"));
const dayjs_1 = __importDefault(require("dayjs"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const next_themes_1 = require("next-themes");
const react_2 = require("react");
const rxjs_1 = require("rxjs");
const statistics_1 = require("../../../../apis/statistics.js");
const hidden_svg_1 = __importDefault(require("@/common/assets/icons/hidden.svg"));
const mainnet_svg_1 = __importDefault(require("@/common/assets/icons/mainnet.svg"));
const ChartPlaceholder_1 = __importDefault(require("../../../../common/components/icons/rewards-center/ChartPlaceholder.js"));
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner.js"));
const tooltip_1 = require("../../../../common/components/ui/tooltip.js");
const constants_1 = require("../../../../common/constants/constants.js");
const bot_1 = require("../../../../common/constants/enums/bot.js");
const Line = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('@ant-design/plots'))).then(mod => mod.Line), {
    ssr: false
});
function PopularityChart() {
    const [querying, setQuerying] = (0, react_2.useState)(false);
    const [data, setData] = (0, react_2.useState)([]);
    const [unSelectedLegend, setUnSelectedLegend] = (0, react_2.useState)([]);
    const [minDate, setMinDate] = (0, react_2.useState)('');
    const [maxDate, setMaxDate] = (0, react_2.useState)('');
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const wT = (0, next_intl_1.useTranslations)('workshop');
    const t = (0, next_intl_1.useTranslations)('profile');
    const lineData = (0, react_2.useMemo)(() => data
        .map(d => d.rankings.map(r => ({
        date: (0, dayjs_1.default)(r.date).format('YYYY-MM-DD'),
        ranking: r.ranking * -1,
        botUid: d.botUid,
        name: d.name,
        privateBotId: d.privateBotId,
        status: d.status
    })))
        .flat(), [data]);
    const filteredData = (0, react_2.useMemo)(() => {
        return unSelectedLegend.length !== 0 ? lineData.filter(d => !unSelectedLegend.includes(d.botUid)) : lineData;
    }, [lineData, unSelectedLegend]);
    const queryBotsRankingHistory = () => {
        setQuerying(true);
        (0, statistics_1.getBotsRankingHistory)()
            .pipe((0, rxjs_1.finalize)(() => {
            setQuerying(false);
        }))
            .subscribe({
            next: res => {
                setData(res);
            }
        });
    };
    const legendItems = (0, react_2.useMemo)(() => {
        const map = new Map();
        lineData.forEach(d => {
            !map.has(d.botUid) &&
                map.set(d.botUid, {
                    name: d.name,
                    botUid: d.botUid,
                    privateBotId: d.privateBotId,
                    status: d.status,
                    color: constants_1.ChartColorSet[map.size % constants_1.ChartColorSet.length]
                });
        });
        return [...map.values()];
    }, [lineData]);
    const computedColorMap = (0, react_2.useMemo)(() => {
        return legendItems.filter(i => !unSelectedLegend.includes(i.botUid)).map(d => d.color);
    }, [legendItems, unSelectedLegend]);
    (0, react_2.useEffect)(() => {
        queryBotsRankingHistory();
    }, []);
    const handleLegendClick = (botUid) => {
        const isSelected = unSelectedLegend.includes(botUid);
        if (isSelected) {
            setUnSelectedLegend(unSelectedLegend.filter(legendId => legendId !== botUid));
        }
        else {
            setUnSelectedLegend([...unSelectedLegend, botUid]);
        }
    };
    const config = {
        data: filteredData,
        xField: 'date',
        yField: 'ranking',
        limitInPlot: false,
        xAxis: {
            type: 'time',
            label: {
                formatter: (value) => (0, dayjs_1.default)(value).format('MMM DD')
            }
        },
        yAxis: {
            label: {
                formatter: (text) => Math.abs(Number(text))
            },
            max: -1
        },
        appendPadding: [0, 6, 0, 0],
        tooltip: {
            domStyles: {
                'g2-tooltip': {
                    background: resolvedTheme === 'dark' ? '#000' : '#FFF',
                    boxShadow: 'none',
                    border: '1px solid var(--border)'
                }
            },
            customContent: (title, data) => {
                return ((0, jsx_runtime_1.jsxs)(react_1.Flex, { flexDirection: "column", p: "12px", rounded: "12px", gap: "12px", className: "w-full", children: [(0, jsx_runtime_1.jsx)(react_1.Heading, { as: "h5", fontSize: "12px", lineHeight: "16px", color: "var(--secondary)", children: title }), (0, jsx_runtime_1.jsx)(react_1.List, { display: "flex", flexDirection: "column", gap: "8px", children: data.map(d => ((0, jsx_runtime_1.jsx)(react_1.ListItem, { children: (0, jsx_runtime_1.jsxs)(react_1.Flex, { justifyContent: "space-between", alignItems: "center", gap: "8px", children: [(0, jsx_runtime_1.jsxs)(react_1.Flex, { gap: "8px", fontSize: "12px", lineHeight: "16px", color: "var(--on-surface)", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(react_1.Box, { w: "12px", h: "12px", rounded: "4px", bgColor: d.color, flexShrink: 0 }), (0, jsx_runtime_1.jsxs)(react_1.Flex, { children: [(0, jsx_runtime_1.jsx)(react_1.Text, { maxW: "130px", className: "truncate text-on-surface", children: d.data.name }), d.data.privateBotId &&
                                                            (d.data.status === bot_1.BotStatusEnum.Public ? ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: wT('mainnet'), side: "top", children: (0, jsx_runtime_1.jsx)(image_1.default, { alt: "share", src: mainnet_svg_1.default, width: 10 }) })) : ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: wT('hidden'), side: "top", children: (0, jsx_runtime_1.jsx)(image_1.default, { alt: "share", src: hidden_svg_1.default, width: 10 }) })))] })] }), Math.abs(d.data.ranking)] }) }, d.name))) })] }));
            }
        },
        seriesField: 'botUid',
        legend: false,
        smooth: true,
        slider: {
            start: 0,
            end: 1,
            height: 32,
            textStyle: {
                textAlign: 'center',
                fill: resolvedTheme === 'dark' ? '#FFF' : '#000'
            },
            formatter: (value) => (0, dayjs_1.default)(value).format('MMM DD, YYYY')
        },
        color: computedColorMap,
        animation: {
            appear: {
                animation: 'wave-in'
            },
            update: {
                animation: 'wave-in'
            }
        }
    };
    return ((0, jsx_runtime_1.jsxs)(react_1.Box, { w: "full", h: "full", flexGrow: 0, flexShrink: 0, children: [(0, jsx_runtime_1.jsx)("p", { className: "text-default pb-3 text-sm", children: t('dashboard_items.popularity_rank') }), (0, jsx_runtime_1.jsxs)(react_1.Flex, { flexDirection: "column", rounded: "12px", p: "12px", border: "1px solid var(--border)", boxShadow: "0px 1px 2px 0px #0000001A", minH: "334px", gap: "8px", position: "relative", className: "bg-surface-default", children: [querying && ((0, jsx_runtime_1.jsx)(react_1.Center, { rounded: "12px", position: "absolute", w: "full", h: "full", top: 0, left: 0, bgColor: "var(--surface)", zIndex: "10", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand" }) })), !querying && !lineData.length && ((0, jsx_runtime_1.jsx)(react_1.Center, { rounded: "12px", position: "absolute", w: "full", h: "full", top: 0, left: 0, bgColor: "var(--surface)", zIndex: "10", children: (0, jsx_runtime_1.jsxs)(react_1.Flex, { flexDirection: "column", alignItems: "center", gap: "8px", children: [(0, jsx_runtime_1.jsx)(ChartPlaceholder_1.default, { fontSize: "24px" }), (0, jsx_runtime_1.jsx)(react_1.Text, { className: "text-on-surface", children: t('dashboard_items.no_data') })] }) })), (0, jsx_runtime_1.jsx)(react_1.Box, { h: "300px", position: "relative", children: (0, jsx_runtime_1.jsx)(Line, { ...config }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-3 flex-wrap overflow-y-auto max-h-[124px]", children: legendItems.map(item => ((0, jsx_runtime_1.jsxs)(react_1.Flex, { w: "fit-content", flexShrink: 0, h: "30px", alignItems: "center", p: "6px 10px", gap: "6px", rounded: "8px", fontSize: "12px", lineHeight: "16px", bgColor: unSelectedLegend.includes(item.botUid) ? 'var(--border)' : item.color, color: unSelectedLegend.includes(item.botUid) ? 'var(--on-surface)' : 'white', border: unSelectedLegend.includes(item.botUid) ? '1px solid var(--border)' : 'none', cursor: "pointer", onClick: () => handleLegendClick(item.botUid), children: [!unSelectedLegend.includes(item.botUid) && (0, jsx_runtime_1.jsx)(CheckIcon_1.default, { className: "w-4 h-4 store-white stroke-[2]" }), (0, jsx_runtime_1.jsx)(react_1.Text, { maxW: "220px", className: "truncate text-white", children: item.name }), item.privateBotId &&
                                    (item.status === bot_1.BotStatusEnum.Public ? ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: wT('mainnet'), side: "top", children: (0, jsx_runtime_1.jsx)(image_1.default, { alt: "share", src: mainnet_svg_1.default, width: 10 }) })) : ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: wT('hidden'), side: "top", children: (0, jsx_runtime_1.jsx)(image_1.default, { alt: "share", src: hidden_svg_1.default, width: 10 }) })))] }, item.botUid))) })] })] }));
}
exports.default = PopularityChart;
