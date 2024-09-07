import { WidgetInfo, WidgetMessageDetail } from '../../../../../src/common/constants/interfaces/workshop.js';
interface Props {
    chat: WidgetMessageDetail;
    latest: boolean;
    onChangeCopyText: (text: string) => void;
    widgetInfo?: WidgetInfo | null;
}
declare function WidgetReplyMessage({ chat, onChangeCopyText, latest, widgetInfo }: Props): import("react/jsx-runtime").JSX.Element;
export default WidgetReplyMessage;
