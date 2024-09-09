"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const useNotification_1 = require("./useNotification");
function useDownload() {
    const [downloading, setDownloading] = (0, react_1.useState)(false);
    const { success, warning } = (0, useNotification_1.useNotification)();
    const t = (0, next_intl_1.useTranslations)('common');
    const gT = (0, next_intl_1.useTranslations)();
    const onDownload = (0, react_1.useCallback)(async (filePath, fileName, successCb) => {
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
exports.default = useDownload;
