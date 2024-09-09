"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotLogo = BotLogo;
const jsx_runtime_1 = require("react/jsx-runtime");
const avatar_1 = require("../../../common/components/ui/avatar.js");
function BotLogo({ logoUrl }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex-shrink-0 rounded-2xl w-[84px] h-[84px] md:w-[120px] md:h-[120px] overflow-hidden ml-[16px] md:ml-[24px] -mt-[30px] md:-mt-[48px] z-0 border-[2px] md:border-[6px] border-white dark:border-[#1C1E26]", children: logoUrl ? ((0, jsx_runtime_1.jsx)(avatar_1.Avatar, { src: logoUrl, alt: "bot avatar", className: "w-full h-full" })) : ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-full rounded-md bg-[#bbb]" })) }));
}
