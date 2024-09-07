"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ArrowUpTrayIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowUpTrayIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const react_fast_compare_1 = __importDefault(require("react-fast-compare"));
const react_hook_form_1 = require("react-hook-form");
const usehooks_ts_1 = require("usehooks-ts");
const Checkbox_1 = __importDefault(require("../../../../chat/views/chat-body/replicate/Checkbox.js"));
const CustomNumberInput_1 = __importDefault(require("../../../../chat/views/chat-body/replicate/CustomNumberInput.js"));
const CustomSelect_1 = __importDefault(require("../../../../chat/views/chat-body/replicate/CustomSelect.js"));
const CustomTextarea_1 = __importDefault(require("../../../../chat/views/chat-body/replicate/CustomTextarea.js"));
const FileUpload_1 = __importDefault(require("../../../../chat/views/chat-body/replicate/FileUpload.js"));
const GetImageInfoModal_1 = __importDefault(require("../../../../chat/views/chat-body/replicate/GetImageInfoModal.js"));
const NumberSlider_1 = __importDefault(require("../../../../chat/views/chat-body/replicate/NumberSlider.js"));
const SaveTipModal_1 = __importDefault(require("../../../../chat/views/chat-body/replicate/SaveTipModal.js"));
const CustomCodeEditor_1 = __importDefault(require("../../../../components/chat/chat-body/replicate/custom-code-editor/CustomCodeEditor.js"));
const useWidgetTextMessageSender_1 = __importDefault(require("../../../../hooks/workshop/chat/useWidgetTextMessageSender.js"));
const sensors_1 = require("../../../../lib/sensors/index.js");
const store_1 = require("../../../../services/store/index.js");
function RenderForm(props) {
    const { formEle, control, setFormValue, errors, register, defaultValues, clearErrors } = props;
    let Com = null;
    if (formEle.type === 'textarea') {
        Com = CustomTextarea_1.default;
    }
    if (formEle.type === 'input') {
        Com = react_1.Input;
    }
    if (formEle.type === 'select' || formEle.type === 'numberSelect') {
        Com = CustomSelect_1.default;
    }
    if (formEle.type === 'numberSlider' || formEle.type === 'interSlider') {
        Com = NumberSlider_1.default;
    }
    if (formEle.type === 'numberInput' || formEle.type === 'interInput') {
        Com = CustomNumberInput_1.default;
    }
    if (formEle.type === 'checkbox') {
        Com = Checkbox_1.default;
    }
    if (formEle.type === 'upload') {
        Com = FileUpload_1.default;
    }
    if (formEle.type === 'codeEditor') {
        Com = CustomCodeEditor_1.default;
    }
    const handleValueChange = (value) => {
        if (setFormValue) {
            setFormValue(formEle.fieldName, value);
        }
    };
    if (Com) {
        const options = (formEle.type === 'select' || formEle.type === 'numberSelect') && formEle.options
            ? { options: formEle.options }
            : {};
        const extFiledName = {};
        if (formEle.type === 'upload') {
            const filedName = formEle.id;
            extFiledName[`x_ms_name_${filedName}`] = defaultValues?.[`x_ms_name_${filedName}`] ?? '';
            extFiledName[`x_ms_size_${filedName}`] = defaultValues?.[`x_ms_size_${filedName}`] ?? '';
        }
        return ((0, jsx_runtime_1.jsxs)(react_1.FormControl, { className: (0, clsx_1.default)('relative', formEle.wrapperClass), children: [formEle.name && ((0, jsx_runtime_1.jsxs)(react_1.FormLabel, { htmlFor: formEle.id, className: "mb-1.5 text-[14px]", children: [formEle.isRequired && (0, jsx_runtime_1.jsx)("span", { className: "text-[#EC2F0D] mr-[2px]", children: "*" }), formEle.name] })), formEle.description && ((0, jsx_runtime_1.jsx)(react_1.FormLabel, { htmlFor: formEle.id, className: "mb-1.5 text-[14px] text-secondary", children: formEle.description })), (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('flex flex-row justify-between items-center'), children: (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: formEle.id, control: control, rules: formEle.rules, render: ({ field }) => {
                            const { ref, onChange, ...rest } = field;
                            const onValueChange = (v) => {
                                let value = v;
                                if (formEle.type === 'checkbox') {
                                    value = v.target.checked;
                                }
                                else if (v.target) {
                                    value = v.target.value;
                                }
                                onChange(value);
                                handleValueChange(value);
                                if (formEle.onChange) {
                                    formEle.onChange(value);
                                }
                            };
                            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(Com, { ...rest, ...(formEle?.props || {}), ...options, ...extFiledName, type: formEle.type, supportedFileTypes: formEle.supportedFileTypes, fileUploadSizeMaximum: formEle?.fileUploadSizeMaximum || 5 * 1024 ** 2, ref: ref, onChange: (data) => {
                                        onValueChange(data);
                                    }, setFormValue: setFormValue, errors: errors, clearErrors: clearErrors, isInvalid: !!errors, ...register(formEle.fieldName, { required: formEle.isRequired }), className: (0, clsx_1.default)(formEle.type !== 'checkbox' &&
                                        'w-full border-default hover:border-hovered focus:outline focus:outline-variant focus-visible:border-pressed focus-visible:outline-offset-0 focus-visible:outline-utility-status04-70 focus-visible:shadow-none rounded-[12px]', formEle.class) }) }));
                        } }) })] }, formEle.id));
    }
    return null;
}
function WidgetFormModal({ imagePanelParams, setOpen, scrollToBottom, isMobile, widgetInfo }) {
    const energy = (0, store_1.useUserStore)(state => state.energy);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const toggleImagePanelOpen = (0, store_1.useChatStore)(state => state.toggleImagePanelOpen);
    const { sendTextMessage } = (0, useWidgetTextMessageSender_1.default)(widgetInfo);
    const sendTextRef = (0, react_2.useRef)(sendTextMessage);
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const [isSaveTipOpen, setSaveTipOpen] = (0, react_2.useState)(false);
    const isEditedRef = (0, react_2.useRef)(false);
    const [isCanSave, setIsCanSave] = (0, react_2.useState)(true);
    const [isModalOpen, setModaOpen] = (0, react_2.useState)(false);
    const componentsInput = widgetInfo?.imComponent.componentsInput || [];
    const componentsFunction = widgetInfo?.imComponent.componentsFunction || [];
    const paramsDefault = imagePanelParams?.componentInput && JSON.parse(imagePanelParams?.componentInput);
    (0, react_2.useMemo)(() => {
        sendTextRef.current = sendTextMessage;
    }, [sendTextMessage]);
    const defaultValues = (0, react_2.useMemo)(() => {
        const values = {};
        componentsInput?.forEach((item) => {
            values[item.fieldName] = (paramsDefault?.[item.fieldName] || item.defaultValue) ?? '';
            if (item.type === 'upload') {
                values[item.fieldName] = (paramsDefault?.[item.fieldName] || item.fileDefaultParam) ?? '';
                values[`x_ms_name_${item.fieldName}`] = paramsDefault?.[`x_ms_name_${item.fieldName}`] ?? '';
                values[`x_ms_size_${item.fieldName}`] = paramsDefault?.[`x_ms_size_${item.fieldName}`] ?? '';
            }
        });
        return values;
    }, [componentsInput]);
    const { control, handleSubmit, setValue, watch, reset, register, getValues, clearErrors, setError, formState: { errors, isSubmitting } } = (0, react_hook_form_1.useForm)({
        defaultValues
    });
    const setCanSaveHandle = () => {
        let canSave = true;
        componentsInput?.forEach((item) => {
            if (canSave && item.isRequired) {
                if ((paramsDefault && !paramsDefault?.[item.id]) || (!paramsDefault && !item.defaultValue)) {
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
    const sensors = (0, sensors_1.useSensors)();
    (0, usehooks_ts_1.useEffectOnce)(() => {
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
        await scrollToBottom();
        sendTextRef.current({
            requestData: {
                params: JSON.stringify(params)
            }
        });
        toggleImagePanelOpen({ visible: false });
    };
    const onSaveTipClose = () => {
        setSaveTipOpen(false);
    };
    const onSaveTipConfirm = () => {
        setSaveTipOpen(false);
        toggleImagePanelOpen({ visible: false });
    };
    const handleDrawerClose = () => {
        if (isEditedRef.current && isCanSave) {
            setSaveTipOpen(true);
        }
        else {
            setOpen(false);
        }
    };
    const batteryCost = widgetInfo?.imComponent.energyConsumePerUse;
    const noEnoughEnergy = isVisitor === 2 && energy < (batteryCost ?? 0);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_1.Modal, { isOpen: imagePanelParams?.visible, isCentered: true, onClose: handleDrawerClose, size: isMobile ? 'full' : '', children: (0, jsx_runtime_1.jsx)(react_1.ModalOverlay, { className: "bg-alpha-mask-desktop", children: (0, jsx_runtime_1.jsxs)(react_1.ModalContent, { className: (0, clsx_1.default)('max-w-[768px] max-h-[620px] m-0 bg-surface rounded-[24px] flex items-center', isMobile ? 'rounded-none' : ''), style: {
                            boxShadow: '0px 0px 40px 0px rgba(0, 0, 0, 0.10)'
                        }, children: [!isMobile && (0, jsx_runtime_1.jsx)(react_1.ModalCloseButton, { className: "top-6 right-6 text-secondary" }), (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('py-4 px-6 border-b border-default text-on-surface w-full', isMobile ? 'flex flex-row justify-between items-center' : ''), children: [(0, jsx_runtime_1.jsx)("h1", { className: (0, clsx_1.default)('text-2xl line-clamp-1', isMobile ? 'max-w-[80%]' : ''), children: widgetInfo?.imComponent?.name }), isMobile && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: componentsFunction?.map((item) => {
                                            if (item.functionName === 'getImageInfo') {
                                                return ((0, jsx_runtime_1.jsxs)("button", { className: "ml-1 flex-grow flex-shrink-0 flex justify-end self-end flex-row flex-nowrap border-default rounded-full text-primary font-normal", onClick: () => setModaOpen(true), children: [(0, jsx_runtime_1.jsx)(ArrowUpTrayIcon_1.default, { className: "w-5 h-5 text-primary mr-1.5" }), " ", chatT('panel.get_imginfo')] }, `mob_btn_${item.functionName}`));
                                            }
                                        }) })), !isMobile && (0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: widgetInfo?.imComponent?.description })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full px-6 py-3 overflow-y-auto text-on-surface flex-grow", children: (0, jsx_runtime_1.jsx)("form", { onSubmit: handleSubmit(onSubmit), id: "hook-form", className: "space-y-4", children: componentsInput.map((formEle, index) => {
                                        const anyErrors = errors;
                                        if (formEle.isRequired && formEle.value == '') {
                                            setError(formEle.id, { type: 'required' });
                                        }
                                        return ((0, jsx_runtime_1.jsx)(RenderForm, { defaultValues: defaultValues, formEle: formEle, control: control, errors: anyErrors[formEle.id], setFormValue: setValue, register: register, clearErrors: clearErrors }, formEle.id));
                                    }) }) }), (0, jsx_runtime_1.jsxs)(react_1.ModalFooter, { className: (0, clsx_1.default)('border-t border-default flex  items-center py-4 px-6 w-full', imagePanelParams?.msgId ? 'justify-end' : 'justify-between'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex", children: [!imagePanelParams?.msgId && !isMobile && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: componentsFunction?.map((item) => {
                                                    if (item.functionName === 'getImageInfo') {
                                                        return ((0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "outline", className: "border-default rounded-full text-primary font-normal", onClick: () => setModaOpen(true), children: [(0, jsx_runtime_1.jsx)(ArrowUpTrayIcon_1.default, { className: "w-5 h-5 text-primary mr-1.5" }), " ", chatT('panel.get_imginfo')] }, `btn_${item.functionName}`));
                                                    }
                                                }) })), isMobile && ((0, jsx_runtime_1.jsx)(react_1.Button, { variant: "outline", className: "border-default rounded-full text-on-surface font-normal px-6", onClick: handleDrawerClose, children: chatT('cancel') }))] }), (0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "unstyled", className: (0, clsx_1.default)('px-6 py-[10px] rounded-full bg-primary text-white font-normal flex justify-center items-center min-w-[158px]', isMobile ? 'flex-grow flex-shrink-0 ml-3' : '', !isCanSave ? 'opacity-30' : ''), type: "submit", form: "hook-form", isDisabled: noEnoughEnergy, _hover: {
                                            _loading: {
                                                bg: 'var(--primary)'
                                            }
                                        }, children: [chatT('panel.generate'), (0, jsx_runtime_1.jsxs)("div", { className: "ml-1.5 flex flex-row justify-center items-center", children: [(0, jsx_runtime_1.jsx)("img", { src: "/icons/thunder.svg", alt: "thunder", className: "w-4 h-4" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-white ml-[2px]", children: widgetInfo?.imComponent.energyConsumePerUse })] })] })] })] }) }) }), componentsFunction?.map((item) => {
                if (item.functionName === 'getImageInfo') {
                    return ((0, jsx_runtime_1.jsx)(GetImageInfoModal_1.default, { imagePanelParams: imagePanelParams, watch: watch, reset: reset, getValues: getValues, isMobile: isMobile, isOpen: isModalOpen, setModaOpen: setModaOpen }, item.functionName));
                }
            }), isSaveTipOpen && (0, jsx_runtime_1.jsx)(SaveTipModal_1.default, { isOpen: isSaveTipOpen, onClose: onSaveTipClose, onConfirmed: onSaveTipConfirm })] }));
}
exports.default = WidgetFormModal;
