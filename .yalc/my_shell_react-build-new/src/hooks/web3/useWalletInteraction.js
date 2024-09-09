import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useEffect, useMemo, useState } from 'react';
import { useAccount, useChainId, useDisconnect, useSwitchChain } from 'wagmi';
import { identityService } from '../../common/services/identityService.js';
import { MyshellTest } from '../../common/utils/wagmi.js';
import { useWeb3Store } from '../../services/store/web3.js';
import { LoginMethod } from '../user/usePrivyLogin.js';
export var InteractionType;
(function (InteractionType) {
    InteractionType["Web2"] = "web2";
    InteractionType["Legacy"] = "legacy";
    InteractionType["Web3"] = "web3";
})(InteractionType || (InteractionType = {}));
export default function useWalletInteraction() {
    const { address: externalWalletAddress, isConnected } = useAccount();
    const { disconnectAsync: disconnectExternalWallet } = useDisconnect();
    const { user, createWallet } = usePrivy();
    const { wallets } = useWallets();
    const { switchChainAsync } = useSwitchChain();
    const chainId = useChainId();
    const toggleNeedReLoginModal = useWeb3Store(state => state.toggleNeedReLoginModal);
    const switchingChain = useWeb3Store(state => state.switchingChain);
    const toggleSwitchingChain = useWeb3Store(state => state.toggleSwitchingChain);
    const [isMetamask, setIsMetamask] = useState(false);
    const [isOKX, setIsOKX] = useState(false);
    const [isWalletConnect, setIsWalletConnect] = useState(false);
    const [isBSC, setIsBSC] = useState(false);
    const [walletAddress, setWalletAddress] = useState();
    const [interactionType, setInteractionType] = useState();
    const isWeb3 = useMemo(() => (interactionType !== undefined ? interactionType === InteractionType.Web3 : undefined), [interactionType]);
    useEffect(() => {
        const storedAddress = identityService.getPublicAddress();
        if (storedAddress) {
            setWalletAddress(storedAddress);
            return;
        }
        if (isWeb3) {
            setWalletAddress(externalWalletAddress);
            identityService.setPublicAddress(externalWalletAddress);
        }
        else {
            const privyWalletAddress = user?.wallet?.address;
            if (privyWalletAddress) {
                setWalletAddress(privyWalletAddress);
                identityService.setPublicAddress(privyWalletAddress);
            }
        }
    }, [isWeb3, user?.wallet?.address, externalWalletAddress, wallets]);
    useEffect(() => {
        const loginMethod = identityService.getLoginMethod();
        if (loginMethod === LoginMethod.Metamask ||
            loginMethod === LoginMethod.OKX ||
            loginMethod === LoginMethod.WalletConnect ||
            loginMethod === LoginMethod.BSC) {
            setInteractionType(InteractionType.Web3);
            if (loginMethod === LoginMethod.Metamask)
                setIsMetamask(true);
            if (loginMethod === LoginMethod.OKX)
                setIsOKX(true);
            if (loginMethod === LoginMethod.WalletConnect)
                setIsWalletConnect(true);
            if (loginMethod === LoginMethod.BSC)
                setIsBSC(true);
        }
        else {
            setIsMetamask(false);
            setIsOKX(false);
            setIsWalletConnect(false);
            setIsBSC(false);
            if (isConnected) {
                disconnectExternalWallet?.();
            }
            setInteractionType(InteractionType.Web2);
        }
    }, [isConnected, disconnectExternalWallet]);
    const switchToMyshellChain = async () => {
        if (switchingChain)
            return;
        try {
            toggleSwitchingChain(true);
            if (interactionType === InteractionType.Web3) {
                if (chainId === MyshellTest.id)
                    return;
                await switchChainAsync({ chainId: MyshellTest.id });
            }
            else {
                if (!wallets)
                    return;
                const embeddedWallet = wallets.find(wallet => wallet.connectorType === 'embedded');
                if (embeddedWallet?.chainId === 'eip155:202402181658')
                    return;
                await embeddedWallet?.switchChain(MyshellTest.id);
            }
        }
        catch (error) {
        }
        finally {
            toggleSwitchingChain(false);
        }
    };
    const switchToMyshellForcely = async () => {
        if (switchingChain)
            return;
        try {
            toggleSwitchingChain(true);
            if (interactionType === InteractionType.Web3) {
                await switchChainAsync({ chainId: MyshellTest.id });
            }
            else {
                if (!wallets)
                    return;
                const embeddedWallet = wallets.find(wallet => wallet.connectorType === 'embedded');
                await embeddedWallet?.switchChain(MyshellTest.id);
            }
        }
        catch (error) {
        }
        finally {
            toggleSwitchingChain(false);
        }
    };
    const beforeEachCall = async () => {
        if (interactionType !== InteractionType.Web3) {
            const embeddedWallet = wallets.find(wallet => wallet.connectorType === 'embedded');
            if (!embeddedWallet) {
                return toggleNeedReLoginModal(true);
            }
        }
        await switchToMyshellForcely();
    };
    const createPrivyEmbeddedWalletWithRetry = async () => {
        let retry = 3;
        while (retry > 0) {
            try {
                const wallet = await createWallet();
                if (wallet) {
                    return wallet;
                }
                else {
                    retry--;
                }
            }
            catch (error) {
                retry--;
                if (retry === 0) {
                    throw error;
                }
            }
        }
    };
    return {
        isMetamask,
        isOKX,
        isWalletConnect,
        isBSC,
        address: walletAddress,
        interactionType,
        isWeb3,
        switchToMyshellChain,
        createPrivyEmbeddedWalletWithRetry,
        beforeEachCall
    };
}
