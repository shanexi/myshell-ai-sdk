"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ChevronRightIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronRightIcon"));
const RectangleGroupIcon_1 = __importDefault(require("@heroicons/react/24/outline/RectangleGroupIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const nocode_1 = require("../../../../common/components/nocode/index.js");
const button_1 = require("../../../../common/components/ui/button.js");
const store_1 = require("../../../../services/store/index.js");
const NoCodeWindow = props => {
    const { isOpen, data, loading, widgets, onClose, onSave, onChange } = props;
    const root = document.getElementById('nocode-window');
    (0, react_1.useEffect)(() => {
        if (isOpen) {
            root?.classList.remove('hidden');
            root?.classList.add('block');
        }
        else {
            root?.classList.remove('block');
            root?.classList.add('hidden');
        }
    }, [isOpen]);
    if (!isOpen || !root) {
        return null;
    }
    return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsx)(nocode_1.NoCode, { data: data, onClose: onClose, onSave: onSave, onChange: onChange, loading: loading, widgetIds: widgets }), root);
};
const NoCodeMode = ({ form, onNoCodeChange, checking, handleCheckNoCode, widgets, isOpen, setOpen, isMobile }) => {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const currentForm = (0, store_1.useWorkshopStore)(state => state.currentForm);
    const setCurrentForm = (0, store_1.useWorkshopStore)(state => state.setCurrentForm);
    const onClose = () => {
        setOpen(false);
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "px-4 md:px-0", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col justify-center items-center w-full h-[338px] border-default border rounded-md bg-surface-subtle", children: [isMobile ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-center text-subtlest text-base pt-2.5 pb-1.5", children: [t('no_code_mode_mobile_tips'), (0, jsx_runtime_1.jsx)("br", {}), t('no_code_mode_mobile_sub_tips')] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(RectangleGroupIcon_1.default, { className: "text-icon-subtle w-6 h-6 stroke-[2px]" }), (0, jsx_runtime_1.jsx)("p", { className: "text-default text-14 pt-2.5 pb-1.5", children: "Create with No-code Editor" }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "primary", color: "default", size: "sm", onClick: () => {
                                setOpen(true);
                            }, children: ["Get Start ", (0, jsx_runtime_1.jsx)(ChevronRightIcon_1.default, { className: "text-default" })] })] })), (0, jsx_runtime_1.jsx)(form.Field, { name: "nocodeModeStructuredInput", children: field => {
                        const value = field.getValue();
                        let data;
                        if (value && value !== '') {
                            try {
                                data = JSON.parse(value);
                            }
                            catch (e) { }
                        }
                        const onChange = (data) => {
                            const value = JSON.stringify(data);
                            field.setValue(value);
                            setCurrentForm({ ...currentForm, nocodeModeStructuredInput: value });
                            onNoCodeChange();
                        };
                        const onSave = (data) => {
                            const value = JSON.stringify(data);
                            field.setValue(value);
                            setCurrentForm({ ...currentForm, nocodeModeStructuredInput: value });
                            handleCheckNoCode();
                        };
                        return ((0, jsx_runtime_1.jsx)(NoCodeWindow, { isOpen: !isMobile && isOpen, onClose: onClose, onChange: onChange, onSave: onSave, data: data, loading: checking, widgets: [
                                ...widgets,
                                ...(Array.isArray(currentForm.nocodeUsedWidgetIds) ? currentForm.nocodeUsedWidgetIds : [])
                            ] }));
                    } })] }) }));
};
exports.default = NoCodeMode;
