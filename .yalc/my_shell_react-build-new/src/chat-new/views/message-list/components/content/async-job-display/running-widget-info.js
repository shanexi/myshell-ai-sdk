import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslations } from 'next-intl';
import { useState, useMemo, useRef } from 'react';
import { Copy } from 'lucide-react';
import Spinner from '../../../../../../common/components/ui/spinner.js';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon';
import { generateWidgetRunningText } from '../../../../../../common/utils/chat.js';
import { Alert, AlertDescription } from '../../../../../../common/components/ui/alert.js';
import { Button } from '../../../../../../common/components/ui/button.js';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../../../../common/components/ui/dialog.js';
import useCopyClipboard from '../../../../../../common/hooks/useCopyClipboard.js';
import { Text, Heading } from '../../../../../../common/components/ui/typography.js';
import { useUserStore } from '../../../../../../services/store/index.js';
import EnergyPack from '../../../../../../chat-new/views/message-list/components/energy-pack/index.js';
import PassCard from '../../../../../../chat-new/views/message-list/components/passcard/index.js';
import { RunningErrorEnum } from '../../../../../../chat-new/model/definitions.js';
import { useNewChatStore } from '../../../../../../chat-new/services/useNewChatStore.js';
export const getErrorMsgByType = (requestErrorTranslations, type) => {
    switch (type) {
        case RunningErrorEnum.ENGINE_ERROR:
            return requestErrorTranslations('chat_error_tip');
        case RunningErrorEnum.INNER_COMPONENT_ERROR:
            return requestErrorTranslations('inner_component_error_tip');
        case RunningErrorEnum.LLM_TOKEN_TOO_LONG:
            return requestErrorTranslations('exceeded_token_error_tip');
        default:
            return '';
    }
};
export const RunningError = ({ message }) => {
    const t = useTranslations('chat');
    const errorT = useTranslations('request.error');
    const [isOpen, setIsOpen] = useState(false);
    const setMessageHandled = useNewChatStore(state => state.setMessageHandled);
    const { onCopy } = useCopyClipboard(message?.runningError?.errorDetail || '');
    const isVisitor = useUserStore(user => user.isVisitor);
    const level = useUserStore(state => state.user?.level);
    const energy = useUserStore(state => state.energy);
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
    const errorMessage = useMemo(() => getErrorMsgByType(errorT, message?.runningError?.errorType), [message?.runningError?.errorType]);
    if (message?.runningError?.errorType === RunningErrorEnum.ENERGY_INSUFFICIANT) {
        if (energy > (message?.runningError?.requireEnergyToUse || 0)) {
            return null;
        }
        if (isVisitor === 2 && level === 1) {
            return (_jsx("li", { className: "last:animate-slideIn", children: _jsx(PassCard, { type: "action", onClose: onIgnore }) }));
        }
        else {
            return (_jsx("li", { className: "last:animate-slideIn", children: _jsx(EnergyPack, { type: "action", onClose: onIgnore }) }));
        }
    }
    const hiddenDetail = message.runningError?.errorType === RunningErrorEnum.LLM_TOKEN_TOO_LONG;
    if (message.handled) {
        return null;
    }
    return (_jsxs("div", { className: "mt-4 md:mt-6 md:mx-10", children: [_jsxs(Alert, { variant: "error", children: [_jsx(AlertDescription, { children: errorMessage }), _jsxs("div", { className: "w-full gap-x-2 md:w-auto flex justify-center", children: [hiddenDetail ? null : (_jsx(Button, { className: "flex-1 md:flex-none", color: "error", size: "md", onClick: onShowDetail, children: t('view_details') })), _jsx(Button, { className: "flex-1 md:flex-none", color: "error", size: "md", variant: hiddenDetail ? undefined : 'outline', onClick: onIgnore, children: t('ignore') })] })] }), _jsx(Dialog, { open: isOpen, children: _jsxs(DialogContent, { className: "w-310px md:w-[380px]", onClose: onClose, maskClosable: false, children: [_jsx(DialogHeader, { className: "px-5 h-[68px] flex justify-center", children: _jsx(DialogTitle, { children: _jsx(Heading, { size: "h2", children: t('error_detail') }) }) }), _jsx(DialogDescription, { className: "px-5 pt-1 pb-3 grid gap-y-1.5 overflow-y-auto", children: _jsx(Text, { className: "break-all", children: _jsx("div", { dangerouslySetInnerHTML: {
                                        __html: message.runningError?.errorDetail?.replaceAll('\n', '<br />') || ''
                                    } }) }) }), _jsx(DialogFooter, { className: "gap-x-5 min-h-[76px]", children: _jsxs(Button, { className: "w-full", onClick: onConfirm, color: "error", children: [_jsx(Copy, { className: "w-[20px] h-[20px] mr-1.5 mt-0.5" }), t('copy_error_message')] }) })] }) })] }));
};
export const NetworkError = () => {
    const ref = useRef(null);
    const t = useTranslations('chat');
    const errorT = useTranslations('request.error');
    const [hidden, setHidden] = useState(false);
    const onIgnore = () => {
        setHidden(true);
    };
    if (hidden) {
        return null;
    }
    return (_jsx("div", { className: "mt-4 md:mt-6 md:mx-10", ref: ref, children: _jsxs(Alert, { variant: "error", children: [_jsx(AlertDescription, { children: errorT('network_error_in_process') }), _jsx("div", { className: "w-full gap-x-2 md:w-auto flex justify-center", children: _jsx(Button, { className: "w-full px-4 flex-1 md:w-full", color: "error", size: "md", onClick: onIgnore, children: t('ignore') }) })] }) }));
};
export default function RunningWidgetInfo({ list }) {
    const widgetInfoStatusIcon = {
        PROCESSING: _jsx(Spinner, { size: "xs", className: "text-primary" }),
        ERROR: _jsx(XCircleIcon, { width: "16px", color: "var(--red-40)" }),
        DONE: _jsx(CheckCircleIcon, { width: "16px", color: "var(--green-30)" })
    };
    return (_jsx("div", { className: "w-auto p-4 rounded-xl bg-on-primary flex flex-col gap-y-2", children: list.map(info => {
            return (_jsxs("div", { className: "flex items-center", children: [widgetInfoStatusIcon[info.status], _jsx("p", { className: "text-subtle text-sm ml-2", children: generateWidgetRunningText(info) })] }, info.widgetName));
        }) }));
}
