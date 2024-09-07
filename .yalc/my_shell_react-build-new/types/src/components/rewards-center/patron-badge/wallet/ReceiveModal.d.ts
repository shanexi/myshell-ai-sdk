import { WalletAsset } from '../../../../../../src/common/constants/interfaces/user.js';
interface ReceiveModalProps {
    open: boolean;
    assets?: WalletAsset[];
    initStatus?: ModalStatus;
    address: `0x${string}` | undefined;
    onClose: () => void;
}
declare enum ModalStatus {
    SelectToken = 0,
    SendOrReceive = 1
}
export default function ReceiveModal(props: ReceiveModalProps): import("react/jsx-runtime").JSX.Element;
export {};
