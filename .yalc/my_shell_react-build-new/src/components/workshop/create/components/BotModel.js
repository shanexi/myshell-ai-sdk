"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const AdjustmentsHorizontalIcon_1 = __importDefault(require("@heroicons/react/24/outline/AdjustmentsHorizontalIcon"));
const CheckIcon_1 = __importDefault(require("@heroicons/react/24/outline/CheckIcon"));
const ChevronDownIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronDownIcon"));
const CogIcon_1 = __importDefault(require("@heroicons/react/24/outline/CogIcon"));
const QuestionMarkCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/QuestionMarkCircleIcon"));
const next_intl_1 = require("next-intl");
const next_themes_1 = require("next-themes");
const image_1 = __importDefault(require("next/image"));
const react_2 = require("react");
const tooltip_1 = require("../../../../common/components/ui/tooltip.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const bot_1 = require("../../../../common/constants/enums/bot.js");
const useUserSettings_1 = __importDefault(require("../../../../common/hooks/useUserSettings.js"));
const useHandleAnyFormValueChange_1 = require("../../../../components/workshop/create/hooks/useHandleAnyFormValueChange.js");
const store_1 = require("../../../../services/store/index.js");
const workshop_1 = require("../../../../services/store/workshop.js");
function BotModel({ form, isGuide, modelOptions, queryingModelOptions }) {
    const { handleModelConfigClicked } = (0, useUserSettings_1.default)();
    const handleAnyFormValueChange = (0, useHandleAnyFormValueChange_1.useHandleAnyFormValueChange)();
    const modelConfigClicked = (0, store_1.useUserStore)(state => state.modelConfigClicked);
    const t = (0, next_intl_1.useTranslations)('workshop');
    const currentForm = (0, workshop_1.useWorkshopStore)(state => state.currentForm);
    const setCurrentForm = (0, workshop_1.useWorkshopStore)(state => state.setCurrentForm);
    const setEditNotSave = (0, workshop_1.useWorkshopStore)(state => state.setEditNotSave);
    const [modelPanelVisible, setModelPanelVisible] = (0, react_2.useState)(false);
    const contentRef = (0, react_2.useRef)();
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const isDark = resolvedTheme === 'dark';
    const selectedLlmModel = modelOptions.find(o => o.id === form.getFieldValue('model'));
    const toggleModelPanel = (0, react_2.useCallback)((state) => {
        setModelPanelVisible(state ?? !modelPanelVisible);
    }, [modelPanelVisible]);
    function hasAncestorWithClass(element, className) {
        let ele = element;
        while (ele) {
            if (ele.classList.contains(className)) {
                return true;
            }
            if (ele.parentElement) {
                ele = ele.parentElement;
            }
            else {
                return false;
            }
        }
        return false;
    }
    (0, react_1.useOutsideClick)({
        ref: contentRef,
        handler: (e) => {
            if (hasAncestorWithClass(e.target, 'model-panel-btn')) {
                return;
            }
            toggleModelPanel(false);
        }
    });
    const handleScrollSelectedModelIntoView = () => {
        setTimeout(() => {
            if (!selectedLlmModel)
                return;
            const ele = document.getElementById(selectedLlmModel.id);
            if (ele) {
                ele.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            }
        }, 200);
    };
    return ((0, jsx_runtime_1.jsx)(react_1.Flex, { id: "advancedTurbo", fontSize: "14px", lineHeight: "20px", alignItems: "center", gap: "8px", className: "pt-3 pr-8 w-full", children: (0, jsx_runtime_1.jsxs)(react_1.Popover, { offset: [0, 10], placement: "bottom-start", isOpen: modelPanelVisible, closeOnBlur: true, children: [(0, jsx_runtime_1.jsx)(react_1.PopoverTrigger, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3", children: [(0, jsx_runtime_1.jsx)(react_1.Text, { className: "text-sm md:text-base", children: t('model_configuration') }), (0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "unstyled", border: "1px solid var(--border)", boxShadow: "0px 1px 0px 0px #0000000D", _hover: {
                                    bgColor: 'transparent'
                                }, className: "model-panel-btn rounded-xl text-primary px-4 py-2 flex space-x-[6px] items-center relative h-[38px]", onClick: () => {
                                    if (!isGuide) {
                                        !modelConfigClicked && handleModelConfigClicked();
                                    }
                                    toggleModelPanel();
                                }, isDisabled: isGuide, isLoading: queryingModelOptions, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between w-full space-x-1", children: [selectedLlmModel && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [selectedLlmModel.iconUrl && ((0, jsx_runtime_1.jsx)(image_1.default, { alt: "llm model icon", src: selectedLlmModel.iconUrl, width: 20, height: 20, className: "rounded-md overflow-hidden" })), (0, jsx_runtime_1.jsx)("span", { className: "grow font-medium text-sm text-on-surface", children: selectedLlmModel.modelName })] })), (0, jsx_runtime_1.jsx)(AdjustmentsHorizontalIcon_1.default, { className: "w-5 h-5 stroke-primary" })] }), !modelConfigClicked && ((0, jsx_runtime_1.jsx)(react_1.Box, { position: "absolute", h: "14px", w: "28px", bgColor: "#F12F2F", color: "white", display: "inline-flex", alignItems: "center", justifyContent: "center", rounded: "full", top: "-7px", right: "-14px", children: (0, jsx_runtime_1.jsx)("span", { className: "text-[16px] leading-[16px] scale-50", children: "New" }) }))] })] }) }), !isGuide ? ((0, jsx_runtime_1.jsx)(react_1.PopoverContent, { border: "none", className: "bg-surface w-[90vw] md:max-w-[600px]", ref: contentRef, children: (0, jsx_runtime_1.jsx)(react_1.PopoverBody, { p: 0, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col px-6 py-4 rounded-xl space-y-4 shadow-[0_0_40px_0_#0000001A]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2 items-center", children: [(0, jsx_runtime_1.jsx)(CogIcon_1.default, { className: "w-[22px] h-[22px] stroke-primary" }), (0, jsx_runtime_1.jsx)("span", { className: "text-on-surface text-sm font-medium uppercase", children: t('model_configuration') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between space-x-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "font-medium", children: t('bot_model_selection') }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(form.Field, { name: "model", children: field => ((0, jsx_runtime_1.jsxs)(react_1.Menu, { placement: "bottom-end", offset: [0, 6], closeOnSelect: false, onOpen: handleScrollSelectedModelIntoView, children: [(0, jsx_runtime_1.jsx)(react_1.MenuButton, { h: "36px", minW: "207px", pl: "12px", pr: "6px", py: "5px", display: "flex", as: react_1.Button, variant: "unstyled", border: "1px solid var(--border)", borderRadius: "12px", boxShadow: "0px 1px 0px 0px #0000000D", rightIcon: (0, jsx_runtime_1.jsx)(ChevronDownIcon_1.default, { className: "w-[20px] h-[20px]" }), fontSize: "14px", lineHeight: "20px", fontWeight: "normal", children: selectedLlmModel && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [selectedLlmModel.iconUrl && ((0, jsx_runtime_1.jsx)(image_1.default, { alt: "llm model icon", src: selectedLlmModel.iconUrl, width: 20, height: 20, className: "rounded-md overflow-hidden" })), (0, jsx_runtime_1.jsx)("span", { className: "font-medium text-sm text-on-surface", children: selectedLlmModel.modelName })] })) }), (0, jsx_runtime_1.jsxs)(react_1.MenuList, { p: "8px", gap: "3px", borderRadius: "12px", borderColor: "var(--border)", className: "bg-surface h-[240px] w-[319px] shadow-[0_0_40px_0_#0000001A] overflow-auto no-scrollbar space-y-1", sx: {
                                                                        '.chakra-menu__group__title': {
                                                                            margin: '0',
                                                                            padding: '4px 8px',
                                                                            color: isDark ? '#868996' : '#6D7175',
                                                                            fontSize: '14px',
                                                                            lineHeight: '20px',
                                                                            fontWeight: 500
                                                                        }
                                                                    }, children: [(0, jsx_runtime_1.jsx)(react_1.MenuGroup, { title: t('model_category.closed_source'), children: modelOptions
                                                                                .filter(o => o.categories === bot_1.LLMModelCategoryEnum.BOT_CHAT_MODEL_CATEGORY_CLOSESOURCE)
                                                                                .map(option => ((0, jsx_runtime_1.jsx)(react_1.MenuItem, { mt: 1, p: 0, onClick: () => {
                                                                                    field.setValue(option.id);
                                                                                    handleAnyFormValueChange();
                                                                                    setCurrentForm({ ...currentForm, model: option.id });
                                                                                    setEditNotSave();
                                                                                }, isDisabled: option.status === bot_1.LLMModelStatusEnum.BOT_CHAT_MODEL_STATUS_DISABLE, className: "disabled:opacity-100 bg-surface-default", children: (0, jsx_runtime_1.jsxs)("div", { id: option.id, className: "w-full flex justify-between items-center px-2 py-1 min-h-9 h-fit rounded-lg space-x-2 hover:bg-[#F2F7FE] hover:dark:bg-[#2D2E33]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2 items-center", children: [option?.iconUrl && ((0, jsx_runtime_1.jsx)(image_1.default, { alt: "llm model icon", src: option.iconUrl, width: 24, height: 24, className: "rounded-md overflow-hidden" })), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-[2px] items-center", children: [(0, jsx_runtime_1.jsx)("span", { children: option.modelName }), option.modelDescription && ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { side: "top", description: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { children: t('model_desc.energy', {
                                                                                                                            energy: option.energyPerChatBase
                                                                                                                        }) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { dangerous: true, size: "xs", children: option.description.replaceAll('\n', '<br />') })] }), children: (0, jsx_runtime_1.jsx)(QuestionMarkCircleIcon_1.default, { className: "w-[18px] h-[18px] stroke-secondary" }) }))] })] }), field.getValue() === option.id && ((0, jsx_runtime_1.jsx)(CheckIcon_1.default, { className: "stroke-primary w-4 h-4" })), option.status === bot_1.LLMModelStatusEnum.BOT_CHAT_MODEL_STATUS_DISABLE && ((0, jsx_runtime_1.jsx)("div", { className: "px-[10px] py-1 text-primary rounded-full bg-[#F2F4FE] dark:bg-[#292C38] text-xs shrink-0", children: t('coming_soon') }))] }) }, option.id))) }), (0, jsx_runtime_1.jsx)(react_1.MenuGroup, { title: t('model_category.open_source'), children: modelOptions
                                                                                .filter(o => o.categories === bot_1.LLMModelCategoryEnum.BOT_CHAT_MODEL_CATEGORY_OPENSOURCE)
                                                                                .map(option => ((0, jsx_runtime_1.jsx)(react_1.MenuItem, { mt: 1, p: 0, onClick: () => {
                                                                                    field.setValue(option.id);
                                                                                    handleAnyFormValueChange();
                                                                                    setCurrentForm({ ...currentForm, model: option.id });
                                                                                    setEditNotSave();
                                                                                }, isDisabled: option.status === bot_1.LLMModelStatusEnum.BOT_CHAT_MODEL_STATUS_DISABLE, className: "disabled:opacity-100 bg-surface-default", children: (0, jsx_runtime_1.jsxs)("div", { id: option.id, className: "w-full flex justify-between items-center px-2 py-1 min-h-9 h-fit rounded-lg space-x-2 hover:bg-[#F2F7FE] hover:dark:bg-[#2D2E33]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2 items-center", children: [option?.iconUrl && ((0, jsx_runtime_1.jsx)(image_1.default, { alt: "llm model icon", src: option.iconUrl, width: 24, height: 24, className: "rounded-md overflow-hidden" })), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-[2px] items-center", children: [(0, jsx_runtime_1.jsx)("span", { children: option.modelName }), option.modelDescription && ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { side: "top", description: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { children: t('model_desc.energy', {
                                                                                                                            energy: option.energyPerChatBase
                                                                                                                        }) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { dangerous: true, size: "xs", children: option.description.replaceAll('\n', '<br />') })] }), children: (0, jsx_runtime_1.jsx)(QuestionMarkCircleIcon_1.default, { className: "w-[18px] h-[18px] stroke-secondary" }) }))] })] }), field.getValue() === option.id && ((0, jsx_runtime_1.jsx)(CheckIcon_1.default, { className: "stroke-primary w-4 h-4" })), option.status === bot_1.LLMModelStatusEnum.BOT_CHAT_MODEL_STATUS_DISABLE && ((0, jsx_runtime_1.jsx)("div", { className: "px-[10px] py-1 text-primary rounded-full bg-[#F2F4FE] dark:bg-[#292C38] text-xs shrink-0", children: t('coming_soon') }))] }) }, option.id))) }), (0, jsx_runtime_1.jsx)(react_1.MenuGroup, { title: t('model_category.self_developed'), children: modelOptions
                                                                                .filter(o => o.categories === bot_1.LLMModelCategoryEnum.BOT_CHAT_MODEL_CATEGORY_SELFDEVELOP)
                                                                                .map(option => ((0, jsx_runtime_1.jsx)(react_1.MenuItem, { mt: 1, p: 0, onClick: () => {
                                                                                    field.setValue(option.id);
                                                                                    handleAnyFormValueChange();
                                                                                    setCurrentForm({ ...currentForm, model: option.id });
                                                                                    setEditNotSave();
                                                                                }, isDisabled: option.status === bot_1.LLMModelStatusEnum.BOT_CHAT_MODEL_STATUS_DISABLE, className: "disabled:opacity-100 bg-surface-default", children: (0, jsx_runtime_1.jsxs)("div", { id: option.id, className: "w-full flex justify-between items-center px-2 py-1 min-h-9 h-fit rounded-lg space-x-2 hover:bg-[#F2F7FE] hover:dark:bg-[#2D2E33]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2 items-center", children: [option?.iconUrl && ((0, jsx_runtime_1.jsx)(image_1.default, { alt: "llm model icon", src: option.iconUrl, width: 24, height: 24, className: "rounded-md overflow-hidden" })), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-[2px] items-center", children: [(0, jsx_runtime_1.jsx)("span", { children: option.modelName }), option.modelDescription && ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { side: "top", description: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { children: t('model_desc.energy', {
                                                                                                                            energy: option.energyPerChatBase
                                                                                                                        }) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { dangerous: true, size: "xs", children: option.description.replaceAll('\n', '<br />') })] }), children: (0, jsx_runtime_1.jsx)(QuestionMarkCircleIcon_1.default, { className: "w-[18px] h-[18px] stroke-secondary" }) }))] })] }), field.getValue() === option.id && ((0, jsx_runtime_1.jsx)(CheckIcon_1.default, { className: "stroke-primary w-4 h-4" })), option.status === bot_1.LLMModelStatusEnum.BOT_CHAT_MODEL_STATUS_DISABLE && ((0, jsx_runtime_1.jsx)("div", { className: "px-[10px] py-1 text-primary rounded-full bg-[#F2F4FE] dark:bg-[#292C38] text-xs shrink-0", children: t('coming_soon') }))] }) }, option.id))) })] })] })) }) })] }), (0, jsx_runtime_1.jsx)(react_1.Divider, { borderColor: "var(--border)" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center pr-[15px]", children: [(0, jsx_runtime_1.jsxs)(react_1.Flex, { alignItems: "center", className: "space-x-1", flexShrink: 0, children: [(0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: t('temperature.text') }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { side: "top", description: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("p", { children: t('temperature.tip') }) }), children: (0, jsx_runtime_1.jsx)(QuestionMarkCircleIcon_1.default, { className: "w-[14px] h-[14px] stroke-on-surface" }) })] }), (0, jsx_runtime_1.jsx)(form.Field, { name: "temperature", children: field => ((0, jsx_runtime_1.jsxs)(react_1.Flex, { alignItems: "center", className: "space-x-3", w: "209px", children: [(0, jsx_runtime_1.jsxs)(react_1.Slider, { minW: "147px", flexGrow: 1, value: field.getValue(), min: 0, max: 2, step: 0.1, onChange: (value) => {
                                                                    field.setValue(value);
                                                                    handleAnyFormValueChange();
                                                                    setCurrentForm({ ...currentForm, temperature: value });
                                                                    setEditNotSave();
                                                                }, focusThumbOnChange: false, children: [(0, jsx_runtime_1.jsx)(react_1.SliderTrack, { className: "bg-[#EDF0F5] dark:bg-[#22242E]", children: (0, jsx_runtime_1.jsx)(react_1.SliderFilledTrack, { className: "bg-primary" }) }), (0, jsx_runtime_1.jsx)(react_1.SliderThumb, { className: "bg-primary", zIndex: 0 })] }), (0, jsx_runtime_1.jsx)(react_1.NumberInput, { step: 0.1, value: field.getValue(), min: 0, max: 2, precision: 1, onChange: (valueAsString, valueAsNumber) => {
                                                                    if (valueAsString.endsWith('.')) {
                                                                        field.setValue(valueAsString);
                                                                    }
                                                                    else if (isNaN(valueAsNumber)) {
                                                                        field.setValue(0);
                                                                    }
                                                                    else {
                                                                        field.setValue(valueAsNumber);
                                                                    }
                                                                    handleAnyFormValueChange();
                                                                    const temperatureValue = valueAsNumber < 0 ? 0 : valueAsNumber > 1.5 ? 1.5 : valueAsNumber;
                                                                    setCurrentForm({ ...currentForm, temperature: temperatureValue });
                                                                    setEditNotSave();
                                                                }, children: (0, jsx_runtime_1.jsx)(react_1.NumberInputField, { boxShadow: "0px 1px 2px 0px #0000001A", p: "8px 12px", border: "1px solid var(--border)", width: "64px", height: "36px", rounded: "12px", fontSize: "14px", lineHeight: "20px", textAlign: "center", outline: "none" }) })] })) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center pr-[15px]", children: [(0, jsx_runtime_1.jsxs)(react_1.Flex, { alignItems: "center", className: "space-x-1", flexShrink: 0, children: [(0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: t('top_p.text') }), (0, jsx_runtime_1.jsx)(react_1.Box, { children: (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { side: "top", description: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: t('top_p.tip') }), (0, jsx_runtime_1.jsx)("p", { children: t('usage_tip') }), (0, jsx_runtime_1.jsx)("p", { children: t('top_p.usage_tip.1') }), (0, jsx_runtime_1.jsx)("p", { children: t('top_p.usage_tip.2') })] }), children: (0, jsx_runtime_1.jsx)(QuestionMarkCircleIcon_1.default, { className: "w-[14px] h-[14px] stroke-on-surface" }) }) })] }), (0, jsx_runtime_1.jsx)(form.Field, { name: "topP", children: field => ((0, jsx_runtime_1.jsxs)(react_1.Flex, { alignItems: "center", className: "space-x-3", w: "209px", children: [(0, jsx_runtime_1.jsxs)(react_1.Slider, { minW: "147px", flexGrow: 1, value: field.getValue(), min: 0, max: 1, step: 0.1, onChange: (value) => {
                                                                    field.setValue(value);
                                                                    handleAnyFormValueChange();
                                                                    setCurrentForm({ ...currentForm, topP: value });
                                                                    setEditNotSave();
                                                                }, focusThumbOnChange: false, children: [(0, jsx_runtime_1.jsx)(react_1.SliderTrack, { className: "bg-[#EDF0F5] dark:bg-[#22242E]", children: (0, jsx_runtime_1.jsx)(react_1.SliderFilledTrack, { className: "bg-primary" }) }), (0, jsx_runtime_1.jsx)(react_1.SliderThumb, { className: "bg-primary", zIndex: 0 })] }), (0, jsx_runtime_1.jsx)(react_1.NumberInput, { step: 0.1, value: field.getValue(), min: 0, max: 1, precision: 1, onChange: (valueAsString, valueAsNumber) => {
                                                                    if (valueAsString.endsWith('.')) {
                                                                        field.setValue(valueAsString);
                                                                    }
                                                                    else if (isNaN(valueAsNumber)) {
                                                                        field.setValue(0);
                                                                    }
                                                                    else {
                                                                        field.setValue(valueAsNumber);
                                                                    }
                                                                    handleAnyFormValueChange();
                                                                    const topPValue = valueAsNumber < 0 ? 0 : valueAsNumber > 1 ? 1 : valueAsNumber;
                                                                    setCurrentForm({ ...currentForm, topP: topPValue });
                                                                    setEditNotSave();
                                                                }, children: (0, jsx_runtime_1.jsx)(react_1.NumberInputField, { boxShadow: "0px 1px 2px 0px #0000001A", p: "8px 12px", border: "1px solid var(--border)", width: "64px", height: "36px", rounded: "12px", fontSize: "14px", lineHeight: "20px", textAlign: "center", outline: "none" }) })] })) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center pr-[15px]", children: [(0, jsx_runtime_1.jsxs)(react_1.Flex, { alignItems: "center", className: "space-x-1", flexShrink: 0, children: [(0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: t('presence_penalty.text') }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { side: "top", description: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: t('presence_penalty.tip') }), (0, jsx_runtime_1.jsx)("p", { children: t('usage_tip') }), (0, jsx_runtime_1.jsx)("p", { children: t('presence_penalty.usage_tip.1') }), (0, jsx_runtime_1.jsx)("p", { children: t('presence_penalty.usage_tip.2') })] }), children: (0, jsx_runtime_1.jsx)(QuestionMarkCircleIcon_1.default, { className: "w-[14px] h-[14px] stroke-on-surface" }) })] }), (0, jsx_runtime_1.jsx)(form.Field, { name: "presencePenalty", children: field => ((0, jsx_runtime_1.jsxs)(react_1.Flex, { alignItems: "center", className: "space-x-3", w: "209px", children: [(0, jsx_runtime_1.jsxs)(react_1.Slider, { minW: "147px", flexGrow: 1, value: field.getValue(), min: -2, max: 2, step: 1, onChange: (value) => {
                                                                    field.setValue(value);
                                                                    handleAnyFormValueChange();
                                                                    setCurrentForm({ ...currentForm, presencePenalty: value });
                                                                    setEditNotSave();
                                                                }, focusThumbOnChange: false, children: [(0, jsx_runtime_1.jsx)(react_1.SliderTrack, { className: "bg-[#EDF0F5] dark:bg-[#22242E]", children: (0, jsx_runtime_1.jsx)(react_1.SliderFilledTrack, { className: "bg-primary" }) }), (0, jsx_runtime_1.jsx)(react_1.SliderThumb, { className: "bg-primary", zIndex: 0 })] }), (0, jsx_runtime_1.jsx)(react_1.NumberInput, { step: 1, value: field.getValue(), min: -2, max: 2, precision: 1, onChange: (valueAsString, valueAsNumber) => {
                                                                    if (valueAsString.endsWith('.')) {
                                                                        field.setValue(valueAsString);
                                                                    }
                                                                    else if (isNaN(valueAsNumber)) {
                                                                        field.setValue(0);
                                                                    }
                                                                    else {
                                                                        field.setValue(valueAsNumber);
                                                                    }
                                                                    handleAnyFormValueChange();
                                                                    const presencePenaltyValue = valueAsNumber < -2 ? -2 : valueAsNumber > 2 ? 2 : valueAsNumber;
                                                                    setCurrentForm({ ...currentForm, presencePenalty: presencePenaltyValue });
                                                                    setEditNotSave();
                                                                }, children: (0, jsx_runtime_1.jsx)(react_1.NumberInputField, { boxShadow: "0px 1px 2px 0px #0000001A", p: "8px 12px", border: "1px solid var(--border)", width: "64px", height: "36px", rounded: "12px", fontSize: "14px", lineHeight: "20px", textAlign: "center", outline: "none" }) })] })) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center pr-[15px]", children: [(0, jsx_runtime_1.jsxs)(react_1.Flex, { alignItems: "center", className: "space-x-1", flexShrink: 0, children: [(0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: t('frequency_penalty.text') }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { side: "top", description: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: t('frequency_penalty.tip') }), (0, jsx_runtime_1.jsx)("p", { children: t('usage_tip') }), (0, jsx_runtime_1.jsx)("p", { children: t('frequency_penalty.usage_tip.1') }), (0, jsx_runtime_1.jsx)("p", { children: t('frequency_penalty.usage_tip.2') })] }), children: (0, jsx_runtime_1.jsx)(QuestionMarkCircleIcon_1.default, { className: "w-[14px] h-[14px] stroke-on-surface" }) })] }), (0, jsx_runtime_1.jsx)(form.Field, { name: "frequencyPenalty", children: field => ((0, jsx_runtime_1.jsxs)(react_1.Flex, { alignItems: "center", className: "space-x-3", w: "209px", children: [(0, jsx_runtime_1.jsxs)(react_1.Slider, { minW: "147px", flexGrow: 1, value: field.getValue(), min: -2, max: 2, step: 1, onChange: (value) => {
                                                                    field.setValue(value);
                                                                    handleAnyFormValueChange();
                                                                    setCurrentForm({ ...currentForm, frequencyPenalty: value });
                                                                    setEditNotSave();
                                                                }, focusThumbOnChange: false, children: [(0, jsx_runtime_1.jsx)(react_1.SliderTrack, { className: "bg-[#EDF0F5] dark:bg-[#22242E]", children: (0, jsx_runtime_1.jsx)(react_1.SliderFilledTrack, { className: "bg-primary" }) }), (0, jsx_runtime_1.jsx)(react_1.SliderThumb, { className: "bg-primary", zIndex: 0 })] }), (0, jsx_runtime_1.jsx)(react_1.NumberInput, { step: 1, value: field.getValue(), min: -2, max: 2, precision: 1, onChange: (valueAsString, valueAsNumber) => {
                                                                    if (valueAsString.endsWith('.')) {
                                                                        field.setValue(valueAsString);
                                                                    }
                                                                    else if (isNaN(valueAsNumber)) {
                                                                        field.setValue(0);
                                                                    }
                                                                    else {
                                                                        field.setValue(valueAsNumber);
                                                                    }
                                                                    handleAnyFormValueChange();
                                                                    const frequencyPenaltyValue = valueAsNumber < -2 ? -2 : valueAsNumber > 2 ? 2 : valueAsNumber;
                                                                    setCurrentForm({ ...currentForm, frequencyPenalty: frequencyPenaltyValue });
                                                                    setEditNotSave();
                                                                }, children: (0, jsx_runtime_1.jsx)(react_1.NumberInputField, { boxShadow: "0px 1px 2px 0px #0000001A", p: "8px 12px", border: "1px solid var(--border)", width: "64px", height: "36px", rounded: "12px", fontSize: "14px", lineHeight: "20px", textAlign: "center", outline: "none" }) })] })) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center pr-[15px]", children: [(0, jsx_runtime_1.jsxs)(react_1.Flex, { alignItems: "center", className: "space-x-1", flexShrink: 0, children: [(0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: t('max_tokens.text') }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { side: "top", description: t('max_tokens.tip'), children: (0, jsx_runtime_1.jsx)(QuestionMarkCircleIcon_1.default, { className: "w-[14px] h-[14px] stroke-on-surface" }) })] }), (0, jsx_runtime_1.jsx)(form.Field, { name: "maxTokens", children: field => ((0, jsx_runtime_1.jsxs)(react_1.Flex, { alignItems: "center", className: "space-x-3", w: "209px", children: [(0, jsx_runtime_1.jsxs)(react_1.Slider, { minW: "147px", flexGrow: 1, value: field.getValue(), min: 0, max: 2000, step: 100, onChange: (value) => {
                                                                    field.setValue(value);
                                                                    handleAnyFormValueChange();
                                                                    setCurrentForm({ ...currentForm, maxTokens: value });
                                                                    setEditNotSave();
                                                                }, focusThumbOnChange: false, children: [(0, jsx_runtime_1.jsx)(react_1.SliderTrack, { className: "bg-[#EDF0F5] dark:bg-[#22242E]", children: (0, jsx_runtime_1.jsx)(react_1.SliderFilledTrack, { className: "bg-primary" }) }), (0, jsx_runtime_1.jsx)(react_1.SliderThumb, { className: "bg-primary", zIndex: 0 })] }), (0, jsx_runtime_1.jsx)(react_1.NumberInput, { step: 1, value: field.getValue(), min: 0, max: 2000, precision: 1, onChange: (valueAsString, valueAsNumber) => {
                                                                    if (valueAsString.endsWith('.')) {
                                                                        field.setValue(valueAsString);
                                                                    }
                                                                    else if (isNaN(valueAsNumber)) {
                                                                        field.setValue(0);
                                                                    }
                                                                    else {
                                                                        field.setValue(valueAsNumber);
                                                                    }
                                                                    handleAnyFormValueChange();
                                                                    const maxTokensValue = valueAsNumber < 0 ? 0 : valueAsNumber > 2000 ? 2000 : valueAsNumber;
                                                                    setCurrentForm({ ...currentForm, maxTokens: maxTokensValue });
                                                                    setEditNotSave();
                                                                }, children: (0, jsx_runtime_1.jsx)(react_1.NumberInputField, { boxShadow: "0px 1px 2px 0px #0000001A", p: "8px 12px", border: "1px solid var(--border)", width: "64px", height: "36px", rounded: "12px", fontSize: "14px", lineHeight: "20px", textAlign: "center", outline: "none" }) })] })) })] })] })] }) }) })) : null] }) }));
}
exports.default = BotModel;
