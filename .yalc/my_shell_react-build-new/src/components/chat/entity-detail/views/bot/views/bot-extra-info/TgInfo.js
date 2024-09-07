"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TgInfo;
const jsx_runtime_1 = require("react/jsx-runtime");
const Square2StackIcon_1 = __importDefault(require("@heroicons/react/24/solid/Square2StackIcon"));
const image_1 = __importDefault(require("next/image"));
const telegram_svg_1 = __importDefault(require("@/common/assets/icons/social-media/telegram.svg"));
const tooltip_1 = require("../../../../../../../common/components/ui/tooltip.js");
const useCopyClipboard_1 = __importDefault(require("../../../../../../../common/hooks/useCopyClipboard.js"));
function TgInfo({ tgName, logoUrl }) {
    const link = `https://t.me/${tgName}`;
    const { onCopy } = (0, useCopyClipboard_1.default)(link);
    if (!tgName)
        return null;
    return ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { showArrow: false, description: (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4 text-xs font-semibold", children: [(0, jsx_runtime_1.jsxs)("a", { href: link, target: "_blank", rel: "noopener noreferrer", className: "flex items-center space-x-1", children: [logoUrl && ((0, jsx_runtime_1.jsx)(image_1.default, { src: logoUrl, alt: "bot avatar", className: "rounded-full w-[24px] h-[24px] object-cover", width: 24, height: 24, loading: "eager" })), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm", children: ["@", tgName] })] }), (0, jsx_runtime_1.jsx)("button", { type: "button", title: "copy bot name", onClick: () => onCopy(), className: "w-[24px]", children: (0, jsx_runtime_1.jsx)(Square2StackIcon_1.default, { className: "w-[20px] h-[20px] fill-primary" }) })] }), children: (0, jsx_runtime_1.jsx)(image_1.default, { src: telegram_svg_1.default, className: "w-5 h-5 rounded cursor-pointer shrink-0", alt: "Telegram logo" }) }));
}
