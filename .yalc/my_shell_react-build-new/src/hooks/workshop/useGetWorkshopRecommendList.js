"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGetWorkshopRecommendList;
const react_1 = require("react");
const workshop_1 = require("../../apis/workshop.js");
const store_1 = require("../../services/store/index.js");
function useGetWorkshopRecommendList() {
    const recommend = (0, store_1.useWorkshopStore)(state => state.recommend);
    const setRecommend = (0, store_1.useWorkshopStore)(state => state.setRecommend);
    const tagFilters = (0, store_1.useWorkshopStore)(state => state.tagFilters);
    const setTagFilters = (0, store_1.useWorkshopStore)(state => state.setTagFilters);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [filterLoading, setFilterLoading] = (0, react_1.useState)(true);
    const [recommendError, setRecommendError] = (0, react_1.useState)(false);
    const getRecommendData = (0, react_1.useCallback)(async () => {
        setLoading(true);
        setRecommendError(false);
        const res = await (0, workshop_1.getWorkshopRecommend)();
        if (res.success) {
            setRecommend(res.data);
        }
        else {
            setLoading(false);
            setRecommendError(true);
            setRecommend({ banners: [], list: [] });
        }
    }, []);
    const getTagFilters = (0, react_1.useCallback)(async () => {
        try {
            const res = await (0, workshop_1.getWidgetFilterTags)();
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
