"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGetWorkshopSearchList;
const throttle_1 = __importDefault(require("lodash-es/throttle"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const workshop_1 = require("../../apis/workshop.js");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const store_1 = require("../../services/store/index.js");
const useNotification_1 = require("../../common/hooks/useNotification.js");
function useGetWorkshopSearchList({ scrollRef, filterIds, filterName, filterAll, excludefilter, isEmptyFilterValues }) {
    const searchList = (0, store_1.useWorkshopStore)(state => state.searchList);
    const setSearchList = (0, store_1.useWorkshopStore)(state => state.setSearchList);
    const hasMore = (0, react_1.useRef)(true);
    const nextPageToken = (0, react_1.useRef)('0');
    const { pathname } = (0, usePathLocale_1.usePathLocale)();
    const [pageToken, setPageToken] = (0, react_1.useState)('0');
    const [fetchEmpty, setFetchEmpty] = (0, react_1.useState)(false);
    const [searchLoading, setSearchLoading] = (0, react_1.useState)(false);
    const [fetchError, setFetchError] = (0, react_1.useState)(false);
    const searchParams = (0, navigation_1.useSearchParams)();
    const { warning } = (0, useNotification_1.useNotification)();
    const requestT = (0, next_intl_1.useTranslations)('request');
    const getSearchData = (0, react_1.useCallback)(async (abortSignal, filterIds, filterName, page, excludeTagIds) => {
        setFetchError(false);
        setSearchLoading(true);
        try {
            const res = await (0, workshop_1.getWidgetSearchList)({
                query: filterName,
                includeTagIds: filterIds,
                excludeTagIds,
                pageToken: page,
                signal: abortSignal
            });
            if (abortSignal && abortSignal.aborted) {
                return false;
            }
            if (res.success) {
                const { data } = res;
                const d = Array.isArray(data.list) ? data.list.filter((item) => !!item && typeof item === 'object') : [];
                setSearchList(page === '0' ? d : [...searchList, ...d]);
                setFetchEmpty(page === '0' && d.length === 0);
                nextPageToken.current = data?.listResponse?.nextPageToken;
                hasMore.current = data?.listResponse?.hasMore;
                setSearchLoading(false);
                sessionHandle();
            }
            else {
                page === '0' && setSearchList([]);
                hasMore.current = false;
                setSearchLoading(false);
                setFetchError(true);
                sessionHandle();
            }
        }
        catch {
            page === '0' && setSearchList([]);
            hasMore.current = pageToken !== '0';
            setSearchLoading(false);
            setFetchError(true);
            sessionHandle();
        }
    }, [pageToken, searchList]);
    const getSearchListMore = () => {
        const abortController = new AbortController();
        getSearchData(abortController.signal, filterIds, filterName, pageToken, excludefilter);
    };
    const sessionHandle = () => {
        sessionStorage.setItem(`search${pathname}`, `${pageToken}$$${nextPageToken.current}$$${hasMore.current}`);
    };
    (0, react_1.useEffect)(() => {
        function handleScroll() {
            const containerEl = scrollRef.current;
            if (containerEl &&
                containerEl.scrollTop + containerEl.clientHeight >= containerEl.scrollHeight - containerEl.clientHeight) {
                setPageToken(nextPageToken.current);
            }
        }
        const throttledHandleScroll = (0, throttle_1.default)(handleScroll, 500);
        const containerEl = scrollRef.current;
        if (containerEl) {
            if (isEmptyFilterValues) {
                containerEl.removeEventListener('scroll', throttledHandleScroll, true);
            }
            else {
                containerEl.addEventListener('scroll', throttledHandleScroll, true);
            }
        }
        return () => {
            if (containerEl) {
                containerEl.removeEventListener('scroll', throttledHandleScroll, true);
            }
            sessionStorage.setItem(`init-search${pathname}`, 'false');
        };
    }, [isEmptyFilterValues]);
    (0, react_1.useEffect)(() => {
        const post = Number(sessionStorage.getItem(`scrollPos:${pathname}`));
        const initSearch = sessionStorage.getItem(`init-search${pathname}`);
        if (post > 0 && searchList?.length > 0 && initSearch !== 'true') {
            sessionStorage.setItem(`init-search${pathname}`, 'true');
            const params = sessionStorage.getItem(`search${pathname}`)?.split('$$');
            nextPageToken.current = params?.[1] || '0';
            setPageToken(params?.[0] || '0');
            hasMore.current = params?.[2] === 'true';
            return;
        }
        sessionStorage.setItem(`init-search${pathname}`, 'true');
        const abortController = new AbortController();
        if (!isEmptyFilterValues) {
            setFetchEmpty(false);
            hasMore.current = true;
            nextPageToken.current = '0';
            setPageToken('0');
            setSearchList([]);
            sessionHandle();
            getSearchData(abortController.signal, filterIds, filterName, '0', excludefilter);
        }
        return () => abortController.abort();
    }, [filterIds?.length, filterName, filterAll, excludefilter]);
    (0, react_1.useEffect)(() => {
        if (pageToken !== '0' && hasMore.current && Number(pageToken) >= searchList?.length) {
            getSearchListMore();
        }
    }, [pageToken]);
    return {
        searchLoading,
        fetchError,
        hasMore: hasMore.current,
        pageToken,
        fetchEmpty,
        nextPageToken,
        searchList,
        setSearchList,
        setSearchLoading,
        getSearchListMore
    };
}
