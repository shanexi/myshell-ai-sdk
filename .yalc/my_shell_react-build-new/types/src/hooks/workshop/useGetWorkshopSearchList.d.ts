import { RefObject } from 'react';
export default function useGetWorkshopSearchList({ scrollRef, filterIds, filterName, filterAll, excludefilter, isEmptyFilterValues }: {
    scrollRef: RefObject<HTMLDivElement>;
    filterIds: string[];
    filterName: string;
    filterAll: string;
    excludefilter: string[];
    isEmptyFilterValues: boolean;
}): {
    searchLoading: boolean;
    fetchError: boolean;
    hasMore: boolean;
    pageToken: string;
    fetchEmpty: boolean;
    nextPageToken: import("react").MutableRefObject<string>;
    searchList: import("../../common/model/interfaces").NormalCardProps[];
    setSearchList: (info: import("../../common/model/interfaces").NormalCardProps[] | []) => void;
    setSearchLoading: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    getSearchListMore: () => void;
};
