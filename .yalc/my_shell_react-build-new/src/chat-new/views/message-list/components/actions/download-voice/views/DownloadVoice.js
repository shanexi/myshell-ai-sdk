import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ArrowDownTrayIcon from '@heroicons/react/24/outline/ArrowDownTrayIcon';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';
import { StaticContext } from '../../../../../../../chat-new/context/StaticContext.js';
import { useDisplayContext } from '../../../../../../../chat-new/views/message-list/components/display-provider/index.js';
import { ContextMenuItem } from '../../../../../../../common/components/ui/context-menu.js';
import { IconButton } from '../../../../../../../common/components/ui/icon-button.js';
import Spinner from '../../../../../../../common/components/ui/spinner.js';
import { Text } from '../../../../../../../common/components/ui/typography.js';
import useDownload from '../../../../../../../common/hooks/useDownload.js';
export default function DownloadVoice(props) {
    const { source } = props;
    const commonT = useTranslations('common');
    const { entityInfo } = useContext(StaticContext);
    const { name } = entityInfo;
    const { message } = useDisplayContext();
    const { downloading, onDownload } = useDownload();
    const onDownloadVoice = async () => {
        try {
            await onDownload(message?.audioUrl, `MyShell_chat_${dayjs().format('YY-MM-DD_HH:mm:ss')}_${name}.mp3`);
        }
        catch (e) {
            console.error(e);
        }
    };
    if (source === 'menubar') {
        return (_jsx(IconButton, { variant: "outline", size: "sm", color: "default", className: "rounded-lg", onClick: onDownloadVoice, loading: downloading, children: _jsx(ArrowDownTrayIcon, { className: "size-[18px]" }) }));
    }
    return (_jsxs(ContextMenuItem, { onClick: onDownloadVoice, disabled: downloading, children: [downloading ? _jsx(Spinner, {}) : _jsx(ArrowDownTrayIcon, { className: "size-5" }), _jsx(Text, { className: "ml-2", children: commonT('download_voice') })] }));
}
