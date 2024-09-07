"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Passcard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/solid/ArrowLeftIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const typography_1 = require("../../../common/components/ui/typography.js");
const useBackToProfile_1 = __importDefault(require("../../../common/hooks/useBackToProfile.js"));
const config_1 = require("../../../lib/config.js");
const CardBox_1 = __importDefault(require("./CardBox.js"));
function Passcard() {
    const t = (0, next_intl_1.useTranslations)('profile');
    const { backToProfile, isMobile } = (0, useBackToProfile_1.default)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative w-full h-full overflow-hidden flex flex-col items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('shrink-0 flex w-full text-on-surface bg-surface-default items-center h-14 md:h-15 border-0 border-b border-default border-solid z-10', {
                    'bg-[#fff]': !isMobile,
                    'justify-start': !isMobile,
                    'justify-center': isMobile,
                    'pl-5': !isMobile
                }), children: [(0, jsx_runtime_1.jsx)("div", { onClick: backToProfile, className: (0, clsx_1.default)('absolute left-4 text-lg cursor-pointer visible', {
                            invisible: !isMobile
                        }), children: (0, jsx_runtime_1.jsx)(ArrowLeftIcon_1.default, { className: "w-5 h-5 stroke-surface-primary-default" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2 text-lg md:text-xl font-semibold text-on-surface", children: [(0, jsx_runtime_1.jsx)(typography_1.Display, { size: "sm", children: t('passcard') }), (0, jsx_runtime_1.jsx)(react_1.Tag, { size: "lg", borderRadius: "99px", variant: "solid", h: "22px", minH: "22px", px: "10px", className: "shrink-0 mr-1 last:mr-0 bg-[#E5EFFD] dark:bg-[#464B66]", children: (0, jsx_runtime_1.jsx)(react_1.TagLabel, { color: "var(--primary)", fontWeight: "600", fontSize: "12px", h: "22px", minH: "22px", lineHeight: "22px", children: "Beta" }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "max-w-full overflow-y-auto", children: [(0, jsx_runtime_1.jsx)("div", { className: "snap-mandatory snap-x max-w-full mt-4 md:mt-10 overflow-scroll flex flex-row pl-5 no-scrollbar", children: config_1.PasscardData.map(item => ((0, jsx_runtime_1.jsx)("div", { className: "mr-5", children: (0, jsx_runtime_1.jsx)(CardBox_1.default, { data: item }) }, item.key))) }), (0, jsx_runtime_1.jsx)("div", { className: "flex w-full justify-center", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "mt-5", color: "subtler", size: "sm", children: t('passcard_tip') }) })] })] }));
}
