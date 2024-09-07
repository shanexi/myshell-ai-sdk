"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportLinkDialog = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
exports.ImportLinkDialog = (0, react_2.forwardRef)(({ children, onConfirm }, ref) => {
    const { isOpen, onOpen, onClose } = (0, react_1.useDisclosure)();
    const cancelRef = (0, react_2.useRef)(null);
    const t = (0, next_intl_1.useTranslations)('workshop');
    (0, react_2.useImperativeHandle)(ref, () => ({
        show() {
            onOpen();
        }
    }));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [children, (0, jsx_runtime_1.jsx)(react_1.AlertDialog, { isOpen: isOpen, leastDestructiveRef: cancelRef, onClose: onClose, isCentered: true, children: (0, jsx_runtime_1.jsx)(react_1.AlertDialogOverlay, { children: (0, jsx_runtime_1.jsxs)(react_1.AlertDialogContent, { borderRadius: 12, padding: "20px", children: [(0, jsx_runtime_1.jsx)(react_1.AlertDialogBody, { padding: "0", fontSize: "18px", minHeight: "60px", children: t('import_tip') }), (0, jsx_runtime_1.jsxs)(react_1.AlertDialogFooter, { paddingBottom: "0", children: [(0, jsx_runtime_1.jsx)(react_1.Button, { ref: cancelRef, onClick: onClose, width: "100%", paddingBlock: "24px", backgroundColor: "white", className: "bg-white", color: "#1F1F1F", border: "1px solid #EDEDED", _hover: {
                                            backgroundColor: 'transparent'
                                        }, children: t('cancel') }), (0, jsx_runtime_1.jsx)(react_1.Button, { colorScheme: "red", onClick: () => {
                                            onClose();
                                            onConfirm();
                                        }, ml: 3, width: "100%", paddingBlock: "24px", backgroundColor: "var(--primary)", className: "bg-primary", color: "white", _hover: {
                                            backgroundColor: 'var(--primary)'
                                        }, children: t('confirm') })] })] }) }) })] }));
});
