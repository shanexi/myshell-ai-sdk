"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ChevronRightIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronRightIcon"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const store_1 = require("../../../services/store/index.js");
function LoginDialog(props) {
    const t = (0, next_intl_1.useTranslations)('chat');
    const profileT = (0, next_intl_1.useTranslations)('profile');
    const { onClose } = (0, react_1.useDisclosure)();
    const cancelRef = (0, react_2.useRef)(null);
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const go2Login = () => {
        toggleLoginModal(true);
    };
    return ((0, jsx_runtime_1.jsx)(react_1.AlertDialog, { autoFocus: false, isOpen: props.open, isCentered: true, leastDestructiveRef: cancelRef, onClose: onClose, trapFocus: false, children: (0, jsx_runtime_1.jsx)(react_1.AlertDialogOverlay, { className: "z-[148]", children: (0, jsx_runtime_1.jsxs)(react_1.AlertDialogContent, { borderRadius: 20, mx: "16px", w: { base: '90%', sm: '500px' }, maxWidth: "500px", padding: "30px 20px", className: "bg-surface", children: [(0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "16px", fontWeight: "bold", textAlign: "center", className: "text-on-surface", children: t('login_popup_tips') }), (0, jsx_runtime_1.jsxs)(react_1.Flex, { justifyContent: "space-evenly", padding: "40px 0", children: [(0, jsx_runtime_1.jsxs)(react_1.Flex, { w: "full", mt: "12px", rounded: "12px", overflow: "hidden", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "10px", children: [(0, jsx_runtime_1.jsx)(react_1.Image, { alt: "circle", src: "/images/free_premuium_membership.png", w: "90px", h: "90px" }), (0, jsx_runtime_1.jsx)(react_1.Text, { textAlign: "center", fontSize: "14px", fontWeight: "400", minH: { base: '60px', sm: '45px' }, className: "text-on-surface", children: t('free_premium_membership_card') })] }), (0, jsx_runtime_1.jsxs)(react_1.Flex, { w: "full", mt: "12px", rounded: "12px", overflow: "hidden", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "10px", children: [(0, jsx_runtime_1.jsx)(react_1.Image, { alt: "circle", src: "/images/rewards.png", w: "90px", h: "90px" }), (0, jsx_runtime_1.jsx)(react_1.Text, { textAlign: "center", fontSize: "14px", fontWeight: "400", minH: { base: '60px', sm: '45px' }, className: "text-on-surface", children: t('more_conversations') })] }), (0, jsx_runtime_1.jsxs)(react_1.Flex, { w: "full", mt: "12px", rounded: "12px", overflow: "hidden", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "10px", children: [(0, jsx_runtime_1.jsx)(react_1.Image, { alt: "circle", src: "/images/gpt4.png", w: "90px", h: "90px" }), (0, jsx_runtime_1.jsx)(react_1.Text, { textAlign: "center", fontSize: "14px", fontWeight: "400", minH: { base: '60px', sm: '45px' }, className: "text-on-surface", children: t('chat_with_gpt4') })] })] }), (0, jsx_runtime_1.jsx)(react_1.AlertDialogFooter, { display: "flex", padding: "0", justifyContent: "center", children: (0, jsx_runtime_1.jsxs)(react_1.Button, { colorScheme: "red", width: { base: '80%', sm: '200px' }, h: "40px", px: "12px", py: "8px", borderRadius: "40px", className: "bg-primary", color: "white", _hover: {
                                backgroundColor: 'var(--primary)'
                            }, _disabled: {
                                opacity: 0.3,
                                cursor: 'not-allowed'
                            }, onClick: go2Login, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base", children: profileT('login_sign_up') }), (0, jsx_runtime_1.jsx)(ChevronRightIcon_1.default, { className: "w-5 h-5" })] }) })] }) }) }));
}
exports.default = LoginDialog;
