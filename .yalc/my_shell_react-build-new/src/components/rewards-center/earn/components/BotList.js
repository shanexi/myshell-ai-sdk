"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotListItem = BotListItem;
exports.BotList = BotList;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const button_1 = require("../../../../common/components/ui/button.js");
const link_1 = __importDefault(require("../../../../common/components/ui/link.js"));
const typography_1 = require("../../../../common/components/ui/typography.js");
const utils_1 = require("../../../../lib/utils.js");
function BotListItem({ data, goToChat, isMobile }) {
    const chatT = (0, next_intl_1.useTranslations)('chat');
    return ((0, jsx_runtime_1.jsx)(link_1.default, { onClick: () => {
            goToChat(data.id, data.name, data.uid);
        }, className: "w-full rounded-xl p-3 border border-default bg-surface-default hover:bg-surface-pressed cursor-pointer", href: isMobile ? `/m/chat/${data.id}?tips=1&from=Reward Center` : `/chat/${data.id}?tips=1&from=Reward Center`, children: (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex items-center space-x-3 w-full'), children: [(0, jsx_runtime_1.jsx)("img", { src: data.logoUrl, className: "w-12 h-12 rounded-xl", alt: "bot avatar" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center overflow-hidden flex-1 space-x-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-0.5 flex-1 flex flex-col overflow-hidden", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "medium", className: "line-clamp-1", children: data.name }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", color: "subtler", className: "line-clamp-1", children: data.description })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: "sm", color: "default", className: "md:hidden", children: chatT('chat') })] })] }) }));
}
function BotList({ isMobile, bots, goToChat }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex flex-col md:flex-row space-y-1.5 md:space-x-3 md:space-y-0'), children: bots.map((bot, index) => ((0, jsx_runtime_1.jsx)(BotListItem, { index: index, isMobile: isMobile, data: { ...bot.summary, photos: bot.photos }, goToChat: goToChat }, bot.summary.id))) }));
}
