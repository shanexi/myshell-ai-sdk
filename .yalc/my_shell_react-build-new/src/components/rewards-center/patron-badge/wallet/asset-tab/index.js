"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AssetTab;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_tabs_1 = require("@radix-ui/react-tabs");
const dynamic_1 = __importDefault(require("next/dynamic"));
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const chains_1 = require("viem/chains");
const wagmi_1 = require("wagmi");
const bnb_svg_1 = __importDefault(require("@/assets/icons/web3/bnb.svg"));
const eth_svg_1 = __importDefault(require("@/assets/icons/web3/eth.svg"));
const BNB_svg_1 = __importDefault(require("@/common/assets/icons/BNB.svg"));
const ETH_svg_1 = __importDefault(require("@/common/assets/icons/ETH.svg"));
const typography_1 = require("../../../../../common/components/ui/typography.js");
const constants_1 = require("../../../../../common/constants/constants.js");
const user_1 = require("../../../../../common/constants/enums/user.js");
const common_helper_1 = require("../../../../../common/utils/common-helper.js");
const NeedReLoginModal_1 = __importDefault(require("../../../../../components/rewards-center/earn/components/blockchain/NeedReLoginModal.js"));
const utils_1 = require("../../../../../lib/utils.js");
const web3_1 = require("../../../../../services/store/web3.js");
const SomethingWrong_1 = __importDefault(require("./SomethingWrong.js"));
const balances_1 = __importDefault(require("./balances/index.js"));
const nfts_1 = __importDefault(require("./nfts/index.js"));
const SendModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../../../components/rewards-center/patron-badge/wallet/SendModal.js'))));
const ReceiveModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../../../components/rewards-center/patron-badge/wallet/ReceiveModal.js'))));
function AssetTab(props) {
    const { address, nftItems = [], name = '', refetchNFts, openSend, openReceive, selectedChain, setOpenReceive, setOpenSend, setDisabledSendAndReceive } = props;
    const toggleNeedReLoginModal = (0, web3_1.useWeb3Store)(state => state.toggleNeedReLoginModal);
    const openNeedReLoginModal = (0, web3_1.useWeb3Store)(state => state.openNeedReLoginModal);
    const [selectedTab, setSelectedTab] = (0, react_1.useState)('balance');
    const [loadingMyshellAssets, setLoadingMyshellAssets] = (0, react_1.useState)(false);
    const [showError, setShowError] = (0, react_1.useState)(true);
    const contentRef = (0, react_1.useRef)(null);
    const onTabChange = (value) => {
        setSelectedTab(value);
    };
    const { data: opBNBBalance, refetch: refetchOpBNBBalance, isLoading: loadingOpBNBBalance, isFetching: fetchingOpBNBBalance } = (0, wagmi_1.useBalance)({ address, chainId: chains_1.opBNB.id });
    const { data: ethBalance, refetch: refetchETHBalance, isLoading: loadingETHBalance, isFetching: fetchingETHBalance } = (0, wagmi_1.useBalance)({ address, chainId: chains_1.mainnet.id });
    const { data: bnbBalance, refetch: refetchBNBBalance, isLoading: loadingBNBBalance, isFetching: fetchingBNBBalance } = (0, wagmi_1.useBalance)({ address, chainId: constants_1.bsc_chain_id_current_env });
    const loadingAllAssets = (0, react_1.useMemo)(() => loadingMyshellAssets ||
        loadingOpBNBBalance ||
        loadingETHBalance ||
        loadingBNBBalance ||
        fetchingOpBNBBalance ||
        fetchingETHBalance ||
        fetchingBNBBalance, [
        loadingOpBNBBalance,
        loadingETHBalance,
        loadingMyshellAssets,
        fetchingOpBNBBalance,
        fetchingETHBalance,
        fetchingBNBBalance,
        loadingBNBBalance,
    ]);
    const formattedOpBNBBalance = (0, react_1.useMemo)(() => (opBNBBalance ? (0, common_helper_1.formatBalance)(opBNBBalance.value) : '--'), [opBNBBalance]);
    const formattedBNBBalance = (0, react_1.useMemo)(() => (bnbBalance ? (0, common_helper_1.formatBalance)(bnbBalance.value) : '--'), [bnbBalance]);
    const formattedETHBalance = (0, react_1.useMemo)(() => (ethBalance ? (0, common_helper_1.formatBalance)(ethBalance.value) : '--'), [ethBalance]);
    (0, react_1.useEffect)(() => {
        if ((opBNBBalance && ethBalance && bnbBalance) ||
            loadingOpBNBBalance ||
            loadingETHBalance ||
            loadingBNBBalance) {
            setShowError(false);
        }
        else {
            setShowError(true);
        }
    }, [
        opBNBBalance,
        loadingOpBNBBalance,
        loadingETHBalance,
        bnbBalance,
        ethBalance,
        loadingBNBBalance,
    ]);
    const baseAssets = (0, react_1.useMemo)(() => {
        return [
            {
                balance: bnbBalance?.value,
                formatBalance: formattedBNBBalance,
                label: 'BNB',
                key: user_1.WalletAssetType.BNB_BSC,
                chain: constants_1.SupportedChain.BSC,
                logo: (0, jsx_runtime_1.jsx)(image_1.default, { src: bnb_svg_1.default, alt: "BNB", className: "w-8 h-8", width: 32, height: 32 }),
                largeLogo: (0, jsx_runtime_1.jsx)(image_1.default, { src: BNB_svg_1.default, alt: "BNB", className: "w-20 h-20", width: 80, height: 80 })
            },
            {
                balance: opBNBBalance?.value,
                formatBalance: formattedOpBNBBalance,
                label: 'BNB',
                key: user_1.WalletAssetType.BNB_OP,
                chain: constants_1.SupportedChain.OpBNB,
                logo: (0, jsx_runtime_1.jsx)(image_1.default, { src: bnb_svg_1.default, alt: "BNB", className: "w-8 h-8", width: 32, height: 32 }),
                largeLogo: (0, jsx_runtime_1.jsx)(image_1.default, { src: BNB_svg_1.default, alt: "opBNB", className: "w-20 h-20", width: 80, height: 80 })
            },
            {
                balance: ethBalance?.value,
                formatBalance: formattedETHBalance,
                label: 'ETH',
                key: user_1.WalletAssetType.ETH,
                chain: constants_1.SupportedChain.Ethereum,
                logo: (0, jsx_runtime_1.jsx)(image_1.default, { src: eth_svg_1.default, alt: "ETH", className: "w-8 h-8", width: 32, height: 32 }),
                largeLogo: (0, jsx_runtime_1.jsx)(image_1.default, { src: ETH_svg_1.default, alt: "ETH", className: "w-20 h-20", width: 80, height: 80 })
            },
            {
                balance: BigInt(0),
                formatBalance: 'Coming Soon',
                label: 'ETH',
                key: user_1.WalletAssetType.ETH_MYSHELL,
                chain: constants_1.SupportedChain.MyShell_Mainnet,
                logo: (0, jsx_runtime_1.jsx)(image_1.default, { src: eth_svg_1.default, alt: "ETH", className: "w-8 h-8", width: 32, height: 32 }),
                largeLogo: (0, jsx_runtime_1.jsx)(image_1.default, { src: ETH_svg_1.default, alt: "ETH", className: "w-20 h-20", width: 80, height: 80 })
            }
        ];
    }, [
        opBNBBalance,
        ethBalance,
        bnbBalance,
        formattedBNBBalance,
        formattedOpBNBBalance,
        formattedETHBalance,
    ]);
    const displayedAssets = (0, react_1.useMemo)(() => {
        if (name === user_1.WalletType.Privy) {
            return baseAssets;
        }
        return baseAssets.filter(asset => asset.chain === selectedChain && asset.chain !== constants_1.SupportedChain.MyShell_Mainnet);
    }, [name, baseAssets, selectedChain]);
    const sendableAssets = (0, react_1.useMemo)(() => {
        if (name === user_1.WalletType.Privy) {
            return displayedAssets.filter(asset => asset.chain !== constants_1.SupportedChain.MyShell_Mainnet);
        }
        return displayedAssets;
    }, [displayedAssets]);
    const onRefresh = async () => {
        setDisabledSendAndReceive(true);
        setLoadingMyshellAssets(true);
        setShowError(false);
        try {
            if (selectedTab === 'balance') {
                await refetchOpBNBBalance();
                await refetchETHBalance();
                await refetchBNBBalance();
            }
            else {
                await refetchNFts?.();
            }
        }
        catch (error) {
            setShowError(true);
        }
        finally {
            setLoadingMyshellAssets(false);
            setDisabledSendAndReceive(false);
        }
    };
    const tabs = (0, react_1.useMemo)(() => {
        if (name === user_1.WalletType.Privy) {
            return [
                {
                    label: 'Balance',
                    value: 'balance',
                    children: (0, jsx_runtime_1.jsx)(balances_1.default, { name: name, assets: displayedAssets, loading: loadingAllAssets })
                },
                {
                    label: 'NFTs',
                    value: 'nfts',
                    children: (0, jsx_runtime_1.jsx)(nfts_1.default, { address: address, nftItems: nftItems, name: name })
                }
            ];
        }
        return selectedChain === constants_1.SupportedChain.Ethereum
            ? [
                {
                    label: 'Balance',
                    value: 'balance',
                    children: (0, jsx_runtime_1.jsx)(balances_1.default, { name: name, assets: displayedAssets, loading: loadingAllAssets })
                },
                {
                    label: 'NFTs',
                    value: 'nfts',
                    children: (0, jsx_runtime_1.jsx)(nfts_1.default, { address: address, nftItems: nftItems, name: name })
                }
            ]
            : [
                {
                    label: 'Balance',
                    value: 'balance',
                    children: (0, jsx_runtime_1.jsx)(balances_1.default, { name: name, assets: displayedAssets, loading: loadingAllAssets })
                }
            ];
    }, [name, nftItems, address, loadingAllAssets, selectedChain, displayedAssets]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "py-3 flex items-start justify-between", ref: contentRef, children: [(0, jsx_runtime_1.jsxs)(react_tabs_1.Tabs, { defaultValue: "balances", value: selectedTab, onValueChange: onTabChange, className: "w-full relative", children: [(0, jsx_runtime_1.jsx)(react_tabs_1.TabsList, { className: "flex gap-6 font-medium border-b border-default", children: tabs.map(tab => ((0, jsx_runtime_1.jsx)(react_tabs_1.TabsTrigger, { value: tab.value, className: (0, utils_1.cn)('text-16 font-medium pb-2'), children: (0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", size: "lg", color: selectedTab === tab.value ? 'brand' : 'subtler', children: tab.label }) }, tab.value))) }), tabs.map(tab => ((0, jsx_runtime_1.jsx)(react_tabs_1.TabsContent, { value: tab.value, className: "h-[260px] overflow-y-auto no-scrollbar", children: showError ? (0, jsx_runtime_1.jsx)(SomethingWrong_1.default, {}) : tab.children }, tab.value)))] }), openSend && ((0, jsx_runtime_1.jsx)(SendModal, { nftItems: nftItems, assets: sendableAssets, name: name, open: openSend, setOpenSend: setOpenSend, onClose: () => setOpenSend(false), onRefresh: onRefresh, refetchNFts: refetchNFts })), openReceive && ((0, jsx_runtime_1.jsx)(ReceiveModal, { address: address, assets: sendableAssets, open: openReceive, onClose: () => setOpenReceive(false) })), openNeedReLoginModal && ((0, jsx_runtime_1.jsx)(NeedReLoginModal_1.default, { isOpen: openNeedReLoginModal, onClose: () => toggleNeedReLoginModal(false) }))] }));
}
