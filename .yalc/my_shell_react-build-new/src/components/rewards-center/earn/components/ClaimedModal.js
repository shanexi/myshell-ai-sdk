"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimedModal = ClaimedModal;
exports.DayItem = DayItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const CheckIcon_1 = __importDefault(require("@heroicons/react/24/outline/CheckIcon"));
const clsx_1 = __importDefault(require("clsx"));
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const next_themes_1 = require("next-themes");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
function ClaimedModal(props) {
    const t = (0, next_intl_1.useTranslations)();
    const { isOpen, onClose, points, data, claimedPoints, showBtn } = props;
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const isDark = resolvedTheme === 'dark';
    const firstWeek = 6;
    return ((0, jsx_runtime_1.jsxs)(react_1.Modal, { isOpen: isOpen, onClose: onClose, isCentered: true, size: "xl", children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, { className: "bg-alpha-mask-desktop" }), (0, jsx_runtime_1.jsx)(react_1.ModalContent, { p: 0, className: "rounded-4xl overflow-auto no-scrollbar w-[342px] md:w-[528px]", children: (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('rounded-2xl flex flex-col items-center w-full max-h-[404px]', showBtn && 'max-h-[480px]'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center relative h-[120px] sm:h-[200px] z-10 w-full", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: isDark ? '/images/claimed_dark.png' : '/images/claimed_light.png', alt: "background", width: "100", height: "200", className: "absolute left-0 right-0 top-0 h-[260px] w-full z-0 rounded-2xl" }), (0, jsx_runtime_1.jsx)("h3", { className: "z-10 text-2xl text-black dark:text-white mb-2", children: t('reward_center.earn_content.claimed_successfully') }), (0, jsx_runtime_1.jsxs)("p", { className: "z-10 text-base font-semibold text-primary", children: ["+", (0, common_helper_1.formatFloatNumberToOneDecimalAndRemoveDecimalZero)(claimedPoints), " Shell points"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('rounded-2xl -mt-2 p-4 space-x-1 space-y-2 z-20 relative bg-white dark:bg-surface-container overflow-auto w-full h-[260px] sm:h-[318px]', showBtn && 'h-[300px] sm:h-[446px]'), children: [(0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-6 sm:grid-cols-6 gap-2 w-full", children: data.slice(0, firstWeek).map((d, i) => ((0, jsx_runtime_1.jsx)(DayItem, { label: `Day ${i + 1}`, points: d, active: points >= i + 1, isDark: isDark }, `day_${d}_${i}`))) }), (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('flex justify-evenly gap-2', showBtn && 'mb-2'), children: [(0, jsx_runtime_1.jsx)(DayItem, { isDark: isDark, full: true, label: "Day 7", points: data[6], active: points >= 7 }), (0, jsx_runtime_1.jsx)(DayItem, { isDark: isDark, full: true, label: "Day 8 - End", points: data[7], active: points >= 8 })] }), showBtn && ((0, jsx_runtime_1.jsx)(react_1.Button, { w: "100%", h: "44px", px: "24px", variant: "unstyled", rounded: "full", fontSize: "16px", lineHeight: "24px", fontWeight: "500", className: "bg-primary", color: "white", boxShadow: "0px -1px 0px 0px rgba(0, 0, 0, 0.20) inset, 0px 1px 0px 0px rgba(0, 0, 0, 0.08);", _hover: {
                                        bgColor: '#2B46D8'
                                    }, display: "flex", justifyContent: "center", alignItems: "center", onClick: () => onClose(), children: t('common.got_it') }))] })] }) })] }));
}
function DayItem(props) {
    const { label, points, active, full, isDark } = props;
    const linear = isDark
        ? 'linear-gradient(154deg, #5AE6E6 -6.83%, #605DE4 101.93%)'
        : 'linear-gradient(154deg, #5AE6E6 -6.83%, #605DE4 101.93%)';
    const bg = isDark ? '#1C1E26' : '#F5F7FA';
    const fullBg = isDark ? '#232533' : '#F2F7FE';
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('rounded-xl w-full flex flex-col justify-center items-center py-3', full && 'w-full'), style: {
            background: active ? linear : full ? fullBg : bg
        }, children: [(0, jsx_runtime_1.jsx)("p", { className: (0, clsx_1.default)('text-xs font-bold text-secondary', active && 'text-white'), children: label }), (0, jsx_runtime_1.jsx)("img", { src: isDark ? (0, common_helper_1.getAssetsUrl)('/image/season/ui/reward-dark.png', 'https://cdn.myshell.ai') : '/images/circle_new.png', alt: "circle", className: (0, clsx_1.default)('w-[36px] sm:min-w-[44px]', full && 'min-w-[64px]') }), active ? ((0, jsx_runtime_1.jsx)(CheckIcon_1.default, { className: "w-3 h-3 text-white" })) : ((0, jsx_runtime_1.jsxs)("p", { className: (0, clsx_1.default)('text-xs font-bold text-primary', active && 'text-white'), children: ["+", points] }))] }));
}
