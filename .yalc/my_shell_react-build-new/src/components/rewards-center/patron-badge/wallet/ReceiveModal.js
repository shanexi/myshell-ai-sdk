"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReceiveModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowSmallLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowSmallLeftIcon"));
const next_intl_1 = require("next-intl");
const qr_code_styling_1 = __importDefault(require("qr-code-styling"));
const react_1 = require("react");
const Close_1 = __importDefault(require("../../../../common/components/icons/Close.js"));
const button_1 = require("../../../../common/components/ui/button.js");
const modal_1 = require("../../../../common/components/ui/modal.js");
const tooltip_1 = require("../../../../common/components/ui/tooltip.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const constants_1 = require("../../../../common/constants/constants.js");
const user_1 = require("../../../../common/constants/enums/user.js");
const useCopyClipboard_1 = __importDefault(require("../../../../common/hooks/useCopyClipboard.js"));
const utils_1 = require("../../../../lib/utils.js");
var ModalStatus;
(function (ModalStatus) {
    ModalStatus[ModalStatus["SelectToken"] = 0] = "SelectToken";
    ModalStatus[ModalStatus["SendOrReceive"] = 1] = "SendOrReceive";
})(ModalStatus || (ModalStatus = {}));
function ReceiveModal(props) {
    const { open, assets, address, initStatus, onClose } = props;
    const t = (0, next_intl_1.useTranslations)('profile.transfer_modal');
    const { onCopy } = (0, useCopyClipboard_1.default)('');
    const [options] = (0, react_1.useState)({
        width: 300,
        height: 300,
        type: 'svg',
        data: address,
        margin: 10,
        qrOptions: {
            typeNumber: 0,
            mode: 'Byte',
            errorCorrectionLevel: 'Q'
        },
        dotsOptions: {
            color: '#222222',
            type: 'dots'
        },
        backgroundOptions: {
            color: 'white'
        },
        cornersSquareOptions: {
            color: '#222222',
            type: 'dot'
        },
        cornersDotOptions: {
            color: '#222222',
            type: 'dot'
        }
    });
    const [qrCode] = (0, react_1.useState)(new qr_code_styling_1.default(options));
    const [asset, setAsset] = (0, react_1.useState)();
    const [status, setStatus] = (0, react_1.useState)(initStatus || ModalStatus.SelectToken);
    const container = document.getElementById('address-qr-container');
    (0, react_1.useEffect)(() => {
        if (container) {
            qrCode.append(container);
        }
    }, [qrCode, container]);
    (0, react_1.useEffect)(() => {
        if (!qrCode)
            return;
        qrCode.update(options);
    }, [qrCode, options]);
    const onBack = () => {
        setStatus(ModalStatus.SelectToken);
    };
    const handleCopy = () => {
        onCopy(address);
    };
    const renderSelectToken = (assets) => {
        return ((0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col px-3 gap-4 mt-4 overflow-auto no-scrollbar", children: assets
                ?.filter(asset => asset.key !== user_1.WalletAssetType.testETH)
                .map(asset => {
                const { label, formatBalance, logo, chain } = asset;
                const transferable = constants_1.transferableTokens.includes(label);
                if (transferable) {
                    return ((0, jsx_runtime_1.jsxs)("li", { className: (0, utils_1.cn)('flex items-center justify-between p-1 relative rounded-lg', 'cursor-pointer hover:bg-surface-container-hovered'), onClick: () => {
                            setAsset(asset);
                            setStatus(ModalStatus.SendOrReceive);
                        }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [logo, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-start", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-on-surface text-14 font-medium", children: label }), (0, jsx_runtime_1.jsx)("p", { className: "text-[#6D7175] dark:text-[#868996] text-12-n", children: chain })] })] }), (0, jsx_runtime_1.jsx)("p", { className: (0, utils_1.cn)('text-16 text-[#6D7175] dark:text-[#868996]'), children: formatBalance })] }, label));
                }
                return ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: t('not_support_transfer'), children: (0, jsx_runtime_1.jsxs)("li", { className: (0, utils_1.cn)('flex items-center p-1 justify-between relative opacity-30'), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex items-center gap-2'), children: [logo, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-start", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-on-surface text-14 font-medium", children: label }), (0, jsx_runtime_1.jsx)("p", { className: "text-[#6D7175] dark:text-[#868996] text-12-n", children: chain })] })] }), (0, jsx_runtime_1.jsx)("p", { className: (0, utils_1.cn)('text-16 text-[#6D7175] dark:text-[#868996]'), children: formatBalance })] }, label) }, label));
            }) }));
    };
    const renderReceive = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex flex-col pt-4 gap-4 w-full'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3 px-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex w-full justify-center", children: asset?.largeLogo }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-start gap-1.5", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtler", children: t('network') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", color: "default", children: asset?.chain })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-start gap-1.5", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtler", children: t('address') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", color: "default", className: "break-all", weight: "medium", children: address })] }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "warning-bolder", children: t.rich('deposit_tip', {
                                token: asset?.label,
                                chain: asset?.chain
                            }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full border-t border-default px-4 pt-4", children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "w-full", onClick: handleCopy, children: t('copy_address') }) })] }));
    };
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: open, hideClose: true, modalOnly: false, size: "sm", children: (0, jsx_runtime_1.jsxs)(modal_1.ModalBody, { className: (0, utils_1.cn)('py-4 text-on-surface w-full md:w-[380px] max-h-[430px] h-[430px]'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "pb-4 flex items-center justify-between px-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 items-center", children: [status === ModalStatus.SendOrReceive && ((0, jsx_runtime_1.jsx)(ArrowSmallLeftIcon_1.default, { className: "w-[22px] h-[22px] cursor-pointer", onClick: onBack })), (0, jsx_runtime_1.jsx)("h2", { className: "text-20 font-medium font-sans", children: t(status === ModalStatus.SelectToken ? 'select_token' : 'receive') })] }), (0, jsx_runtime_1.jsx)(Close_1.default, { className: "w-6 h-6 cursor-pointer", onClick: onClose })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full h-[1px] bg-[var(--border)]" }), status === ModalStatus.SelectToken ? renderSelectToken(assets) : renderReceive()] }) }));
}
