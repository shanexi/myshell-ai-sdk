"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BadgeInfo;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const avatar_1 = require("../../../../common/components/ui/avatar.js");
const skeleton_1 = require("../../../../common/components/ui/skeleton.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const utils_1 = require("../../../../lib/utils.js");
function BadgeInfo(props) {
    const { avatar, botName, badgeName, author, price, currencyLogo, showPrice, tickerPriceChanged, loading, bnbPrice, loadingBnbPrice } = props;
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    return ((0, jsx_runtime_1.jsxs)("div", { className: "px-4 mb-4 shadow-background-border", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('w-full flex p-3 rounded-xl gap-2 mt-3 items-start justify-between border shadow-background-default relative', tickerPriceChanged ? 'border-critical' : 'border-default'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 max-w-[200px]", children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { src: avatar, className: "w-14 h-14" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1 ml-1", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex', showPrice ? 'gap-1' : 'gap-3'), children: (0, jsx_runtime_1.jsx)("span", { className: "text-base text-subtlest", children: `$${badgeName}` }) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { color: "default", className: (0, utils_1.cn)('text-base text-ellipsis w-max-[154px]'), lineClamp: 1, children: botName })] })] }), showPrice && ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-1", children: [loading ? ((0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[86px] h-6 rounded-md" })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1", children: [currencyLogo, (0, jsx_runtime_1.jsx)("span", { className: "text-base text-default font-medium", children: price })] })), loadingBnbPrice || loading ? ((0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[58px] h-4 rounded-md" })) : (Number.isFinite(Number(bnbPrice)) &&
                                Number.isFinite(Number(price)) && ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-brand font-medium", children: `≈$${(Number(bnbPrice) * Number(price)).toFixed(2)}` })))] }))] }), tickerPriceChanged && (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-sm text-critical", children: t('price_changed_tip') })] }));
}
