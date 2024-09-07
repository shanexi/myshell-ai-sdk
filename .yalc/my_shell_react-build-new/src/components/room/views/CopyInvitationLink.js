"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CopyInvitationLink;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const button_1 = require("../../../common/components/ui/button.js");
const useCopyClipboard_1 = __importDefault(require("../../../common/hooks/useCopyClipboard.js"));
function CopyInvitationLink({ invitationUrl, disabled = false }) {
    const t = (0, next_intl_1.useTranslations)('chat.room');
    const { onCopy } = (0, useCopyClipboard_1.default)(invitationUrl);
    return ((0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: "chat", size: "md", className: "w-fit", disabled: disabled, onClick: () => onCopy(), children: t('copy_invitation_url') }));
}
