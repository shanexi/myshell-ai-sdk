"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkError = exports.RunningError = exports.getErrorMsgByType = void 0;
exports.default = RunningWidgetInfo;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const spinner_1 = __importDefault(require("../../../../../../common/components/ui/spinner"));
const XCircleIcon_1 = __importDefault(require("@heroicons/react/24/solid/esm/XCircleIcon"));
const CheckCircleIcon_1 = __importDefault(require("@heroicons/react/24/solid/esm/CheckCircleIcon"));
const chat_1 = require("../../../../../../common/utils/chat");
const alert_1 = require("../../../../../../common/components/ui/alert");
const button_1 = require("../../../../../../common/components/ui/button");
const dialog_1 = require("../../../../../../common/components/ui/dialog");
const useCopyClipboard_1 = __importDefault(require("../../../../../../common/hooks/useCopyClipboard"));
const typography_1 = require("../../../../../../common/components/ui/typography");
const store_1 = require("../../../../../../services/store");
const energy_pack_1 = __importDefault(require("../../../../../../chat-new/views/message-list/components/energy-pack"));
const passcard_1 = __importDefault(require("../../../../../../chat-new/views/message-list/components/passcard"));
const definitions_1 = require("../../../../../../chat-new/model/definitions");
const useNewChatStore_1 = require("../../../../../../chat-new/services/useNewChatStore");
const getErrorMsgByType = (requestErrorTranslations, type) => {
    switch (type) {
        case definitions_1.RunningErrorEnum.ENGINE_ERROR:
            return requestErrorTranslations('chat_error_tip');
        case definitions_1.RunningErrorEnum.INNER_COMPONENT_ERROR:
            return requestErrorTranslations('inner_component_error_tip');
        case definitions_1.RunningErrorEnum.LLM_TOKEN_TOO_LONG:
            return requestErrorTranslations('exceeded_token_error_tip');
        default:
            return '';
    }
};
exports.getErrorMsgByType = getErrorMsgByType;
const RunningError = ({ message }) => {
    const t = (0, next_intl_1.useTranslations)('chat');
    const errorT = (0, next_intl_1.useTranslations)('request.error');
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const setMessageHandled = (0, useNewChatStore_1.useNewChatStore)(state => state.setMessageHandled);
    const { onCopy } = (0, useCopyClipboard_1.default)(message?.runningError?.errorDetail || '');
    const isVisitor = (0, store_1.useUserStore)(user => user.isVisitor);
    const level = (0, store_1.useUserStore)(state => state.user?.level);
    const energy = (0, store_1.useUserStore)(state => state.energy);
    const onConfirm = () => {
        onCopy();
        setIsOpen(false);
    };
    const onShowDetail = () => {
        setIsOpen(true);
    };
    const onClose = () => {
        setIsOpen(false);
    };
    const onIgnore = () => {
        setMessageHandled({ botId: message.entityId, msgId: message.id });
    };
    const errorMessage = (0, react_1.useMemo)(() => (0, exports.getErrorMsgByType)(errorT, message?.runningError?.errorType), [message?.runningError?.errorType]);
    if (message?.runningError?.errorType === definitions_1.RunningErrorEnum.ENERGY_INSUFFICIANT) {
        if (energy > (message?.runningError?.requireEnergyToUse || 0)) {
            return null;
        }
        if (isVisitor === 2 && level === 1) {
            return ((0, jsx_runtime_1.jsx)("li", { className: "last:animate-slideIn", children: (0, jsx_runtime_1.jsx)(passcard_1.default, { type: "action", onClose: onIgnore }) }));
        }
        else {
            return ((0, jsx_runtime_1.jsx)("li", { className: "last:animate-slideIn", children: (0, jsx_runtime_1.jsx)(energy_pack_1.default, { type: "action", onClose: onIgnore }) }));
        }
    }
    const hiddenDetail = message.runningError?.errorType === definitions_1.RunningErrorEnum.LLM_TOKEN_TOO_LONG;
    if (message.handled) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "mt-4 md:mt-6 md:mx-10", children: [(0, jsx_runtime_1.jsxs)(alert_1.Alert, { variant: "error", children: [(0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: errorMessage }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full gap-x-2 md:w-auto flex justify-center", children: [hiddenDetail ? null : ((0, jsx_runtime_1.jsx)(button_1.Button, { className: "flex-1 md:flex-none", color: "error", size: "md", onClick: onShowDetail, children: t('view_details') })), (0, jsx_runtime_1.jsx)(button_1.Button, { className: "flex-1 md:flex-none", color: "error", size: "md", variant: hiddenDetail ? undefined : 'outline', onClick: onIgnore, children: t('ignore') })] })] }), (0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: isOpen, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "w-310px md:w-[380px]", onClose: onClose, maskClosable: false, children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { className: "px-5 h-[68px] flex justify-center", children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: (0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h2", children: t('error_detail') }) }) }), (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, { className: "px-5 pt-1 pb-3 grid gap-y-1.5 overflow-y-auto", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "break-all", children: (0, jsx_runtime_1.jsx)("div", { dangerouslySetInnerHTML: {
                                        __html: message.runningError?.errorDetail?.replaceAll('\n', '<br />') || ''
                                    } }) }) }), (0, jsx_runtime_1.jsx)(dialog_1.DialogFooter, { className: "gap-x-5 min-h-[76px]", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "w-full", onClick: onConfirm, color: "error", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Copy, { className: "w-[20px] h-[20px] mr-1.5 mt-0.5" }), t('copy_error_message')] }) })] }) })] }));
};
exports.RunningError = RunningError;
const NetworkError = () => {
    const ref = (0, react_1.useRef)(null);
    const t = (0, next_intl_1.useTranslations)('chat');
    const errorT = (0, next_intl_1.useTranslations)('request.error');
    const [hidden, setHidden] = (0, react_1.useState)(false);
    const onIgnore = () => {
        setHidden(true);
    };
    if (hidden) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "mt-4 md:mt-6 md:mx-10", ref: ref, children: (0, jsx_runtime_1.jsxs)(alert_1.Alert, { variant: "error", children: [(0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: errorT('network_error_in_process') }), (0, jsx_runtime_1.jsx)("div", { className: "w-full gap-x-2 md:w-auto flex justify-center", children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "w-full px-4 flex-1 md:w-full", color: "error", size: "md", onClick: onIgnore, children: t('ignore') }) })] }) }));
};
exports.NetworkError = NetworkError;
function RunningWidgetInfo({ list }) {
    const widgetInfoStatusIcon = {
        PROCESSING: (0, jsx_runtime_1.jsx)(spinner_1.default, { size: "xs", className: "text-primary" }),
        ERROR: (0, jsx_runtime_1.jsx)(XCircleIcon_1.default, { width: "16px", color: "var(--red-40)" }),
        DONE: (0, jsx_runtime_1.jsx)(CheckCircleIcon_1.default, { width: "16px", color: "var(--green-30)" })
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-auto p-4 rounded-xl bg-on-primary flex flex-col gap-y-2", children: list.map(info => {
            return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [widgetInfoStatusIcon[info.status], (0, jsx_runtime_1.jsx)("p", { className: "text-subtle text-sm ml-2", children: (0, chat_1.generateWidgetRunningText)(info) })] }, info.widgetName));
        }) }));
}
