"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const next_intl_1 = require("next-intl");
const usehooks_ts_1 = require("usehooks-ts");
const useNotification_1 = require("./useNotification.js");
const useCopyClipboard = (text, successText, onSuccess, notice = true) => {
    const [value, copy] = (0, usehooks_ts_1.useCopyToClipboard)();
    const { success, error } = (0, useNotification_1.useNotification)();
    const commonT = (0, next_intl_1.useTranslations)('common');
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
exports.default = useCopyClipboard;
