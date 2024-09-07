export interface NsfwConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmed: () => void;
}
export default function NsfwConfirmationModal({ isOpen, onClose, onConfirmed }: NsfwConfirmationModalProps): import("react/jsx-runtime").JSX.Element;
