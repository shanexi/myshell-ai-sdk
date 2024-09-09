'use client';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { useNotification } from './useNotification.js';
function useDownload() {
    const [downloading, setDownloading] = useState(false);
    const { success, warning } = useNotification();
    const t = useTranslations('common');
    const gT = useTranslations();
    const onDownload = useCallback(async (filePath, fileName, successCb) => {
        setDownloading(true);
        fetch(filePath)
            .then(response => response.blob())
            .then(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, 1000);
            success({
                content: `${gT('chat.Download')}${gT('web3.notification.success')}`
            });
            successCb?.();
        })
            .catch(e => {
            console.error(e);
            warning({
                content: t('download_failed')
            });
        })
            .finally(() => {
            setDownloading(false);
        });
    }, [warning]);
    return {
        downloading,
        onDownload
    };
}
export default useDownload;
