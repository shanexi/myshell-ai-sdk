"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGetGalleryList;
const react_1 = require("react");
const api_1 = require("../../gallery/modal/api.js");
const gallery_1 = require("../../services/store/gallery.js");
function useGetGalleryList({ userId, botId }) {
    const galleryList = (0, gallery_1.useGalleryStore)(state => state.galleryList);
    const setGalleryList = (0, gallery_1.useGalleryStore)(state => state.setGalleryList);
    const galleryUserList = (0, gallery_1.useGalleryStore)(state => state.galleryUserList);
    const setGalleryUserList = (0, gallery_1.useGalleryStore)(state => state.setGalleryUserList);
    const [hasMore, setHasMore] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [nextPageToken, setNextPageToken] = (0, react_1.useState)('0');
    const pageCount = (0, react_1.useRef)(0);
    const [fetchError, setFetchError] = (0, react_1.useState)(false);
    const [fetchEmpty, setFetchEmpty] = (0, react_1.useState)(false);
    const getGalleryData = async (pageToken) => {
        if (pageToken !== '0' && hasMore === false) {
            return;
        }
        setLoading(true);
        const res = await (0, api_1.getGalleryList)({ pageToken, botId, userId });
        setLoading(false);
        const { data } = res;
        if (res.success) {
            const d = Array.isArray(data.list) ? data.list.filter((item) => !!item && typeof item === 'object') : [];
            if (userId) {
                setGalleryUserList(pageToken === '0' ? d : [...galleryUserList, ...d]);
            }
            else {
                setGalleryList(pageToken === '0' ? d : [...galleryList, ...d]);
            }
            setFetchEmpty(pageToken === '0' && d.length === 0);
            setNextPageToken(data.listResponse.nextPageToken);
            setHasMore(data.listResponse.hasMore);
            pageCount.current += 1;
        }
        else {
            setFetchError(false);
        }
    };
    return {
        loading,
        hasMore,
        nextPageToken,
        fetchError,
        fetchEmpty,
        getGalleryData
    };
}
