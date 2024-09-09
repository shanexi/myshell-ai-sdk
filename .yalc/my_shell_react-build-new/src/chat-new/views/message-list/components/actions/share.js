import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ArrowUpOnSquareIcon from '@heroicons/react/24/outline/ArrowUpOnSquareIcon';
import { useTranslations } from 'next-intl';
import { ContextMenuItem } from '../../../../../common/components/ui/context-menu.js';
import { IconButton } from '../../../../../common/components/ui/icon-button.js';
import { Text } from '../../../../../common/components/ui/typography.js';
import { useNewChatStore } from '../../../../../chat-new/services/useNewChatStore.js';
export default function Share(props) {
    const { source } = props;
    const commonT = useTranslations('bot');
    const setInputType = useNewChatStore(state => state.setInputType);
    const onShare = () => {
        setInputType('share');
    };
    if (source === 'menubar') {
        return (_jsx(IconButton, { variant: "outline", size: "sm", color: "default", className: "rounded-lg", onClick: onShare, children: _jsx(ArrowUpOnSquareIcon, { className: "size-[18px]" }) }));
    }
    return (_jsxs(ContextMenuItem, { onClick: onShare, children: [_jsx(ArrowUpOnSquareIcon, { className: "w-5 h-5" }), _jsx(Text, { className: "ml-2", children: commonT('share') })] }));
}
