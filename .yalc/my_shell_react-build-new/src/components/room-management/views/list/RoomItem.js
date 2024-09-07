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
exports.default = RoomItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const dynamic_1 = __importDefault(require("next/dynamic"));
const react_1 = require("react");
const context_menu_1 = require("../../../../chat-new/views/message-list/components/context-menu/index.js");
const display_provider_1 = require("../../../../chat-new/views/message-list/components/display-provider/index.js");
const ChatStaticContext_1 = __importDefault(require("../../../../chat/ChatStaticContext.js"));
const avatar_1 = require("../../../../common/components/ui/avatar.js");
const button_1 = require("../../../../common/components/ui/button.js");
const link_1 = __importDefault(require("../../../../common/components/ui/link.js"));
const useCopyClipboard_1 = __importDefault(require("../../../../common/hooks/useCopyClipboard.js"));
const CreateSlashMessage_1 = __importDefault(require("../output/CreateSlashMessage.js"));
const MdViewer = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../../common/components/MdViewer.js'))), {
    ssr: false
});
function CopyInvitationLink({ invitationUrl }) {
    const t = (0, next_intl_1.useTranslations)('chat.room');
    const { onCopy } = (0, useCopyClipboard_1.default)(invitationUrl);
    return ((0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: "chat", size: "md", className: "w-fit", onClick: () => onCopy(), children: t('copy_invitation_url') }));
}
function GoToRoom({ id }) {
    const t = (0, next_intl_1.useTranslations)('chat.room');
    return ((0, jsx_runtime_1.jsx)(link_1.default, { href: `/room/${id}`, className: "w-fit", children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: "chat", size: "md", className: "w-fit", children: t('go_to_room') }) }));
}
function RoomMessage({ id, name, invitationUrl, invitationImgUrl }) {
    const t = (0, next_intl_1.useTranslations)('chat.room');
    const { logoUrl } = (0, react_1.useContext)(ChatStaticContext_1.default);
    const content = t('room_message', { name });
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex gap-[6px] items-start", children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { src: logoUrl, size: "md" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3 max-w-full min-[492px]:max-w-[460px] md:max-w-[261px] lg:max-w-[476px] large:max-w-[560px]", children: [(0, jsx_runtime_1.jsx)("div", { className: "min-h-11 p-3 bg-surface-special rounded-2xl rounded-tl-sm w-fit ", children: (0, jsx_runtime_1.jsx)(display_provider_1.DisplayProvider, { children: (0, jsx_runtime_1.jsxs)(context_menu_1.ContextMenuProvider, { children: [(0, jsx_runtime_1.jsx)(MdViewer, { content: content }), (0, jsx_runtime_1.jsx)("img", { className: "default-image w-full min-w-[30px] aspect-square rounded-xl", src: invitationImgUrl, alt: "room invitation qrcode", "x-intercept-click": "1" })] }) }) }), (0, jsx_runtime_1.jsx)(CopyInvitationLink, { invitationUrl: invitationUrl }), (0, jsx_runtime_1.jsx)(GoToRoom, { id: id })] })] }));
}
function RoomItem(props) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-5 md:gap-6", children: [(0, jsx_runtime_1.jsx)(CreateSlashMessage_1.default, {}), (0, jsx_runtime_1.jsx)(RoomMessage, { ...props })] }));
}
