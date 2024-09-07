"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OfficialBot;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const tooltip_1 = require("../../../../../../../common/components/ui/tooltip.js");
function OfficialBot({ isOfficial }) {
    const chatLocale = (0, next_intl_1.useTranslations)('chat');
    if (!isOfficial)
        return null;
    return ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { showArrow: false, description: chatLocale('official_bot'), children: (0, jsx_runtime_1.jsx)(image_1.default, { alt: "official bot", src: "/images/check-badge.png", width: 20, height: 20, className: "cursor-pointer shrink-0" }) }));
}
