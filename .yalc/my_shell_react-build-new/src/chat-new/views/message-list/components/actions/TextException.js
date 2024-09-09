import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslations } from 'next-intl';
import { useContext } from 'react';
import { MessageContext } from '../../../../../chat-new/context/MessageContext.js';
import { useDisplayContext } from '../../../../../chat-new/views/message-list/components/display-provider/index.js';
import TranscriptionIcon from '../../../../../common/components/icons/chat/TranscriptionIcon.js';
import { ContextMenuItem } from '../../../../../common/components/ui/context-menu.js';
import { IconButton } from '../../../../../common/components/ui/icon-button.js';
import { Text } from '../../../../../common/components/ui/typography.js';
export default function TextException(props) {
    const { addTextDisplayException } = useContext(MessageContext);
    const { source } = props;
    const chatLocale = useTranslations('chat');
    const { message } = useDisplayContext();
    const handleClick = () => {
        addTextDisplayException?.(message?.id);
    };
    if (source === 'menubar') {
        return (_jsx(IconButton, { variant: "outline", size: "sm", color: "default", className: "rounded-lg", onClick: handleClick, children: _jsx(TranscriptionIcon, { className: "size-[18px]" }) }));
    }
    return (_jsxs(ContextMenuItem, { onClick: handleClick, children: [_jsx(TranscriptionIcon, { className: "size-5" }), _jsx(Text, { className: "ml-2", children: chatLocale('chat_setting.transcription') })] }));
}
