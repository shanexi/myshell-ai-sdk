"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Table;
const jsx_runtime_1 = require("react/jsx-runtime");
const ChevronDownIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronDownIcon"));
const ChevronUpIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronUpIcon"));
const InformationCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/InformationCircleIcon"));
const solid_1 = require("@heroicons/react/24/solid");
const react_1 = require("react");
const apiTypes_1 = require("../../../../apis/apiTypes.js");
const icon_1 = require("../../../../common/components/ui/icon.js");
const tooltip_1 = require("../../../../common/components/ui/tooltip.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const PartronBadgeTableSkeleton_1 = __importDefault(require("../../../../components/skeleton/rewards-center/partron-badge/PartronBadgeTableSkeleton.js"));
const utils_1 = require("../../../../lib/utils.js");
function renderCell(record, opts) {
    const { render, dataIndex } = opts;
    if (render) {
        return render(record);
    }
    if (dataIndex) {
        return ((0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "medium", children: record[dataIndex] }));
    }
    return null;
}
const getFieldFromKey = (key) => {
    switch (key) {
        case '24H':
            return apiTypes_1.OrderByFields.ORDER_BY_FIELDS_PRICE_CHANGE_DAILY;
        case 'PRICE':
            return apiTypes_1.OrderByFields.ORDER_BY_FIELDS_PRICE;
        case 'MARKET CAP':
            return apiTypes_1.OrderByFields.ORDER_BY_FIELDS_MARKET_CAP;
        case 'HOLDERS':
            return apiTypes_1.OrderByFields.ORDER_BY_FIELDS_HOLDERS;
        case 'DUE':
            return apiTypes_1.OrderByFields.ORDER_BY_FIELDS_PRE_SALE_DEADLINE;
        case 'AMOUNT':
            return apiTypes_1.OrderByFields.ORDER_BY_FIELDS_VOLUME;
        case 'Engagement':
            return apiTypes_1.OrderByFields.ORDER_BY_FIELDS_BOT_RANKING;
        case 'Trading Volume':
            return apiTypes_1.OrderByFields.ORDER_BY_FIELDS_VOLUME;
        default:
            return apiTypes_1.OrderByFields.ORDER_BY_FIELDS_UNSPECIFIED;
    }
};
function TH({ sortable, columnKey, title, tip, defaultField, defaultSort, onSortClick }) {
    const [sortStatus, setSortStatus] = (0, react_1.useState)(apiTypes_1.OrderSort.ORDER_SORT_UNSPECIFIED);
    const columnKeyMap = {
        'MARKET CAP': apiTypes_1.OrderByFields.ORDER_BY_FIELDS_MARKET_CAP
    };
    const renderSortIcon = () => {
        let sortBy = apiTypes_1.OrderSort.ORDER_SORT_DESC;
        let textClass = 'text-subtle';
        let IconSort = solid_1.ChevronUpDownIcon;
        switch (sortStatus) {
            case apiTypes_1.OrderSort.ORDER_SORT_ASC:
                IconSort = ChevronUpIcon_1.default;
                sortBy = apiTypes_1.OrderSort.ORDER_SORT_UNSPECIFIED;
                break;
            case apiTypes_1.OrderSort.ORDER_SORT_DESC:
                IconSort = ChevronDownIcon_1.default;
                sortBy = apiTypes_1.OrderSort.ORDER_SORT_ASC;
                break;
            default:
                if (columnKeyMap[columnKey] === defaultField) {
                    if (sortStatus === apiTypes_1.OrderSort.ORDER_SORT_UNSPECIFIED) {
                        IconSort = solid_1.ChevronUpDownIcon;
                        textClass = '';
                        sortBy = apiTypes_1.OrderSort.ORDER_SORT_DESC;
                    }
                    else {
                        IconSort = ChevronDownIcon_1.default;
                        sortBy = apiTypes_1.OrderSort.ORDER_SORT_ASC;
                    }
                }
                else {
                    IconSort = solid_1.ChevronUpDownIcon;
                    sortBy = apiTypes_1.OrderSort.ORDER_SORT_DESC;
                }
        }
        return ((0, jsx_runtime_1.jsx)(IconSort, { className: `w-3.5 h-3.5 cursor-pointer ${textClass}`, onClick: () => {
                setSortStatus(sortBy);
                onSortClick?.({
                    columnKey,
                    orderBy: {
                        sort: sortBy,
                        field: getFieldFromKey(columnKey)
                    }
                });
            } }));
    };
    return ((0, jsx_runtime_1.jsx)("th", { className: (0, utils_1.cn)('text-xs font-medium pt-0 pr-3 md:pr-6 first:pl-3 relative last:pr-3 last:flex last:justify-end last:xl:justify-center', sortStatus !== apiTypes_1.OrderSort.ORDER_SORT_UNSPECIFIED ? 'text-subtle' : 'text-subtlest'), children: (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('w-fit relative space-x-0.5 flex items-center'), children: [title, tip ? ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: tip, children: (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: InformationCircleIcon_1.default, size: "xs", color: "subtlest" }) })) : null, sortable && (0, jsx_runtime_1.jsx)("div", { className: "absolute -right-4 top-1/2 -translate-y-1/2", children: renderSortIcon() })] }) }));
}
function TD({ record, expandedRowRender, onRowClick, isRowHighlight, rowClickable, columns }) {
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const [isRowExpand, setIsRowExpand] = (0, react_1.useState)(false);
    const rowExpandable = isMobile && expandedRowRender;
    const showExpand = rowExpandable && isRowExpand;
    const newColums = columns.filter(({ mobile }) => !isMobile || mobile);
    const isHighlight = isRowHighlight ? isRowHighlight(record) : false;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("tr", { onClick: () => onRowClick?.(record), className: (0, utils_1.cn)(rowClickable && 'cursor-pointer', 'hover:bg-surface-hovered'), children: newColums.map(({ key, dataIndex, render }, index) => {
                    return ((0, jsx_runtime_1.jsxs)("td", { className: (0, utils_1.cn)('relative py-2 pr-1.5 md:pr-6 first:pl-3 last:pr-3 last:text-right border-t border-b first:border-l last:border-r first:rounded-l-xl last:rounded-r-xl', isHighlight ? 'border-brand' : 'border-default', showExpand &&
                            'border-b-0 first:rounded-l-none last:rounded-r-none first:rounded-tl-xl last:rounded-tr-xl', rowExpandable && 'last:pr-9'), children: [renderCell(record, { render, dataIndex }), rowExpandable && index === newColums.length - 1 ? ((0, jsx_runtime_1.jsx)("div", { className: "absolute top-1/2 right-3 -translate-y-1/2 flex items-center justify-center h-full", onClick: e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setIsRowExpand(!isRowExpand);
                                }, children: (0, jsx_runtime_1.jsx)(icon_1.Icon, { size: "xs", color: "subtle", component: isRowExpand ? ChevronUpIcon_1.default : ChevronDownIcon_1.default }) })) : null] }, key));
                }) }), showExpand ? ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { colSpan: columns.length, className: "p-0", children: (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('py-2 px-3 border-l border-b border-r rounded-b-xl -mt-4', isHighlight ? 'border-brand' : 'border-default'), children: expandedRowRender(record) }) }) })) : null] }));
}
function Table({ dataSource = [], columns, loading, renderEmpty, rowClickable, defaultField, defaultSort, isRowHighlight, onRowClick, onSortClick, expandedRowRender }) {
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    return ((0, jsx_runtime_1.jsxs)("table", { className: "w-full table-auto border-separate\tborder-spacing-y-3 text-left overflow-y-auto", children: [(0, jsx_runtime_1.jsx)("thead", { className: (0, utils_1.cn)(loading ? 'hidden' : 'table-header'), children: (0, jsx_runtime_1.jsx)("tr", { children: columns
                        .filter(({ mobile }) => !isMobile || mobile)
                        .map(({ title, tip, key, sortable }) => {
                        return ((0, jsx_runtime_1.jsx)(TH, { columnKey: key, title: title, tip: tip, sortable: sortable, onSortClick: onSortClick, defaultField: defaultField, defaultSort: defaultSort }, key));
                    }) }) }), (0, jsx_runtime_1.jsx)("tbody", { children: loading ? ((0, jsx_runtime_1.jsx)(PartronBadgeTableSkeleton_1.default, {})) : dataSource?.length === 0 ? (renderEmpty()) : (dataSource.map((record, i) => ((0, jsx_runtime_1.jsx)(TD, { record: record, columns: columns, rowClickable: rowClickable, isRowHighlight: isRowHighlight, onRowClick: onRowClick, expandedRowRender: expandedRowRender }, i)))) })] }));
}
