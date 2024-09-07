"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WalletHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const Square2StackIcon_1 = __importDefault(require("@heroicons/react/24/outline/Square2StackIcon"));
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const icon_button_1 = require("../../../../common/components/ui/icon-button.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const useCopyClipboard_1 = __importDefault(require("../../../../common/hooks/useCopyClipboard.js"));
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const useWalletInteraction_1 = __importDefault(require("../../../../hooks/web3/useWalletInteraction.js"));
const utils_1 = require("../../../../lib/utils.js");
function WalletHeader(props) {
    const { logo, name, address, chainSelector, isConnected, logout } = props;
    const t = (0, next_intl_1.useTranslations)();
    const { onCopy } = (0, useCopyClipboard_1.default)('');
    const { isMetamask, isOKX, isWalletConnect, isBSC } = (0, useWalletInteraction_1.default)();
    const [displayLogo, setDisplayLogo] = (0, react_1.useState)(logo);
    const [isEOAWallet, setIsEOAWallet] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setIsEOAWallet(isMetamask || isOKX || isWalletConnect || isBSC);
        if (isMetamask) {
            setDisplayLogo('/icons/reward-center/metamask.svg');
        }
        else if (isWalletConnect) {
            setDisplayLogo('/icons/reward-center/wallet_connect_light.svg');
        }
        else if (isOKX) {
            setDisplayLogo('/icons/reward-center/okx.svg');
        }
        else if (isBSC) {
            setDisplayLogo('/icons/logo/bsc.svg');
        }
    }, [isMetamask, isOKX, isWalletConnect, isBSC]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('w-full flex items-center justify-between bg-transparent overflow-hidden rounded-xl gap-3'), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex items-center gap-3'), children: [(0, jsx_runtime_1.jsx)("div", { className: "border border-default rounded-xl overflow-hidden flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: displayLogo, alt: "wallet", className: "object-cover rounded-xl", width: 46, height: 46 }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-1 items-center text-14 font-medium text-subtler", children: [isEOAWallet ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1 items-center", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", size: "sm", color: "subtlest", className: "whitespace-nowrap", children: name || 'unconnected' }), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('w-1.5 h-1.5 rounded-full', isConnected ? 'bg-icon-success' : 'bg-icon-critical') })] })) : ((0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", size: "sm", color: "subtlest", children: name })), !isEOAWallet && ((0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", size: "sm", color: "subtlest", children: t('profile.wallet') }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1 flex-row items-center", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", color: "default", size: "lg", children: (0, common_helper_1.formatWalletAddress)(address) }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { onClick: () => {
                                            onCopy(address);
                                        }, className: "w-7 h-7 bg-transparent hover:bg-surface-hovered shadow-none", children: (0, jsx_runtime_1.jsx)(Square2StackIcon_1.default, { className: "w-[18px] h-[18px] stroke-icon-brand" }) })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex item-center gap-2", children: [chainSelector, (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "outline", className: "border border-default w-9 h-9", onClick: logout, children: (0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/reward-center/logout.svg", width: 20, height: 20, alt: "logout" }) })] })] }));
}
