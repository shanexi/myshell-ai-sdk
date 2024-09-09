import { WagmiErrorType } from '../../../../../../../src/hooks/rewards-center/useOnChainInteraction.js';
interface WagmiErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
    wagmiErrorType: WagmiErrorType;
    chainId?: string;
}
export default function WagmiErrorModal({ isOpen, onClose, wagmiErrorType, chainId }: WagmiErrorModalProps): import("react/jsx-runtime").JSX.Element;
export {};
