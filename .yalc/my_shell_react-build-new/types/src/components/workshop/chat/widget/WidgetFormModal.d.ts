import { WidgetInfo } from '../../../../../../src/common/constants/interfaces/workshop.js';
type P = {
    imagePanelParams: any;
    setOpen: (value: boolean) => void;
    scrollToBottom: () => void;
    isMobile?: boolean;
    widgetInfo?: WidgetInfo | null;
};
declare function WidgetFormModal({ imagePanelParams, setOpen, scrollToBottom, isMobile, widgetInfo }: P): import("react/jsx-runtime").JSX.Element;
export default WidgetFormModal;
