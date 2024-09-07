"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const utils_1 = require("../../../lib/utils.js");
const FilterTagItem_1 = __importDefault(require("./FilterTagItem.js"));
function FilterTagList({ tag, hasAllOpt, filterIds, filterAll, hideLabel, onTagClick, clickAllHandle, showMore, updateShowMore }) {
    const t = (0, next_intl_1.useTranslations)();
    const ulRef = (0, react_1.useRef)(null);
    const ulBoxRef = (0, react_1.useRef)(null);
    const [showMoreLocal, setShowMoreLocal] = (0, react_1.useState)(false);
    const [showShowMoreButton, setShowShowMoreButton] = (0, react_1.useState)(false);
    const { pathname } = (0, usePathLocale_1.usePathLocale)();
    const toggleMore = () => {
        if (showMoreLocal && ulBoxRef.current) {
            ulBoxRef.current.scrollTop = 0;
        }
        setShowMoreLocal(!showMoreLocal);
        updateShowMore?.(!showMoreLocal);
    };
    (0, react_1.useEffect)(() => {
        setShowMoreLocal(!!showMore);
    }, [showMore]);
    (0, react_1.useEffect)(() => {
        const handleResize = () => {
            if (ulRef.current) {
                const ulHeight = ulRef.current.offsetHeight;
                setShowShowMoreButton(ulHeight > 58);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const setMoreHandle = (0, react_1.useCallback)(() => {
        const isShowMore = tag.childTags?.some(item => {
            return filterIds.includes(item.id);
        });
        if (isShowMore) {
            setShowMoreLocal(true);
            updateShowMore?.(true);
        }
    }, [filterIds, tag, updateShowMore]);
    (0, react_1.useEffect)(() => {
        if (ulRef.current) {
            const ulHeight = ulRef.current.offsetHeight;
            const isShowMoreButton = ulHeight > 58;
            setShowShowMoreButton(isShowMoreButton);
            if (isShowMoreButton) {
                setMoreHandle();
            }
        }
    }, [ulRef, setShowShowMoreButton, tag, setMoreHandle]);
    (0, react_1.useEffect)(() => {
        const isMoreLink = sessionStorage.getItem(`more-link${pathname}`) === 'true';
        if (isMoreLink) {
            setMoreHandle();
            sessionStorage.setItem(`more-link${pathname}`, 'false');
        }
    }, [filterIds, pathname, setMoreHandle]);
    const hasAllSelected = !!filterAll;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative flex flex-shrink-0 mb-3 md:mb-1 w-full", children: [!hideLabel && (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('mr-3 flex-shrink-0 h-7 py-1 text-base mb-1 md:mb-0'), children: [tag.label, ":"] }), (0, jsx_runtime_1.jsxs)("div", { ref: ulBoxRef, className: (0, utils_1.cn)('w-[calc(100vw-16px)] md:w-full overflow-hidden overflow-x-auto md:overflow-x-hidden flex-grow no-scrollbar', showMoreLocal ? '' : 'max-h-[36px]', showShowMoreButton && !showMoreLocal && 'pr-10'), children: [(0, jsx_runtime_1.jsxs)("ul", { ref: ulRef, className: "relative flex flex-nowrap md:flex-wrap", children: [hasAllOpt && ((0, jsx_runtime_1.jsx)("li", { className: (0, utils_1.cn)('flex-shrink-0 cursor-pointer h-7 py-1 px-3 rounded-lg text-sm mb-1 text-default md:mb-2 mr-3', hasAllSelected
                                    ? 'bg-surface-primary-default font-medium text-white'
                                    : 'bg-surface-accent-gray-subtlest hover:bg-surface-accent-gray-subtler focus:shadow-rings-brand'), onClick: () => {
                                    clickAllHandle(tag, hasAllSelected);
                                }, children: t('common.all') }, "FilterTagItem_hasAll")), tag.childTags?.map((childTag) => {
                                const tagSelected = filterIds.includes(childTag.id);
                                return ((0, jsx_runtime_1.jsx)(FilterTagItem_1.default, { tag: childTag, tagSelected: tagSelected, onClick: () => {
                                        onTagClick(childTag.id, childTag.label, childTag.label, tag.id === filterAll);
                                    } }, `${childTag.parentId}_${childTag.id}`));
                            }), showShowMoreButton && showMoreLocal && ((0, jsx_runtime_1.jsx)("li", { className: (0, utils_1.cn)('flex-shrink-0 h-7 py-1 px-3 rounded-lg text-sm mb-1 text-brand md:mb-2 mr-3 bg-surface-accent-gray-subtlest hover:bg-surface-accent-gray-subtler focus:shadow-rings-brand cursor-pointer font-medium'), onClick: () => {
                                    toggleMore();
                                }, children: t('workshop.show_less') }, "show-less-button"))] }), showShowMoreButton && !showMoreLocal && ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('absolute right-0 top-0 flex-shrink-0 h-7 py-1 px-3 rounded-lg text-sm mb-1 text-brand md:mb-2 mr-3 bg-surface-accent-gray-subtlest hover:bg-surface-accent-gray-subtler focus:shadow-rings-brand cursor-pointer font-medium'), onClick: () => {
                            toggleMore();
                        }, children: t('workshop.show_more') }, "show-more-button"))] })] }));
}
exports.default = FilterTagList;
