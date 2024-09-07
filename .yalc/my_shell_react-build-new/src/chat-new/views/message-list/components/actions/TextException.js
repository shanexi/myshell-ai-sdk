"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TextException;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const MessageContext_1 = require("../../../../../chat-new/context/MessageContext.js");
const display_provider_1 = require("../../../../../chat-new/views/message-list/components/display-provider/index.js");
const TranscriptionIcon_1 = __importDefault(require("../../../../../common/components/icons/chat/TranscriptionIcon.js"));
const context_menu_1 = require("../../../../../common/components/ui/context-menu.js");
const icon_button_1 = require("../../../../../common/components/ui/icon-button.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
function TextException(props) {
    const { addTextDisplayException } = (0, react_1.useContext)(MessageContext_1.MessageContext);
    const { source } = props;
    const chatLocale = (0, next_intl_1.useTranslations)('chat');
    const { message } = (0, display_provider_1.useDisplayContext)();
    const handleClick = () => {
        addTextDisplayException?.(message?.id);
    };
    if (source === 'menubar') {
        return ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "outline", size: "sm", color: "default", className: "rounded-lg", onClick: handleClick, children: (0, jsx_runtime_1.jsx)(TranscriptionIcon_1.default, { className: "size-[18px]" }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(context_menu_1.ContextMenuItem, { onClick: handleClick, children: [(0, jsx_runtime_1.jsx)(TranscriptionIcon_1.default, { className: "size-5" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "ml-2", children: chatLocale('chat_setting.transcription') })] }));
}
