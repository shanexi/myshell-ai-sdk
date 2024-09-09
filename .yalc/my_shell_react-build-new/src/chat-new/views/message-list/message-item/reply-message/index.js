"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReplyMessage;
const jsx_runtime_1 = require("react/jsx-runtime");
const NoSymbolIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/NoSymbolIcon"));
const clsx_1 = __importDefault(require("clsx"));
const lodash_es_1 = require("lodash-es");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const MessageContext_1 = require("../../../../../chat-new/context/MessageContext");
const StaticContext_1 = require("../../../../../chat-new/context/StaticContext");
const useNewChatStore_1 = require("../../../../../chat-new/services/useNewChatStore");
const content_1 = __importDefault(require("../../../../../chat-new/views/message-list/components/content"));
const display_provider_1 = require("../../../../../chat-new/views/message-list/components/display-provider");
const menubar_1 = __importDefault(require("../../../../../chat-new/views/message-list/components/menubar"));
const avatar_1 = require("../../../../../common/components/ui/avatar");
const typography_1 = require("../../../../../common/components/ui/typography");
const react_2 = require("@chakra-ui/react");
function ReplyMessage() {
    const { type, chatSetting, entityInfo } = (0, react_1.useContext)(StaticContext_1.StaticContext);
    const { id } = entityInfo;
    const { exceptionsForTextDisplay } = (0, react_1.useContext)(MessageContext_1.MessageContext);
    const { message } = (0, display_provider_1.useDisplayContext)();
    const t = (0, next_intl_1.useTranslations)('chat');
    const showText = (0, react_1.useMemo)(() => {
        const mapKey = `${type}-${id}`;
        const exceptions = (exceptionsForTextDisplay ?? {})[mapKey] ?? [];
        return chatSetting?.isTranscriptionOn || (!chatSetting?.isTranscriptionOn && exceptions.includes(message?.id));
    }, [chatSetting?.isTranscriptionOn, exceptionsForTextDisplay, id, message?.id, type]);
    const showAudio = (0, react_1.useMemo)(() => {
        return chatSetting?.isAudioOn;
    }, [chatSetting?.isAudioOn]);
    const msgCancelled = message?.status === 'CANCELING' || message?.status === 'CANCELED';
    const inputType = (0, useNewChatStore_1.useNewChatStore)(state => state.inputType);
    const addChatID = (0, useNewChatStore_1.useNewChatStore)(state => state.addChatID);
    const removeChatID = (0, useNewChatStore_1.useNewChatStore)(state => state.removeChatID);
    const isShareOrDelete = inputType === 'share' || inputType === 'delete';
    const handleChatUIDChecked = (e) => {
        if (e.target.checked) {
            addChatID(`${type}-${id}`);
        }
        else {
            removeChatID(`${type}-${id}`);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('w-full self-start flex items-start gap-x-1.5', isShareOrDelete && 'pr-10'), children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { size: "md", variant: message?.source === 'USER' ? 'user' : 'bot', src: message?.avatar ||
                    'https://image.myshell.ai/cdn-cgi/image/quality=40,format=webp/image/bot/logo/20240106/default.png' }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[2px]", children: [showText && message?.name && ((0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtler", children: message?.name })), (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('flex gap-1.5', !msgCancelled && 'group/menu'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-12 max-w-[305px] md:max-w-[460px] lg:max-w-[476px] large:max-w-[560px] flex flex-col", children: [(0, jsx_runtime_1.jsx)("div", { className: "min-h-11 p-3 bg-surface-special rounded-2xl rounded-tl-sm space-y-3", children: msgCancelled && message.type === 'PENDING_FOR_RESPONSE' ? ((0, jsx_runtime_1.jsx)(NoSymbolIcon_1.default, { className: "w-6 h-6 text-icon" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [showText && message?.replyTo && ((0, jsx_runtime_1.jsx)(typography_1.Text, { size: "xs", color: "subtler", children: t('reply_to', {
                                                        name: message?.replyTo?.isVisitor
                                                            ? `${t('visitor')}${message?.replyTo?.nameTag}`
                                                            : message?.replyTo?.name
                                                    }) })), (0, jsx_runtime_1.jsx)(content_1.default, { message: message, showText: showText, showAudio: showAudio })] })) }), !(0, lodash_es_1.isEmpty)(message?.buttons) ? (0, jsx_runtime_1.jsx)("div", { className: "mt-3", children: message?.buttons }) : null] }), (0, jsx_runtime_1.jsx)(menubar_1.default, { className: "hidden md:group-hover/menu:flex" })] })] }), isShareOrDelete && ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('w-8 h-8 ml-0 flex justify-center items-center absolute right-0'), children: (0, jsx_runtime_1.jsx)(react_2.Checkbox, { className: "chat-checkbox", size: "lg", variant: "circular", value: "1", defaultChecked: false, onChange: handleChatUIDChecked }) }))] }));
}
