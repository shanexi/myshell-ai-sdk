"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CopyMessage;
const jsx_runtime_1 = require("react/jsx-runtime");
const DocumentDuplicateIcon_1 = __importDefault(require("@heroicons/react/24/outline/DocumentDuplicateIcon"));
const next_intl_1 = require("next-intl");
const display_provider_1 = require("../../../../../chat-new/views/message-list/components/display-provider/index.js");
const context_menu_1 = require("../../../../../common/components/ui/context-menu.js");
const icon_button_1 = require("../../../../../common/components/ui/icon-button.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const useCopyClipboard_1 = __importDefault(require("../../../../../common/hooks/useCopyClipboard.js"));
function CopyMessage(props) {
    const { source } = props;
    const commonT = (0, next_intl_1.useTranslations)('common');
    const { message } = (0, display_provider_1.useDisplayContext)();
    const { onCopy } = (0, useCopyClipboard_1.default)('');
    const onCopyMessageWithSensors = () => {
        onCopy(message?.text);
    };
    if (source === 'menubar') {
        return ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "outline", size: "sm", color: "default", className: "rounded-lg", onClick: onCopyMessageWithSensors, children: (0, jsx_runtime_1.jsx)(DocumentDuplicateIcon_1.default, { className: "size-[18px]" }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(context_menu_1.ContextMenuItem, { onClick: onCopyMessageWithSensors, children: [(0, jsx_runtime_1.jsx)(DocumentDuplicateIcon_1.default, { className: "w-5 h-5" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "ml-2", children: commonT('copy_message') })] }));
}
