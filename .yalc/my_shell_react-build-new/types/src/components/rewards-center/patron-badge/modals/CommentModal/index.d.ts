export interface CommentModalProps {
    curveId: string;
    tickerName: string;
    isOpen: boolean;
    onClose: () => void;
    needReloadCurrentPage?: boolean;
}
declare function CommentModal({ curveId, isOpen, onClose, tickerName, needReloadCurrentPage }: CommentModalProps): import("react/jsx-runtime").JSX.Element;
declare namespace CommentModal {
    var defaultProps: {
        needReloadCurrentPage: boolean;
    };
}
export default CommentModal;
