"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserLevel;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
function UserLevel({ user }) {
    const t = (0, next_intl_1.useTranslations)('profile');
    return ((0, jsx_runtime_1.jsx)("span", { className: (0, clsx_1.default)('flex-shrink-0 h-6 leading-6 px-[10px] bg-[#EBE1FF] rounded-lg text-xs text-[#391C79] font-bold', user && (user.isGenesisPasscard || user?.isPasscard)
            ? 'bg-[#FFF2E2] text-[#FDA500] dark:bg-[#4F3E2C] dark:text-[#FFC453]'
            : user?.level === 2
                ? 'bg-[#E0E5FF] text-[#3E5CFA] dark:bg-[#2C334F] dark:text-[#5974FF]'
                : 'bg-[#EDEEEF] text-[#414345] dark:bg-[#42434A] dark:text-[#B8BCCF]'), children: user && (user.isGenesisPasscard || user?.isPasscard)
            ? t('genesis')
            : user?.level === 2
                ? t('standard')
                : t('basic') }));
}
