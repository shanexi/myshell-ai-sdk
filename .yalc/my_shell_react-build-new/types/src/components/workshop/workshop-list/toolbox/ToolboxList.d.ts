import { SelectedType } from '..';
interface P {
    selectedType?: SelectedType;
    selectedId?: string;
    filterValue?: string;
    scrollRef?: React.RefObject<HTMLDivElement>;
}
export default function ToolboxList({ selectedType, selectedId, scrollRef, filterValue }: P): import("react/jsx-runtime").JSX.Element;
export {};
