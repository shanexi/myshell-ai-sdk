import { TagInfo } from '../../../../../src/common/constants/interfaces/bot.js';
interface FilterTagItemProps {
    tag: TagInfo;
    hasAllOpt?: boolean;
    filterIds: string[];
    filterAll: string;
    hideLabel?: boolean;
    onTagClick: (tagId: string, tagName: string, parentName: string, clearAllOpt: boolean) => void;
    clickAllHandle: (tag: TagInfo, hasAllSelected: boolean) => void;
    showMore?: boolean;
    updateShowMore?: (showMore: boolean) => void;
}
declare function FilterTagList({ tag, hasAllOpt, filterIds, filterAll, hideLabel, onTagClick, clickAllHandle, showMore, updateShowMore }: FilterTagItemProps): import("react/jsx-runtime").JSX.Element;
export default FilterTagList;
