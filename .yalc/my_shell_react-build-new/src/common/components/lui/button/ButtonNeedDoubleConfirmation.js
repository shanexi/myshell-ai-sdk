"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const react_use_1 = require("react-use");
function ButtonNeedDoubleConfirmation({ children, title, description, onConfirm, clicked }) {
    const [visible, setVisible] = (0, react_use_1.useToggle)(false);
    const [loading, setLoading] = (0, react_use_1.useToggle)(false);
    const cancelRef = (0, react_2.useRef)(null);
    const t = (0, next_intl_1.useTranslations)('common');
    const handleConfirm = async () => {
        try {
            setLoading(true);
            await onConfirm();
            setVisible(false);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { onClick: () => {
                    setVisible(true);
                    clicked();
                }, children: children }), (0, jsx_runtime_1.jsx)(react_1.AlertDialog, { isOpen: visible, leastDestructiveRef: cancelRef, onClose: () => setVisible(false), isCentered: true, children: (0, jsx_runtime_1.jsx)(react_1.AlertDialogOverlay, { className: "shadow-modal-default", children: (0, jsx_runtime_1.jsxs)(react_1.AlertDialogContent, { className: "bg-surface text-on-surface", children: [(0, jsx_runtime_1.jsx)(react_1.AlertDialogHeader, { fontSize: "2xl", fontWeight: "bold", padding: "20px", children: title }), (0, jsx_runtime_1.jsx)(react_1.Divider, { className: "border-default" }), (0, jsx_runtime_1.jsx)(react_1.AlertDialogBody, { px: "20px", py: "16px", fontSize: "16px", lineHeight: "24px", children: description }), (0, jsx_runtime_1.jsx)(react_1.Divider, { className: "border-default" }), (0, jsx_runtime_1.jsxs)(react_1.AlertDialogFooter, { p: "16px", display: "flex", gap: "16px", children: [(0, jsx_runtime_1.jsx)(react_1.Button, { ref: cancelRef, onClick: () => setVisible(false), width: "100%", h: "36px", px: "12px", py: "8px", borderRadius: "full", color: "var(--primary)", border: "1px solid var(--primary)", _hover: {
                                            backgroundColor: 'transparent'
                                        }, children: t('cancel') }), (0, jsx_runtime_1.jsx)(react_1.Button, { onClick: handleConfirm, width: "100%", h: "36px", px: "12px", py: "8px", borderRadius: "full", backgroundColor: "var(--primary)", className: "bg-primary", color: "white", _hover: {
                                            backgroundColor: 'var(--primary)'
                                        }, isLoading: loading, children: t('confirm') })] })] }) }) })] }));
}
exports.default = (0, react_2.memo)(ButtonNeedDoubleConfirmation);
