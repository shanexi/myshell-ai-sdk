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
exports.default = PrivyWallet;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_auth_1 = require("@privy-io/react-auth");
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const user_1 = require("../../../../apis/user.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const identityService_1 = require("../../../../common/services/identityService.js");
const WalletAcations_1 = __importDefault(require("../../../../components/rewards-center/patron-badge/wallet/WalletAcations.js"));
const usePrivyLogin_1 = __importDefault(require("../../../../hooks/user/usePrivyLogin.js"));
const utils_1 = require("../../../../lib/utils.js");
const store_1 = require("../../../../services/store/index.js");
const bind_2FA_1 = __importStar(require("../../components/bind-2FA/index.js"));
const WalletHeader_1 = __importDefault(require("./WalletHeader.js"));
const asset_tab_1 = __importDefault(require("./asset-tab/index.js"));
function PrivyWallet(props) {
    const { wallet, onClose } = props;
    const { logout } = (0, usePrivyLogin_1.default)();
    const { showMfaEnrollmentModal } = (0, react_auth_1.useMfaEnrollment)();
    const { user } = (0, react_auth_1.usePrivy)();
    const clearUser = (0, store_1.useUserStore)(state => state.clearUser);
    const clearChatRecord = (0, store_1.useChatStore)(state => state.clearChatRecord);
    const clearTextInput = (0, store_1.useChatStore)(state => state.clearTextInput);
    const resetTtsContent = (0, store_1.useWorkshopStore)(state => state.resetTtsContent);
    const reset = (0, store_1.useBotStore)(state => state.reset);
    const [openSendPrivy, setOpenSendPrivy] = (0, react_1.useState)(false);
    const [openReceivePrivy, setOpenReceivePrivy] = (0, react_1.useState)(false);
    const [disablePrivySendAndReceive, setDisablePrivySendAndReceive] = (0, react_1.useState)(false);
    const [privyWallet, setPrivyWallet] = (0, react_1.useState)(wallet);
    const [oepnBind2FA, setOpenBind2FA] = (0, react_1.useState)(false);
    const isBind2FA = (0, bind_2FA_1.useBind2FA)();
    (0, react_1.useEffect)(() => {
        if (!wallet) {
            fetchWalletData();
        }
    }, [wallet]);
    const fetchWalletData = async () => {
        const res = await (0, user_1.getWalletList)();
        if (res.success) {
            setPrivyWallet(res.data.find(item => item.name === 'Privy'));
        }
    };
    const renderChainSelector = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('px-3 h-9 border border-default rounded-full flex items-center justify-center flex-shrink-0'), children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/reward-center/multi-chain.svg", width: 48, height: 20, alt: "multi chain" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtler", weight: "medium", children: "..." })] }));
    };
    const openSend = () => {
        if (!isBind2FA && !identityService_1.identityService.getDontShow2FA()) {
            setOpenBind2FA(true);
            return;
        }
        setOpenSendPrivy(true);
    };
    const openReceive = () => {
        setOpenReceivePrivy(true);
    };
    const open2FA = () => {
        showMfaEnrollmentModal();
        onClose?.();
    };
    const handleLogout = async () => {
        logout({ method: 'all' });
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
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full", children: [(0, jsx_runtime_1.jsx)(WalletHeader_1.default, { logo: privyWallet?.image, name: privyWallet?.name, logout: handleLogout, address: privyWallet?.publicAddress, chainSelector: renderChainSelector() }), (0, jsx_runtime_1.jsx)(asset_tab_1.default, { openReceive: openReceivePrivy, setOpenReceive: setOpenReceivePrivy, openSend: openSendPrivy, setOpenSend: setOpenSendPrivy, nftItems: privyWallet?.nftItems, name: privyWallet?.name, address: privyWallet?.publicAddress, setDisabledSendAndReceive: setDisablePrivySendAndReceive }), (0, jsx_runtime_1.jsx)(WalletAcations_1.default, { openSend: openSend, openReceive: openReceive, open2FA: open2FA, isBind2FA: user?.mfaMethods && user.mfaMethods.length > 0, disablePrivySendAndReceive: disablePrivySendAndReceive }), (0, jsx_runtime_1.jsx)(bind_2FA_1.default, { open: oepnBind2FA, onClose: isBind2FA => {
                    setOpenBind2FA(false);
                    if (!isBind2FA) {
                        setOpenSendPrivy(true);
                    }
                } })] }));
}
