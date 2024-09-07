type TelegramModalProps = {
    open: boolean;
    onClose: () => void;
    errCallback: (type: string, reason: string, nextTimeCanBind: string) => void;
};
export default function TelegramModal({ open, onClose, errCallback }: TelegramModalProps): import("react/jsx-runtime").JSX.Element;
export {};
