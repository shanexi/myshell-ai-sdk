import { WidgetInfo } from '../../../../../../src/common/constants/interfaces/workshop.js';
interface P {
    widgets: WidgetInfo[];
    showSimplifyTags?: boolean;
    pinnedCallback?: (id: string, isPinned: boolean) => void;
    onClose?: () => void;
    setShowUserDetail?: (item: any) => void;
}
export default function WidgetList({ showSimplifyTags, widgets, pinnedCallback, onClose, setShowUserDetail }: P): import("react/jsx-runtime").JSX.Element;
export {};
