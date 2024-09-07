import { NFT, WalletAsset } from '../../../../../../src/common/constants/interfaces/user.js';
interface SendModalProps {
    open: boolean;
    name: string;
    assets: WalletAsset[];
    nftItems: NFT[];
    setOpenSend: (value: boolean) => void;
    onClose: () => void;
    onRefresh?: () => void;
    refetchNFts?: () => void;
}
export default function SendModal(props: SendModalProps): import("react/jsx-runtime").JSX.Element;
export {};
