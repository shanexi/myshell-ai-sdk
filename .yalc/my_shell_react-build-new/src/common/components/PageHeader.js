"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowLeftIcon"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const sensors_1 = require("../../lib/sensors/index.js");
const utils_1 = require("../../lib/utils.js");
const FilterIcon_1 = __importDefault(require("./icons/FilterIcon.js"));
const button_1 = require("./ui/button.js");
const icon_1 = require("./ui/icon.js");
const link_1 = require("./ui/link.js");
const search_bar_1 = require("./ui/search-bar.js");
const typography_1 = require("./ui/typography.js");
function PageHeader({ onSearchChange, searchBar = true, title, border, onClear, page, backUrl, isEmptyFilterValues, children }) {
    const t = (0, next_intl_1.useTranslations)();
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const searchParams = (0, navigation_1.useSearchParams)();
    const [showClearButton, setShowClearButton] = (0, react_1.useState)(false);
    const [searchValue, setSearchValue] = (0, react_1.useState)(searchParams?.get('name') || '');
    const sensors = (0, sensors_1.useSensors)();
    (0, react_1.useEffect)(() => {
        setShowClearButton(!isEmptyFilterValues);
        if (isEmptyFilterValues) {
            setSearchValue('');
        }
    }, [isEmptyFilterValues]);
    const clearFilter = () => {
        const element = document.getElementById('position-tag');
        element && element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        onClear && onClear();
    };
    const searchChangeHandle = (value) => {
        setSearchValue(value);
        if (value && page === 'explore-page') {
            const element = document.getElementById('position-tag');
            element && element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            sensors?.track('Search', {
                search_scene: page === 'explore-page' ? 'Bot' : 'Widget',
                search_content: value
            });
            const timer = setTimeout(() => {
                onSearchChange && onSearchChange(value);
                clearTimeout(timer);
            }, 800);
        }
        else {
            onSearchChange && onSearchChange(value);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('w-full flex flex-col justify-between items-center pt-2.5 pb-2.5 md:pt-4 md:pb-4 px-4 md:px-6', border && 'border-b border-default'), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('w-full flex flex-col lg:flex-row justify-between items-start lg:items-center lg:space-x-3 min-h-10'), children: [!isMobile && ((0, jsx_runtime_1.jsx)(typography_1.Display, { size: "sm", className: (0, utils_1.cn)('w-full lg:w-[40%] mb-2 lg:mb-0 flex-shrink-0'), children: title })), (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('w-full md:w-auto', showClearButton || isMobile ? 'flex flex-1 flex-row' : '', isMobile ? 'justify-between' : 'justify-end'), children: [showClearButton && ((0, jsx_runtime_1.jsxs)(button_1.Button, { "aria-label": t('clear_filters'), size: "lg", variant: "primary", color: "default", className: "hidden h-10 md:flex relative text-sm blue-30 text-blue-30 font-medium mr-4 px-4 justify-center items-center", onClick: clearFilter, children: [(0, jsx_runtime_1.jsx)("div", { className: "relative mr-1.5", children: (0, jsx_runtime_1.jsx)(FilterIcon_1.default, { className: "w-5 h-5" }) }), (0, jsx_runtime_1.jsx)("span", { className: "hidden md:block", children: t('clear_filters') })] })), isMobile && ((0, jsx_runtime_1.jsx)(link_1.Link, { href: backUrl, className: "h-10 flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(icon_1.Icon, { size: "xl", component: ArrowLeftIcon_1.default, className: "stroke-icon-brand mr-3" }) })), searchBar && ((0, jsx_runtime_1.jsx)("div", { className: "relative w-full lg:w-[240px]", children: (0, jsx_runtime_1.jsx)(search_bar_1.SearchBar, { searchValue: searchValue, placeholder: t('search'), onSearchChange: value => {
                                        searchChangeHandle(value);
                                    } }) })), showClearButton && ((0, jsx_runtime_1.jsx)(button_1.Button, { className: "flex-shrink-0 flex md:hidden relative text-sm blue-30 text-blue-30 font-medium px-4 justify-center items-center w-10 h-10 ml-3", "aria-label": "Clear Filters", size: "md", variant: "outline", onClick: clearFilter, children: (0, jsx_runtime_1.jsx)("div", { className: "relative", children: (0, jsx_runtime_1.jsx)(FilterIcon_1.default, {}) }) }))] })] }), children] }));
}
exports.default = PageHeader;
