"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LuiFormModel;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_2 = require("@chakra-ui/react");
const form_engine_1 = require("../../../../../common/components/form-engine/index.js");
const Checkbox_1 = __importDefault(require("../../../../../chat/views/chat-body/replicate/Checkbox.js"));
const CustomNumberInput_1 = __importDefault(require("../../../../../chat/views/chat-body/replicate/CustomNumberInput.js"));
const CustomSelect_1 = __importDefault(require("../../../../../chat/views/chat-body/replicate/CustomSelect.js"));
const CustomTextarea_1 = __importDefault(require("../../../../../chat/views/chat-body/replicate/CustomTextarea.js"));
const FileUpload_1 = __importDefault(require("./FileUpload.js"));
const NumberSlider_1 = __importDefault(require("../../../../../chat/views/chat-body/replicate/NumberSlider.js"));
const CustomCodeEditor_1 = __importDefault(require("../../../../../components/chat/chat-body/replicate/custom-code-editor/CustomCodeEditor.js"));
const SaveTipModal_1 = __importDefault(require("../../../../../chat/views/chat-body/replicate/SaveTipModal.js"));
const getSchemaByInputs_1 = require("./getSchemaByInputs.js");
const getDefaultValueBySchema_1 = require("../../../../../common/components/form-engine/utils/getDefaultValueBySchema.js");
const utils_1 = require("../../../../../lib/utils.js");
const lodash_es_1 = require("lodash-es");
const next_intl_1 = require("next-intl");
const store_1 = require("../../../../../services/store/index.js");
const react_use_1 = require("react-use");
function LuiFormModel({ params, isOpen, setOpen, isMobile, onSubmit: handleSubmition, loading, formSubmitError, setFormSubmitError }) {
    const { name, description, componentsInput, energyConsumePerUse, saveButtonContent } = params;
    const formRef = (0, react_1.useRef)();
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const energy = (0, store_1.useUserStore)(state => state.energy);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const [isCanSave, setIsCanSave] = (0, react_1.useState)(true);
    const [isSaveTipOpen, setSaveTipOpen] = (0, react_1.useState)(false);
    const [submitting, setSubmitting] = (0, react_use_1.useToggle)(false);
    const isEditedRef = (0, react_1.useRef)(false);
    const schema = (0, react_1.useMemo)(() => (0, getSchemaByInputs_1.getSchemaByInputs)(componentsInput), [componentsInput]);
    const defaultValues = (0, react_1.useMemo)(() => {
        const value = {
            ...(0, getDefaultValueBySchema_1.getDefaultValueBySchema)(schema)
        };
        componentsInput?.forEach((item) => {
            value[item.fieldName] = item.defaultValue ?? '';
            if (item.type === 'upload') {
                value[item.fieldName] = item.fileDefaultParam ?? '';
                value[`x_ms_name_${item.fieldName}`] = '';
                value[`x_ms_size_${item.fieldName}`] = '';
            }
        });
        return value;
    }, [schema, componentsInput]);
    const [values, setValues] = (0, react_1.useState)(defaultValues);
    const noEnoughEnergy = isVisitor === 2 && energy < energyConsumePerUse;
    const onChange = (data) => {
        console.log('onSubmit: ', data);
        setValues(data);
        let canSave = true;
        componentsInput?.forEach((item) => {
            if (canSave && item.isRequired && !data[item.id]) {
                canSave = false;
            }
        });
        setIsCanSave(canSave);
        const isEdit = !(0, lodash_es_1.isEqual)(defaultValues, values);
        isEditedRef.current = isEdit;
    };
    const onSubmit = (data) => {
        console.log('onSubmit: ', data);
        setSubmitting(true);
        handleSubmition(data);
    };
    const onSaveTipClose = () => {
        setSaveTipOpen(false);
    };
    const onSaveTipConfirm = () => {
        setSaveTipOpen(false);
        setOpen(false);
    };
    const handleDrawerClose = () => {
        if (isEditedRef.current && isCanSave) {
            setSaveTipOpen(true);
        }
        else {
            setOpen(false);
        }
        setFormSubmitError(false);
    };
    const setCanSaveHandle = () => {
        let canSave = true;
        componentsInput?.forEach((item) => {
            if (canSave && item.isRequired) {
                if (!item.defaultValue) {
                    canSave = false;
                }
            }
        });
        setIsCanSave(canSave);
    };
    const timerRef = (0, react_1.useRef)(null);
    (0, react_use_1.useEffectOnce)(() => {
        setCanSaveHandle();
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    });
    (0, react_1.useEffect)(() => {
        if (submitting) {
            if (!loading) {
                if (!formSubmitError) {
                    setTimeout(() => {
                        setOpen(false);
                    });
                }
                else {
                    setSubmitting(false);
                }
            }
        }
    }, [formSubmitError, loading, setOpen, setSubmitting, submitting]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_2.Modal, { isOpen: isOpen, isCentered: true, onClose: handleDrawerClose, size: isMobile ? 'full' : '', children: (0, jsx_runtime_1.jsx)(react_2.ModalOverlay, { className: "bg-alpha-mask-desktop", children: (0, jsx_runtime_1.jsxs)(react_2.ModalContent, { className: (0, utils_1.cn)('max-w-[768px] max-h-[620px] m-0 bg-surface rounded-[24px] flex items-center', isMobile ? 'rounded-none' : ''), style: {
                            boxShadow: '0px 0px 40px 0px rgba(0, 0, 0, 0.10)'
                        }, children: [!isMobile && (0, jsx_runtime_1.jsx)(react_2.ModalCloseButton, { className: "top-6 right-6 text-secondary" }), (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('py-4 px-6 border-b border-outline text-on-surface w-full', isMobile ? 'flex flex-row justify-between items-center' : ''), children: [(0, jsx_runtime_1.jsx)("h1", { className: (0, utils_1.cn)('text-2xl line-clamp-1', isMobile ? 'max-w-[80%]' : ''), children: name }), !isMobile && (0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: description })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full px-6 py-3 overflow-y-auto text-on-surface flex-grow", children: (0, jsx_runtime_1.jsx)(form_engine_1.MemoizedFormEngine, { id: "lui-form", values: values, schema: schema, onChange: onChange, onSubmit: onSubmit, mode: "onChange", components: {
                                        CustomCheckbox: Checkbox_1.default,
                                        CustomNumberInput: CustomNumberInput_1.default,
                                        CustomSelect: CustomSelect_1.default,
                                        CustomTextarea: CustomTextarea_1.default,
                                        NumberSlider: NumberSlider_1.default,
                                        FileUpload: FileUpload_1.default,
                                        CustomCodeEditor: CustomCodeEditor_1.default
                                    } }) }), (0, jsx_runtime_1.jsxs)(react_2.ModalFooter, { className: "border-t border-outline flex  items-center py-4 px-6 w-full justify-between", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex", children: isMobile && ((0, jsx_runtime_1.jsx)(react_2.Button, { variant: "outline", className: "border-outline rounded-full text-on-surface font-normal px-6", onClick: handleDrawerClose, children: chatT('cancel') })) }), (0, jsx_runtime_1.jsxs)(react_2.Button, { variant: "unstyled", className: (0, utils_1.cn)('px-6 py-[10px] rounded-full bg-primary text-white font-normal flex justify-center items-center min-w-[158px]', isMobile ? 'flex-grow flex-shrink-0 ml-3' : '', !isCanSave ? 'opacity-30' : ''), type: "submit", form: "lui-form", isDisabled: noEnoughEnergy, isLoading: loading, _hover: {
                                            _loading: {
                                                bg: 'var(--primary)'
                                            }
                                        }, children: [saveButtonContent, !!energyConsumePerUse && ((0, jsx_runtime_1.jsxs)("div", { className: "ml-1.5 flex flex-row justify-center items-center", children: [(0, jsx_runtime_1.jsx)("img", { src: "/icons/thunder.svg", alt: "thunder", className: "w-4 h-4 shrink-0" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-white ml-[2px]", children: energyConsumePerUse })] }))] })] })] }) }) }), isSaveTipOpen && (0, jsx_runtime_1.jsx)(SaveTipModal_1.default, { isOpen: isSaveTipOpen, onClose: onSaveTipClose, onConfirmed: onSaveTipConfirm })] }));
}
