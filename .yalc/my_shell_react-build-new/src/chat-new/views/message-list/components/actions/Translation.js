"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Translation;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const display_provider_1 = require("../../../../../chat-new/views/message-list/components/display-provider");
const Trans_1 = __importDefault(require("../../../../../common/components/icons/Trans"));
const context_menu_1 = require("../../../../../common/components/ui/context-menu");
const icon_button_1 = require("../../../../../common/components/ui/icon-button");
const typography_1 = require("../../../../../common/components/ui/typography");
function Translation(props) {
    const { source } = props;
    const chatLocale = (0, next_intl_1.useTranslations)('chat');
    const { displayMode, setDisplayMode } = (0, display_provider_1.useDisplayContext)();
    const handleClick = () => {
        if (displayMode === 'TRANSLATION') {
            setDisplayMode('NORMAL');
        }
        else {
            setDisplayMode('TRANSLATION');
        }
    };
    if (source === 'menubar') {
        return ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "outline", size: "sm", color: "default", className: "rounded-lg", onClick: handleClick, children: (0, jsx_runtime_1.jsx)(Trans_1.default, { className: (0, clsx_1.default)('size-[18px]', displayMode === 'TRANSLATION' && 'text-brand') }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(context_menu_1.ContextMenuItem, { onClick: handleClick, className: (0, clsx_1.default)(displayMode === 'TRANSLATION' && 'text-brand'), children: [(0, jsx_runtime_1.jsx)(Trans_1.default, { className: "size-5" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "ml-2", children: chatLocale('translate') })] }));
}
