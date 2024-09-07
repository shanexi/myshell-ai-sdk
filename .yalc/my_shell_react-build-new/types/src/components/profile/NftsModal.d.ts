import { NFT } from '../../../../src/common/constants/interfaces/user.js';
export interface NftsModalProps {
    isOpen: boolean;
    onClose: () => void;
    nfts: NFT[];
}
export default function NftsModal({ isOpen, onClose, nfts }: NftsModalProps): import("react/jsx-runtime").JSX.Element;
