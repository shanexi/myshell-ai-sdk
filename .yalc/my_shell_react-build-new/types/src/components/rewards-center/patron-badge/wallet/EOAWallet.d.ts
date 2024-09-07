import { SupportedChain } from '../../../../../../src/common/constants/constants.js';
import { Wallet } from '../../../../../../src/common/constants/interfaces/user.js';
interface EOAWalletProps {
    wallet?: Wallet;
    selectedChain: SupportedChain;
    setSelectedChain: (value: SupportedChain) => void;
    onClose?: () => void;
}
export default function EOAWallet(props: EOAWalletProps): import("react/jsx-runtime").JSX.Element;
export {};
