import '@/styles/md-viewer.scss';
import { MessageStatusEnum } from '../../../../src/chat/model/enums.js';
interface MdViewerProps {
    content: string;
    status?: MessageStatusEnum;
    nouseProse?: boolean;
    className?: string;
}
declare function MdViewer(props: MdViewerProps): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof MdViewer>;
export default _default;
