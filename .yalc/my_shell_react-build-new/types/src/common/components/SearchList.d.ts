import { NormalCardProps } from '../model/interfaces';
declare function SearchList({ loading, fetchError, hasMore, fetchEmpty, setShowUserDetail, searchList, getSearchList }: {
    loading: boolean;
    fetchError: boolean;
    hasMore: boolean;
    fetchEmpty: boolean;
    setShowUserDetail: (item: any) => void;
    searchList: NormalCardProps[];
    getSearchList: () => void;
}): import("react/jsx-runtime").JSX.Element;
export default SearchList;
