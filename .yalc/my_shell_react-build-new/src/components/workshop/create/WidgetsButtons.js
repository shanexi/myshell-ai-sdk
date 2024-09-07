"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WidgetsButtons;
const jsx_runtime_1 = require("react/jsx-runtime");
const BookOpenIcon_1 = __importDefault(require("@heroicons/react/24/outline/BookOpenIcon"));
const PuzzlePieceIcon_1 = __importDefault(require("@heroicons/react/24/outline/PuzzlePieceIcon"));
const WrenchIcon_1 = __importDefault(require("@heroicons/react/24/outline/WrenchIcon"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const utils_1 = require("../../../lib/utils.js");
function WidgetsButtons({ isDisabled, id, links }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const router = (0, navigation_1.useRouter)();
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const linkWidget = links?.widget || '1742194864566571008';
    const linkTool = links?.tool || '1742195260089438208$$1742972254938992640';
    return ((0, jsx_runtime_1.jsxs)("div", { id: id, className: "flex flex-wrap justify-start items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex justify-between items-center cursor-pointer h-7 rounded-[99px] border-[1px] border-default px-3 py-1 space-x-1.5 mr-2', isDisabled && 'cursor-not-allowed opacity-30 select-none'), onClick: () => {
                    !isDisabled &&
                        router.push(isMobile ? `/robot-workshop/widgets?filter=${linkWidget}` : `/robot-workshop?filter=${linkWidget}`);
                }, children: [(0, jsx_runtime_1.jsx)(PuzzlePieceIcon_1.default, { className: "w-[18px] h-[18px] stroke-[var(--on-surface-btn-text)]" }), (0, jsx_runtime_1.jsx)("span", { className: "text-on-surface text-[14px] font-medium leading-[1.3]", children: t('widgets_btn') })] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex justify-between items-center cursor-pointer h-7 rounded-[99px] border-[1px] border-default px-3 py-1 space-x-1.5 mr-2', isDisabled && 'cursor-not-allowed opacity-30 select-none'), onClick: () => {
                    !isDisabled &&
                        router.push(isMobile ? `/robot-workshop/widgets?filter=${linkTool}` : `/robot-workshop?filter=${linkTool}`);
                }, children: [(0, jsx_runtime_1.jsx)(WrenchIcon_1.default, { className: "w-[18px] h-[18px] stroke-[var(--on-surface-btn-text)]" }), (0, jsx_runtime_1.jsx)("span", { className: "text-on-surface text-[14px] font-medium leading-[1.3]", children: t('tools_btn') })] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex justify-between items-center cursor-pointer h-7 rounded-[99px] border-[1px] border-default px-3 py-1 space-x-1.5 mr-2', isDisabled && 'cursor-not-allowed opacity-30 select-none'), onClick: () => {
                    !isDisabled && window.open('https://discord.com/channels/1122227993805336617/1127967758919925953');
                }, children: [(0, jsx_runtime_1.jsx)(BookOpenIcon_1.default, { className: "w-[18px] h-[18px] stroke-[var(--on-surface-btn-text)]" }), (0, jsx_runtime_1.jsx)("span", { className: "text-on-surface text-[14px] font-medium leading-[1.3]", children: t('learn_btn') })] })] }));
}
