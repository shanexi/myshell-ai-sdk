import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useDisplayContext } from '../../../../../chat-new/views/message-list/components/display-provider/index.js';
import TransIcon from '../../../../../common/components/icons/Trans.js';
import { ContextMenuItem } from '../../../../../common/components/ui/context-menu.js';
import { IconButton } from '../../../../../common/components/ui/icon-button.js';
import { Text } from '../../../../../common/components/ui/typography.js';
export default function Translation(props) {
    const { source } = props;
    const chatLocale = useTranslations('chat');
    const { displayMode, setDisplayMode } = useDisplayContext();
    const handleClick = () => {
        if (displayMode === 'TRANSLATION') {
            setDisplayMode('NORMAL');
        }
        else {
            setDisplayMode('TRANSLATION');
        }
    };
    if (source === 'menubar') {
        return (_jsx(IconButton, { variant: "outline", size: "sm", color: "default", className: "rounded-lg", onClick: handleClick, children: _jsx(TransIcon, { className: clsx('size-[18px]', displayMode === 'TRANSLATION' && 'text-brand') }) }));
    }
    return (_jsxs(ContextMenuItem, { onClick: handleClick, className: clsx(displayMode === 'TRANSLATION' && 'text-brand'), children: [_jsx(TransIcon, { className: "size-5" }), _jsx(Text, { className: "ml-2", children: chatLocale('translate') })] }));
}
