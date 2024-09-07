export default function CantBindTipModal({ isOpen, errorReason, bindType, nextTimeCanBind, onClose }: {
    isOpen: boolean;
    errorReason: string;
    bindType: string;
    nextTimeCanBind: string;
    onClose: () => void;
}): import("react/jsx-runtime").JSX.Element;
