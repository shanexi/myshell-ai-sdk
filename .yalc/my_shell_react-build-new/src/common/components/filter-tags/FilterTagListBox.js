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
const clsx_1 = __importDefault(require("clsx"));
const navigation_1 = require("next/navigation");
const react_1 = __importStar(require("react"));
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const identityService_1 = require("../../../common/services/identityService.js");
const FilterTagListSkeleton_1 = require("../../../components/skeleton/common/FilterTagListSkeleton.js");
const sensors_1 = require("../../../lib/sensors/index.js");
const FilterTagList_1 = __importDefault(require("./FilterTagList.js"));
function FilterTagListBox({ filterLoading, onTagClick, onAllClick, tagFilters, filterIds, filterAll, hideAllTag, page, hideLabel, column, showMore, updateShowMore }) {
    const sensors = (0, sensors_1.useSensors)();
    const searchParams = (0, navigation_1.useSearchParams)();
    const { isMobile, pathname } = (0, usePathLocale_1.usePathLocale)();
    const excludeFilters = searchParams?.get('excludefilter')?.split('$$') || [];
    const traverseInclude = (tag) => {
        if (!excludeFilters.includes(tag.id) && !tag.isComingSoon) {
            if (!filterIds.includes(tag.id)) {
                filterIds.push(tag.id);
            }
            if (tag.childTags && tag.childTags?.length > 0 && !tag.isComingSoon) {
                tag?.childTags?.forEach((arr) => {
                    traverseInclude(arr);
                });
            }
        }
    };
    const scrollIntoView = (0, react_1.useCallback)(() => {
        if (page !== 'explore-page')
            return;
        const element = document.getElementById('position-tag');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [page]);
    const clickAllHandle = (tag, hasAllSelected) => {
        const url = new URL(window.location.href);
        url.searchParams.delete('excludefilter');
        let leftFilterIds = [];
        if (!hasAllSelected) {
            leftFilterIds = filterIds.filter(filterId => {
                if (tag?.childTags) {
                    const hasSameParent = tag.childTags.some(childTag => {
                        return childTag.id === filterId;
                    });
                    return !hasSameParent;
                }
                return false;
            });
            if (leftFilterIds.length > 0) {
                url.searchParams.set('filter', leftFilterIds.join('$$'));
            }
            else {
                url.searchParams.delete('filter');
            }
            scrollIntoView();
            url.searchParams.set('filterAll', tag.id);
        }
        else {
            url.searchParams.delete('filterAll');
            url.searchParams.delete('filter');
            url.searchParams.delete('name');
        }
        identityService_1.identityService.setPageSearch(page, url.search);
        const curName = url.searchParams.get('name') || '';
        const all = url.searchParams.get('filterAll') || '';
        onAllClick(leftFilterIds, all, curName, `${url.pathname}${url.search}`);
    };
    const clickTagHandle = (0, react_1.useCallback)((tagId, tagName, parentName, clearAllOpt) => {
        let filterType = 'Filter';
        if (filterIds.includes(tagId)) {
            filterType = 'Unfilter';
            filterIds.splice(filterIds.indexOf(tagId), 1);
        }
        else {
            filterIds.push(tagId);
            scrollIntoView();
        }
        const url = new URL(window.location.href);
        url.searchParams.delete('excludefilter');
        const value = filterIds.join('$$');
        if (value) {
            url.searchParams.set('filter', value);
        }
        else {
            url.searchParams.delete('filter');
        }
        if (clearAllOpt) {
            url.searchParams.delete('filterAll');
        }
        identityService_1.identityService.setPageSearch(page, url.search);
        sensors?.track(filterType, {
            filter_type: parentName,
            filter_scene: page === 'explore-page' ? 'Bot' : 'Widget',
            filter_name: tagName
        });
        onTagClick(filterIds, clearAllOpt, `${url.pathname}${url.search}`);
    }, [filterIds, onTagClick, page, scrollIntoView]);
    if (excludeFilters.length > 0 && tagFilters?.length > 0) {
        tagFilters?.forEach(item => {
            if (item.childTags && item.childTags?.length > 0) {
                item.childTags?.forEach(childTag => {
                    traverseInclude(childTag);
                });
            }
        });
    }
    if (tagFilters?.length > 0 && isMobile && sessionStorage.getItem(`more-link${pathname}`) === 'true') {
        const timer = setTimeout(() => {
            const element = document.getElementsByClassName('filter-tag-item-selected')?.[0];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
            sessionStorage.setItem(`more-link${pathname}`, 'false');
            clearTimeout(timer);
        }, 100);
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative w-auto flex justify-between px-4 md:px-6 max-h-[306px] overflow-y-auto flex-shrink-0", children: [(0, jsx_runtime_1.jsx)("div", { id: "position-tag", className: "absolute left-0 -top-12 w-0 h-0" }), filterLoading && tagFilters?.length === 0 ? ((0, jsx_runtime_1.jsx)(FilterTagListSkeleton_1.FilterTagListSkeleton, { column: column })) : ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('w-full h-full flex flex-grow flex-col justify-center items-start'), children: tagFilters?.map((tag, tagIndex) => {
                    return ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [(0, jsx_runtime_1.jsx)(FilterTagList_1.default, { hasAllOpt: tagIndex === 0 && !hideAllTag, tag: tag, filterIds: filterIds, filterAll: filterAll, onTagClick: clickTagHandle, clickAllHandle: clickAllHandle, hideLabel: hideLabel, showMore: showMore, updateShowMore: updateShowMore }), tag.id === '1719340128612346721' && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: tag.childTags?.map((child) => {
                                    const tagSelected = filterIds.includes(child.id);
                                    if (!tagSelected || child.childTags?.length === 0)
                                        return null;
                                    return ((0, jsx_runtime_1.jsx)(FilterTagList_1.default, { tag: child, filterIds: filterIds, filterAll: filterAll, onTagClick: clickTagHandle, clickAllHandle: clickAllHandle, hideLabel: hideLabel }, child.id));
                                }) }))] }, tag.label));
                }) }))] }));
}
exports.default = FilterTagListBox;
