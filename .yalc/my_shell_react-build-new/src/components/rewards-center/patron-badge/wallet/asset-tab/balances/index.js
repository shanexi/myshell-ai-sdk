"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Balances;
const jsx_runtime_1 = require("react/jsx-runtime");
const typography_1 = require("../../../../../../common/components/ui/typography.js");
const user_1 = require("../../../../../../common/constants/enums/user.js");
const AssetSkeleton_1 = require("../../../../../../components/skeleton/profile/AssetSkeleton.js");
const utils_1 = require("../../../../../../lib/utils.js");
function Balances(props) {
    const { loading, assets, name } = props;
    const renderComingSoon = () => {
        return (0, jsx_runtime_1.jsx)("div", { className: "bg-surface-accent-gray-subtlest py-1 px-2 rounded-full", children: "Coming soon" });
    };
    return ((0, jsx_runtime_1.jsx)("ul", { children: loading ? ((0, jsx_runtime_1.jsx)(AssetSkeleton_1.AssetSkeleton, { count: name === user_1.WalletType.Privy ? 4 : 2 })) : (assets.map(asset => {
            const { label, formatBalance, logo, chain } = asset;
            return ((0, jsx_runtime_1.jsxs)("li", { className: (0, utils_1.cn)('flex items-center justify-between border-t-[1px] first:border-t-0 border-default py-4 relative last:pb-0'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [logo, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-start", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { color: "default", weight: "medium", size: "sm", children: label }), (0, jsx_runtime_1.jsx)(typography_1.Text, { color: "subtler", className: "text-xs", children: chain })] })] }), (0, jsx_runtime_1.jsx)(typography_1.Text, { color: "subtler", className: (0, utils_1.cn)(formatBalance === 'Coming Soon' ? 'text-[10px]' : 'text-base'), children: formatBalance === 'Coming Soon' ? renderComingSoon() : formatBalance })] }, label));
        })) }));
}
