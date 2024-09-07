"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const throttle_1 = __importDefault(require("lodash-es/throttle"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const ErrorState_1 = __importDefault(require("../../common/components/ErrorState.js"));
const FeaturedCard_1 = __importDefault(require("../../common/components/FeaturedCard.js"));
const NormalCard_1 = __importDefault(require("../../common/components/NormalCard.js"));
const PageHeader_1 = __importDefault(require("../../common/components/PageHeader.js"));
const SearchList_1 = __importDefault(require("../../common/components/SearchList.js"));
const SectionHeader_1 = __importDefault(require("../../common/components/SectionHeader.js"));
const FilterTagListBox_1 = __importDefault(require("../../common/components/filter-tags/FilterTagListBox.js"));
const swiper_1 = require("../../common/components/ui/swiper/index.js");
const workshop_1 = require("../../common/constants/enums/workshop.js");
const useHandleInviteLink_1 = require("../../common/hooks/useHandleInviteLink.js");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const useRestoreScrollPosition_1 = require("../../common/hooks/useRestoreScrollPosition.js");
const identityService_1 = require("../../common/services/identityService.js");
const useGetWorkshopRecommendList_1 = __importDefault(require("../../hooks/workshop/useGetWorkshopRecommendList.js"));
const useGetWorkshopSearchList_1 = __importDefault(require("../../hooks/workshop/useGetWorkshopSearchList.js"));
const utils_1 = require("../../lib/utils.js");
const UserDetailModal_1 = __importDefault(require("../profile/UserDetailModal.js"));
const RecommendListSkeleton_1 = require("../skeleton/common/RecommendListSkeleton.js");
function WidgetsPage(props) {
    const { isMobile } = props;
    const t = (0, next_intl_1.useTranslations)();
    const searchParams = (0, navigation_1.useSearchParams)();
    const [showUserDetail, setShowUserDetail] = (0, react_1.useState)(null);
    (0, useHandleInviteLink_1.useHandleInviteLink)();
    const [excludefilter, setExcludefilter] = (0, react_1.useState)(searchParams
        ?.get('excludefilter')
        ?.split('$$')
        .filter(item => !!item) || []);
    const [filterIds, setFilterIds] = (0, react_1.useState)(searchParams
        ?.get('filter')
        ?.split('$$')
        .filter(item => !!item) || []);
    const [filterName, setFilterName] = (0, react_1.useState)(searchParams?.get('name') || '');
    const [filterAll, setFilterAll] = (0, react_1.useState)(searchParams?.get('filterAll') || '');
    const [isEmptyFilterValues, setIsEmptyFilterValues] = (0, react_1.useState)(filterIds.length === 0 && excludefilter.length === 0 && filterName === '' && filterAll === '');
    const scrollRef = (0, react_1.useRef)(null);
    (0, useRestoreScrollPosition_1.useRestoreScrollPosition)(scrollRef, true);
    const memoScrollPosition = (0, useRestoreScrollPosition_1.useMemoScrollPosition)(scrollRef);
    const pageId = 'widgets-page';
    const featureSpotRef = (0, react_1.useRef)(0);
    const { loading, filterLoading, recommendError, recommend, tagFilters, getRecommendData } = (0, useGetWorkshopRecommendList_1.default)();
    const { searchLoading, hasMore, fetchEmpty, fetchError, searchList, setSearchList, setSearchLoading, getSearchListMore } = (0, useGetWorkshopSearchList_1.default)({
        filterIds,
        filterName,
        filterAll,
        excludefilter,
        isEmptyFilterValues,
        scrollRef
    });
    const pushStateUrl = (url) => {
        setSearchList([]);
        setSearchLoading(true);
        window.history.pushState(null, '', url);
    };
    const tagFiltersChange = (0, react_1.useCallback)((ids, clearAllOpt, url) => {
        const timer = setTimeout(() => {
            pushStateUrl(url);
            setFilterIds(ids);
            clearAllOpt && setFilterAll('');
            setIsEmptyFilterValues(ids.length === 0 && excludefilter.length === 0 && filterName === '' && filterAll === '');
            clearTimeout(timer);
        }, 300);
    }, [excludefilter, filterName, filterAll]);
    const allFilterChange = (0, react_1.useCallback)((ids, all, name, url) => {
        setIsEmptyFilterValues(ids.length === 0 && excludefilter.length === 0 && name === '' && all === '');
        const timer = setTimeout(() => {
            setFilterIds(ids);
            setExcludefilter([]);
            setFilterAll(all);
            setFilterName(name);
            pushStateUrl(url);
            clearTimeout(timer);
        }, 300);
    }, [excludefilter, filterName, filterAll]);
    const { pathname } = (0, usePathLocale_1.usePathLocale)();
    (0, react_1.useEffect)(() => {
        const handleUnload = () => {
            sessionStorage.setItem(`scrollPos:${pathname}`, '0');
        };
        window.addEventListener('beforeunload', handleUnload);
        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, []);
    const handleSetShowUserDetail = (0, react_1.useCallback)((args) => {
        setShowUserDetail(args);
    }, [setShowUserDetail]);
    const memoizedNormalCard = (0, react_1.useMemo)(() => {
        return function (args) {
            return (0, jsx_runtime_1.jsx)(NormalCard_1.default, { ...args, setShowUserDetail: handleSetShowUserDetail });
        };
    }, [handleSetShowUserDetail]);
    featureSpotRef.current = 0;
    const clearFilterHandle = () => {
        const url = new URL(window.location.href);
        url.searchParams.delete('filter');
        url.searchParams.delete('name');
        url.searchParams.delete('filterAll');
        url.searchParams.delete('excludefilter');
        setFilterAll('');
        setFilterIds([]);
        setFilterName('');
        setExcludefilter([]);
        setIsEmptyFilterValues(true);
        identityService_1.identityService.setPageSearch(pageId, null);
        pushStateUrl(url.pathname + url.search);
    };
    (0, react_1.useEffect)(() => {
        function handleScroll() {
            memoScrollPosition(pageId);
        }
        const containerEl = scrollRef.current;
        if (containerEl) {
            containerEl.addEventListener('scroll', (0, throttle_1.default)(handleScroll, 500), true);
        }
        return () => {
            if (containerEl) {
                containerEl.removeEventListener('scroll', handleScroll, true);
            }
        };
    }, []);
    (0, react_1.useEffect)(() => {
        const ids = searchParams
            ?.get('filter')
            ?.split('$$')
            .filter(item => !!item) || [];
        setFilterIds(ids);
        const exIds = searchParams
            ?.get('excludefilter')
            ?.split('$$')
            .filter(item => !!item) || [];
        setExcludefilter(exIds);
        setIsEmptyFilterValues(ids.length === 0 && exIds.length === 0 && filterName === '' && filterAll === '');
    }, [searchParams.get('filter'), searchParams.get('excludefilter')]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("section", { className: (0, utils_1.cn)('relative h-full flex-1 flex flex-col overflow-hidden bg-surface-default text-default md:rounded-2xl'), children: [(0, jsx_runtime_1.jsx)(PageHeader_1.default, { title: t('workshop.widgets_title'), backUrl: "/robot-workshop", page: pageId, isEmptyFilterValues: isEmptyFilterValues, onSearchChange: (value) => {
                            if (value === filterName)
                                return;
                            const url = new URL(window.location.href);
                            if (value) {
                                url.searchParams.set('name', value);
                            }
                            else {
                                url.searchParams.delete('name');
                            }
                            setFilterName(value);
                            const ids = url.searchParams
                                .get('filter')
                                ?.split('$$')
                                .filter(item => !!item) || [];
                            const all = url.searchParams.get('filterAll') || '';
                            setIsEmptyFilterValues(ids.length === 0 && excludefilter.length === 0 && value === '' && all === '');
                            identityService_1.identityService.setPageSearch(pageId, url.search);
                            pushStateUrl(`${url.pathname}${url.search}`);
                        }, onClear: clearFilterHandle, border: true }), (0, jsx_runtime_1.jsxs)("div", { ref: scrollRef, id: pageId, className: (0, utils_1.cn)('flex-1 flex-grow space-y-6 py-6 overflow-y-scroll no-scrollbar h-[calc(100vh-96px)]', fetchEmpty && 'flex flex-col'), children: [(0, jsx_runtime_1.jsx)(FilterTagListBox_1.default, { onTagClick: tagFiltersChange, onAllClick: allFilterChange, filterLoading: filterLoading, tagFilters: tagFilters, page: pageId, filterAll: filterAll, filterIds: filterIds, hideAllTag: !!filterName, column: 3 }), isEmptyFilterValues ? ((0, jsx_runtime_1.jsx)("div", { children: loading && recommend.list?.length === 0 ? ((0, jsx_runtime_1.jsx)(RecommendListSkeleton_1.RecommendListSkeleton, { isWorkshop: true })) : ((0, jsx_runtime_1.jsx)("div", { children: recommendError ? ((0, jsx_runtime_1.jsx)(ErrorState_1.default, { onClick: getRecommendData, className: "pt-20" })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: recommend.list?.map((item, index) => {
                                            switch (item.type) {
                                                case workshop_1.CardEnum.TYPE_SLIDER:
                                                    featureSpotRef.current++;
                                                    return ((0, jsx_runtime_1.jsx)("div", { className: "!mt-0 md:!mt-4 px-2 rounded-md", children: (0, jsx_runtime_1.jsx)(swiper_1.Swiper, { dataList: item.items, swiperType: "featured", component: args => ((0, jsx_runtime_1.jsx)(FeaturedCard_1.default, { ...args, eventName: "RecommendItemExposure", recommendationSpot: `Workshop_FeatureGrp${featureSpotRef.current}`, index: index })) }) }, `${item.title}${index}`));
                                                case workshop_1.CardEnum.TYPE_NORMAL_TITLE:
                                                    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('px-0 md:px-3.5 rounded-md !mt-2 !mb-0 md:!my-4'), children: [(0, jsx_runtime_1.jsx)(SectionHeader_1.default, { ...item, page: pageId }), (0, jsx_runtime_1.jsx)(swiper_1.Swiper, { dataList: item.items, swiperType: "grid", className: "h-[314px]", component: memoizedNormalCard })] }, item.title));
                                                default:
                                                    return null;
                                            }
                                        }) })) })) })) : ((0, jsx_runtime_1.jsx)(SearchList_1.default, { hasMore: hasMore, loading: searchLoading, setShowUserDetail: detail => {
                                    setShowUserDetail(detail);
                                }, fetchError: fetchError, fetchEmpty: fetchEmpty, searchList: searchList, getSearchList: getSearchListMore }))] })] }), !isMobile && !!showUserDetail?.name && ((0, jsx_runtime_1.jsx)(UserDetailModal_1.default, { isOpen: !!showUserDetail?.name, onClose: () => {
                    setShowUserDetail(null);
                }, userName: showUserDetail.name, nameTag: showUserDetail.nameTag }))] }));
}
exports.default = WidgetsPage;
