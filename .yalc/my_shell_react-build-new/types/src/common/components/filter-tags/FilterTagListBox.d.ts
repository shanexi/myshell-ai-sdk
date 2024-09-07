import { TagInfo } from '../../../../../src/common/constants/interfaces/bot.js';
interface FilterTagListProps {
    onTagClick: (filterIds: string[], clearAllOpt: boolean, url: string) => void;
    onAllClick: (filterIds: string[], filterAll: string, name: string, url: string) => void;
    filterLoading: boolean;
    tagFilters: TagInfo[];
    filterIds: string[];
    filterAll: string;
    hideAllTag: boolean;
    page: string;
    hideLabel?: boolean;
    column?: number;
    showMore?: boolean;
    updateShowMore?: (showMore: boolean) => void;
}
declare function FilterTagListBox({ filterLoading, onTagClick, onAllClick, tagFilters, filterIds, filterAll, hideAllTag, page, hideLabel, column, showMore, updateShowMore }: FilterTagListProps): import("react/jsx-runtime").JSX.Element;
export default FilterTagListBox;
