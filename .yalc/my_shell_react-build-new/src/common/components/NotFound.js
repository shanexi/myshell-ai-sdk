"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowRightIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowRightIcon"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const button_1 = require("./ui/button.js");
function NotFound() {
    const router = (0, navigation_1.useRouter)();
    const t = (0, next_intl_1.useTranslations)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full flex flex-col justify-center items-center p-6", children: [(0, jsx_runtime_1.jsx)("img", { src: "https://image.myshell.ai/image/bot/photo/3505041/20240306/404b4fe4225f424db3040c66e47660d0.png", alt: "404 logo", className: "w-[315px] h-[125px] md:w-[430px] md:h-[170px]" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-8 md:mt-12 text-[24px] font-semibold text-default", children: t('common.page_not_found_title') }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-base text-subtler", children: t('common.page_not_found_tip') }), (0, jsx_runtime_1.jsx)(button_1.Button, { className: "mt-8 flex justify-center items-center", onClick: () => {
                    router.push('/explore');
                }, children: (0, jsx_runtime_1.jsxs)("span", { className: "flex justify-center items-center space-x-1", children: [`${t('explore')} ${t('more')}`, " ", (0, jsx_runtime_1.jsx)(ArrowRightIcon_1.default, { className: "text-white stroke-white w-5 h-5 stroke-[2px]" })] }) })] }));
}
exports.default = NotFound;
