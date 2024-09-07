"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGetExploreRecommendList;
const react_1 = require("react");
const bot_1 = require("../../apis/bot.js");
const explore_1 = require("../../apis/explore.js");
const store_1 = require("../../services/store/index.js");
function useGetExploreRecommendList() {
    const recommend = (0, store_1.useBotStore)(state => state.recommend);
    const setRecommend = (0, store_1.useBotStore)(state => state.setRecommend);
    const tagFilters = (0, store_1.useBotStore)(state => state.tagFilters);
    const setTagFilters = (0, store_1.useBotStore)(state => state.setTagFilters);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [recommendError, setRecommendError] = (0, react_1.useState)(false);
    const [filterLoading, setFilterLoading] = (0, react_1.useState)(true);
    const getRecommendData = (0, react_1.useCallback)(async () => {
        setLoading(true);
        setRecommendError(false);
        const res = await (0, explore_1.getExploreRecommend)(true);
        if (res.success) {
            setRecommend(res.data);
        }
        else {
            setRecommendError(true);
            setLoading(false);
            setRecommend({ banners: [], list: [] });
        }
    }, []);
    const getTagFilters = (0, react_1.useCallback)(async () => {
        try {
            const res = await (0, bot_1.getTagInfos)('BOT_TAG_TYPE_SEARCH', true);
            setFilterLoading(false);
            if (res.success) {
                setTagFilters(res.data);
            }
        }
        catch {
            setFilterLoading(false);
        }
    }, []);
    (0, react_1.useEffect)(() => {
        getTagFilters();
        if (recommend?.list?.length === 0) {
            getRecommendData();
        }
    }, []);
    return {
        loading,
        filterLoading,
        recommendError,
        recommend,
        tagFilters,
        getRecommendData
    };
}
