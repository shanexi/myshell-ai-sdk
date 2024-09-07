import { TagInfo } from '../../../../../src/common/constants/interfaces/bot.js';
interface FilterTagItemProps {
    tag: TagInfo;
    className?: string;
    tagSelected: boolean;
    bgWhite?: boolean;
    onClick?: () => void;
}
declare function FilterTagItem({ tag, tagSelected, className, bgWhite, onClick }: FilterTagItemProps): import("react/jsx-runtime").JSX.Element;
export default FilterTagItem;
