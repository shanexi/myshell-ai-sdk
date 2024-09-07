"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DownloadVoice;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowDownTrayIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowDownTrayIcon"));
const dayjs_1 = __importDefault(require("dayjs"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const StaticContext_1 = require("../../../../../../../chat-new/context/StaticContext.js");
const display_provider_1 = require("../../../../../../../chat-new/views/message-list/components/display-provider/index.js");
const context_menu_1 = require("../../../../../../../common/components/ui/context-menu.js");
const icon_button_1 = require("../../../../../../../common/components/ui/icon-button.js");
const spinner_1 = __importDefault(require("../../../../../../../common/components/ui/spinner.js"));
const typography_1 = require("../../../../../../../common/components/ui/typography.js");
const useDownload_1 = __importDefault(require("../../../../../../../common/hooks/useDownload.js"));
function DownloadVoice(props) {
    const { source } = props;
    const commonT = (0, next_intl_1.useTranslations)('common');
    const { entityInfo } = (0, react_1.useContext)(StaticContext_1.StaticContext);
    const { name } = entityInfo;
    const { message } = (0, display_provider_1.useDisplayContext)();
    const { downloading, onDownload } = (0, useDownload_1.default)();
    const onDownloadVoice = async () => {
        try {
            await onDownload(message?.audioUrl, `MyShell_chat_${(0, dayjs_1.default)().format('YY-MM-DD_HH:mm:ss')}_${name}.mp3`);
        }
        catch (e) {
            console.error(e);
        }
    };
    if (source === 'menubar') {
        return ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "outline", size: "sm", color: "default", className: "rounded-lg", onClick: onDownloadVoice, loading: downloading, children: (0, jsx_runtime_1.jsx)(ArrowDownTrayIcon_1.default, { className: "size-[18px] text-on-surface" }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(context_menu_1.ContextMenuItem, { onClick: onDownloadVoice, disabled: downloading, children: [downloading ? (0, jsx_runtime_1.jsx)(spinner_1.default, {}) : (0, jsx_runtime_1.jsx)(ArrowDownTrayIcon_1.default, { className: "size-5 text-on-surface" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "ml-2 text-on-surface", children: commonT('download_voice') })] }));
}
