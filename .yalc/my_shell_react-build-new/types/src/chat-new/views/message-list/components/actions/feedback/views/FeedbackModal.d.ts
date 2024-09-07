type P = {
    open: boolean;
    onClose: () => void;
    onRemoveDislike: () => void;
    onSendFeedback: (issues: string[], otherDetail: string) => void;
};
export default function FeedbackModal({ open, onClose, onRemoveDislike, onSendFeedback }: P): import("react/jsx-runtime").JSX.Element;
export {};
