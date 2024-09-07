"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PartronBadgeTableSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const TableSkeletonPC_1 = __importDefault(require("../../../../components/skeleton/rewards-center/partron-badge/TableSkeletonPC.js"));
const TableSkeletonMobile_1 = __importDefault(require("../../../../components/skeleton/rewards-center/partron-badge/TableSkeletonMobile.js"));
function PartronBadgeTableSkeleton() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "md:hidden space-y-4", children: (0, jsx_runtime_1.jsx)(TableSkeletonMobile_1.default, { columns: 4, animate: false, num: 6 }) }), (0, jsx_runtime_1.jsx)("div", { className: "hidden md:block", children: (0, jsx_runtime_1.jsx)(TableSkeletonPC_1.default, { num: 6, informationColumnWidth: 180, columnWidthList: [120, 150, 180, 150] }) })] }));
}
