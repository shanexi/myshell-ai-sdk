import { WidgetInfo } from '../../../../../../src/common/constants/interfaces/workshop.js';
import { SelectedType } from '..';
interface P {
    widgetInfo: WidgetInfo;
    selectedType?: SelectedType;
    selectedId?: string;
}
export default function WidgetItem({ widgetInfo, selectedType, selectedId }: P): import("react/jsx-runtime").JSX.Element;
export {};
