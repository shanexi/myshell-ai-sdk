export interface PromptUnpublishModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmed: () => void;
}
export default function PromptUnpublishModal({ isOpen, onClose, onConfirmed }: PromptUnpublishModalProps): import("react/jsx-runtime").JSX.Element;
