"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TelegramModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const next_intl_1 = require("next-intl");
const rxjs_1 = require("rxjs");
const user_1 = require("../../../../../apis/user.js");
const Telegram_1 = require("../../../../../common/components/auth/third-party/telegram/Telegram.js");
const runtime_config_1 = require("../../../../../common/utils/runtime-config.js");
const store_1 = require("../../../../../services/store/index.js");
const useNotification_1 = require("../../../../../common/hooks/useNotification.js");
function TelegramModal({ open, onClose, errCallback }) {
    const t = (0, next_intl_1.useTranslations)();
    const globalLoading = (0, store_1.useGlobalStore)(state => state.globalLoading);
    const globalLoaded = (0, store_1.useGlobalStore)(state => state.globalLoaded);
    const { success } = (0, useNotification_1.useNotification)();
    const onTgAuthed = (response) => {
        globalLoading();
        (0, user_1.connectToTelegram)(response)
            .pipe((0, rxjs_1.finalize)(() => {
            globalLoaded();
        }))
            .subscribe({
            next: res => {
                onClose();
                success({
                    content: t('profile.successful')
                });
            },
            error: async (res) => {
                const data = res?.response?.data;
                errCallback('Telegram', data?.errorReason || '', data?.nextTimeCanBind || '');
            }
        });
    };
    return ((0, jsx_runtime_1.jsxs)(react_1.Modal, { isOpen: open, onClose: onClose, isCentered: true, children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, {}), (0, jsx_runtime_1.jsxs)(react_1.ModalContent, { w: "90%", maxW: "344px", bg: "#F9F9F9", border: "2px solid #000", color: "#141718", children: [(0, jsx_runtime_1.jsx)(react_1.ModalHeader, { children: t('bind_tg') }), (0, jsx_runtime_1.jsx)(react_1.ModalCloseButton, { zIndex: "2", right: "24px", top: "24px", onClick: () => {
                            onClose();
                        }, fontSize: "12px" }), (0, jsx_runtime_1.jsx)(react_1.ModalBody, { pb: "16px", children: (0, jsx_runtime_1.jsx)(react_1.Center, { children: (0, jsx_runtime_1.jsx)(Telegram_1.TelegramButton, { className: "flex justify-center flex-grow relative", dataOnAuth: onTgAuthed, botName: runtime_config_1.TG_BOT_NAME }) }) })] })] }));
}
