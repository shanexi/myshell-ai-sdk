"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TrendingTable;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_infinite_scroll_component_1 = __importDefault(require("react-infinite-scroll-component"));
const agentPump_1 = require("../../../../apis/agentPump.js");
const apiTypes_1 = require("../../../../apis/apiTypes.js");
const flash_svg_1 = __importDefault(require("@/assets/icons/web3/flash.svg"));
const Fire_1 = __importDefault(require("../../../../common/components/icons/rewards-center/Fire.js"));
const avatar_1 = require("../../../../common/components/ui/avatar.js");
const button_1 = require("../../../../common/components/ui/button.js");
const icon_1 = require("../../../../common/components/ui/icon.js");
const caret_down_1 = require("../../../../common/components/ui/icons/solid/caret-down.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const PartronBadgeTableSkeleton_1 = __importDefault(require("../../../../components/skeleton/rewards-center/partron-badge/PartronBadgeTableSkeleton.js"));
const Table_1 = __importDefault(require("../../stake-earn/components/Table.js"));
function TrendingTable(props) {
    const { openBotModal, openTradeModal, searchValue, tagIds } = props;
    const { warning, error: errorToast } = (0, useNotification_1.useNotification)();
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const t_request = (0, next_intl_1.useTranslations)('request');
    const [records, setRecords] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [defaultField] = (0, react_1.useState)(props.defaultField ? props.defaultField : apiTypes_1.OrderByFields.ORDER_BY_FIELDS_MARKET_CAP);
    const [defaultSort] = (0, react_1.useState)(apiTypes_1.OrderSort.ORDER_SORT_DESC);
    const [currentOrderBys, setCurrentOrderBys] = (0, react_1.useState)([
        {
            sort: defaultSort,
            field: defaultField
        }
    ]);
    const [nextPageToken, setNextPageToken] = (0, react_1.useState)('0');
    const pageSize = defaultField === apiTypes_1.OrderByFields.ORDER_BY_FIELDS_LAST_TRADE_AT ? 30 : 50;
    const [hasMore, setHasMore] = (0, react_1.useState)(true);
    const getTableData = (0, react_1.useCallback)(async (pageToken, pageSizeParam, orderBy) => {
        return (0, agentPump_1.get_ranking)({
            botNameQuery: searchValue,
            tagsQuery: tagIds,
            listRequest: {
                pageToken,
                pageSize: pageSizeParam
            },
            statuses: [
                apiTypes_1.CurveItemStatus.BOUNDING_CURVE_STATUS_MY_SOUL_FIRST,
                apiTypes_1.CurveItemStatus.BOUNDING_CURVE_STATUS_IN_PROGRESS
            ],
            orderBy
        });
    }, [searchValue, tagIds]);
    const initData = async ({ orderBy }) => {
        try {
            setLoading(true);
            setCurrentOrderBys(orderBy);
            const response = await getTableData('0', pageSize, orderBy);
            setRecords(response.data.curves);
            setHasMore(defaultField === apiTypes_1.OrderByFields.ORDER_BY_FIELDS_LAST_TRADE_AT ? false : response.data.listResponse.hasMore);
            setNextPageToken(response.data.listResponse.nextPageToken);
        }
        catch (error) {
            setHasMore(false);
            errorToast({
                content: t_request('error.fetch_data_failed')
            });
        }
        finally {
            setLoading(false);
        }
    };
    const fetchMoreData = async () => {
        try {
            const response = await getTableData(nextPageToken, pageSize, currentOrderBys || []);
            if (response.success) {
                setRecords(recordList => [...recordList, ...response.data.curves]);
                setHasMore(defaultField === apiTypes_1.OrderByFields.ORDER_BY_FIELDS_LAST_TRADE_AT ? false : response.data.listResponse.hasMore);
                setNextPageToken(response.data.listResponse.nextPageToken);
            }
            else {
            }
        }
        catch (error) {
            warning({
                content: t_request('error.fetch_data_failed')
            });
        }
    };
    const retrieveData = (0, react_1.useCallback)(async () => {
        const response = await getTableData('0', pageSize, currentOrderBys || []);
        if (response.success) {
            setRecords(response.data.curves);
            setHasMore(defaultField === apiTypes_1.OrderByFields.ORDER_BY_FIELDS_LAST_TRADE_AT ? false : response.data.listResponse.hasMore);
            setNextPageToken(response.data.listResponse.nextPageToken);
        }
    }, [currentOrderBys, defaultField, getTableData, pageSize]);
    (0, react_1.useEffect)(() => {
        if (defaultField !== apiTypes_1.OrderByFields.ORDER_BY_FIELDS_LAST_TRADE_AT) {
            return;
        }
        const interval = setInterval(() => {
            retrieveData().then();
        }, 10000);
        return () => {
            clearInterval(interval);
        };
    }, [defaultField, retrieveData]);
    (0, react_1.useEffect)(() => {
        initData({
            orderBy: currentOrderBys || []
        }).then();
    }, [searchValue, tagIds]);
    function renderBot(record) {
        const isPass = record?.creator?.membershipInfo?.type === apiTypes_1.MembershipInfoType.TYPE_GENESIS_WITH_GENESIS_CARD ||
            record?.creator?.membershipInfo?.type === apiTypes_1.MembershipInfoType.TYPE_GENESIS_WITH_PASS_CARD;
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2.5 min-w-[220px]", children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { size: "xl", src: record?.botSummary?.logoUrl, rootStyle: isPass
                        ? {
                            border: '2px solid transparent',
                            backgroundImage: 'linear-gradient(white, white), linear-gradient(to bottom, #FDA500, #f7e0ce)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'content-box, border-box'
                        }
                        : {} }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-grow space-y-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-1.5", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "medium", color: "subtlest", lineClamp: 1, className: "break-all", children: `$${record?.symbol}` }), record?.curveTags?.[0]?.label && ((0, jsx_runtime_1.jsx)("div", { className: "px-1 py-0.5 bg-surface-accent-gray-subtlest rounded-md h-5 flex flex-row justify-center items-center", children: (0, jsx_runtime_1.jsx)(typography_1.Description, { size: "lg", weight: "medium", color: "default", children: record?.curveTags?.[0]?.label || '' }) }))] }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "medium", lineClamp: 1, children: record?.botSummary?.name || 'Unknown Bot' })] })] }));
    }
    function renderPercentage(record) {
        const change = record?.changesDaily?.change || 0;
        const isPositive = change >= 0;
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1", children: [(0, jsx_runtime_1.jsx)(caret_down_1.CaretDown, { size: "2xs", color: isPositive ? 'success' : 'critical', rotate: isPositive ? '180' : undefined }), (0, jsx_runtime_1.jsx)("div", { className: "flex-grow", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "medium", color: isPositive ? 'success' : 'critical', children: isPositive ? `${change.toFixed(2)}%` : `${Number(change.toString().slice(1)).toFixed(2)}%` }) })] }));
    }
    function renderVolume(record) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "space-y-0.5", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", color: "default", className: "text-base", children: `$${record?.marketCapInUFormatted || record?.marketCapInU}` }) }));
    }
    function renderTradingVolume(record) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "space-y-0.5", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", color: "default", className: "text-base", children: `$${record?.tradingVolumeInUFormatted}` }) }));
    }
    function renderEngagement(record) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-0.5 min-w-[100px]", children: [record?.botRankingIndex === 0 && ((0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", color: "default", className: "text-base", children: "N/A" })), record?.botRankingIndex !== 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(typography_1.Text, { weight: "medium", color: "default", className: "text-base", children: ["#", record?.botRankingIndex] }), record.botRankingIndex && record?.botRankingIndex < 20 ? ((0, jsx_runtime_1.jsx)(icon_1.Icon, { component: Fire_1.default, className: "text-[#F62E0A]", size: "md" })) : null] }))] }));
    }
    function renderPrice(record) {
        const change = record?.changesDaily?.change || 0;
        const isPositive = change >= 0;
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col xl:flex-row items-center justify-end xl:justify-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1 w-full justify-end", children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { size: "lg", children: (0, jsx_runtime_1.jsx)("svg", { width: "21", height: "20", viewBox: "0 0 21 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: (0, jsx_runtime_1.jsxs)("g", { children: [(0, jsx_runtime_1.jsx)("path", { d: "M20.3656 12.4191C19.03 17.7763 13.604 21.0366 8.24619 19.7007C2.8906 18.3651 -0.369681 12.9388 0.966478 7.58203C2.30146 2.22425 7.72743 -1.03628 13.0836 0.299295C18.441 1.63487 21.7011 7.06177 20.3654 12.4192L20.3655 12.4191H20.3656Z", fill: "#F3BA2F" }), (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M10.6668 6.34677L8.07736 8.93621L8.07741 8.9361L6.5708 7.42943L10.6668 3.33344L14.7641 7.43066L13.2575 8.93733L10.6668 6.34677ZM5.50672 8.49319L4 10.0001L5.50661 11.5065L7.01333 9.99981L5.50672 8.49319ZM8.07705 11.0642L10.6665 13.6534L13.2571 11.0629L14.7646 12.5688L14.7638 12.5696L10.6665 16.6668L6.57049 12.5708L6.56836 12.5686L8.07705 11.0642ZM15.8265 8.49403L14.3198 10.0008L15.8265 11.5074L17.3332 10.0006L15.8265 8.49403Z", fill: "white" }), (0, jsx_runtime_1.jsx)("path", { d: "M12.1955 9.99931H12.1961L10.6673 8.47046L9.53738 9.60011L9.40756 9.72998L9.13983 9.99777L9.1377 9.99985L9.13983 10.002L10.6673 11.5298L12.1962 10.0009L12.1969 10.0001L12.1956 9.99931", fill: "white" })] }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "xl:flex-grow", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", className: "text-sm xl:text-base", children: record?.price }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center w-full justify-end space-x-1 xl:hidden", children: [(0, jsx_runtime_1.jsx)(caret_down_1.CaretDown, { size: "2xs", color: isPositive ? 'success' : 'critical', rotate: isPositive ? '180' : undefined, className: "translate-y-0.5" }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-xs", weight: "medium", color: isPositive ? 'success' : 'critical', children: isPositive ? `${change.toFixed(2)}%` : `${Number(change.toString().slice(1)).toFixed(2)}%` }) })] })] }));
    }
    function renderAction(record) {
        return ((0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", color: "default", variant: "primary", className: "w-[120px]", onClick: e => {
                e.stopPropagation();
                openTradeModal?.({ curve: record });
            }, children: t('trade') }));
    }
    const colunms = [
        {
            title: t('table.aipp_name'),
            key: 'AIPP NAME',
            render: renderBot,
            mobile: true
        },
        {
            title: '24H',
            key: '24H',
            sortable: defaultField !== apiTypes_1.OrderByFields.ORDER_BY_FIELDS_LAST_TRADE_AT,
            render: renderPercentage
        },
        {
            title: t('table.price'),
            key: 'PRICE',
            sortable: defaultField !== apiTypes_1.OrderByFields.ORDER_BY_FIELDS_LAST_TRADE_AT,
            render: renderPrice,
            mobile: true
        },
        {
            title: t('table.market_cap'),
            key: 'MARKET CAP',
            sortable: defaultField !== apiTypes_1.OrderByFields.ORDER_BY_FIELDS_LAST_TRADE_AT,
            render: renderVolume
        },
        {
            title: t('table.trading_volume'),
            key: 'Trading Volume',
            sortable: defaultField !== apiTypes_1.OrderByFields.ORDER_BY_FIELDS_LAST_TRADE_AT,
            render: renderTradingVolume
        },
        {
            title: t('table.engagement'),
            key: 'Engagement',
            sortable: defaultField !== apiTypes_1.OrderByFields.ORDER_BY_FIELDS_LAST_TRADE_AT,
            tip: t('table.engagement_tip'),
            render: renderEngagement
        },
        {
            title: t('table.action'),
            key: 'ACTION',
            render: renderAction
        }
    ];
    const handleRowClick = (record) => {
        openBotModal?.(record?.symbol ?? '');
    };
    const handleSortClick = async ({ orderBy, columnKey }) => {
        const isDefault = currentOrderBys?.length === 1 &&
            currentOrderBys[0].field === defaultField &&
            currentOrderBys[0].sort === defaultSort;
        if (isDefault) {
            const newOrderBys = [orderBy].concat(currentOrderBys);
            if (newOrderBys) {
                setCurrentOrderBys(newOrderBys);
                await initData({ orderBy: newOrderBys });
            }
            return;
        }
        const exsitedField = currentOrderBys?.find(item => item.field === orderBy.field);
        if (exsitedField) {
            if (orderBy.sort === exsitedField.sort) {
                return;
            }
            if (orderBy.sort === apiTypes_1.OrderSort.ORDER_SORT_UNSPECIFIED) {
                const newOrderBys = currentOrderBys?.filter(item => item.field !== orderBy.field);
                if (newOrderBys.length === 0) {
                    await initData({ orderBy: [{ sort: defaultSort, field: defaultField }] });
                    return;
                }
                if (newOrderBys) {
                    setCurrentOrderBys(newOrderBys);
                    await initData({ orderBy: newOrderBys });
                }
                return;
            }
            const newOrderBys = [orderBy].concat(currentOrderBys?.filter(item => item.field !== orderBy.field));
            if (newOrderBys) {
                setCurrentOrderBys(newOrderBys);
                await initData({ orderBy: newOrderBys });
            }
        }
        else {
            const newOrderBys = [orderBy].concat(currentOrderBys);
            if (newOrderBys) {
                setCurrentOrderBys(newOrderBys);
                await initData({ orderBy: newOrderBys });
            }
        }
    };
    const renderEmpty = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "w-agent-empty h-agent-empty flex flex-col items-center justify-center absolute border border-default rounded-xl", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: flash_svg_1.default, width: 32, height: 32, alt: "empty" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-center text-xl", weight: "semibold", color: "default", children: searchValue ? t('search_empty') : t('presale_empty') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-center", size: "sm", color: "subtlest", children: searchValue ? t('search_empty_tip') : t('presale_empty_tip') })] }));
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "pt-0 px-4 md:px-6 pb-6 grow overflow-hidden", children: (0, jsx_runtime_1.jsx)(react_infinite_scroll_component_1.default, { className: "w-full overflow-y-auto space-y-3 no-scrollbar", dataLength: records.length, next: fetchMoreData, hasMore: hasMore || false, loader: hasMore ? (0, jsx_runtime_1.jsx)(PartronBadgeTableSkeleton_1.default, {}) : null, scrollableTarget: "stake-earn-scrollable", children: (0, jsx_runtime_1.jsx)(Table_1.default, { columns: colunms, dataSource: records, loading: loading, renderEmpty: renderEmpty, rowClickable: true, onSortClick: handleSortClick, defaultSort: defaultSort, defaultField: defaultField, onRowClick: handleRowClick }) }) }));
}
