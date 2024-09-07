"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchListSkeleton = SearchListSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const utils_1 = require("../../../lib/utils.js");
const NormalCardSkeleton_1 = require("./NormalCardSkeleton.js");
function SearchListSkeleton() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-screen min-h-[700px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 px-4 md:px-3.5 gap-y-2 !mt-0 space-y-1.5 md:space-y-0.5", style: {
            gridAutoRows: 'minmax(0, max-content)'
        }, children: Array(30)
            .fill(1)
            .map((item, index) => {
            return (0, jsx_runtime_1.jsx)(NormalCardSkeleton_1.NormalCardSkeleton, { className: (0, utils_1.cn)('flex-grow', index > 5 && 'hidden md:flex') }, (0, common_helper_1.generateUUID)());
        }) }));
}
