import { jsx as _jsx } from "react/jsx-runtime";
import ArrowUpOnSquareIcon from '@heroicons/react/24/outline/ArrowUpOnSquareIcon';
import { useTranslations } from 'next-intl';
import { memo, useCallback, useState } from 'react';
import { useMedia } from 'react-use';
import { IconButton } from '../../../../../../../common/components/ui/icon-button.js';
import { Tooltip } from '../../../../../../../common/components/ui/tooltip.js';
import useCopyClipboard from '../../../../../../../common/hooks/useCopyClipboard.js';
import useGenerateShareLink from '../hooks/useGenerateShareLink.js';
function ShareBtn({ type, id, trackerFn }) {
    const t = useTranslations('bot');
    const [shareLink, setShareLink] = useState('');
    const { generating, generateShareLink } = useGenerateShareLink(type, id);
    const { onCopy } = useCopyClipboard(shareLink);
    const isMobile = useMedia('(max-width: 768px)');
    const copyShareLinkHandle = useCallback(async () => {
        let link = shareLink;
        if (!link) {
            const data = await generateShareLink();
            link = data ?? '';
            setShareLink(link);
        }
        onCopy(link);
        trackerFn();
    }, [generateShareLink, onCopy, shareLink, trackerFn]);
    return (_jsx(Tooltip, { showArrow: false, disabled: isMobile, description: t('share'), children: _jsx(IconButton, { loading: generating, variant: "ghost", size: "md", onClick: copyShareLinkHandle, icon: ArrowUpOnSquareIcon, className: "text-brand" }) }));
}
export default memo(ShareBtn);
