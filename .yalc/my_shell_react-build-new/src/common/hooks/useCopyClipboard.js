import { useTranslations } from 'next-intl';
import { useCopyToClipboard } from 'usehooks-ts';
import { useNotification } from './useNotification.js';
const useCopyClipboard = (text, successText, onSuccess, notice = true) => {
    const [value, copy] = useCopyToClipboard();
    const { success, error } = useNotification();
    const commonT = useTranslations('common');
    const onCopyImage = (url) => {
        let _text = text;
        if (url) {
            _text = url;
        }
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = _text;
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0);
                canvas.toBlob(blob => {
                    if (blob) {
                        const item = new ClipboardItem({ 'image/png': blob });
                        navigator.clipboard.write([item]);
                        success({ content: commonT('copied') });
                    }
                });
            }
            catch (e) {
                error({ content: `${commonT('copy_failed')} ${e?.message}` });
            }
        };
    };
    const onCopy = (value) => {
        let _text = text;
        if (value) {
            _text = value;
        }
        copy(_text);
        if (notice) {
            success({ content: successText || commonT('copied'), id: 'text-copied' });
        }
        if (typeof onSuccess === 'function') {
            onSuccess();
        }
    };
    return {
        onCopy,
        onCopyImage,
        value
    };
};
export default useCopyClipboard;
