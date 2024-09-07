interface ActionConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    content: string;
    acting: boolean;
    onConfirm: () => void;
}
export default function ActionConfirmationModal(props: ActionConfirmationModalProps): import("react/jsx-runtime").JSX.Element;
export {};
