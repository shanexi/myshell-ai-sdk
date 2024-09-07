"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UpgradeModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const ChevronRightIcon_1 = __importDefault(require("@heroicons/react/24/solid/ChevronRightIcon"));
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const link_1 = __importDefault(require("next-intl/link"));
const AIpp_svg_1 = __importDefault(require("@/common/assets/icons/rewards-center/AIpp.svg"));
const EarnShellPoints_svg_1 = __importDefault(require("@/common/assets/icons/rewards-center/EarnShellPoints.svg"));
const modal_1 = require("../../../../../common/components/ui/modal.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const usePathLocale_1 = require("../../../../../common/hooks/usePathLocale.js");
const utils_1 = require("../../../../../lib/utils.js");
function UpgradeModal({ open, onClose }) {
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp.reward_center_upgrade');
    const list_1 = ['list_1_item_1', 'list_1_item_2', 'list_1_item_3'];
    const list_2 = ['list_2_item_1', 'list_2_item_2', 'list_2_item_3'];
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: open, onOpenChange: open => {
            if (!open) {
                onClose();
            }
        }, size: "md", iconClassName: "text-static hover:text-default", modalOnly: false, children: (0, jsx_runtime_1.jsxs)(modal_1.ModalBody, { className: "relative pt-0", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: isMobile ? '/images/reward-center-upgrade-mobile.png' : '/images/reward-center-upgrade.png', alt: "reward-center-upgrade", className: "w-full h-[120px] md:h-[168px] object-cover", width: 620, height: isMobile ? 120 : 168 }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row items-center gap-4 p-4 bg-surface-default", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full border border-default shadow-background-default flex-1 z-10 rounded-xl p-3", children: [(0, jsx_runtime_1.jsx)("ul", { className: "space-y-2  mb-4", children: list_1.map((item, index) => ((0, jsx_runtime_1.jsxs)("li", { className: "text-on-surface flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-1.5 h-1.5 rounded-full bg-icon-brand" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-base", color: "default", weight: "medium", children: t(`${item}`) })] }, item))) }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/rewards-center/earn", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-gradient-blue w-full rounded-xl p-3 relative h-[48px]", children: (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex items-center justify-between px-3 bg-surface-default absolute h-[45px] w-gradient-button md:w-[257px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: EarnShellPoints_svg_1.default, width: 24, height: 24, alt: "aipp" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "default", children: t('earn_shell_points') })] }), (0, jsx_runtime_1.jsx)(ChevronRightIcon_1.default, { className: "w-4 h-4 text-subtler" })] }) }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full border border-default shadow-background-default flex-1 z-10 rounded-xl p-3", children: [(0, jsx_runtime_1.jsx)("ul", { className: "space-y-2 mb-4", children: list_2.map((item, index) => ((0, jsx_runtime_1.jsxs)("li", { className: "text-on-surface flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-1.5 h-1.5 rounded-full bg-icon-brand" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-base", color: "default", weight: "medium", children: t(`${item}`) })] }, item))) }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/rewards-center/rewards-aipp-store", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-pink-button w-full rounded-xl p-3 relative h-[48px]", children: (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex items-center justify-between px-3 bg-surface-default absolute h-[45px] w-gradient-button md:w-[257px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: AIpp_svg_1.default, width: 24, height: 24, alt: "aipp" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "default", children: t('aipp_store') })] }), (0, jsx_runtime_1.jsx)(ChevronRightIcon_1.default, { className: "w-4 h-4 text-subtler" })] }) }) })] })] })] }) }));
}
