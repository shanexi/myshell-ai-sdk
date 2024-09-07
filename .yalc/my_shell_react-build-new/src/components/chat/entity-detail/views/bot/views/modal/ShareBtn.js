"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowUpOnSquareIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowUpOnSquareIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const icon_button_1 = require("../../../../../../../common/components/ui/icon-button.js");
const tooltip_1 = require("../../../../../../../common/components/ui/tooltip.js");
const useCopyClipboard_1 = __importDefault(require("../../../../../../../common/hooks/useCopyClipboard.js"));
const usePathLocale_1 = require("../../../../../../../common/hooks/usePathLocale.js");
const useGenerateShareLink_1 = __importDefault(require("../../../common/share/hooks/useGenerateShareLink.js"));
function ShareBtn({ type, id, trackerFn }) {
    const t = (0, next_intl_1.useTranslations)('bot');
    const [shareLink, setShareLink] = (0, react_1.useState)('');
    const { generating, generateShareLink } = (0, useGenerateShareLink_1.default)(type, id);
    const { onCopy } = (0, useCopyClipboard_1.default)(shareLink);
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const copyShareLinkHandle = (0, react_1.useCallback)(async () => {
        let link = shareLink;
        if (!link) {
            const data = await generateShareLink();
            link = data ?? '';
            setShareLink(link);
        }
        onCopy(link);
        trackerFn();
    }, [generateShareLink, onCopy, shareLink, trackerFn]);
    return ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { showArrow: false, disabled: isMobile, description: t('share'), children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { loading: generating, variant: "ghost", color: "brand", size: "md", onClick: copyShareLinkHandle, icon: ArrowUpOnSquareIcon_1.default }) }));
}
exports.default = (0, react_1.memo)(ShareBtn);
