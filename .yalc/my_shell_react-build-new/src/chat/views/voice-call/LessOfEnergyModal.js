"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LessOfEnergyModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const lowBattery_svg_1 = __importDefault(require("@/common/assets/icons/voice/lowBattery.svg"));
const common_helper_1 = require("../../../common/utils/common-helper.js");
function LessOfEnergyModal(props) {
    const { onClose, isOpen } = props;
    const t = (0, next_intl_1.useTranslations)('chat');
    const wt = (0, next_intl_1.useTranslations)('workshop');
    return ((0, jsx_runtime_1.jsxs)(react_1.Modal, { size: (0, common_helper_1.isMobileDevice)() ? 'xs' : '', onClose: onClose, isOpen: isOpen, isCentered: true, children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, { bg: "blackAlpha.300", backdropFilter: "blur(24px)" }), (0, jsx_runtime_1.jsx)(react_1.ModalContent, { padding: 0, borderRadius: "24px", boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.10)", width: !(0, common_helper_1.isMobileDevice)() ? '380px' : 'xs', className: "bg-surface", children: (0, jsx_runtime_1.jsx)(react_1.ModalBody, { padding: 0, children: (0, jsx_runtime_1.jsxs)("div", { className: "py-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "px-5 py-2 flex flex-col gap-y-2", children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(image_1.default, { src: lowBattery_svg_1.default, alt: "low battery", className: "w-[40px] h-[40px]", style: {
                                                borderRadius: 'var(--redius-12, 12px)',
                                                background: 'var(--white, #FFF)'
                                            } }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-lg text-on-surface", children: t('voice_call_feedback_low_battery') }), (0, jsx_runtime_1.jsx)("div", { className: "text-secondary", children: t('voice_call_feedback_less_of_energy') })] }), (0, jsx_runtime_1.jsx)("hr", { className: "py-2" }), (0, jsx_runtime_1.jsx)("div", { className: "flex px-4 py-2 w-full justify-center items-center ", children: (0, jsx_runtime_1.jsx)("button", { className: "h-9 w-full rounded-4xl text-white border border-default bg-primary space-x-1.5", onClick: onClose, children: wt('confirm') }) })] }) }) })] }));
}
