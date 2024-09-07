"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Square2StackIcon_1 = __importDefault(require("@heroicons/react/24/outline/Square2StackIcon"));
const clsx_1 = __importDefault(require("clsx"));
const link_1 = __importDefault(require("../../common/components/ui/link.js"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const user_1 = require("../../apis/user.js");
const icon_button_1 = require("../../common/components/ui/icon-button.js");
const user_2 = require("../../common/constants/enums/user.js");
const useCopyClipboard_1 = __importDefault(require("../../common/hooks/useCopyClipboard.js"));
const utils_1 = require("../../lib/utils.js");
const WalletSkeleton_1 = require("../skeleton/profile/WalletSkeleton.js");
const store_1 = require("../../services/store/index.js");
const WalletAcations_1 = __importDefault(require("../rewards-center/patron-badge/wallet/WalletAcations.js"));
const asset_tab_1 = __importDefault(require("../rewards-center/patron-badge/wallet/asset-tab/index.js"));
function WalletList() {
    const t = (0, next_intl_1.useTranslations)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [wallets, setWallets] = (0, react_1.useState)([]);
    const [hasParticle, setHasParticle] = (0, react_1.useState)(false);
    const visitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const { onCopy } = (0, useCopyClipboard_1.default)('');
    const fetchWalletData = async () => {
        wallets?.length === 0 && setLoading(true);
        const res = await (0, user_1.getWalletList)();
        setLoading(false);
        if (res.success) {
            const particleInfo = res.data?.filter(item => item.name === 'Particle')?.[0];
            setHasParticle(!!particleInfo);
            setWallets(res.data);
        }
    };
    const [openSendPrivy, setOpenSendPrivy] = (0, react_1.useState)(false);
    const [openReceivePrivy, setOpenReceivePrivy] = (0, react_1.useState)(false);
    const [disablePrivySendAndReceive, setDisablePrivySendAndReceive] = (0, react_1.useState)(false);
    const openSend = () => {
        setOpenSendPrivy(true);
    };
    const openReceive = () => {
        setOpenReceivePrivy(true);
    };
    (0, react_1.useEffect)(() => {
        fetchWalletData();
    }, []);
    if (loading || visitor === user_2.VisitorEnum.INIT) {
        return (0, jsx_runtime_1.jsx)(WalletSkeleton_1.WalletListSkeleton, {});
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full", children: wallets.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "w-full text-center text-subtle mt-[30%]", children: t('no_available_assets') })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("ul", { className: (0, clsx_1.default)('w-full grid grid-cols-1 gap-y-5'), children: wallets
                        ?.filter(w => w.name !== user_2.WalletType.Particle)
                        .map((item, index) => {
                        const publicAddress = `${item.publicAddress.slice(0, 5)}...${item.publicAddress.slice(-4)}`;
                        const nftItems = item?.nftItems;
                        const name = item?.name;
                        return ((0, jsx_runtime_1.jsxs)("li", { className: "w-full border border-default rounded-xl overflow-hidden bg-surface-container-default", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('w-full p-3 flex flex-col justify-start items-start bg-surface-default space-x-0 space-y-3  border-b border-default shadow-textarea rounded-xl overflow-hidden', 'sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0'), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex w-full items-center gap-3'), children: [(0, jsx_runtime_1.jsx)("div", { className: "w-[56px] h-[56px] border border-default rounded-xl overflow-hidden", children: (0, jsx_runtime_1.jsx)("img", { src: item.image, alt: name, className: "w-[56px] h-[56px] object-cover rounded-xl" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-1 items-center text-14 font-medium text-subtler", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: name }), (0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: t('profile.wallet') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1 flex-row items-center", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-16 font-medium text-default", children: publicAddress }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { onClick: () => {
                                                                        onCopy(item.publicAddress);
                                                                    }, className: "w-7 h-7 bg-transparent hover:bg-surface-hovered shadow-none", children: (0, jsx_runtime_1.jsx)(Square2StackIcon_1.default, { className: "w-[18px] h-[18px] stroke-icon-brand" }) })] })] })] }), name === user_2.WalletType.Privy && ((0, jsx_runtime_1.jsx)(WalletAcations_1.default, { openSend: openSend, openReceive: openReceive, disablePrivySendAndReceive: disablePrivySendAndReceive }))] }), name === user_2.WalletType.Privy && ((0, jsx_runtime_1.jsx)(asset_tab_1.default, { openReceive: openReceivePrivy, setOpenReceive: setOpenReceivePrivy, openSend: openSendPrivy, setOpenSend: setOpenSendPrivy, refetchNFts: fetchWalletData, nftItems: nftItems, name: name, address: item.publicAddress, setDisabledSendAndReceive: setDisablePrivySendAndReceive }))] }, name));
                    }) }), hasParticle && ((0, jsx_runtime_1.jsx)("div", { className: "w-full py-5 px-8 md:px-12 space-y-1", children: (0, jsx_runtime_1.jsx)("p", { className: "w-full text-14 text-center text-warning-bolder", children: t.rich('profile.particle_removed', {
                            link: chunk => ((0, jsx_runtime_1.jsx)(link_1.default, { href: "https://wallet.particle.network/", target: "_blank", rel: "noopener noreferrer", className: "underline text-primary", children: chunk }))
                        }) }) }))] })) }));
}
exports.default = WalletList;
