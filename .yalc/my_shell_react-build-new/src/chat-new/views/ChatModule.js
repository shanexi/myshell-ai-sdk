"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatModule;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const react_use_1 = require("react-use");
const ChatShare_1 = __importDefault(require("../../chat/views/chat-share/ChatShare.js"));
const MessageContext_1 = require("../../chat-new/context/MessageContext.js");
const StaticContext_1 = require("../../chat-new/context/StaticContext.js");
const separator_1 = require("../../common/components/ui/separator.js");
const store_1 = require("../../services/store/index.js");
const EditorSkeleton_1 = __importDefault(require("./editor/skeleton/EditorSkeleton.js"));
const MessageListSkeleton_1 = __importDefault(require("./message-list/skeleton/MessageListSkeleton.js"));
const Editor = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./editor/index.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)(EditorSkeleton_1.default, {}),
    ssr: false
});
const MessageList = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./message-list/index.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)(MessageListSkeleton_1.default, {}),
    ssr: false
});
function ChatModule({ bgUrl, editorAnchorRef, editorContainerRef, textareaRef, topActionsSlot, scrollLayoutToTop, showMobileDetail }) {
    const [bgImgLoaded, setBgImgLoaded] = (0, react_use_1.useToggle)(false);
    const handleBgImgLoaded = () => {
        setBgImgLoaded(true);
    };
    const inputType = (0, store_1.useChatStore)(state => state.inputType);
    const { entityInfo } = (0, react_1.useContext)(StaticContext_1.StaticContext);
    const { getDragRootProps } = (0, react_1.useContext)(MessageContext_1.MessageContext);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('w-full h-full flex flex-col bg-cover bg-center bg-no-repeat relative', !(bgUrl && bgImgLoaded) && 'bg-surface-default'), style: {
                    backgroundImage: bgUrl && bgImgLoaded ? `url('${bgUrl}')` : 'none'
                }, ...getDragRootProps?.(), children: [topActionsSlot, (0, jsx_runtime_1.jsx)("div", { className: "renderer-container grow h-full overflow-y-auto no-scrollbar scroll-smooth px-4 md:px-6 py-0", children: (0, jsx_runtime_1.jsx)(MessageList, {}) }), inputType === 'share' ? ((0, jsx_runtime_1.jsx)("div", { className: "w-full z-10 border-t border-outline", children: (0, jsx_runtime_1.jsx)(ChatShare_1.default, { selectedBot: {
                                name: entityInfo.name
                            } }) })) : null, inputType === 'text' ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(separator_1.Separator, { className: "w-full bg-[var(--border)] hidden md:block" }), (0, jsx_runtime_1.jsx)("div", { ref: editorAnchorRef, className: "shrink-0 h-fit w-full", children: (0, jsx_runtime_1.jsx)(Editor, { editorContainerRef: editorContainerRef, textareaRef: textareaRef, scrollLayoutToTop: scrollLayoutToTop, showMobileDetail: showMobileDetail }) })] })) : null] }), bgUrl && ((0, jsx_runtime_1.jsx)(image_1.default, { src: bgUrl, width: 1, height: 1, className: "hidden", alt: "Large Image", onLoad: handleBgImgLoaded, fetchPriority: "high" }))] }));
}
