import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Divider } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { userLogout } from '../../../../../apis/user.js';
import { Dialog, DialogContent, DialogOverlay } from '../../../../../common/components/ui/dialog.js';
import { Text } from '../../../../../common/components/ui/typography.js';
import { identityService } from '../../../../../common/services/identityService.js';
import usePrivyLogin from '../../../../../hooks/user/usePrivyLogin.js';
import { useBotStore, useChatStore, useUserStore, useWorkshopStore } from '../../../../../services/store/index.js';
export default function NeedReLoginModal({ isOpen, onClose }) {
    const t = useTranslations('reward_center.earn_content.blockchain_interaction_guide');
    const pT = useTranslations('profile');
    const { logout: privyLogout } = usePrivyLogin();
    const clearUser = useUserStore(state => state.clearUser);
    const clearChatRecord = useChatStore(state => state.clearChatRecord);
    const clearTextInput = useChatStore(state => state.clearTextInput);
    const resetTtsContent = useWorkshopStore(state => state.resetTtsContent);
    const reset = useBotStore(state => state.reset);
    const logout = async () => {
        try {
            const loginMethod = identityService.getLoginMethod() || 'all';
            await privyLogout({ method: loginMethod, source: 'NeedReLoginModal:logout' });
            try {
                await userLogout();
            }
            catch (e) {
                console.error(e);
            }
            identityService.clearAll(true);
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
    return (_jsxs(Dialog, { open: isOpen, onOpenChange: open => {
            if (!open) {
                onClose();
            }
        }, children: [_jsx(DialogOverlay, {}), _jsxs(DialogContent, { className: "w-[342px] md:w-auto bg-surface rounded-4xl z-[9999]", children: [_jsx(Text, { className: "text-xl font-[400] text-on-surface py-4 px-5", children: t('safety_note') }), _jsx(Divider, { className: "border-default" }), _jsx(Text, { className: "text-on-surface py-4 px-5", children: t('relogin_tip') }), _jsx(Divider, { className: "border-default" }), _jsx("div", { className: "px-5 py-4", children: _jsx(Button, { variant: "unstyled", w: "full", h: "36px", className: "bg-primary", display: "flex", justifyContent: "center", color: "white", fontSize: "14px", lineHeight: "20px", boxShadow: "0px 1px 0px rgba(0, 0, 0, 0.08), inset 0px -1px 0px rgba(0, 0, 0, 0.2)", borderRadius: "full", onClick: logout, children: pT('sign_out') }) })] })] }));
}
