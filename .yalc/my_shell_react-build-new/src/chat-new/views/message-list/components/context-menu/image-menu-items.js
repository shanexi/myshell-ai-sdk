"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImageMenuItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const context_menu_1 = require("../../../../../common/components/ui/context-menu");
const useDownload_1 = __importDefault(require("../../../../../common/hooks/useDownload"));
const useCopyClipboard_1 = __importDefault(require("../../../../../common/hooks/useCopyClipboard"));
const spinner_1 = __importDefault(require("../../../../../common/components/ui/spinner"));
const typography_1 = require("../../../../../common/components/ui/typography");
const LinkIcon_1 = __importDefault(require("../../../../../common/components/icons/LinkIcon"));
const SaveIcon_1 = __importDefault(require("../../../../../common/components/icons/SaveIcon"));
const CopyImageIcon_1 = __importDefault(require("../../../../../common/components/icons/chat/CopyImageIcon"));
const common_helper_1 = require("../../../../../common/utils/common-helper");
const definitions_1 = require("../../../../../chat-new/model/definitions");
function ImageMenuItem({ url, imageModel }) {
    const t = (0, next_intl_1.useTranslations)('chat');
    const { onCopy, onCopyImage } = (0, useCopyClipboard_1.default)(url);
    const { downloading, onDownload } = (0, useDownload_1.default)();
    const onSendSensors = (action_type) => {
    };
    const onDownloadWithSensors = () => {
        onDownload(url, (0, common_helper_1.generateUUID)());
        onSendSensors(definitions_1.MenuActionType.Save_Image);
    };
    const onCopyImageWithSensors = () => {
        onCopyImage();
        onSendSensors(definitions_1.MenuActionType.Copy_Image);
    };
    const onCopyLinkWithSensors = () => {
        onCopy();
        onSendSensors(definitions_1.MenuActionType.Copy_Image_Link);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(context_menu_1.ContextMenuItem, { onClick: onDownloadWithSensors, children: [downloading ? (0, jsx_runtime_1.jsx)(spinner_1.default, {}) : (0, jsx_runtime_1.jsx)(SaveIcon_1.default, { className: "w-6 h-6 text-on-surface flex items-center" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-on-surface", children: t('save_image') })] }), (0, jsx_runtime_1.jsxs)(context_menu_1.ContextMenuItem, { onClick: onCopyImageWithSensors, children: [(0, jsx_runtime_1.jsx)(CopyImageIcon_1.default, { size: "2xl", className: "flex items-center text-on-surface" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-on-surface", children: t('copy_image') })] }), (0, jsx_runtime_1.jsxs)(context_menu_1.ContextMenuItem, { onClick: onCopyLinkWithSensors, children: [(0, jsx_runtime_1.jsx)(LinkIcon_1.default, { className: "w-6 h-6 text-on-surface flex items-center" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-on-surface", children: t('copy_image_link') })] })] }));
}
