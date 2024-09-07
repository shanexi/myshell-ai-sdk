"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateBotInfoModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const next_intl_1 = require("next-intl");
function CreateBotInfoModal({ open, onClose }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    function stopShowTheModal() {
        localStorage.setItem('CreateBotInfoModal', 'closed');
        onClose();
    }
    return ((0, jsx_runtime_1.jsxs)(react_1.Modal, { closeOnEsc: true, closeOnOverlayClick: true, isOpen: open, onClose: onClose, isCentered: true, children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, {}), (0, jsx_runtime_1.jsxs)(react_1.ModalContent, { borderRadius: "24px", w: { base: '90%', md: '620px' }, maxW: "auto", bg: "#fff", color: "#1f1f1f", px: "20px", children: [(0, jsx_runtime_1.jsx)(react_1.Box, { className: "flex justify-center my-5 md:mt-[60px] md:mb-[0px]", children: (0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "96px", children: "\uD83C\uDF89" }) }), (0, jsx_runtime_1.jsxs)(react_1.ModalBody, { fontSize: { base: '14px', md: '16px' }, fontWeight: "590", px: "0", children: [(0, jsx_runtime_1.jsx)(react_1.Text, { fontWeight: "normal", fontSize: { base: '24px', md: '28px' }, mb: { base: '0px', md: '0px' }, children: t('create_bot_tips_title') }), (0, jsx_runtime_1.jsx)(react_1.Text, { fontWeight: "normal", fontSize: { base: '14px', md: '16px' }, mb: { base: '6px', md: '8px' }, children: t('create_bot_tips_title_small') }), (0, jsx_runtime_1.jsxs)(react_1.UnorderedList, { fontWeight: "400", px: "8px", fontSize: "sm", children: [(0, jsx_runtime_1.jsx)(react_1.ListItem, { children: t('create_bot_tips_01') }), (0, jsx_runtime_1.jsx)(react_1.ListItem, { children: t('create_bot_tips_02') }), (0, jsx_runtime_1.jsx)(react_1.ListItem, { children: t('create_bot_tips_03') })] }), (0, jsx_runtime_1.jsx)(react_1.Text, { fontWeight: "normal", fontSize: { base: '14px', md: '14px' }, mb: { base: '6px', md: '8px' }, children: t('create_bot_tips_bottom') })] }), (0, jsx_runtime_1.jsx)(react_1.Box, { pt: { base: '12px', md: '32px' }, pb: { base: '20px', md: '60px' }, children: (0, jsx_runtime_1.jsxs)(react_1.Flex, { w: "100%", className: "space-y-2 flex-col", children: [(0, jsx_runtime_1.jsx)(react_1.Button, { colorScheme: "brand", variant: "ghost", h: "48px", className: "bg-primary", boxShadow: "0px -1px 0px 0px #00000033 inset, 0px 1px 0px 0px #00000014", _hover: {
                                        background: '#3E5CFA'
                                    }, _focus: {
                                        outline: 'none'
                                    }, color: "#fff", fontSize: { base: '14px', md: '16px' }, borderRadius: "12px", onClick: onClose, children: t('confirm') }), (0, jsx_runtime_1.jsx)(react_1.Button, { colorScheme: "transparent", h: "30px", color: "#8C9196", fontSize: { base: '14px', md: '16px' }, onClick: stopShowTheModal, children: t('not_remind') })] }) })] })] }));
}
