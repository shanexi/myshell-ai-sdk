"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RecordItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const typography_1 = require("../../../../common/components/ui/typography.js");
const shell_point_1 = require("../shell-point/index.js");
const dayjs_1 = __importDefault(require("dayjs"));
const use_intl_1 = require("use-intl");
const shell_coin_1 = require("../shell-coin/index.js");
function RecordItem({ record }) {
    const t = (0, use_intl_1.useTranslations)('reward_center.records');
    return ((0, jsx_runtime_1.jsxs)("div", { className: "p-2 flex space-x-3 rounded-xl hover:bg-surface-hovered", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grow flex flex-col space-y-0.5", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "medium", children: record.desc }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "medium", color: "subtler", children: (0, dayjs_1.default)(Number(record.createdDateUnix)).format('YYYY/MM/DD HH:mm:ss') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "shrink-0 flex flex-col items-end", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-0.5", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "medium", color: record.isIncome ? 'brand' : 'default', children: record.isIncome ? '+' : '-' }), record.type === 'SHELL_COIN' ? (0, jsx_runtime_1.jsx)(shell_coin_1.ShellCoin, { size: 22 }) : (0, jsx_runtime_1.jsx)(shell_point_1.ShellPoint, { type: record.type, size: 22 }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "medium", color: record.isIncome ? 'brand' : 'default', children: record.text })] }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtler", children: t('balance') + record.balance })] })] }, record.id));
}
