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
const BannerItem_1 = require("../../common/components/banner/BannerItem.js");
const FilterTagListBox_1 = __importDefault(require("../../common/components/filter-tags/FilterTagListBox.js"));
const swiper_1 = require("../../common/components/ui/swiper/index.js");
const workshop_1 = require("../../common/constants/enums/workshop.js");
const useGuide_1 = require("../../common/hooks/useGuide.js");
const useHandleInviteLink_1 = require("../../common/hooks/useHandleInviteLink.js");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const useRestoreScrollPosition_1 = require("../../common/hooks/useRestoreScrollPosition.js");
const identityService_1 = require("../../common/services/identityService.js");
const useGetExploreRecommendList_1 = __importDefault(require("../../hooks/bot/useGetExploreRecommendList.js"));
const useGetExploreSearchList_1 = __importDefault(require("../../hooks/bot/useGetExploreSearchList.js"));
const utils_1 = require("../../lib/utils.js");
const UserDetailModal_1 = __importDefault(require("../profile/UserDetailModal.js"));
const BannerSkeleton_1 = require("../skeleton/common/BannerSkeleton.js");
const RecommendListSkeleton_1 = require("../skeleton/common/RecommendListSkeleton.js");
function ExplorePage(props) {
    const { isMobile } = props;
    const t = (0, next_intl_1.useTranslations)();
    const searchParams = (0, navigation_1.useSearchParams)();
    const [showUserDetail, setShowUserDetail] = (0, react_1.useState)(null);
    (0, useHandleInviteLink_1.useHandleInviteLink)();
    const excludefilter = searchParams?.get('excludefilter') || '';
    const [filterIds, setFilterIds] = (0, react_1.useState)(searchParams
        ?.get('filter')
        ?.split('$$')
        .filter(item => !!item) || []);
    const [filterName, setFilterName] = (0, react_1.useState)(searchParams?.get('name') || '');
    const [filterAll, setFilterAll] = (0, react_1.useState)(searchParams?.get('filterAll') || '');
    const [isEmptyFilterValues, setIsEmptyFilterValues] = (0, react_1.useState)(filterIds.length === 0 && excludefilter === '' && filterName === '' && filterAll === '');
    const scrollRef = (0, react_1.useRef)(null);
    (0, useRestoreScrollPosition_1.useRestoreScrollPosition)(scrollRef, true);
    const router = (0, navigation_1.useRouter)();
    const memoScrollPosition = (0, useRestoreScrollPosition_1.useMemoScrollPosition)(scrollRef);
    const pageId = 'explore-page';
    const featureSpotRef = (0, react_1.useRef)(0);
    const { loading, filterLoading, recommendError, recommend, tagFilters, getRecommendData } = (0, useGetExploreRecommendList_1.default)();
    const { searchLoading, hasMore, fetchEmpty, fetchError, searchList, setSearchList, setSearchLoading, getSearchListMore } = (0, useGetExploreSearchList_1.default)({
        filterIds,
        filterName,
        filterAll,
        isEmptyFilterValues,
        scrollRef
    });
    const pushStateUrl = (0, react_1.useCallback)((url) => {
        setSearchList([]);
        setSearchLoading(true);
        window.history.pushState(null, '', url);
    }, [setSearchList, setSearchLoading]);
    const tagFiltersChange = (0, react_1.useCallback)((ids, clearAllOpt, url) => {
        const timer = setTimeout(() => {
            pushStateUrl(url);
            setFilterIds(ids);
            clearAllOpt && setFilterAll('');
            setIsEmptyFilterValues(ids.length === 0 && excludefilter === '' && filterName === '' && filterAll === '');
            clearTimeout(timer);
        }, 300);
    }, [pushStateUrl, excludefilter, filterName, filterAll]);
    const allFilterChange = (0, react_1.useCallback)((ids, all, name, url) => {
        setIsEmptyFilterValues(ids.length === 0 && excludefilter === '' && name === '' && all === '');
        const timer = setTimeout(() => {
            setFilterIds(ids);
            setFilterAll(all);
            setFilterName(name);
            pushStateUrl(url);
            clearTimeout(timer);
        }, 300);
    }, [excludefilter, pushStateUrl]);
    const { driverGuide } = (0, useGuide_1.useGuide)();
    const { pathname } = (0, usePathLocale_1.usePathLocale)();
    (0, react_1.useEffect)(() => {
        const instance = searchParams?.get('instance');
        if (instance === 'web3' && !isMobile) {
            driverGuide({
                step: 'classic-switcher',
                steps: [
                    {
                        element: '#classic-switcher',
                        popover: {
                            title: t('guide_web3_title'),
                            description: t('guide_web3_content'),
                            side: 'right',
                            align: 'end'
                        }
                    }
                ],
                onDestroyed: () => {
                }
            });
        }
        const handleUnload = () => {
            sessionStorage.setItem(`scrollPos:${pathname}`, '0');
        };
        window.addEventListener('beforeunload', handleUnload);
        if (scrollRef.current) {
        }
        const url = new URL(window.location.href);
        router.push(url.pathname + url.search);
        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, []);
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
        setIsEmptyFilterValues(ids.length === 0 && excludefilter === '' && filterName === '' && filterAll === '');
    }, [searchParams.get('filter')]);
    const handleSetShowUserDetail = (0, react_1.useCallback)((args) => {
        setShowUserDetail(args);
    }, [setShowUserDetail]);
    const memoizedNormalCard = (0, react_1.useMemo)(() => {
        return function (args) {
            return (0, jsx_runtime_1.jsx)(NormalCard_1.default, { from: "Explore", ...args, setShowUserDetail: handleSetShowUserDetail });
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
        setIsEmptyFilterValues(true);
        identityService_1.identityService.setPageSearch(pageId, null);
        pushStateUrl(url.pathname + url.search);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("section", { className: (0, utils_1.cn)('relative h-full flex-1 flex flex-col overflow-hidden bg-surface-default text-on-surface rounded-none md:rounded-[24px]'), children: [(0, jsx_runtime_1.jsx)(PageHeader_1.default, { title: t('explore'), backUrl: "/chat", page: pageId, isEmptyFilterValues: isEmptyFilterValues, onSearchChange: (value) => {
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
                            setIsEmptyFilterValues(ids.length === 0 && excludefilter === '' && value === '' && all === '');
                            identityService_1.identityService.setPageSearch(pageId, url.search);
                            pushStateUrl(`${url.pathname}${url.search}`);
                        }, onClear: clearFilterHandle }), (0, jsx_runtime_1.jsxs)("div", { ref: scrollRef, id: pageId, className: (0, utils_1.cn)('flex-1 flex-grow py-4 md:py-0 space-y-6 no-scrollbar overflow-y-scroll h-[calc(100vh-296px)]', fetchEmpty && 'flex flex-col'), children: [!recommendError && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: loading && recommend.banners?.length === 0 ? ((0, jsx_runtime_1.jsx)(BannerSkeleton_1.BannerSkeleton, {})) : ((0, jsx_runtime_1.jsx)(swiper_1.Swiper, { dataList: recommend.banners, from: "Explore_Banner", swiperType: "banner", component: BannerItem_1.BannerItem })) })), (0, jsx_runtime_1.jsx)(FilterTagListBox_1.default, { onTagClick: tagFiltersChange, onAllClick: allFilterChange, filterLoading: filterLoading, tagFilters: tagFilters, page: pageId, filterAll: filterAll, filterIds: filterIds, hideAllTag: !!filterName, hideLabel: true }), isEmptyFilterValues ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: loading && recommend.list?.length === 0 ? ((0, jsx_runtime_1.jsx)(RecommendListSkeleton_1.RecommendListSkeleton, {})) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: recommendError ? ((0, jsx_runtime_1.jsx)(ErrorState_1.default, { onClick: getRecommendData, className: "pt-20" })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: recommend.list?.map((item, index) => {
                                            switch (item.type) {
                                                case workshop_1.CardEnum.TYPE_SLIDER:
                                                    featureSpotRef.current++;
                                                    const spot = featureSpotRef.current;
                                                    return ((0, jsx_runtime_1.jsx)("div", { className: "!mt-3 md:!mt-4 px-0 md:px-2 rounded-md", children: (0, jsx_runtime_1.jsx)(swiper_1.Swiper, { dataList: item.items, swiperType: "featured", component: args => ((0, jsx_runtime_1.jsx)(FeaturedCard_1.default, { ...args, eventName: "RecommendItemExposure", recommendationSpot: `Explore_FeatureGrp${spot}`, index: args.index })) }) }, `${item.title}${index}`));
                                                case workshop_1.CardEnum.TYPE_NORMAL_TITLE:
                                                    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('px-0 md:px-3.5 rounded-md', index === 0 && '!mt-2 !mb-0 md:!my-4'), children: [(0, jsx_runtime_1.jsx)(SectionHeader_1.default, { ...item, page: pageId }), (0, jsx_runtime_1.jsx)(swiper_1.Swiper, { dataList: item.items, swiperType: "grid", className: "h-[314px]", component: memoizedNormalCard })] }, `${item.title}${index}`));
                                                default:
                                                    return null;
                                            }
                                        }) })) })) })) : ((0, jsx_runtime_1.jsx)(SearchList_1.default, { loading: searchLoading, setShowUserDetail: detail => {
                                    setShowUserDetail(detail);
                                }, hasMore: hasMore, fetchError: fetchError, fetchEmpty: fetchEmpty, searchList: searchList, getSearchList: getSearchListMore }))] })] }), !isMobile && !!showUserDetail?.name && ((0, jsx_runtime_1.jsx)(UserDetailModal_1.default, { isOpen: !!showUserDetail?.name, onClose: () => {
                    setShowUserDetail(null);
                }, userName: showUserDetail.name, nameTag: showUserDetail.nameTag }))] }));
}
exports.default = ExplorePage;
