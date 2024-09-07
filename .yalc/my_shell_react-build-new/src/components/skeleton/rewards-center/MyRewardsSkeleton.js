"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MyRewardsSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
function MyRewardsSkeleton() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 min-[1080px]:grid-cols-2 min-[1440px]:grid-cols-3 min-[1640px]:grid-cols-4 gap-x-4 gap-y-8 p-5", children: Array(3)
            .fill(1)
            .map(() => ((0, jsx_runtime_1.jsxs)("div", { className: "border border-surface-container-low shadow-[0px 1px 2px 0px rgba(0, 0, 0, 0.10)] rounded-[12px]", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "aspect-square w-full" }), (0, jsx_runtime_1.jsx)("div", { className: "p-4", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-[24px]" }) })] }, (0, common_helper_1.generateUUID)()))) }));
}
