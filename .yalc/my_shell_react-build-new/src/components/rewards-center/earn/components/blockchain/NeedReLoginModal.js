"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NeedReLoginModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const next_intl_1 = require("next-intl");
const user_1 = require("../../../../../apis/user");
const dialog_1 = require("../../../../../common/components/ui/dialog");
const typography_1 = require("../../../../../common/components/ui/typography");
const identityService_1 = require("../../../../../common/services/identityService");
const usePrivyLogin_1 = __importDefault(require("../../../../../hooks/user/usePrivyLogin"));
const store_1 = require("../../../../../services/store");
function NeedReLoginModal({ isOpen, onClose }) {
    const t = (0, next_intl_1.useTranslations)('reward_center.earn_content.blockchain_interaction_guide');
    const pT = (0, next_intl_1.useTranslations)('profile');
    const { logout: privyLogout } = (0, usePrivyLogin_1.default)();
    const clearUser = (0, store_1.useUserStore)(state => state.clearUser);
    const clearChatRecord = (0, store_1.useChatStore)(state => state.clearChatRecord);
    const clearTextInput = (0, store_1.useChatStore)(state => state.clearTextInput);
    const resetTtsContent = (0, store_1.useWorkshopStore)(state => state.resetTtsContent);
    const reset = (0, store_1.useBotStore)(state => state.reset);
    const logout = async () => {
        try {
            const loginMethod = identityService_1.identityService.getLoginMethod() || 'all';
            await privyLogout({ method: loginMethod, source: 'NeedReLoginModal:logout' });
            try {
                await (0, user_1.userLogout)();
            }
            catch (e) {
                console.error(e);
            }
            identityService_1.identityService.clearAll(true);
            clearChatRecord();
            clearUser();
            reset();
            clearTextInput();
            resetTtsContent();
            window.location.href = '/';
        }
        catch (e) {
            console.error('登出失败');
        }
    };
    return ((0, jsx_runtime_1.jsxs)(dialog_1.Dialog, { open: isOpen, onOpenChange: open => {
            if (!open) {
                onClose();
            }
        }, children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogOverlay, {}), (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "w-[342px] md:w-auto bg-surface rounded-4xl z-[9999]", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-xl font-[400] text-on-surface py-4 px-5", children: t('safety_note') }), (0, jsx_runtime_1.jsx)(react_1.Divider, { className: "border-default" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-on-surface py-4 px-5", children: t('relogin_tip') }), (0, jsx_runtime_1.jsx)(react_1.Divider, { className: "border-default" }), (0, jsx_runtime_1.jsx)("div", { className: "px-5 py-4", children: (0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", w: "full", h: "36px", className: "bg-primary", display: "flex", justifyContent: "center", color: "white", fontSize: "14px", lineHeight: "20px", boxShadow: "0px 1px 0px rgba(0, 0, 0, 0.08), inset 0px -1px 0px rgba(0, 0, 0, 0.2)", borderRadius: "full", onClick: logout, children: pT('sign_out') }) })] })] }));
}
