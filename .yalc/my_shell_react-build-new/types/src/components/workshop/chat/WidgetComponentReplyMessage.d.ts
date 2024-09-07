import { WidgetInfo, WidgetMessageDetail } from '../../../../../src/common/constants/interfaces/workshop.js';
import 'driver.js/dist/driver.css';
interface Props {
    chat: WidgetMessageDetail;
    latest: boolean;
    onChangeCopyText: (text: string) => void;
    toggleImagePanelOpen: () => void;
    widgetInfo?: WidgetInfo | null;
}
declare function WidgetComponentReplyMessage({ chat, onChangeCopyText, latest, toggleImagePanelOpen, widgetInfo }: Props): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof WidgetComponentReplyMessage>;
export default _default;
