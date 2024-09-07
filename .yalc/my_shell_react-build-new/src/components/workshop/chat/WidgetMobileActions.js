"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WidgetMobileActions;
const jsx_runtime_1 = require("react/jsx-runtime");
const MicrophoneIcon_1 = __importDefault(require("@heroicons/react/24/outline/MicrophoneIcon"));
const ChevronUpIcon_1 = __importDefault(require("@heroicons/react/24/solid/ChevronUpIcon"));
const react_1 = require("react");
const context_1 = __importDefault(require("../../../chat/layouts/context.js"));
const avatar_1 = require("../../../common/components/ui/avatar.js");
const WidgetFunctionMenu_1 = __importDefault(require("./WidgetFunctionMenu.js"));
function WidgetMobileActions(props) {
    const { widgetInfo, isPanelImageBot, toolbarState, toggleVoice } = props;
    const { showMobileDetail } = (0, react_1.useContext)(context_1.default);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-row justify-between items-center mt-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grow flex justify-start items-center space-x-[6px]", onClick: () => {
                    showMobileDetail?.();
                }, children: [(0, jsx_runtime_1.jsx)("div", { className: "shrink-0 rounded-lg border border-default overflow-hidden", children: (0, jsx_runtime_1.jsx)(avatar_1.Avatar, { src: widgetInfo?.logoUrl, size: "md" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-1 text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { className: "line-clamp-1 break-all", children: widgetInfo?.name }), (0, jsx_runtime_1.jsx)(ChevronUpIcon_1.default, { className: "w-[18px] h-[18px] text-primary flex-shrink-0" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "shrink-0 flex items-center space-x-[6px]", children: [(0, jsx_runtime_1.jsx)(WidgetFunctionMenu_1.default, { widgetInfo: widgetInfo }), !isPanelImageBot && (0, jsx_runtime_1.jsx)(MicrophoneIcon_1.default, { className: "w-9 h-9 p-[6px] text-primary", onClick: toggleVoice })] })] }));
}
