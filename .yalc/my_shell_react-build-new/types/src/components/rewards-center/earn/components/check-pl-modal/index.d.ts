export interface CheckPLModalProps {
    isOpen: boolean;
    onClose: (success: boolean, isOpenTweetBind?: boolean) => void;
    onSelect: () => void;
}
export default function CheckPlModal({ isOpen, onClose, onSelect }: CheckPLModalProps): import("react/jsx-runtime").JSX.Element;
