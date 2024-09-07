"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EOAWallet;
const jsx_runtime_1 = require("react/jsx-runtime");
const CheckIcon_1 = __importDefault(require("@heroicons/react/24/outline/CheckIcon"));
const ChevronDownIcon_1 = __importDefault(require("@heroicons/react/24/solid/ChevronDownIcon"));
const next_intl_1 = require("next-intl");
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const chains_1 = require("viem/chains");
const wagmi_1 = require("wagmi");
const user_1 = require("../../../../apis/user.js");
const icon_1 = require("../../../../common/components/ui/icon.js");
const popover_1 = require("../../../../common/components/ui/popover.js");
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner.js"));
const use_toast_1 = require("../../../../common/components/ui/toast/use-toast.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const constants_1 = require("../../../../common/constants/constants.js");
const identityService_1 = require("../../../../common/services/identityService.js");
const wagmi_2 = require("../../../../common/utils/wagmi.js");
const WalletAcations_1 = __importDefault(require("../../../../components/rewards-center/patron-badge/wallet/WalletAcations.js"));
const useWalletInteraction_1 = __importDefault(require("../../../../hooks/web3/useWalletInteraction.js"));
const utils_1 = require("../../../../lib/utils.js");
const store_1 = require("../../../../services/store/index.js");
const WalletHeader_1 = __importDefault(require("./WalletHeader.js"));
const asset_tab_1 = __importDefault(require("./asset-tab/index.js"));
function EOAWallet(props) {
    const { wallet, selectedChain, setSelectedChain, onClose } = props;
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const { isMetamask, isOKX, isWalletConnect, isBSC } = (0, useWalletInteraction_1.default)();
    const clearUser = (0, store_1.useUserStore)(state => state.clearUser);
    const clearChatRecord = (0, store_1.useChatStore)(state => state.clearChatRecord);
    const clearTextInput = (0, store_1.useChatStore)(state => state.clearTextInput);
    const resetTtsContent = (0, store_1.useWorkshopStore)(state => state.resetTtsContent);
    const reset = (0, store_1.useBotStore)(state => state.reset);
    const { toast } = (0, use_toast_1.useToast)();
    const { isConnected } = (0, wagmi_1.useAccount)();
    const { disconnectAsync } = (0, wagmi_1.useDisconnect)();
    const { switchChainAsync } = (0, wagmi_1.useSwitchChain)();
    const { connectAsync, connectors } = (0, wagmi_1.useConnect)();
    const [openSendPrivy, setOpenSendPrivy] = (0, react_1.useState)(false);
    const [openReceivePrivy, setOpenReceivePrivy] = (0, react_1.useState)(false);
    const [disablePrivySendAndReceive, setDisablePrivySendAndReceive] = (0, react_1.useState)(false);
    const [openChainSelector, setOpenChainSelector] = (0, react_1.useState)(false);
    const [eoaWallet, setEOAWallet] = (0, react_1.useState)(wallet);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [targetChain, setTargetChain] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (!wallet) {
            fetchWalletData();
        }
    }, [wallet]);
    const fetchWalletData = async () => {
        const res = await (0, user_1.getWalletList)();
        if (res.success) {
            setEOAWallet(res.data.find(item => item.name !== 'Privy' && item.name !== 'Particle'));
        }
    };
    const renderChainSelector = () => {
        const supportedChains = [
            {
                label: constants_1.SupportedChain.Ethereum,
                chainId: chains_1.mainnet.id,
                icon: constants_1.iconMap[constants_1.SupportedChain.Ethereum]
            },
            {
                label: constants_1.SupportedChain.BSC,
                chainId: constants_1.bsc_chain_id_current_env,
                icon: constants_1.iconMap[constants_1.SupportedChain.BSC]
            },
            {
                label: constants_1.SupportedChain.OpBNB,
                chainId: chains_1.opBNB.id,
                icon: constants_1.iconMap[constants_1.SupportedChain.OpBNB]
            },
            {
                label: constants_1.SupportedChain.MyShell_Testnet,
                chainId: wagmi_2.MyshellTest.id,
                icon: constants_1.iconMap[constants_1.SupportedChain.MyShell_Testnet]
            },
            {
                label: constants_1.SupportedChain.MyShell_Mainnet,
                chainId: -1,
                icon: constants_1.iconMap[constants_1.SupportedChain.MyShell_Mainnet]
            },
            {
                label: constants_1.SupportedChain.Base,
                chainId: -1,
                icon: constants_1.iconMap[constants_1.SupportedChain.Base]
            }
        ];
        if (isBSC) {
            supportedChains.splice(3, 1);
        }
        const reconnectWallet = async (chainId) => {
            if (isMetamask) {
                const connector = connectors.find(connector => {
                    return connector.id === 'io.metamask';
                });
                if (!connector) {
                    console.error('connector not found');
                    return;
                }
                await connectAsync({
                    chainId,
                    connector
                });
            }
            else if (isOKX) {
                const connector = connectors.find(connector => connector.id === 'com.okex.wallet');
                if (!connector) {
                    console.error('connector not found');
                    return;
                }
                await connectAsync({
                    chainId,
                    connector
                });
            }
            else if (isWalletConnect) {
                const connector = connectors.find(connector => {
                    return connector.id === 'walletConnect';
                });
                if (!connector) {
                    console.error('connector not found');
                    return;
                }
                await connectAsync({
                    chainId,
                    connector
                });
            }
            else if (isBSC) {
                const connector = connectors.find(connector => connector.id === 'BinanceW3WSDK');
                if (!connector) {
                    console.error('connector not found');
                    return;
                }
                await connectAsync({
                    chainId,
                    connector
                });
            }
        };
        const renderSupportedChains = () => {
            return ((0, jsx_runtime_1.jsx)("ul", { className: "rouned-xl w-full", children: supportedChains.map(chain => {
                    const actionable = chain.chainId !== -1;
                    return ((0, jsx_runtime_1.jsx)("li", { className: (0, utils_1.cn)('px-1 py-1.5 hover:bg-surface-container-selected-default rounded-xl w-full', actionable ? 'cursor-pointer' : 'pointer-events-none'), onClick: async () => {
                            if (!actionable)
                                return;
                            if (!isConnected) {
                                await reconnectWallet(chain.chainId);
                            }
                            setLoading(true);
                            setTargetChain(chain.label);
                            if (isBSC) {
                                toast({
                                    key: 'switch_info',
                                    variant: 'info',
                                    title: t('check_your_wallet'),
                                    description: t('please_click_approve')
                                });
                            }
                            await switchChainAsync({ chainId: chain.chainId });
                            setSelectedChain(chain.label);
                            setOpenChainSelector(false);
                            setLoading(false);
                            setTargetChain('');
                        }, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between w-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1.5", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: chain.icon, width: 20, height: 20, alt: "chain" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", className: "whitespace-nowrap", children: chain.label })] }), selectedChain === chain.label && !loading && (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: CheckIcon_1.default, size: "sm", color: "brand" }), targetChain === chain.label && loading && (0, jsx_runtime_1.jsx)(spinner_1.default, { size: "sm", color: "brand" }), !actionable && ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center bg-surface-accent-gray-subtlest px-2 py-1 rounded-full", children: (0, jsx_runtime_1.jsx)("div", { className: "text-[10px] leading-3 text-subtler", children: "Coming Soon" }) }))] }) }, chain.label));
                }) }));
        };
        return ((0, jsx_runtime_1.jsx)(popover_1.Popover, { content: renderSupportedChains(), className: "w-[262px] translate-x-[-35px] md:translate-x-[-50px] z-50", open: openChainSelector, openChangeCallback: open => {
                setOpenChainSelector(open);
            }, children: (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('w-18 px-3 h-9 border border-default rounded-full flex items-center justify-center flex-shrink-0 gap-1 hover:bg-surface-hovered'), onClick: () => setOpenChainSelector(!openChainSelector), children: [constants_1.iconMap[selectedChain] && (0, jsx_runtime_1.jsx)(image_1.default, { src: constants_1.iconMap[selectedChain], width: 20, height: 20, alt: "chain" }), (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: ChevronDownIcon_1.default, size: "2xs", color: "subtle", rotate: openChainSelector ? '180' : null })] }) }));
    };
    const openReceive = () => {
        setOpenReceivePrivy(true);
    };
    const handleLogout = async () => {
        disconnectAsync();
        try {
            await (0, user_1.userLogout)();
        }
        catch (e) {
            console.error(e);
        }
        identityService_1.identityService.clearAll(true);
        clearChatRecord();
        clearUser();
        reset();
        clearTextInput();
        resetTtsContent();
        onClose?.();
    };
    const openSend = () => {
        setOpenSendPrivy(true);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full", children: [(0, jsx_runtime_1.jsx)(WalletHeader_1.default, { isConnected: isConnected, logo: eoaWallet?.image, name: selectedChain, logout: handleLogout, address: eoaWallet?.publicAddress, chainSelector: renderChainSelector() }), (0, jsx_runtime_1.jsx)(asset_tab_1.default, { selectedChain: selectedChain, openReceive: openReceivePrivy, setOpenReceive: setOpenReceivePrivy, openSend: openSendPrivy, setOpenSend: setOpenSendPrivy, nftItems: eoaWallet?.nftItems, name: eoaWallet?.name, address: eoaWallet?.publicAddress, setDisabledSendAndReceive: setDisablePrivySendAndReceive }), (0, jsx_runtime_1.jsx)(WalletAcations_1.default, { openSend: openSend, openReceive: openReceive, disablePrivySendAndReceive: disablePrivySendAndReceive })] }));
}
