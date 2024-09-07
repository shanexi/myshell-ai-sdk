import { BlockChainInteractionState } from '../../../../src/components/rewards-center/earn/components/BlockChainGuruModal.js';
export declare const chainIdNameScannerMap: {
    [key: string]: {
        name: string;
        scanner: string;
    };
};
export type WagmiErrorType = 'unKnownRpcError' | 'switchChainError' | 'userRejectError';
export default function useOnChainInteraction(chainId?: string, contractAddress?: `0x${string}`): {
    onCallContractFunction: (setBlockChainInteractionState: (state: BlockChainInteractionState) => void, setTxHash: (txHash: `0x${string}`) => void) => Promise<void>;
    wagmiErrorModalVisible: boolean;
    wagmiErrorType: WagmiErrorType | undefined;
    handleWagmiErrorModalClose: () => void;
    getInteractionState: (txHash: `0x${string}`, setBlockChainInteractionState: (state: BlockChainInteractionState) => void) => Promise<void>;
    needReLoginModalVisible: boolean;
    setNeedReLoginModalVisible: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
