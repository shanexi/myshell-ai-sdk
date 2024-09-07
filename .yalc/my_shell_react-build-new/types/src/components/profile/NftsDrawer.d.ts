import { NFT } from '../../../../src/common/constants/interfaces/user.js';
interface NftsModalProps {
    isOpen: boolean;
    onClose: () => void;
    nfts: NFT[];
}
export default function NftsDrawer({ isOpen, onClose, nfts }: NftsModalProps): import("react/jsx-runtime").JSX.Element;
export {};
