export default function useGetExploreRecommendList(): {
    loading: boolean;
    filterLoading: boolean;
    recommendError: boolean;
    recommend: {
        banners: import("../../common/components/banner/types").BannerItemProps[] | [];
        list: import("../../common/model/interfaces").RecommendInfo[] | [];
    };
    tagFilters: import("../../common/constants/interfaces/bot").TagInfo[];
    getRecommendData: () => Promise<void>;
};
