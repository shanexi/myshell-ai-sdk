"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const formatCount = (count) => {
    const num = Number(count);
    if (num > 1000) {
        return `${(num / 1000).toFixed(1)}k`;
    }
    return num;
};
function FollowInfo({ user }) {
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const t = (0, next_intl_1.useTranslations)('profile');
    if (!user)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "text-base flex items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-secondary mr-1", children: t('follower') }), (0, jsx_runtime_1.jsx)("span", { className: "text-on-surface font-medium", children: formatCount(user?.fansCount) }), (0, jsx_runtime_1.jsx)("p", { className: "border-r mx-2 h-[16px]" }), (0, jsx_runtime_1.jsx)("span", { className: "text-secondary mr-1", children: t('following') }), (0, jsx_runtime_1.jsx)("span", { className: "text-on-surface font-medium", children: formatCount(user?.followedCount) })] }));
}
exports.default = FollowInfo;
