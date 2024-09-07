import { SelectedType } from '..';
interface P {
    selectedType?: SelectedType;
    selectedId?: string;
    filterValue?: string;
    scrollRef?: React.RefObject<HTMLDivElement>;
}
export default function ChatWidgetList({ selectedType, selectedId, filterValue, scrollRef }: P): import("react/jsx-runtime").JSX.Element;
export {};
