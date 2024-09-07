"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RoomManagement;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const StaticContext_1 = require("../../chat-new/context/StaticContext.js");
const context_1 = __importDefault(require("../../chat/layouts/context.js"));
const PCChatDetailLayoutSkeleton_1 = __importDefault(require("../../chat/layouts/skeleton/PCChatDetailLayoutSkeleton.js"));
const separator_1 = require("../../common/components/ui/separator.js");
const useRoomManagement_1 = __importDefault(require("./hooks/useRoomManagement.js"));
const Editor_1 = __importDefault(require("./views/editor/Editor.js"));
const Output_1 = __importDefault(require("./views/output/Output.js"));
function RoomManagement({ topActionsSlot }) {
    const { editorAnchorRef } = (0, react_1.useContext)(context_1.default);
    const { getList } = (0, react_1.useContext)(StaticContext_1.StaticContext);
    const { creating, create, gettingList, roomList } = (0, useRoomManagement_1.default)(getList);
    if (gettingList)
        return (0, jsx_runtime_1.jsx)(PCChatDetailLayoutSkeleton_1.default, {});
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full md:h-[calc(100%-108px)] md:rounded-3xl overflow-hidden bg-surface-default flex flex-col relative", children: [topActionsSlot, (0, jsx_runtime_1.jsx)("div", { className: "w-full px-4 md:px-6 py-0 relative grow", children: (0, jsx_runtime_1.jsx)(Output_1.default, { creating: creating, roomList: roomList, create: create }) }), (0, jsx_runtime_1.jsx)(separator_1.Separator, { className: "w-full bg-[var(--border)] hidden md:block" }), (0, jsx_runtime_1.jsx)("div", { ref: editorAnchorRef, className: "shrink-0 h-fit w-full overflow-hidden", children: (0, jsx_runtime_1.jsx)(Editor_1.default, { className: "w-full" }) })] }));
}
