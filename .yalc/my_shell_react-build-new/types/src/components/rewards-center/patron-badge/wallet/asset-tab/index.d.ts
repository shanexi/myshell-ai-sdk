import { SupportedChain } from '../../../../../../../src/common/constants/constants.js';
import { NFT } from '../../../../../../../src/common/constants/interfaces/user.js';
interface AssetTabProps {
    address: `0x${string}` | undefined;
    nftItems?: NFT[];
    name?: string;
    refetchNFts?: () => void;
    selectedChain?: SupportedChain | undefined;
    openSend: boolean;
    setOpenSend: (value: boolean) => void;
    openReceive: boolean;
    setOpenReceive: (value: boolean) => void;
    setDisabledSendAndReceive: (value: boolean) => void;
}
export default function AssetTab(props: AssetTabProps): import("react/jsx-runtime").JSX.Element;
export {};
