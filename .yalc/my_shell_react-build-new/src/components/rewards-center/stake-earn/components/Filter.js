"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterType = void 0;
exports.default = Filter;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const typography_1 = require("../../../../common/components/ui/typography.js");
var FilterType;
(function (FilterType) {
    FilterType["MY_PORTFOLIO"] = "portfolio";
    FilterType["PRESALE"] = "presale";
    FilterType["TRENDING"] = "trending";
    FilterType["POTENTIAL"] = "potential";
    FilterType["RECENT"] = "recent";
})(FilterType || (exports.FilterType = FilterType = {}));
const defaultProps = {
    className: ''
};
function Filter(pros) {
    const { className, selected, onChange } = { ...defaultProps, ...pros };
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const Filters = [
        {
            label: t('my_portfolio'),
            value: FilterType.MY_PORTFOLIO
        },
        {
            label: t('recent'),
            value: FilterType.RECENT
        },
        {
            label: t('potential'),
            value: FilterType.POTENTIAL
        },
        {
            label: t('trending'),
            value: FilterType.TRENDING
        }
    ];
    const handleSelectedChange = (value) => {
        onChange(value);
    };
    return ((0, jsx_runtime_1.jsx)("ul", { className: `flex space-x-4 overflow-auto w-auto no-scrollbar pt-2 ${className}`, children: Filters.map(item => ((0, jsx_runtime_1.jsx)("li", { className: (0, clsx_1.default)('shrink-0 px-5 py-2 md:h-9 rounded-xl text-sm cursor-pointer font-medium relative', selected === item.value
                ? 'bg-primary border border-transparent shadow-button-primary'
                : 'bg-surface-search-field border border-default shadow-button-basic'), onClick: () => {
                handleSelectedChange(item.value);
            }, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 ", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute left-0 top-[-9px] z-10", children: item.icon }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-sm", weight: "medium", color: selected === item.value ? 'static' : 'subtler', children: item.label })] }) }, item.value))) }));
}
