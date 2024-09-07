export interface RefreshPromptModalProps {
    isOpen: boolean;
    type: string;
    onClose: () => void;
    onConfirmed: () => void;
}
export default function RefreshPromptModal({ isOpen, onClose, onConfirmed, type }: RefreshPromptModalProps): import("react/jsx-runtime").JSX.Element;
