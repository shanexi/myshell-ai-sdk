"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const store_1 = require("../../../../services/store/index.js");
function TokenInvalidModal() {
    const pathname = (0, navigation_1.usePathname)();
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const isOpenInvalidModal = (0, store_1.useGlobalStore)(state => state.isOpenInvalidModal);
    const toggleInvalidModal = (0, store_1.useGlobalStore)(state => state.toggleInvalidModal);
    const token = (0, store_1.useUserStore)(state => state.token);
    const t = (0, next_intl_1.useTranslations)('profile');
    (0, react_2.useEffect)(() => {
        if ((pathname || '').endsWith('visitor') && !token) {
            toggleInvalidModal(true);
        }
    }, [pathname, toggleInvalidModal]);
    const handleClick = (0, react_2.useCallback)(() => {
        toggleLoginModal(true);
        toggleInvalidModal(false);
    }, []);
    return ((0, jsx_runtime_1.jsxs)(react_1.Modal, { closeOnEsc: true, closeOnOverlayClick: true, isOpen: isOpenInvalidModal, onClose: () => toggleInvalidModal(false), isCentered: true, children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, { className: "bg-alpha-mask-desktop" }), (0, jsx_runtime_1.jsxs)(react_1.ModalContent, { w: { base: '90%', md: '456px' }, h: "auto", className: "bg-surface", borderRadius: "12px", p: "30px", children: [(0, jsx_runtime_1.jsxs)(react_1.ModalHeader, { display: "flex", p: "0", mb: "7px", className: "relative text-on-surface", children: [t('tips'), (0, jsx_runtime_1.jsx)(react_1.ModalCloseButton, { fontSize: "13.5px", color: "var(--on-surface-variant)", right: "0" })] }), (0, jsx_runtime_1.jsxs)(react_1.ModalBody, { p: "0", className: "flex flex-col space-y-5", children: [(0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "14px", fontFamily: "Mona-Sans", color: "var(--secondary)", children: t('guest_tip') }), (0, jsx_runtime_1.jsxs)(react_1.Box, { className: "flex space-x-4", children: [(0, jsx_runtime_1.jsx)(react_1.Button, { _hover: { bg: 'var(--primary)' }, _active: { bg: 'var(--primary)' }, h: "48px", bg: "var(--primary)", boxShadow: "0px -1px 0px 0px #00000033 inset, 0px 1px 0px 0px #00000014", color: "#fff", w: "100%", className: "bg-primary", borderRadius: 12, onClick: () => toggleInvalidModal(false), children: t('cancel') }), (0, jsx_runtime_1.jsx)(react_1.Button, { _hover: { bg: 'var(--primary)' }, _active: { bg: 'var(--primary)' }, h: "48px", className: "bg-primary", boxShadow: "0px -1px 0px 0px #00000033 inset, 0px 1px 0px 0px #00000014", color: "#fff", w: "100%", borderRadius: 12, onClick: handleClick, children: t('login_sign_up') })] })] })] })] }));
}
exports.default = TokenInvalidModal;
