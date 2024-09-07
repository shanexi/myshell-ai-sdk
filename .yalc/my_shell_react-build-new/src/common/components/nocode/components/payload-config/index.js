"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayloadConfig = PayloadConfig;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const react_hot_toast_1 = require("react-hot-toast");
const code_editor_1 = __importDefault(require("../../../../../common/components/code-editor/index.js"));
const button_1 = require("../../../../../common/components/ui/button.js");
const dialog_1 = require("../../../../../common/components/ui/dialog.js");
const config_1 = require("../../../../../common/components/ui/icons/outline/config.js");
const separator_1 = require("../../../../../common/components/ui/separator.js");
const tooltip_1 = require("../../../../../common/components/ui/tooltip.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
function PayloadConfig(props) {
    const { name, value } = props;
    const i18n = (0, next_intl_1.useTranslations)('nocode');
    const { setValue } = (0, react_hook_form_1.useFormContext)();
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [formData, setFormData] = (0, react_1.useState)('');
    const onEditModeChange = () => {
        setFormData(JSON.stringify(value || {}, null, 2));
        setIsOpen(true);
    };
    const onClose = () => {
        setIsOpen(false);
    };
    const onConfirm = () => {
        try {
            setValue(name, formData ? JSON.parse(formData) : {});
            setIsOpen(false);
        }
        catch (err) {
            react_hot_toast_1.toast.error(err?.message);
        }
    };
    const onFormChange = (values) => {
        setFormData(values);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center mt-6", children: [(0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: "Payload Config", children: (0, jsx_runtime_1.jsx)(config_1.Config, { onClick: onEditModeChange, className: "w-6 h-6 flex items-center justify-center cursor-pointer" }) }), (0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: isOpen, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { onClose: onClose, maskClosable: false, children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: (0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h2", children: "Payload Config" }) }) }), (0, jsx_runtime_1.jsx)(separator_1.Separator, {}), (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, { className: "grid gap-y-1.5", children: (0, jsx_runtime_1.jsx)("div", { className: "w-full h-[200px]", children: (0, jsx_runtime_1.jsx)(code_editor_1.default, { language: "json", value: formData, onValueChange: onFormChange }) }) }), (0, jsx_runtime_1.jsx)(separator_1.Separator, {}), (0, jsx_runtime_1.jsxs)(dialog_1.DialogFooter, { className: "gap-x-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { className: "flex-1", variant: "outline", onClick: onClose, children: i18n('state.cancel') }), (0, jsx_runtime_1.jsx)(button_1.Button, { className: "flex-1", onClick: onConfirm, children: i18n('state.confirm') })] })] }) })] }));
}
