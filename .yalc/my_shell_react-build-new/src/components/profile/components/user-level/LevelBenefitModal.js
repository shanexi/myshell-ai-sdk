"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LevelBenefitModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const modal_1 = require("../../../../common/components/ui/modal.js");
const constants_1 = require("../../../../common/constants/constants.js");
const store_1 = require("../../../../services/store/index.js");
function LevelBenefitModal({ isOpen, onClose }) {
    const t = (0, next_intl_1.useTranslations)('reward_center.premium_level');
    const profileT = (0, next_intl_1.useTranslations)('profile');
    const premiumInfo = (0, store_1.useUserStore)(state => state.premiumInfo);
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: isOpen, title: t('level_and_benefits'), onClose: onClose, size: "md", children: (0, jsx_runtime_1.jsx)(modal_1.ModalBody, { children: (0, jsx_runtime_1.jsxs)("div", { className: "px-4 pb-3 bg-surface max-h-[316px] md:max-h-[504px] flex flex-col rounded-2xl md:rounded-none", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 gap-3 p-3 md:px-6 md:py-3 text-[#6D7175] dark:text-[#868996] text-sm md:text-base", children: [(0, jsx_runtime_1.jsx)("div", { className: "font-[500]", children: t('level') }), (0, jsx_runtime_1.jsx)("div", { className: "text-center font-[500]", children: profileT('basic') }), (0, jsx_runtime_1.jsx)("div", { className: "text-center font-[500]", children: profileT('standard') }), (0, jsx_runtime_1.jsx)("div", { className: "text-right font-[500]", children: t('benefits') })] }), (0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col space-y-3 overflow-auto no-scrollbar grow", children: constants_1.levelBatteryBenefitsMap.map(item => ((0, jsx_runtime_1.jsxs)("li", { className: (0, clsx_1.default)('grid grid-cols-4 items-center gap-3 border shadow-[0_1px_2px_0_rgba(0, 0, 0, 0.10)] p-3 md:px-6 md:py-[13px] rounded-xl', premiumInfo.level === item.level ? 'border-primary' : 'border-default'), children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("span", { className: "rounded-md bg-primary text-white font-[500] inline-flex items-center h-[26px] px-3", children: ["Lv.", item.level] }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-center", children: (0, jsx_runtime_1.jsxs)("span", { className: "bg-[#FDF5CA] dark:bg-[#454127] py-[3px] pl-[6px] pr-2 space-x-2 inline-flex items-center rounded-md", children: [(0, jsx_runtime_1.jsx)("span", { className: "p-[1.2px]", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/thunder.svg", alt: "energy", width: 13.59, height: 13.59 }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-[#7E5700] dark:text-[#FFE86B] text-sm font-[500]", children: item.basic })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-center", children: (0, jsx_runtime_1.jsxs)("span", { className: "bg-[#FDF5CA] dark:bg-[#454127] py-[3px] pl-[6px] pr-2 space-x-2 inline-flex items-center rounded-md", children: [(0, jsx_runtime_1.jsx)("span", { className: "p-[1.2px]", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/thunder.svg", alt: "energy", width: 13.59, height: 13.59 }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-[#7E5700] dark:text-[#FFE86B] text-sm font-[500]", children: item.energy })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-right text-primary font-[500] text-xs md:text-base", children: item.benefits ? t(`benefit_map.${item.benefits}`) : '-' })] }, item.level))) })] }) }) }));
}
