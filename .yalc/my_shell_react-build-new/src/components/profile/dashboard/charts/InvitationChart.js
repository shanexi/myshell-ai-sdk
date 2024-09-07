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
const statistics_1 = require("../../../../apis/statistics.js");
const mainnet_svg_1 = __importDefault(require("@/common/assets/icons/mainnet.svg"));
const ChartPlaceholder_1 = __importDefault(require("../../../../common/components/icons/rewards-center/ChartPlaceholder.js"));
const LineDot_1 = __importDefault(require("../../../../common/components/icons/rewards-center/LineDot.js"));
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner.js"));
const tooltip_1 = require("../../../../common/components/ui/tooltip.js");
const constants_1 = require("../../../../common/constants/constants.js");
const bot_1 = require("../../../../common/constants/enums/bot.js");
const sensors_1 = require("../../../../lib/sensors/index.js");
const DualAxes = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('@ant-design/plots'))).then(mod => mod.DualAxes), {
    ssr: false
});
function InvitationChart() {
    const wT = (0, next_intl_1.useTranslations)('workshop');
    const t = (0, next_intl_1.useTranslations)('profile');
    const [querying, setQuerying] = (0, react_2.useState)(false);
    const [data, setData] = (0, react_2.useState)([]);
    const [unSelectedLegend, setUnSelectedLegend] = (0, react_2.useState)([]);
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const sensors = (0, sensors_1.useSensors)();
    const columnData = (0, react_2.useMemo)(() => {
        return data
            .filter(d => d.type !== 'all')
            .map(d => {
            if (d.type === 'tgTotal') {
                return d.invitations.map(v => ({
                    ...v,
                    date: (0, dayjs_1.default)(v.date).format('YYYY-MM-DD'),
                    name: t('dashboard_items.cumulated_invites_tg'),
                    uid: 'tgTotal',
                    dataType: d.type
                }));
            }
            if (d.type === 'user') {
                return d.invitations.map(v => ({
                    ...v,
                    date: (0, dayjs_1.default)(v.date).format('YYYY-MM-DD'),
                    name: t('dashboard_items.invite_and_share'),
                    uid: 'user',
                    dataType: d.type
                }));
            }
            if (d.type === 'bot') {
                return d.invitations.map(v => ({
                    ...v,
                    date: (0, dayjs_1.default)(v.date).format('YYYY-MM-DD'),
                    name: d.botInfo.name,
                    uid: d.botInfo.botId,
                    botInfo: d.botInfo,
                    dataType: d.type
                }));
            }
            if (d.type === 'widget') {
                return d.invitations.map(v => ({
                    ...v,
                    date: (0, dayjs_1.default)(v.date).format('YYYY-MM-DD'),
                    name: d.widgetInfo.name,
                    uid: d.widgetInfo.widgetId,
                    widgetInfo: d.widgetInfo,
                    dataType: d.type
                }));
            }
            if (d.type === 'article') {
                return d.invitations.map(v => ({
                    ...v,
                    date: (0, dayjs_1.default)(v.date).format('YYYY-MM-DD'),
                    name: d.articleInfo.title,
                    uid: d.articleInfo.pageId,
                    articleInfo: d.articleInfo,
                    dataType: d.type
                }));
            }
        })
            .flat();
    }, [data]);
    const lineData = (0, react_2.useMemo)(() => {
        const totalData = data.filter(d => d.type === 'all');
        if (totalData.length !== 0) {
            return totalData[0].invitations.map(v => ({
                ...v,
                date: (0, dayjs_1.default)(v.date).format('YYYY-MM-DD'),
                name: t('dashboard_items.cumulated_invites'),
                uid: 'all',
                dataType: 'all'
            }));
        }
        return [];
    }, [data]);
    const filteredLineData = (0, react_2.useMemo)(() => {
        return unSelectedLegend.includes('all') ? [] : lineData;
    }, [lineData, unSelectedLegend]);
    const filteredColumnData = (0, react_2.useMemo)(() => {
        return unSelectedLegend.length !== 0
            ? columnData.filter(d => !unSelectedLegend.includes(d.dataType === 'user' ? d.dataType : d.uid))
            : columnData;
    }, [columnData, unSelectedLegend]);
    const dateRange = (0, react_2.useMemo)(() => {
        return Array.from(new Set(data
            .map(d => {
            return d.invitations.map(v => (0, dayjs_1.default)(v.date).format('MMM DD, YYYY'));
        })
            .flat()));
    }, [data]);
    const legendItems = (0, react_2.useMemo)(() => {
        const map = new Map();
        data.forEach(d => {
            if (d.type === 'bot') {
                const { botId } = d.botInfo;
                map.set(botId, {
                    name: d.botInfo.name,
                    botId,
                    status: d.botInfo.status,
                    type: botId,
                    color: constants_1.ChartColorSet[(map.size - 1) % constants_1.ChartColorSet.length]
                });
            }
            else if (d.type === 'widget') {
                const { widgetId } = d.widgetInfo;
                map.set(widgetId, {
                    name: d.widgetInfo.name,
                    widgetId,
                    type: widgetId,
                    color: constants_1.ChartColorSet[(map.size - 1) % constants_1.ChartColorSet.length]
                });
            }
            else if (d.type === 'article') {
                const { pageId } = d.articleInfo;
                map.set(pageId, {
                    name: d.articleInfo.title,
                    pageId,
                    type: pageId,
                    color: constants_1.ChartColorSet[(map.size - 1) % constants_1.ChartColorSet.length]
                });
            }
            else if (d.type === 'user') {
                map.set(d.type, {
                    name: t('dashboard_items.invite_and_share'),
                    type: 'user',
                    color: constants_1.ChartColorSet[map.size % constants_1.ChartColorSet.length]
                });
            }
            else if (d.type === 'tgTotal') {
                map.set(d.type, {
                    name: t('dashboard_items.cumulated_invites_tg'),
                    type: 'tgTotal',
                    color: '#3E5CFA'
                });
            }
            else if (d.type === 'all') {
                map.set(d.type, {
                    name: t('dashboard_items.cumulated_invites'),
                    type: 'all',
                    color: '#3CC50C'
                });
            }
        });
        let newData = [...map.values()];
        const totalIndex = newData.findIndex(d => d.type === 'all');
        const splicedData = newData.splice(totalIndex, 1);
        newData = [...splicedData, ...newData];
        return newData;
    }, [data]);
    const computedColorMap = (0, react_2.useMemo)(() => {
        return legendItems.filter(i => i.type !== 'all' && !unSelectedLegend.includes(i.type)).map(d => d.color);
    }, [legendItems, unSelectedLegend]);
    const queryInvitationData = async () => {
        setQuerying(true);
        const res = await (0, statistics_1.getInvitationStatistics)();
        setQuerying(false);
        if (res.success) {
            setData(res.data?.invitations);
        }
    };
    const handleLegendClick = (type) => {
        if (type === 'all')
            return;
        sensors.track('InteractWithDashboard', {
            click_area: 'legend'
        });
        const isSelected = unSelectedLegend.includes(type);
        if (isSelected) {
            setUnSelectedLegend(unSelectedLegend.filter(legendId => legendId !== type));
        }
        else {
            setUnSelectedLegend([...unSelectedLegend, type]);
        }
    };
    (0, react_2.useEffect)(() => {
        queryInvitationData();
    }, []);
    const config = {
        data: [...[filteredColumnData, filteredLineData]],
        xField: 'date',
        yField: ['invitationCount', 'invitationCount'],
        limitInPlot: false,
        appendPadding: [0, 4, 0, 0],
        xAxis: {
            type: 'time',
            label: {
                formatter: (value) => (0, dayjs_1.default)(value).format('MMM DD')
            },
            nice: false
        },
        yAxis: {
            invitationCount: {
                tickMethod: 'cat'
            }
        },
        seriesField: 'botId',
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
        tooltip: {
            domStyles: {
                'g2-tooltip': {
                    background: resolvedTheme === 'dark' ? '#000' : '#FFF',
                    boxShadow: 'none',
                    border: '1px solid var(--border)'
                }
            },
            customContent: (title, data) => {
                let newData = data ? [...data] : [];
                const totalIndex = newData.findIndex(d => d.data.dataType === 'all');
                const splicedData = newData.splice(totalIndex, 1);
                newData = [...splicedData, ...newData].filter(d => !unSelectedLegend.includes(d.name));
                return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col p-3 rounded-xl gap-3 mx-5", children: [(0, jsx_runtime_1.jsx)(react_1.Heading, { as: "h5", fontSize: "12px", lineHeight: "16px", className: "text-on-surface", children: title }), (0, jsx_runtime_1.jsx)(react_1.List, { display: "flex", flexDirection: "column", gap: "8px", children: newData.map(d => {
                                if (d?.value === '0')
                                    return null;
                                return ((0, jsx_runtime_1.jsx)(react_1.ListItem, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center gap-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1 text-xs text-default", children: [(0, jsx_runtime_1.jsx)(react_1.Center, { w: "12px", h: "12px", rounded: "4px", bgColor: d.color, flexShrink: 0, children: d.data.dataType === 'all' && (0, jsx_runtime_1.jsx)(LineDot_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_1.Text, { maxW: "180px", className: "truncate", children: d.data.name }), d.data.dataType === 'bot' &&
                                                        d.data.botInfo &&
                                                        (d.data.botInfo.status === bot_1.BotStatusEnum.Public ? ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: wT('mainnet'), side: "top", children: (0, jsx_runtime_1.jsx)(image_1.default, { alt: "share", src: mainnet_svg_1.default, width: 10 }) })) : null)] }), d.data.invitationCount] }) }, d.name));
                            }) })] }));
            }
        },
        animation: {
            appear: {
                animation: 'wave-in'
            },
            update: {
                animation: 'wave-in'
            }
        },
        geometryOptions: [
            {
                geometry: 'column',
                isStack: true,
                seriesField: 'uid',
                color: computedColorMap
            },
            {
                geometry: 'line',
                color: '#3CC50C',
                seriesField: 'uid',
                smooth: true
            }
        ]
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full flex-grow-0 flex-shrink-0", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex text-sm justify-between pb-3", children: (0, jsx_runtime_1.jsx)(react_1.Text, { color: "var(--on-surface)", children: t('dashboard_items.invitations') }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col rounded-xl min-h-[334px] p-3 gap-2 border border-default relative shadow-background-default bg-surface-default", children: [querying && ((0, jsx_runtime_1.jsx)(react_1.Center, { rounded: "12px", position: "absolute", w: "full", h: "full", top: 0, left: 0, bgColor: "var(--surface)", zIndex: "10", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand" }) })), !querying && !columnData.length && !lineData.length && ((0, jsx_runtime_1.jsx)(react_1.Center, { rounded: "12px", position: "absolute", w: "full", h: "full", top: 0, left: 0, bgColor: "var(--surface)", zIndex: "10", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-2", children: [(0, jsx_runtime_1.jsx)(ChartPlaceholder_1.default, { fontSize: "24px" }), (0, jsx_runtime_1.jsx)("p", { className: "text-on-surface", children: t('dashboard_items.no_data') })] }) })), (0, jsx_runtime_1.jsx)("div", { className: "h-[300px] relative", onClick: () => {
                            sensors.track('InteractWithDashboard', {
                                click_area: 'time_axis'
                            });
                        }, children: (0, jsx_runtime_1.jsx)(DualAxes, { ...config }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-3 overflow-y-auto max-h-[124px]", children: legendItems.map(item => ((0, jsx_runtime_1.jsxs)("div", { className: "flex w-fit flex-shrink-0 h-[30px] items-center py-1.5 px-2.5 gap-1.5 rounded-lg text-xs", style: {
                                backgroundColor: unSelectedLegend.includes(item.type) ? '#EDF0F5' : item.color,
                                color: unSelectedLegend.includes(item.type) ? '#202223' : 'white',
                                border: unSelectedLegend.includes(item.type) ? '1px solid #EDF0F5' : 'none',
                                cursor: item.type === 'all' ? 'not-allowed' : 'pointer'
                            }, onClick: () => handleLegendClick(item.type), children: [item.type === 'all' ? ((0, jsx_runtime_1.jsx)(LineDot_1.default, {})) : (!unSelectedLegend.includes(item.type) && (0, jsx_runtime_1.jsx)(CheckIcon_1.default, { className: "w-4 h-4 white stroke-[2]" })), (0, jsx_runtime_1.jsx)("p", { className: "text-xs", children: item.name }), item.status === bot_1.BotStatusEnum.Public ? ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: wT('mainnet'), side: "top", children: (0, jsx_runtime_1.jsx)(image_1.default, { alt: "share", src: mainnet_svg_1.default, width: 10 }) })) : null] }, item.type))) })] })] }));
}
exports.default = InvitationChart;
