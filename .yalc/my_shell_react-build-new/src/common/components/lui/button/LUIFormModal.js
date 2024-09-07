"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ArrowUpTrayIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowUpTrayIcon"));
const clsx_1 = __importDefault(require("clsx"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const react_fast_compare_1 = __importDefault(require("react-fast-compare"));
const react_hook_form_1 = require("react-hook-form");
const react_use_1 = require("react-use");
const SaveTipModal_1 = __importDefault(require("../../../../chat/views/chat-body/replicate/SaveTipModal.js"));
const FormListSkeleton_1 = require("../../../../components/skeleton/common/FormListSkeleton.js");
const store_1 = require("../../../../services/store/index.js");
const RenderForm = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../../common/components/lui/button/LUIRenderForm.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)(FormListSkeleton_1.FormListSkeleton, {}),
    ssr: false
});
function LUIFormModal({ params, isOpen, setOpen, isMobile, onSubmit: handleSubmition, loading, formSubmitError, setFormSubmitError }) {
    const p = (0, react_2.useMemo)(() => ({
        ...params,
        componentsInput: params.componentsInput?.map((item) => {
            let inputType = '';
            let defaultValue = '';
            let options = [];
            const props = {};
            let supportedFileTypes = [];
            switch (item.type) {
                case 'BOT_IM_COMPONENT_INPUT_TYPE_FILE_UPLOAD':
                    inputType = 'upload';
                    supportedFileTypes = item.supportedFileTypes;
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_AUDIO_UPLOAD':
                    inputType = 'upload';
                    supportedFileTypes = ['MESSAGE_METADATA_TYPE_AUDIO_FILE'];
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_VIDEO_UPLOAD':
                    inputType = 'upload';
                    supportedFileTypes = ['MESSAGE_METADATA_TYPE_VIDEO_FILE'];
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_IMAGE_UPLOAD':
                    inputType = 'upload';
                    supportedFileTypes = ['MESSAGE_METADATA_TYPE_IMAGE_FILE'];
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_TEXT_UPLOAD':
                    inputType = 'upload';
                    supportedFileTypes = ['MESSAGE_METADATA_TYPE_TEXT_FILE'];
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_TEXT_INPUT':
                    inputType = 'textarea';
                    defaultValue = item.stringDefault;
                    props.maxLength = item.stringCharLengthLimitation || 1500;
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_TEXT_SELECTOR':
                    inputType = 'select';
                    defaultValue = item.textSelectorDefault;
                    options = item.textSelectorAllOf?.map((e) => {
                        return {
                            label: e.label || e.value,
                            value: e.value,
                            iconUrl: e.iconUrl
                        };
                    });
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_INPUT':
                    inputType = item.hasNumberLimitation ? 'numberSlider' : 'numberInput';
                    defaultValue = item.numberDefault;
                    props.maxLength = item.numberMax;
                    props.minLength = item.numberMin;
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_INTEGER_INPUT':
                    inputType = item.hasIntegerLimitation ? 'interSlider' : 'interInput';
                    defaultValue = item.integerDefault;
                    props.maxLength = item.integerMax;
                    props.minLength = item.integerMin;
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_CHECKBOX':
                    inputType = 'checkbox';
                    defaultValue = item.booleanDefault;
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_SELECTOR':
                    inputType = 'numberSelect';
                    defaultValue = item.numberSelectorDefault;
                    options = item.numberSelectorAllOf?.map((e) => {
                        return {
                            label: e.label || e.value,
                            value: e.value,
                            iconUrl: e.iconUrl
                        };
                    });
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_CODE_EDITOR':
                    inputType = 'codeEditor';
                    defaultValue = item.stringDefault;
                    break;
            }
            return {
                ...item,
                id: item.fieldName,
                serverType: item.type,
                props,
                rules: props,
                type: inputType,
                defaultValue,
                options,
                supportedFileTypes
            };
        })
    }), [params]);
    const energy = (0, store_1.useUserStore)(state => state.energy);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const [isSaveTipOpen, setSaveTipOpen] = (0, react_2.useState)(false);
    const isEditedRef = (0, react_2.useRef)(false);
    const [isCanSave, setIsCanSave] = (0, react_2.useState)(true);
    const [isModalOpen, setModaOpen] = (0, react_2.useState)(false);
    const [submitting, setSubmitting] = (0, react_use_1.useToggle)(false);
    const componentsFunction = p.componentsFunction || [];
    const componentsInput = (0, react_2.useMemo)(() => p.componentsInput || [], [p.componentsInput]);
    const defaultValues = (0, react_2.useMemo)(() => {
        const values = {};
        componentsInput?.forEach((item) => {
            values[item.fieldName] = item.defaultValue ?? '';
            if (item.type === 'upload') {
                values[item.fieldName] = item.fileDefaultParam ?? '';
                values[`x_ms_name_${item.fieldName}`] = '';
                values[`x_ms_size_${item.fieldName}`] = '';
            }
        });
        return values;
    }, [componentsInput]);
    const { control, setValue, watch, reset, register, getValues, clearErrors, setError, handleSubmit, formState: { errors, isSubmitting } } = (0, react_hook_form_1.useForm)({
        defaultValues
    });
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
    (0, react_2.useEffect)(() => {
        const subscription = watch((value, { name, type }) => {
            const isEdit = !(0, react_fast_compare_1.default)(defaultValues, value);
            isEditedRef.current = isEdit;
            let canSave = true;
            componentsInput?.forEach((item) => {
                if (canSave && item.isRequired && !value[item.id]) {
                    canSave = false;
                }
            });
            setIsCanSave(canSave);
        });
        return () => subscription.unsubscribe();
    }, [watch]);
    const timerRef = (0, react_2.useRef)(null);
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
    const onSubmit = async (values) => {
        const params = {};
        componentsInput?.map((item) => {
            params[item.fieldName] = item.type === 'checkbox' ? values[item.fieldName] !== false : values[item.fieldName];
            if (item.type === 'upload') {
                if (!values[item.fieldName]) {
                    delete params[item.fieldName];
                }
                else {
                    params[`x_ms_name_${item.fieldName}`] = values[`x_ms_name_${item.fieldName}`];
                    params[`x_ms_size_${item.fieldName}`] = values[`x_ms_size_${item.fieldName}`];
                }
            }
        });
        setSubmitting(true);
        handleSubmition(params);
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
    const batteryCost = params.energyConsumePerUse;
    const noEnoughEnergy = isVisitor === 2 && energy < batteryCost;
    (0, react_2.useEffect)(() => {
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
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_1.Modal, { isOpen: isOpen, isCentered: true, onClose: handleDrawerClose, size: isMobile ? 'full' : '', children: (0, jsx_runtime_1.jsx)(react_1.ModalOverlay, { className: "bg-alpha-mask-desktop z-[49]", children: (0, jsx_runtime_1.jsxs)(react_1.ModalContent, { className: (0, clsx_1.default)('max-w-[768px] max-h-[620px] m-0 bg-surface rounded-[24px] flex items-center z-[49]', isMobile ? 'rounded-none' : ''), style: {
                            boxShadow: '0px 0px 40px 0px rgba(0, 0, 0, 0.10)'
                        }, children: [!isMobile && (0, jsx_runtime_1.jsx)(react_1.ModalCloseButton, { className: "top-6 right-6 text-secondary" }), (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('py-4 px-6 border-b border-default text-on-surface w-full', isMobile ? 'flex flex-row justify-between items-center' : ''), children: [(0, jsx_runtime_1.jsx)("h1", { className: (0, clsx_1.default)('text-2xl line-clamp-1', isMobile ? 'max-w-[80%]' : ''), children: params.name }), isMobile && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: componentsFunction?.map((item) => {
                                            if (item.functionName === 'getImageInfo') {
                                                return ((0, jsx_runtime_1.jsxs)("button", { className: "ml-1 flex-grow flex-shrink-0 flex justify-end self-end flex-row flex-nowrap border-default rounded-full text-primary font-normal", onClick: () => setModaOpen(true), children: [(0, jsx_runtime_1.jsx)(ArrowUpTrayIcon_1.default, { className: "w-5 h-5 text-primary mr-1.5" }), " ", chatT('panel.get_imginfo')] }, `mob_btn_${item.functionName}`));
                                            }
                                        }) })), !isMobile && (0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: params.description })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full px-6 py-3 overflow-y-auto text-on-surface flex-grow", children: (0, jsx_runtime_1.jsx)("form", { onSubmit: handleSubmit(onSubmit), id: "hook-form", className: "space-y-4", children: componentsInput.map((formEle, index) => {
                                        const anyErrors = errors;
                                        if (formEle.isRequired && formEle.value == '') {
                                            setError(formEle.id, { type: 'required' });
                                        }
                                        return ((0, jsx_runtime_1.jsx)(RenderForm, { defaultValues: defaultValues, formEle: formEle, control: control, errors: anyErrors[formEle.id], setFormValue: setValue, register: register, clearErrors: clearErrors }, formEle.id));
                                    }) }) }), (0, jsx_runtime_1.jsxs)(react_1.ModalFooter, { className: "border-t border-default flex  items-center py-4 px-6 w-full justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex", children: [!isMobile && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: componentsFunction?.map((item) => {
                                                    if (item.functionName === 'getImageInfo') {
                                                        return ((0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "outline", className: "border-default rounded-full text-primary font-normal", onClick: () => setModaOpen(true), children: [(0, jsx_runtime_1.jsx)(ArrowUpTrayIcon_1.default, { className: "w-5 h-5 text-primary mr-1.5" }), " ", chatT('panel.get_imginfo')] }, `btn_${item.functionName}`));
                                                    }
                                                }) })), isMobile && ((0, jsx_runtime_1.jsx)(react_1.Button, { variant: "outline", className: "border-default rounded-full text-on-surface font-normal px-6", onClick: handleDrawerClose, children: chatT('cancel') }))] }), (0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "unstyled", className: (0, clsx_1.default)('px-6 py-[10px] rounded-full bg-primary text-white font-normal flex justify-center items-center min-w-[158px]', isMobile ? 'flex-grow flex-shrink-0 ml-3' : '', !isCanSave ? 'opacity-30' : ''), type: "submit", form: "hook-form", isDisabled: noEnoughEnergy, isLoading: loading, _hover: {
                                            _loading: {
                                                bg: 'var(--primary)'
                                            }
                                        }, children: [params.saveButtonContent, !!params.energyConsumePerUse && ((0, jsx_runtime_1.jsxs)("div", { className: "ml-1.5 flex flex-row justify-center items-center", children: [(0, jsx_runtime_1.jsx)("img", { src: "/icons/thunder.svg", alt: "thunder", className: "w-4 h-4 shrink-0" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-white ml-[2px]", children: params.energyConsumePerUse })] }))] })] })] }) }) }), isSaveTipOpen && (0, jsx_runtime_1.jsx)(SaveTipModal_1.default, { isOpen: isSaveTipOpen, onClose: onSaveTipClose, onConfirmed: onSaveTipConfirm })] }));
}
exports.default = (0, react_2.memo)(LUIFormModal);
