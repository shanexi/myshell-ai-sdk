"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowUpOnSquareIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/ArrowUpOnSquareIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const button_1 = require("../../common/components/ui/button");
const useCopyClipboard_1 = __importDefault(require("../../common/hooks/useCopyClipboard"));
const useGenerateShareLink_1 = __importDefault(require("../../components/chat/entity-detail/views/common/share/hooks/useGenerateShareLink"));
function GalleryShareBtn({ id, botId, successCb }) {
    const [shareLink, setShareLink] = (0, react_1.useState)('');
    const { generating, generateShareLink } = (0, useGenerateShareLink_1.default)('gallery', id, botId);
    const { onCopy } = (0, useCopyClipboard_1.default)(shareLink);
    const t = (0, next_intl_1.useTranslations)();
    const copyShareLinkHandle = (0, react_1.useCallback)(async () => {
        let link = shareLink;
        if (!link) {
            const data = await generateShareLink();
            link = data ?? '';
            setShareLink(link);
        }
        onCopy(link);
        successCb?.();
    }, [generateShareLink, onCopy, shareLink, successCb]);
    return ((0, jsx_runtime_1.jsx)(button_1.Button, { icon: ArrowUpOnSquareIcon_1.default, variant: "outline", color: "default", "aria-label": "share gallery", loading: generating, onClick: copyShareLinkHandle, className: "flex-1 min-w-none", children: t('bot.share') }));
}
exports.default = (0, react_1.memo)(GalleryShareBtn);
