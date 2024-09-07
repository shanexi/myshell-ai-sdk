interface SignMessageModalProps {
    isOpen: boolean;
    onClose: (signature?: string) => void;
    loading: boolean;
    handleSign: () => void;
}
export default function SignMessageModal({ isOpen, onClose, loading, handleSign }: SignMessageModalProps): import("react/jsx-runtime").JSX.Element;
export {};
