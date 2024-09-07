"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = Layout;
exports.Sidebar = Sidebar;
exports.Workspace = Workspace;
const jsx_runtime_1 = require("react/jsx-runtime");
function Layout(props) {
    const { children } = props;
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-full bg-surface-subtle overflow-hidden flex", children: children }));
}
function Sidebar(props) {
    const { children } = props;
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col w-[320px] h-full bg-surface border-default border-r", children: children }));
}
function Workspace(props) {
    const { children } = props;
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-full flex-1 overflow-auto no-scrollbar scroll-smooth", children: (0, jsx_runtime_1.jsx)("div", { className: "w-[600px] pt-9 pb-20 m-auto", children: children }) }));
}
