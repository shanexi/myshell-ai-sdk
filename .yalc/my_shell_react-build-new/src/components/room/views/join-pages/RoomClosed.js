"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RoomClosed;
const jsx_runtime_1 = require("react/jsx-runtime");
const InformationCircleIcon_1 = __importDefault(require("@heroicons/react/24/solid/InformationCircleIcon"));
const next_intl_1 = require("next-intl");
const JoinErrorActions_1 = __importDefault(require("./JoinErrorActions.js"));
function RoomClosed() {
    const t = (0, next_intl_1.useTranslations)('chat.room.closed');
    return ((0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 w-full h-full z-20 bg-surface-default flex justify-center items-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-[308px] flex flex-col items-center gap-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-6", children: [(0, jsx_runtime_1.jsx)(InformationCircleIcon_1.default, { className: "text-brand size-[46px] md:size-14" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-[6px]", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg md:text-xl text-center", children: t('desc1') }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-center text-subtler", children: t('desc2') })] })] }), (0, jsx_runtime_1.jsx)(JoinErrorActions_1.default, {})] }) }));
}
