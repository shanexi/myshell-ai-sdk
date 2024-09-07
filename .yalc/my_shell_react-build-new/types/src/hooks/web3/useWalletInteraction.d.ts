export declare enum InteractionType {
    Web2 = "web2",
    Legacy = "legacy",
    Web3 = "web3"
}
export default function useWalletInteraction(): {
    isMetamask: boolean;
    isOKX: boolean;
    isWalletConnect: boolean;
    isBSC: boolean;
    address: `0x${string}` | undefined;
    interactionType: InteractionType | undefined;
    isWeb3: boolean | undefined;
    switchToMyshellChain: () => Promise<void>;
    createPrivyEmbeddedWalletWithRetry: () => Promise<import("@privy-io/react-auth").Wallet | undefined>;
    beforeEachCall: () => Promise<void>;
};
