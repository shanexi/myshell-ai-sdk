import { SupportedChain } from '../../../../../../../src/common/constants/constants.js';
import { Wallet } from '../../../../../../../src/common/constants/interfaces/user.js';
interface MobileWalletModalProps {
    selectedChain: SupportedChain;
    setSelectedChain: (value: SupportedChain) => void;
    wallets: Wallet[] | undefined;
    isWeb3: boolean;
    open: boolean;
    onClose: () => void;
}
export default function MobileWalletModal(props: MobileWalletModalProps): import("react/jsx-runtime").JSX.Element;
export {};
