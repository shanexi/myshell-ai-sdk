"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RoomAvatar;
const jsx_runtime_1 = require("react/jsx-runtime");
function AvatarRender({ avatarList }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-full flex flex-col gap-1 justify-center items-center", children: avatarList.length === 2 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-between items-center gap-1 md:gap-2", children: avatarList.map((avatar, index) => ((0, jsx_runtime_1.jsx)("img", { width: 64, height: 64, src: avatar, alt: `Avatar ${index + 1}`, className: "size-7 md:size-8 rounded-lg" }, avatar))) })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("img", { width: 64, height: 64, src: avatarList[0], alt: "Avatar 1", className: "size-7 md:size-8 rounded-lg" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center gap-1 md:gap-2", children: [(0, jsx_runtime_1.jsx)("img", { width: 64, height: 64, src: avatarList[1], alt: "Avatar 2", className: "size-7 md:size-8 rounded-lg" }), (0, jsx_runtime_1.jsx)("img", { src: avatarList[2], alt: "Avatar 3", className: "size-7 md:size-8 rounded-lg" })] })] })) }));
}
function RoomAvatar({ avatarList }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "size-[72px] md:size-[84px] rounded-2xl shadow-background-bolder bg-surface-container-hovered", children: avatarList?.length ? (0, jsx_runtime_1.jsx)(AvatarRender, { avatarList: avatarList }) : null }));
}
