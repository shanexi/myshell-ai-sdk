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
exports.default = MyWallet;
const jsx_runtime_1 = require("react/jsx-runtime");
const WalletIcon_1 = __importDefault(require("@heroicons/react/24/outline/WalletIcon"));
const ChevronDownIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronDownIcon"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const wagmi_1 = require("wagmi");
const user_1 = require("../../../../apis/user.js");
const popover_1 = require("../../../../common/components/ui/popover.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const constants_1 = require("../../../../common/constants/constants.js");
const user_2 = require("../../../../common/constants/enums/user.js");
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const identityService_1 = require("../../../../common/services/identityService.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const usePrivyLogin_1 = require("../../../../hooks/user/usePrivyLogin.js");
const useWalletInteraction_1 = __importDefault(require("../../../../hooks/web3/useWalletInteraction.js"));
const utils_1 = require("../../../../lib/utils.js");
const store_1 = require("../../../../services/store/index.js");
const EOAWallet_1 = __importDefault(require("./EOAWallet.js"));
const PrivyWallet_1 = __importDefault(require("./PrivyWallet.js"));
const MobileWalletModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../modals/MobileWalletModal/index.js'))), { ssr: false });
function MyWallet() {
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const visitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const { address } = (0, useWalletInteraction_1.default)();
    const chainId = (0, wagmi_1.useChainId)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [wallets, setWallets] = (0, react_1.useState)([]);
    const [isWeb3, setIsWeb3] = (0, react_1.useState)(false);
    const [openWallet, setOpenWallet] = (0, react_1.useState)(false);
    const [openMobileWallet, setOpenMobileWallet] = (0, react_1.useState)(false);
    const [selectedChain, setSelectedChain] = (0, react_1.useState)(constants_1.SupportedChain.Ethereum);
    const { data: nativeTokenBalanceData } = (0, wagmi_1.useBalance)({
        address
    });
    const balanceOfNativeToken = (0, common_helper_1.formatBalance)(nativeTokenBalanceData?.value);
    const nativeTokenSymbol = constants_1.nativeTokenMap[selectedChain];
    const fetchWalletData = async () => {
        wallets?.length === 0 && setLoading(true);
        const res = await (0, user_1.getWalletList)();
        setLoading(false);
        if (res.success) {
            setWallets(res.data);
        }
    };
    (0, react_1.useEffect)(() => {
        fetchWalletData();
    }, []);
    (0, react_1.useEffect)(() => {
        fetchWalletData();
    }, [visitor]);
    (0, react_1.useEffect)(() => {
        if (chainId) {
            setSelectedChain(constants_1.chainMap[chainId]);
        }
    }, [chainId]);
    (0, react_1.useEffect)(() => {
        const loginMethod = identityService_1.identityService.getLoginMethod();
        if (loginMethod &&
            [usePrivyLogin_1.LoginMethod.OKX, usePrivyLogin_1.LoginMethod.Metamask, usePrivyLogin_1.LoginMethod.WalletConnect, usePrivyLogin_1.LoginMethod.BSC].includes(loginMethod)) {
            setIsWeb3(true);
        }
    });
    const renderPCWallet = () => {
        return ((0, jsx_runtime_1.jsx)(popover_1.Popover, { content: isWeb3 ? ((0, jsx_runtime_1.jsx)(EOAWallet_1.default, { wallet: wallets?.find(wallet => wallet.name === 'Other' || (wallet.name !== 'Privy' && wallet.name !== 'Particle')), selectedChain: selectedChain, setSelectedChain: setSelectedChain, onClose: () => setOpenWallet(false) })) : ((0, jsx_runtime_1.jsx)(PrivyWallet_1.default, { onClose: () => setOpenWallet(false), wallet: wallets?.find(wallet => wallet.name === 'Privy') })), className: "w-[353px] !max-w-[353px] h-[430px]", openChangeCallback: open => {
                setOpenWallet(open);
            }, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 md:flex-grow-0 items-center justify-center flex-shrink-0 bg-surface-accent-gray-subtlest hover:bg-surface-accent-gray-subtler rounded-full py-1.5 px-2.5 md:py-2 md:px-4 gap-1 cursor-pointer", onClick: () => setOpenWallet(!openWallet), children: [(0, jsx_runtime_1.jsx)(WalletIcon_1.default, { className: "w-3.5 h-3.5" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", className: "text-sm whitespace-nowrap", color: "default", children: isWeb3 ? `${balanceOfNativeToken} ${nativeTokenSymbol}` : t('wallet') }), (0, jsx_runtime_1.jsx)(ChevronDownIcon_1.default, { className: (0, utils_1.cn)('w-3 h-3 text-default', openWallet && 'rotate-180') })] }) }));
    };
    const renderMobileWallet = () => {
        if (visitor !== user_2.VisitorEnum.NO) {
            return null;
        }
        return (0, jsx_runtime_1.jsx)(WalletIcon_1.default, { className: "w-5.5 h-5.5 text-brand", onClick: () => setOpenMobileWallet(true) });
    };
    const renderLogin = () => {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "hidden py-1.5 px-2.5 md:py-2 md:px-4 md:flex items-center justify-center bg-surface-primary-default rounded-full gap-1 cursor-pointer", onClick: () => toggleLoginModal(true), children: [(0, jsx_runtime_1.jsx)(WalletIcon_1.default, { className: "w-3.5 h-3.5 text-static" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "medium", color: "static", children: t('login') })] }), (0, jsx_runtime_1.jsx)("div", { className: "md:hidden", onClick: () => toggleLoginModal(true), children: (0, jsx_runtime_1.jsx)(WalletIcon_1.default, { className: "w-5.5 h-5.5 text-brand" }) })] }));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [visitor === user_2.VisitorEnum.NO ? (isMobile ? renderMobileWallet() : renderPCWallet()) : renderLogin(), openMobileWallet && ((0, jsx_runtime_1.jsx)(MobileWalletModal, { open: openMobileWallet, onClose: () => setOpenMobileWallet(false), wallets: wallets, isWeb3: isWeb3, selectedChain: selectedChain, setSelectedChain: setSelectedChain }))] }));
}
