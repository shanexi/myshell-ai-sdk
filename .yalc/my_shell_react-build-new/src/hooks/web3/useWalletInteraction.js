"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionType = void 0;
exports.default = useWalletInteraction;
const react_auth_1 = require("@privy-io/react-auth");
const react_1 = require("react");
const wagmi_1 = require("wagmi");
const identityService_1 = require("../../common/services/identityService");
const wagmi_2 = require("../../common/utils/wagmi");
const web3_1 = require("../../services/store/web3");
const usePrivyLogin_1 = require("../user/usePrivyLogin");
var InteractionType;
(function (InteractionType) {
    InteractionType["Web2"] = "web2";
    InteractionType["Legacy"] = "legacy";
    InteractionType["Web3"] = "web3";
})(InteractionType || (exports.InteractionType = InteractionType = {}));
function useWalletInteraction() {
    const { address: externalWalletAddress, isConnected } = (0, wagmi_1.useAccount)();
    const { disconnectAsync: disconnectExternalWallet } = (0, wagmi_1.useDisconnect)();
    const { user, createWallet } = (0, react_auth_1.usePrivy)();
    const { wallets } = (0, react_auth_1.useWallets)();
    const { switchChainAsync } = (0, wagmi_1.useSwitchChain)();
    const chainId = (0, wagmi_1.useChainId)();
    const toggleNeedReLoginModal = (0, web3_1.useWeb3Store)(state => state.toggleNeedReLoginModal);
    const switchingChain = (0, web3_1.useWeb3Store)(state => state.switchingChain);
    const toggleSwitchingChain = (0, web3_1.useWeb3Store)(state => state.toggleSwitchingChain);
    const [isMetamask, setIsMetamask] = (0, react_1.useState)(false);
    const [isOKX, setIsOKX] = (0, react_1.useState)(false);
    const [isWalletConnect, setIsWalletConnect] = (0, react_1.useState)(false);
    const [isBSC, setIsBSC] = (0, react_1.useState)(false);
    const [walletAddress, setWalletAddress] = (0, react_1.useState)();
    const [interactionType, setInteractionType] = (0, react_1.useState)();
    const isWeb3 = (0, react_1.useMemo)(() => (interactionType !== undefined ? interactionType === InteractionType.Web3 : undefined), [interactionType]);
    (0, react_1.useEffect)(() => {
        const storedAddress = identityService_1.identityService.getPublicAddress();
        if (storedAddress) {
            setWalletAddress(storedAddress);
            return;
        }
        if (isWeb3) {
            setWalletAddress(externalWalletAddress);
            identityService_1.identityService.setPublicAddress(externalWalletAddress);
        }
        else {
            const privyWalletAddress = user?.wallet?.address;
            if (privyWalletAddress) {
                setWalletAddress(privyWalletAddress);
                identityService_1.identityService.setPublicAddress(privyWalletAddress);
            }
        }
    }, [isWeb3, user?.wallet?.address, externalWalletAddress, wallets]);
    (0, react_1.useEffect)(() => {
        const loginMethod = identityService_1.identityService.getLoginMethod();
        if (loginMethod === usePrivyLogin_1.LoginMethod.Metamask ||
            loginMethod === usePrivyLogin_1.LoginMethod.OKX ||
            loginMethod === usePrivyLogin_1.LoginMethod.WalletConnect ||
            loginMethod === usePrivyLogin_1.LoginMethod.BSC) {
            setInteractionType(InteractionType.Web3);
            if (loginMethod === usePrivyLogin_1.LoginMethod.Metamask)
                setIsMetamask(true);
            if (loginMethod === usePrivyLogin_1.LoginMethod.OKX)
                setIsOKX(true);
            if (loginMethod === usePrivyLogin_1.LoginMethod.WalletConnect)
                setIsWalletConnect(true);
            if (loginMethod === usePrivyLogin_1.LoginMethod.BSC)
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
                if (chainId === wagmi_2.MyshellTest.id)
                    return;
                await switchChainAsync({ chainId: wagmi_2.MyshellTest.id });
            }
            else {
                if (!wallets)
                    return;
                const embeddedWallet = wallets.find(wallet => wallet.connectorType === 'embedded');
                if (embeddedWallet?.chainId === 'eip155:202402181658')
                    return;
                await embeddedWallet?.switchChain(wagmi_2.MyshellTest.id);
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
                await switchChainAsync({ chainId: wagmi_2.MyshellTest.id });
            }
            else {
                if (!wallets)
                    return;
                const embeddedWallet = wallets.find(wallet => wallet.connectorType === 'embedded');
                await embeddedWallet?.switchChain(wagmi_2.MyshellTest.id);
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
