"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/solid/ArrowLeftIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const typography_1 = require("../../../common/components/ui/typography.js");
const useBackToProfile_1 = __importDefault(require("../../../common/hooks/useBackToProfile.js"));
const WalletList_1 = __importDefault(require("../../../components/profile/WalletList.js"));
function Wallet() {
    const t = (0, next_intl_1.useTranslations)('profile');
    const { backToProfile, isMobile } = (0, useBackToProfile_1.default)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative w-full h-full flex flex-col bg-surface", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('shrink-0 flex w-full text-on-surface bg-surface-default items-center h-14 md:h-15 border-0 border-b border-default border-solid z-10', {
                    'bg-[#fff]': !isMobile,
                    'justify-start': !isMobile,
                    'justify-center': isMobile,
                    'pl-5': !isMobile
                }), children: [(0, jsx_runtime_1.jsx)("div", { onClick: backToProfile, className: (0, clsx_1.default)('absolute left-4 text-lg cursor-pointer visible', {
                            invisible: !isMobile
                        }), children: (0, jsx_runtime_1.jsx)(ArrowLeftIcon_1.default, { className: "w-5 h-5 stroke-surface-primary-default" }) }), (0, jsx_runtime_1.jsx)(typography_1.Display, { size: "sm", children: t('wallet') })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full flex justify-center relative pt-6 pb-14 bg-surface p-4 md:p-6 overflow-y-auto", children: (0, jsx_runtime_1.jsx)(WalletList_1.default, {}) })] }));
}
exports.default = Wallet;
