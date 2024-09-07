import { BindType } from '../../../../../../src/common/constants/enums/user.js';
export default function DisconnectTipModal({ isOpen, bindType, onClose, onConfirmed }: {
    isOpen: boolean;
    bindType: BindType;
    onClose: () => void;
    onConfirmed: (callback: () => void) => void;
}): import("react/jsx-runtime").JSX.Element;
