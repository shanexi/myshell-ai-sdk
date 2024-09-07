"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ArrowPathIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowPathIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const bot_1 = require("../../../../apis/bot.js");
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner.js"));
const useCheckEnergyPack_1 = __importDefault(require("../../../../common/hooks/useCheckEnergyPack.js"));
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const tokenizer_1 = require("../../../../common/utils/tokenizer.js");
const RefreshPromptModal_1 = __importDefault(require("../../../../components/workshop/create/RefreshPromptModal.js"));
const useGetEnergyInfo_1 = __importDefault(require("../../../../hooks/user/useGetEnergyInfo.js"));
const sensors_1 = require("../../../../lib/sensors/index.js");
const store_1 = require("../../../../services/store/index.js");
const workshop_1 = require("../../../../services/store/workshop.js");
const BotModel_1 = __importDefault(require("./BotModel.js"));
const GeneratingModal_1 = __importDefault(require("./GeneratingModal.js"));
const NoEnergyModal_1 = __importDefault(require("./NoEnergyModal.js"));
const PromptUpdateTipModal_1 = __importDefault(require("./PromptUpdateTipModal.js"));
const WidgetsButtons_1 = __importDefault(require("../WidgetsButtons.js"));
const LoadingContext = (0, react_2.createContext)({
    loading: false,
    dirty: false
});
function AdvancedPromptForm({ form, isGuide, modelOptions, queryingModelOptions }) {
    const [preLoading, setPreLoading] = (0, react_2.useState)({
        loading: false,
        dirty: false
    });
    const [postLoading, setPostLoading] = (0, react_2.useState)({
        loading: false,
        dirty: false
    });
    const t = (0, next_intl_1.useTranslations)('workshop');
    const [openPrefix, setOpenPrefix] = (0, react_2.useState)(form.getFieldValue('openPrefix'));
    const [openPostfix, setOpenPostfix] = (0, react_2.useState)(form.getFieldValue('openPostfix'));
    const [prePromptErr, setPrePromptErr] = (0, react_2.useState)(false);
    const [postPromptErr, setPostPromptErr] = (0, react_2.useState)(false);
    const [promptModalType, setPromptModalType] = (0, react_2.useState)('');
    const setOriForm = (0, workshop_1.useWorkshopStore)(state => state.setOriForm);
    const botId = form.getFieldValue('botId');
    const [generatingVisibile, setGeneratingVisibile] = (0, react_2.useState)(false);
    const [autoPromptTipVisibile, setAutoPromptTipVisibile] = (0, react_2.useState)(false);
    const [savePromptTipVisibile, setSavePromptTipVisibile] = (0, react_2.useState)(false);
    const [errTip, setErrTip] = (0, react_2.useState)('');
    const createAutoPromptTaskResult = (0, store_1.useGlobalStore)(state => state.createAutoPromptTaskResult);
    const status = createAutoPromptTaskResult?.status;
    const noEnergyWithUsablePropModalVisible = (0, store_1.useGlobalStore)(state => state.noEnergyWithUsablePropModalVisible);
    const [saveLoading, setSaveLoading] = (0, react_2.useState)(false);
    const energy = (0, store_1.useUserStore)(state => state.energy);
    const { success, warning } = (0, useNotification_1.useNotification)();
    const [loading, setLoading] = (0, react_2.useState)({
        loading: false,
        dirty: false
    });
    const { getEnergyInfo } = (0, useGetEnergyInfo_1.default)();
    const setAutoPromptTaskResult = (0, store_1.useGlobalStore)(state => state.setAutoPromptTaskResult);
    const oriForm = (0, workshop_1.useWorkshopStore)(state => state.oriForm);
    const currentForm = (0, workshop_1.useWorkshopStore)(state => state.currentForm);
    const setCurrentForm = (0, workshop_1.useWorkshopStore)(state => state.setCurrentForm);
    const sensors = (0, sensors_1.useSensors)();
    const handleGetAdvanedPrompt = (type) => {
        if (!botId || isGuide) {
            return;
        }
        const loading = type === 'prefix' ? preLoading : postLoading;
        if (loading.loading) {
            return;
        }
        const setLoading = type === 'prefix' ? setPreLoading : setPostLoading;
        setLoading({
            ...loading,
            loading: true
        });
        getAdvanedPromptHandle(type);
    };
    const closeLoadingAll = () => {
        setPreLoading({
            ...preLoading,
            loading: false
        });
        setPostLoading({
            ...postLoading,
            loading: false
        });
    };
    const getAdvanedPromptHandle = (type) => {
        const loading = type === 'prefix' ? preLoading : postLoading;
        const setLoading = type === 'prefix' ? setPreLoading : setPostLoading;
        (0, bot_1.getAdvanedPrompt)(`${botId}`).subscribe({
            error: err => {
                if (type === 'all') {
                    setPrePromptErr(true);
                    setPostPromptErr(true);
                    closeLoadingAll();
                }
                else {
                    const setPromptErr = type === 'prefix' ? setPrePromptErr : setPostPromptErr;
                    setPromptErr(true);
                    setLoading({
                        ...loading,
                        loading: false
                    });
                }
            },
            next: data => {
                if (type === 'prefix' || type === 'all') {
                    if (data?.prefix == '') {
                        setPrePromptErr(true);
                    }
                    else {
                        form.setFieldValue('prefix', data?.prefix);
                        setCurrentForm({ ...currentForm, prefix: data?.prefix });
                    }
                }
                if (type === 'postfix' || type === 'all') {
                    if (data?.postfix == '') {
                        setPostPromptErr(true);
                    }
                    else {
                        form.setFieldValue('postfix', data?.postfix);
                        setCurrentForm({ ...currentForm, postfix: data?.postfix });
                    }
                }
                if (type === 'all') {
                    closeLoadingAll();
                }
                else {
                    setLoading({
                        ...loading,
                        loading: false
                    });
                }
            }
        });
    };
    (0, react_2.useEffect)(() => {
        if (form.getFieldValue('autoUpdatePrefixSuffix') && createAutoPromptTaskResult?.status === 'Processing') {
            openPrefix &&
                setPreLoading({
                    ...preLoading,
                    loading: true
                });
            openPostfix &&
                setPostLoading({
                    ...postLoading,
                    loading: true
                });
        }
        if (form.getFieldValue('autoUpdatePrefixSuffix') && createAutoPromptTaskResult?.status === 'Done') {
            if (openPrefix && openPrefix) {
                getAdvanedPromptHandle('all');
            }
            else {
                openPrefix && getAdvanedPromptHandle('prefix');
                openPostfix && getAdvanedPromptHandle('postfix');
            }
        }
    }, [createAutoPromptTaskResult?.status]);
    const showAutoPromptModal = () => {
        if (!isGuide) {
            if (!form.getFieldValue('name')) {
                setErrTip('name');
            }
            else {
                setGeneratingVisibile(true);
            }
        }
    };
    const { getIsNoEnergy } = (0, useCheckEnergyPack_1.default)();
    const [isNoEnergy, setIsNoEnergy] = (0, react_2.useState)(false);
    const checkIfPromptIsExisted = () => {
        if (energy < 30) {
            const noEnergy = getIsNoEnergy();
            setIsNoEnergy(noEnergy);
            return;
        }
        checkAutoPromptTip();
    };
    const checkAutoPromptTip = () => {
        if (!!form.getFieldValue('prompt') && botId) {
            setAutoPromptTipVisibile(true);
        }
        else {
            handleCreateAutoPromptTask();
        }
    };
    const handleCreateAutoPromptTask = () => {
        if (loading.loading) {
            return;
        }
        const name = form.getFieldValue('name');
        const desc = form.getFieldValue('promptDescription');
        if (!name && !desc) {
            return;
        }
        setLoading({
            ...loading,
            loading: true
        });
        (0, bot_1.createAutoPromptTask)(name, desc).subscribe({
            error: () => {
                setAutoPromptTaskResult({
                    id: -1,
                    status: 'Failed',
                    error: 'Time out'
                });
                setLoading({
                    ...loading,
                    loading: false
                });
                setIsNoEnergy(false);
                warning({ content: t('create_bot_profile_created_fail') });
            },
            next: data => {
                setAutoPromptTaskResult(data);
                getEnergyInfo();
                setIsNoEnergy(false);
            }
        });
    };
    (0, react_2.useEffect)(() => {
        if (status === 'Done') {
            setLoading({
                ...loading,
                loading: false
            });
            form.setFieldValue('prompt', `${createAutoPromptTaskResult?.prompt || ''}`);
            setGeneratingVisibile(false);
            success({ content: t('create_bot_profile_created_suc') });
            setCurrentFormHandle({ prompt: createAutoPromptTaskResult?.prompt || '' });
        }
        if (status === 'Failed') {
            setLoading({
                ...loading,
                loading: false
            });
            warning({ content: t('create_bot_profile_created_fail') });
        }
    }, [status]);
    const setCurrentFormHandle = (data) => {
        setCurrentForm({ ...currentForm, ...data });
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("div", { id: "prompt", className: "flex flex-col", children: (0, jsx_runtime_1.jsx)("p", { className: "flex items-center text-xl", children: t('create_bot_profile_prompt') }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-4 flex", children: (0, jsx_runtime_1.jsx)(BotModel_1.default, { form: form, isGuide: isGuide, modelOptions: modelOptions, queryingModelOptions: queryingModelOptions }) }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-6", children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col space-y-[10px]", children: (0, jsx_runtime_1.jsx)(form.Field, { name: "prompt", validate: value => (0, tokenizer_1.getTokenCount)(value || '') > 1500 && t('create_bot_profile_prompt_err', { count: 200 }), validateAsyncOn: "change", validateAsyncDebounceMs: 500, children: field => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("label", { htmlFor: field.name, className: "text-sm md:text-base focus:ring-2 flex flex-col md:flex-row justify-between items-start md:items-center pb-2 md:pb-0", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-on-surface mb-2 md:mb-0", children: t('create_bot_profile_prompt') }), (0, jsx_runtime_1.jsx)(WidgetsButtons_1.default, { id: "prompt-widget-buttons", isDisabled: isGuide, links: {
                                                                widget: '1742194864566571008',
                                                                tool: '1742195260089438208$$1742972254938992640'
                                                            } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("textarea", { name: field.name, disabled: false, className: `w-full bg-transparent flex-1 disabled:cursor-not-allowed resize-none rounded-[12px] border border-default flex h-[200px] py-[8px] px-[12px] relative shadow pb-5 hover:border-hover
                         ${(0, tokenizer_1.getTokenCount)(field.getValue() || '') > 3000 ? '!border-[#EF4444]' : ''}`, placeholder: t('create_bot_profile_prompt_placeholder'), ...field.getInputProps(), onChange: e => {
                                                                field.setValue(e.target.value);
                                                                setCurrentForm({
                                                                    ...currentForm,
                                                                    prompt: e.target.value,
                                                                    publishPrompt: e.target.value == '' ? false : currentForm?.publishPrompt
                                                                });
                                                            } }), (0, jsx_runtime_1.jsx)("div", { className: "absolute right-0 bottom-2 px-2 rounded-[20px]", children: (0, jsx_runtime_1.jsx)("span", { className: "text-[#B9B9B9] text-sm bg-surface-default px-2 py-1 rounded-[12px]", children: `${(0, tokenizer_1.getTokenCount)(field.getValue() || '')}/3000 ${t('tokens')}` }) })] })] })) }) }) }), (0, jsx_runtime_1.jsx)(react_1.Accordion, { allowToggle: true, children: (0, jsx_runtime_1.jsxs)(react_1.AccordionItem, { children: [(0, jsx_runtime_1.jsxs)(react_1.AccordionButton, { className: "flex justify-between items-center mt-[18px]", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-between items-center text-sm md:text-base cursor-pointer", children: t('enhanced_prompt_title') }), (0, jsx_runtime_1.jsx)(react_1.AccordionIcon, { className: "w-[18px] h-[18px] fill-[--on-surface-btn-text]" })] }), (0, jsx_runtime_1.jsx)(react_1.AccordionPanel, { className: "pb-2.5", children: (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('flex flex-col pt-2.5 overflow-hidden'), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row justify-between space-y-4 md:space-y-0", id: "advancedAutoFix", children: [(0, jsx_runtime_1.jsx)(LoadingContext.Provider, { value: preLoading, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2 w-full mr-[32px]", children: [(0, jsx_runtime_1.jsx)(OpenSwitch, { form: form, name: "openPrefix", title: "prefix", isGuide: isGuide, setOpenFix: open => {
                                                                            setOpenPrefix(open);
                                                                            setCurrentForm({ ...currentForm, openPrefix: open });
                                                                            if (open && !form.getFieldValue('prefix') && botId) {
                                                                                handleGetAdvanedPrompt('prefix');
                                                                                setPromptModalType('prefix');
                                                                            }
                                                                        } }), (0, jsx_runtime_1.jsx)(PromptDetail, { handleGetAdvanedPrompt: handleGetAdvanedPrompt, promptErr: prePromptErr, form: form, name: "prefix", open: openPrefix || false, isGuide: isGuide })] }) }), (0, jsx_runtime_1.jsx)(LoadingContext.Provider, { value: postLoading, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2 w-full", children: [(0, jsx_runtime_1.jsx)(OpenSwitch, { form: form, name: "openPostfix", title: "postfix", isGuide: isGuide, setOpenFix: open => {
                                                                            setOpenPostfix(open);
                                                                            setCurrentForm({ ...currentForm, openPostfix: open });
                                                                            if (open && !form.getFieldValue('postfix') && botId) {
                                                                                handleGetAdvanedPrompt('postfix');
                                                                                setPromptModalType('postfix');
                                                                            }
                                                                        } }), (0, jsx_runtime_1.jsx)(PromptDetail, { handleGetAdvanedPrompt: handleGetAdvanedPrompt, promptErr: postPromptErr, form: form, name: "postfix", open: openPostfix || false, isGuide: isGuide })] }) })] }) }) })] }) })] })] }), generatingVisibile && ((0, jsx_runtime_1.jsx)(GeneratingModal_1.default, { isOpen: generatingVisibile, onClose: () => {
                    setGeneratingVisibile(false);
                }, loading: loading, checkIfPromptIsExisted: checkIfPromptIsExisted, form: form, setCurrentFormHandle: setCurrentFormHandle })), autoPromptTipVisibile && ((0, jsx_runtime_1.jsx)(PromptUpdateTipModal_1.default, { isOpen: autoPromptTipVisibile, onClose: () => {
                    setAutoPromptTipVisibile(false);
                }, onConfirmed: () => {
                    setAutoPromptTipVisibile(false);
                    handleCreateAutoPromptTask();
                } })), isNoEnergy && ((0, jsx_runtime_1.jsx)(NoEnergyModal_1.default, { isOpen: isNoEnergy, onConfirm: checkAutoPromptTip, onClose: () => {
                    setIsNoEnergy(false);
                } })), promptModalType && ((0, jsx_runtime_1.jsx)(RefreshPromptModal_1.default, { isOpen: promptModalType !== '', type: promptModalType, onClose: () => {
                    setPromptModalType('');
                }, onConfirmed: () => {
                    if (promptModalType === 'autoPrompt') {
                        form.setFieldValue('autoUpdatePrefixSuffix', true);
                        setCurrentForm({ ...currentForm, autoUpdatePrefixSuffix: true });
                    }
                    setPromptModalType('');
                } }))] }));
}
function PromptDetail({ form, name, open, promptErr, handleGetAdvanedPrompt, isGuide }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const loading = (0, react_2.useContext)(LoadingContext);
    const textRef = (0, react_2.useRef)(null);
    const [state, setState] = (0, react_2.useState)('');
    (0, react_2.useEffect)(() => {
        setState('render');
    }, []);
    const [refreshing, setRefreshing] = (0, react_2.useState)(false);
    const refreshPromtFix = () => {
        if (!isGuide) {
            !refreshing && handleGetAdvanedPrompt(name);
            setRefreshing(true);
            const refreshCountDown = setTimeout(() => {
                clearTimeout(refreshCountDown);
                setRefreshing(false);
            }, 20000);
        }
    };
    const disable = !open || refreshing;
    const botId = form.getFieldValue('botId');
    const currentForm = (0, workshop_1.useWorkshopStore)(state => state.currentForm);
    const setCurrentForm = (0, workshop_1.useWorkshopStore)(state => state.setCurrentForm);
    return ((0, jsx_runtime_1.jsx)(form.Field, { name: name, validate: value => (0, tokenizer_1.getTokenCount)(value || '') > 200 && t('maximum_support', { count: 200 }), validateAsyncOn: "change", validateAsyncDebounceMs: 500, children: field => ((0, jsx_runtime_1.jsxs)("div", { className: `relative z-9 p-1 ${disable ? 'opacity-50 pointer-events-none' : ''}`, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("textarea", { ref: textRef, name: field.name, disabled: isGuide, className: `w-full bg-transparent flex-1 disabled:cursor-not-allowed resize-none rounded-[12px] border flex h-[360px] py-[8px] px-[12px] relative shadow pb-10 text-[14px]
                ${disable && 'bg-surface'}
                  ${field.state.meta.touchedError || promptErr
                                ? '!border-[#EF4444] border-[2px]'
                                : 'border-default hover:border-hovered'}`, placeholder: t(`enhanced_prompt_p_${name}`), ...field.getInputProps(), onChange: e => {
                                field.setValue(e.target.value);
                                const nameObj = name === 'prefix' ? { prefix: e.target.value } : { postfix: e.target.value };
                                setCurrentForm({ ...currentForm, ...nameObj });
                            } }), !!botId && ((0, jsx_runtime_1.jsx)("div", { className: "absolute left-[12px] bottom-[8px] rounded-full border border-default p-[5px] bg-surface-default", onClick: refreshPromtFix, children: (0, jsx_runtime_1.jsx)(ArrowPathIcon_1.default, { className: `w-[18px] h-[18px] ${disable ? 'text-[#C9CCD0]' : 'stroke-primary cursor-pointer'} ${refreshing && 'animate-spin'}` }) })), (0, jsx_runtime_1.jsx)("div", { className: "absolute right-[12px] bottom-[8px] px-2", children: (0, jsx_runtime_1.jsx)("span", { className: "text-[#B9B9B9] text-sm bg-surface-default px-2 py-1 rounded-[12px]", children: `${(0, tokenizer_1.getTokenCount)(textRef.current?.value ?? '')}/200` }) })] }), field.state.meta.touchedError && (0, jsx_runtime_1.jsx)("div", { className: "text-red-500 mt-2", children: field.state.meta.touchedError }), promptErr && ((0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: 14, color: "#EC2F0D", mt: 2, children: t('enhance_auto_prompt_err') })), loading.loading && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute top-0 bottom-0 left-0 right-0 bg-surface z-20 flex flex-col justify-center items-center border border-default rounded-[12px] space-y-4 ", children: [(0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand stroke-[3px]" }), (0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: 16, color: "var(--on-surface)", children: t('processing') })] }))] })) }));
}
function OpenSwitch({ form, name, title, setOpenFix, isGuide }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    return ((0, jsx_runtime_1.jsx)(form.Field, { name: name, children: field => ((0, jsx_runtime_1.jsxs)("div", { className: "border-default flex justify-between items-center py-3 md:py-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-[12px] leading-[20px] inline-flex items-center", children: (0, jsx_runtime_1.jsx)("span", { children: t(`enhanced_${title}`) }) }), (0, jsx_runtime_1.jsx)(react_1.Switch, { name: field.name, size: "md", colorScheme: "brand", isChecked: field.getValue(), ...field.getInputProps(), isDisabled: isGuide, onChange: (e) => {
                        if (!isGuide) {
                            field.setValue(e.target.checked);
                            setOpenFix(e.target.checked);
                        }
                    } })] })) }));
}
exports.default = AdvancedPromptForm;
