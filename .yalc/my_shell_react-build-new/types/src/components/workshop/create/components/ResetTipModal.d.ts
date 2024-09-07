export interface ResetTipModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmed: (callback: () => void) => void;
}
export default function ResetTipModal({ isOpen, onClose, onConfirmed }: ResetTipModalProps): import("react/jsx-runtime").JSX.Element;
