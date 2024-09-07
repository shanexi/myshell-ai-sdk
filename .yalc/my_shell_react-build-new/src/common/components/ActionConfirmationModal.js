"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ActionConfirmationModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const button_1 = require("./ui/button.js");
const modal_1 = require("./ui/modal.js");
const typography_1 = require("./ui/typography.js");
function ActionConfirmationModal(props) {
    const commonT = (0, next_intl_1.useTranslations)('common');
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { overlayClose: !props.acting, open: props.isOpen, title: props.title || commonT('delete'), onClose: props.onClose, contentClassName: "w-310px md:w-[380px] z-[1500]", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", className: "px-4 py-4 flex", children: props.content }), (0, jsx_runtime_1.jsxs)(modal_1.ModalFooter, { className: "gap-x-5 min-h-[76px]", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: "gray", onClick: props.onClose, children: commonT('cancel') }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: "error", onClick: props.onConfirm, loading: props.acting, children: commonT('delete') })] })] }) }));
}
