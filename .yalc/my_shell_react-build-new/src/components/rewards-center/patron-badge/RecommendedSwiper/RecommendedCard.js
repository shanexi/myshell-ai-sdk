"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RecommendedCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const bnb_svg_1 = __importDefault(require("@/assets/icons/web3/bnb.svg"));
const typography_1 = require("../../../../common/components/ui/typography.js");
const utils_1 = require("../../../../lib/utils.js");
function RecommendedCard(props) {
    const { avatar = '', price, holders, tickerName, botName, botId, symbol, curveTag, onClick } = props;
    const [avatarUrl, setAvatarUrl] = (0, react_1.useState)(avatar);
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('shadow-background-default rounded-xl flex relative w-mobile-recommend-card md:w-full border border-default cursor-pointer hover:bg-surface-hovered'), onClick: () => onClick?.(symbol), children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: avatarUrl, width: 120, height: 120, alt: "avatar", className: "rounded-tl-xl rounded-bl-xl", onError: () => {
                    setAvatarUrl('https://image.myshell.ai/cdn-cgi/image/quality=40,format=webp/image/bot/logo/20240106/default.png');
                } }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1 p-3 justify-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-1.5", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "medium", color: "subtlest", children: `$${tickerName}` }), curveTag && ((0, jsx_runtime_1.jsx)("div", { className: "px-1 py-0.5 bg-surface-accent-gray-subtlest rounded-md h-5 flex flex-row justify-center items-center", children: (0, jsx_runtime_1.jsx)(typography_1.Description, { size: "lg", weight: "medium", color: "default", children: curveTag }) }))] }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-base", color: "default", weight: "medium", lineClamp: 1, children: botName }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm flex gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-subtler", children: t('price') }), (0, jsx_runtime_1.jsx)(image_1.default, { src: bnb_svg_1.default, width: 16, height: 16, alt: "currency", className: "rounded-full" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { color: "default", weight: "medium", className: "text-sm", children: price })] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm flex gap-1 items-center", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { color: "subtler", className: "text-sm", children: `${t('holders')}:` }), (0, jsx_runtime_1.jsx)(typography_1.Text, { color: "default", weight: "medium", className: "text-sm", children: holders })] })] })] }));
}
