import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon';
import { useTranslations } from 'next-intl';
import { useDisplayContext } from '../../../../../chat-new/views/message-list/components/display-provider/index.js';
import { ContextMenuItem } from '../../../../../common/components/ui/context-menu.js';
import { IconButton } from '../../../../../common/components/ui/icon-button.js';
import { Text } from '../../../../../common/components/ui/typography.js';
import useCopyClipboard from '../../../../../common/hooks/useCopyClipboard.js';
export default function CopyMessage(props) {
    const { source } = props;
    const commonT = useTranslations('common');
    const { message } = useDisplayContext();
    const { onCopy } = useCopyClipboard('');
    const onCopyMessageWithSensors = () => {
        onCopy(message?.text);
    };
    if (source === 'menubar') {
        return (_jsx(IconButton, { variant: "outline", size: "sm", color: "default", className: "rounded-lg", onClick: onCopyMessageWithSensors, children: _jsx(DocumentDuplicateIcon, { className: "size-[18px]" }) }));
    }
    return (_jsxs(ContextMenuItem, { onClick: onCopyMessageWithSensors, children: [_jsx(DocumentDuplicateIcon, { className: "w-5 h-5" }), _jsx(Text, { className: "ml-2", children: commonT('copy_message') })] }));
}
