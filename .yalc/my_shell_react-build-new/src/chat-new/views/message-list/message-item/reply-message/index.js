import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import NoSymbolIcon from '@heroicons/react/24/outline/NoSymbolIcon';
import clsx from 'clsx';
import { isEmpty } from 'lodash-es';
import { useTranslations } from 'next-intl';
import { useContext, useMemo } from 'react';
import { MessageContext } from '../../../../../chat-new/context/MessageContext.js';
import { StaticContext } from '../../../../../chat-new/context/StaticContext.js';
import { useNewChatStore } from '../../../../../chat-new/services/useNewChatStore.js';
import Content from '../../../../../chat-new/views/message-list/components/content/index.js';
import { useDisplayContext } from '../../../../../chat-new/views/message-list/components/display-provider/index.js';
import Menubar from '../../../../../chat-new/views/message-list/components/menubar/index.js';
import { Avatar } from '../../../../../common/components/ui/avatar.js';
import { Text } from '../../../../../common/components/ui/typography.js';
import { Checkbox } from '@chakra-ui/react';
export default function ReplyMessage() {
    const { type, chatSetting, entityInfo } = useContext(StaticContext);
    const { id } = entityInfo;
    const { exceptionsForTextDisplay } = useContext(MessageContext);
    const { message } = useDisplayContext();
    const t = useTranslations('chat');
    const showText = useMemo(() => {
        const mapKey = `${type}-${id}`;
        const exceptions = (exceptionsForTextDisplay ?? {})[mapKey] ?? [];
        return chatSetting?.isTranscriptionOn || (!chatSetting?.isTranscriptionOn && exceptions.includes(message?.id));
    }, [chatSetting?.isTranscriptionOn, exceptionsForTextDisplay, id, message?.id, type]);
    const showAudio = useMemo(() => {
        return chatSetting?.isAudioOn;
    }, [chatSetting?.isAudioOn]);
    const msgCancelled = message?.status === 'CANCELING' || message?.status === 'CANCELED';
    const inputType = useNewChatStore(state => state.inputType);
    const addChatID = useNewChatStore(state => state.addChatID);
    const removeChatID = useNewChatStore(state => state.removeChatID);
    const isShareOrDelete = inputType === 'share' || inputType === 'delete';
    const handleChatUIDChecked = (e) => {
        if (e.target.checked) {
            addChatID(`${type}-${id}`);
        }
        else {
            removeChatID(`${type}-${id}`);
        }
    };
    return (_jsxs("div", { className: clsx('w-full self-start flex items-start gap-x-1.5', isShareOrDelete && 'pr-10'), children: [_jsx(Avatar, { size: "md", variant: message?.source === 'USER' ? 'user' : 'bot', src: message?.avatar ||
                    'https://image.myshell.ai/cdn-cgi/image/quality=40,format=webp/image/bot/logo/20240106/default.png' }), _jsxs("div", { className: "flex flex-col gap-[2px]", children: [showText && message?.name && (_jsx(Text, { size: "sm", color: "subtler", children: message?.name })), _jsxs("div", { className: clsx('flex gap-1.5', !msgCancelled && 'group/menu'), children: [_jsxs("div", { className: "min-w-12 max-w-[305px] md:max-w-[460px] lg:max-w-[476px] large:max-w-[560px] flex flex-col", children: [_jsx("div", { className: "min-h-11 p-3 bg-surface-special rounded-2xl rounded-tl-sm space-y-3", children: msgCancelled && message.type === 'PENDING_FOR_RESPONSE' ? (_jsx(NoSymbolIcon, { className: "w-6 h-6 text-icon" })) : (_jsxs(_Fragment, { children: [showText && message?.replyTo && (_jsx(Text, { size: "xs", color: "subtler", children: t('reply_to', {
                                                        name: message?.replyTo?.isVisitor
                                                            ? `${t('visitor')}${message?.replyTo?.nameTag}`
                                                            : message?.replyTo?.name
                                                    }) })), _jsx(Content, { message: message, showText: showText, showAudio: showAudio })] })) }), !isEmpty(message?.buttons) ? _jsx("div", { className: "mt-3", children: message?.buttons }) : null] }), _jsx(Menubar, { className: "hidden md:group-hover/menu:flex" })] })] }), isShareOrDelete && (_jsx("div", { className: clsx('w-8 h-8 ml-0 flex justify-center items-center absolute right-0'), children: _jsx(Checkbox, { className: "chat-checkbox", size: "lg", variant: "circular", value: "1", defaultChecked: false, onChange: handleChatUIDChecked }) }))] }));
}
