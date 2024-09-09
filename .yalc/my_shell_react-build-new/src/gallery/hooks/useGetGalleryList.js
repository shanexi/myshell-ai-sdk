import { useRef, useState } from 'react';
import { getGalleryList } from '../../gallery/modal/api.js';
import { useGalleryStore } from '../../services/store/gallery.js';
export default function useGetGalleryList({ userId, botId }) {
    const galleryList = useGalleryStore(state => state.galleryList);
    const setGalleryList = useGalleryStore(state => state.setGalleryList);
    const galleryUserList = useGalleryStore(state => state.galleryUserList);
    const setGalleryUserList = useGalleryStore(state => state.setGalleryUserList);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nextPageToken, setNextPageToken] = useState('0');
    const pageCount = useRef(0);
    const [fetchError, setFetchError] = useState(false);
    const [fetchEmpty, setFetchEmpty] = useState(false);
    const getGalleryData = async (pageToken) => {
        if (pageToken !== '0' && hasMore === false) {
            return;
        }
        setLoading(true);
        const res = await getGalleryList({ pageToken, botId, userId });
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
