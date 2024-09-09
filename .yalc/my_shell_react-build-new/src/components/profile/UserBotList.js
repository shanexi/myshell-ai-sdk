"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const utils_1 = require("../../lib/utils.js");
const NormalCard_1 = __importDefault(require("../../common/components/NormalCard.js"));
const NormalCardSkeleton_1 = require("../skeleton/common/NormalCardSkeleton.js");
function UserBotList({ bots, loading, disableJumpToChat, onBotClick, selectedBotId, containerClassName, itemBoxClassName, itemLinkClassName, itemDividerClassName }) {
    const t = (0, next_intl_1.useTranslations)('profile');
    const botList = bots?.map(item => {
        return {
            title: item.name,
            description: item.description,
            logoUrl: item.logoUrl,
            id: item.id,
            clickUrl: `/chat/${item.id}`,
            clickMobileUrl: `/chat/${item.id}`,
            type: 'BOT'
        };
    }) || [];
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: loading && bots.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2', containerClassName), children: Array(4)
                .fill(1)
                ?.map((item, index) => {
                return (0, jsx_runtime_1.jsx)(NormalCardSkeleton_1.NormalCardSkeleton, { size: "sm" }, `bots-skeleton-${index}`);
            }) })) : ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('grid grid-cols-1 gap-x-4 gap-y-2', bots?.length > 0 ? 'md:grid-cols-2' : '', containerClassName), children: botList?.length > 0 ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: botList?.map((item, index) => {
                    return ((0, jsx_runtime_1.jsx)(NormalCard_1.default, { className: itemBoxClassName, linkClassName: itemLinkClassName, dividerClassName: (0, utils_1.cn)(selectedBotId === item.id ? 'border-primary' : '', itemDividerClassName), from: "Aipp Launch", size: "sm", item: item, isLine: true, disableJumpToChat: disableJumpToChat, onClick: () => {
                            const bot = bots.find(({ id }) => id === item.id);
                            if (!bot) {
                                return;
                            }
                            onBotClick?.(bot);
                        } }, `bots-common-item-${index}`));
                }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "text-on-surface h-[120px] flex justify-center items-center", children: t('no_public_bots') }, "no_public_bots")) })) }));
}
exports.default = UserBotList;
