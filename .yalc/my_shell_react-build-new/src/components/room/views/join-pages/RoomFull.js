"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RoomFull;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const RoomAvatar_1 = __importDefault(require("../RoomAvatar.js"));
const JoinErrorActions_1 = __importDefault(require("./JoinErrorActions.js"));
function RoomFull({ avatarList }) {
    const t = (0, next_intl_1.useTranslations)('chat.room.full');
    return ((0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 w-full h-full z-20 bg-surface-default flex justify-center items-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-[308px] flex flex-col items-center gap-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-6", children: [(0, jsx_runtime_1.jsx)(RoomAvatar_1.default, { avatarList: avatarList }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-[6px]", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg md:text-xl text-center", children: t('desc1') }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-center text-subtler", children: t('desc2') })] })] }), (0, jsx_runtime_1.jsx)(JoinErrorActions_1.default, {})] }) }));
}
