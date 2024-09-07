import { WidgetInfo } from '../../../../src/common/constants/interfaces/workshop.js';
type P = {
    widgetInfo?: WidgetInfo;
    className?: string;
    iconClassName?: string;
    pinnedCallback?: (id: string, isPinned: boolean) => void;
};
declare function WidgetPinned({ widgetInfo, className, iconClassName, pinnedCallback }: P): import("react/jsx-runtime").JSX.Element;
export default WidgetPinned;
