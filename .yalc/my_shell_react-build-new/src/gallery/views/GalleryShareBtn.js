import { jsx as _jsx } from "react/jsx-runtime";
import ArrowUpOnSquareIcon from '@heroicons/react/24/outline/ArrowUpOnSquareIcon';
import { useTranslations } from 'next-intl';
import { memo, useCallback, useState } from 'react';
import { Button } from '../../common/components/ui/button.js';
import useCopyClipboard from '../../common/hooks/useCopyClipboard.js';
import useGenerateShareLink from '../../components/chat/entity-detail/views/common/share/hooks/useGenerateShareLink.js';
function GalleryShareBtn({ id, botId, successCb }) {
    const [shareLink, setShareLink] = useState('');
    const { generating, generateShareLink } = useGenerateShareLink('gallery', id, botId);
    const { onCopy } = useCopyClipboard(shareLink);
    const t = useTranslations();
    const copyShareLinkHandle = useCallback(async () => {
        let link = shareLink;
        if (!link) {
            const data = await generateShareLink();
            link = data ?? '';
            setShareLink(link);
        }
        onCopy(link);
        successCb?.();
    }, [generateShareLink, onCopy, shareLink, successCb]);
    return (_jsx(Button, { icon: ArrowUpOnSquareIcon, variant: "outline", color: "default", "aria-label": "share gallery", loading: generating, onClick: copyShareLinkHandle, className: "flex-1 min-w-none", children: t('bot.share') }));
}
export default memo(GalleryShareBtn);
