import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useTranslations } from 'next-intl';
import { ContextMenuItem } from '../../../../../common/components/ui/context-menu.js';
import useDownload from '../../../../../common/hooks/useDownload.js';
import useCopyClipboard from '../../../../../common/hooks/useCopyClipboard.js';
import Spinner from '../../../../../common/components/ui/spinner.js';
import { Text } from '../../../../../common/components/ui/typography.js';
import LinkIcon from '../../../../../common/components/icons/LinkIcon.js';
import SaveIcon from '../../../../../common/components/icons/SaveIcon.js';
import CopyImageIcon from '../../../../../common/components/icons/chat/CopyImageIcon.js';
import { generateUUID } from '../../../../../common/utils/common-helper.js';
import { MenuActionType } from '../../../../../chat-new/model/definitions.js';
export default function ImageMenuItem({ url, imageModel }) {
    const t = useTranslations('chat');
    const { onCopy, onCopyImage } = useCopyClipboard(url);
    const { downloading, onDownload } = useDownload();
    const onSendSensors = (action_type) => {
    };
    const onDownloadWithSensors = () => {
        onDownload(url, generateUUID());
        onSendSensors(MenuActionType.Save_Image);
    };
    const onCopyImageWithSensors = () => {
        onCopyImage();
        onSendSensors(MenuActionType.Copy_Image);
    };
    const onCopyLinkWithSensors = () => {
        onCopy();
        onSendSensors(MenuActionType.Copy_Image_Link);
    };
    return (_jsxs(_Fragment, { children: [_jsxs(ContextMenuItem, { onClick: onDownloadWithSensors, children: [downloading ? _jsx(Spinner, {}) : _jsx(SaveIcon, { className: "w-6 h-6 text-on-surface flex items-center" }), _jsx(Text, { className: "text-on-surface", children: t('save_image') })] }), _jsxs(ContextMenuItem, { onClick: onCopyImageWithSensors, children: [_jsx(CopyImageIcon, { size: "2xl", className: "flex items-center text-on-surface" }), _jsx(Text, { className: "text-on-surface", children: t('copy_image') })] }), _jsxs(ContextMenuItem, { onClick: onCopyLinkWithSensors, children: [_jsx(LinkIcon, { className: "w-6 h-6 text-on-surface flex items-center" }), _jsx(Text, { className: "text-on-surface", children: t('copy_image_link') })] })] }));
}
