export interface SaveTipModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmed: (callback: () => void) => void;
}
export default function SaveTipModal({ isOpen, onClose, onConfirmed }: SaveTipModalProps): import("react/jsx-runtime").JSX.Element;
