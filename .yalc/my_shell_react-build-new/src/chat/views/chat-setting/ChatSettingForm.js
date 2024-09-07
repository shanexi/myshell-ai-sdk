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
exports.default = ChatSettingForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const CheckIcon_1 = __importDefault(require("@heroicons/react/24/outline/CheckIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const react_hook_form_1 = require("react-hook-form");
const react_select_1 = __importStar(require("react-select"));
const react_use_1 = require("react-use");
const interfaces_1 = require("../../../chat/model/interfaces.js");
const useGetChatSetting_1 = __importDefault(require("../../../chat/views/hooks/useGetChatSetting.js"));
function ChatSettingForm({ botInfo, chatSetting, showRadius = true }) {
    const isMd = (0, react_use_1.useMedia)('(min-width: 768px)');
    const t = (0, next_intl_1.useTranslations)('chat.chat_setting');
    const langOptions = [
        {
            label: t('speaking_lang.auto_detection'),
            value: interfaces_1.ChatSettingSpeakingLangEnum.AUTO
        },
        {
            label: t('speaking_lang.en'),
            value: interfaces_1.ChatSettingSpeakingLangEnum.EN
        },
        {
            label: t('speaking_lang.zh'),
            value: interfaces_1.ChatSettingSpeakingLangEnum.ZH
        },
        {
            label: t('speaking_lang.jp'),
            value: interfaces_1.ChatSettingSpeakingLangEnum.JA
        },
        {
            label: t('speaking_lang.ru'),
            value: interfaces_1.ChatSettingSpeakingLangEnum.RU
        },
        {
            label: t('speaking_lang.es'),
            value: interfaces_1.ChatSettingSpeakingLangEnum.ES
        },
        {
            label: t('speaking_lang.ko'),
            value: interfaces_1.ChatSettingSpeakingLangEnum.KO
        }
    ];
    const { control, getValues, setValue, watch } = (0, react_hook_form_1.useForm)({
        defaultValues: {
            isAutopushOn: true,
            audio: true,
            audioAutoplay: false,
            transcription: true,
            translation: true,
            voiceSpeed: 1,
            speakLanguage: {
                label: 'mixed',
                value: interfaces_1.ChatSettingSpeakingLangEnum.AUTO
            }
        }
    });
    const isAudioOn = watch('audio');
    const outputVoice = (botInfo || {}).botSetting?.outputVoice;
    const transcriptionOn = watch('transcription');
    const ref = (0, react_2.useRef)(null);
    const { updating, updateChatSetting } = (0, useGetChatSetting_1.default)();
    const handleSave = (0, react_2.useCallback)(() => {
        const values = getValues();
        const params = {
            botId: botInfo.id.toString(),
            isAutopushOn: values.isAutopushOn,
            updateAudioOn: {
                isAudioOn: values.audio
            },
            updateAudioPlayOn: {
                isAudioPlayOn: values.audioAutoplay
            },
            updateTranscriptionOn: {
                isTranscriptionOn: values.transcription
            },
            updateTranslationOn: {
                isTranslationOn: values.translation
            },
            speakingLanguage: values.speakLanguage ? values.speakLanguage.value : interfaces_1.ChatSettingSpeakingLangEnum.UNSPECIFIED,
            audioSpeed: values.voiceSpeed
                ? interfaces_1.AudioSpeedValue2KeyMap[values.voiceSpeed]
                : 'BOT_CHAT_SETTING_AUDIO_SPEED_UNSPECIFIED'
        };
        updateChatSetting(botInfo.id, params);
    }, [botInfo, getValues, updateChatSetting]);
    (0, react_2.useEffect)(() => {
        setValue('isAutopushOn', chatSetting?.isAutopushOn ?? true);
        setValue('audio', chatSetting?.isAudioOn ?? true);
        setValue('audioAutoplay', chatSetting?.isAudioPlayOn ?? false);
        setValue('transcription', chatSetting?.isTranscriptionOn ?? true);
        setValue('translation', chatSetting?.isTranslationOn ?? true);
        setValue('voiceSpeed', chatSetting?.audioSpeed ? interfaces_1.AudioSpeedMap[chatSetting.audioSpeed] ?? 1 : 1);
        if (chatSetting?.speakingLanguage && langOptions.find(lang => lang.value === chatSetting.speakingLanguage)) {
            setValue('speakLanguage', langOptions.find(lang => lang.value === chatSetting.speakingLanguage));
        }
    }, [chatSetting, setValue]);
    function CustomOption(props) {
        const { isSelected, innerProps, innerRef, data } = props;
        return ((0, jsx_runtime_1.jsx)(react_select_1.components.Option, { ...props, children: (0, jsx_runtime_1.jsxs)("div", { ref: innerRef, ...innerProps, className: "flex justify-between items-center", children: [data.label, isSelected && (0, jsx_runtime_1.jsx)(CheckIcon_1.default, { className: "text-primary w-4 h-4" })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("form", { className: (0, clsx_1.default)('p-4 space-y-4 bg-surface text-on-surface', {
            'rounded-2xl shadow-[0_0_40px_0_#0000001A]': showRadius
        }), children: [(0, jsx_runtime_1.jsx)("div", { className: "text-lg md:text-xs tracking-[0.8px]", children: t('bot_setting') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "isAutopushOn", children: t('push_messages') }), (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "isAutopushOn", control: control, render: ({ field }) => ((0, jsx_runtime_1.jsx)(react_1.Switch, { size: "md", variant: "brand", isChecked: field.value, isDisabled: updating, onChange: e => {
                                field.onChange(e.target.checked);
                                handleSave();
                            } })) })] }), (0, jsx_runtime_1.jsx)("div", { className: "text-lg md:text-xs tracking-[0.8px]", children: t('title') }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "audio", children: t('audio') }), (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "audio", control: control, render: ({ field }) => ((0, jsx_runtime_1.jsx)(react_1.Switch, { size: "md", variant: "brand", isChecked: field.value && outputVoice, isDisabled: updating || !outputVoice, onChange: e => {
                                        field.onChange(e.target.checked);
                                        if (!e.target.checked) {
                                            setValue('transcription', true);
                                            setValue('audioAutoplay', false);
                                        }
                                        handleSave();
                                    } })) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "audioAutoplay", children: t('audio_autoplay') }), (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "audioAutoplay", control: control, render: ({ field }) => ((0, jsx_runtime_1.jsx)(react_1.Switch, { size: "md", variant: "brand", isDisabled: updating || !isAudioOn || !outputVoice, isChecked: field.value && outputVoice, onChange: e => {
                                        field.onChange(e.target.checked);
                                        handleSave();
                                    } })) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "transcription", children: t('transcription') }), (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "transcription", control: control, render: ({ field }) => ((0, jsx_runtime_1.jsx)(react_1.Switch, { size: "md", variant: "brand", isDisabled: updating || !isAudioOn, isChecked: field.value, onChange: e => {
                                        field.onChange(e.target.checked);
                                        if (!e.target.checked) {
                                            setValue('translation', false);
                                        }
                                        handleSave();
                                    } })) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "translation", children: t('translation') }), (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "translation", control: control, render: ({ field }) => ((0, jsx_runtime_1.jsx)(react_1.Switch, { size: "md", variant: "brand", isDisabled: updating || !transcriptionOn, isChecked: field.value, onChange: e => {
                                        field.onChange(e.target.checked);
                                        handleSave();
                                    } })) })] })] }), (0, jsx_runtime_1.jsx)(react_1.Divider, { className: "border-default" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2 rounded-lg", children: [(0, jsx_runtime_1.jsx)("div", { children: t('speaking_lang.title') }), (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "speakLanguage", control: control, render: ({ field }) => ((0, jsx_runtime_1.jsx)(react_select_1.default, { ...field, options: langOptions, isDisabled: updating, menuPlacement: "auto", isSearchable: false, components: {
                                Option: CustomOption
                            }, styles: {
                                control(base) {
                                    return {
                                        ...base,
                                        borderRadius: '24px',
                                        boxShadow: '0px 1px 0px 0px #0000000D',
                                        paddingLeft: '16px',
                                        paddingRight: '16px',
                                        borderColor: 'var(--outline-variant)',
                                        backgroundColor: 'var(--surface)',
                                        height: '36px',
                                        cursor: 'pointer',
                                        ':hover': {
                                            borderColor: 'var(--outline-variant)'
                                        }
                                    };
                                },
                                menu(base) {
                                    return {
                                        ...base,
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        boxShadow: '0px 0px 40px 0px rgba(0, 0, 0, 0.10)',
                                        backgroundColor: 'var(--surface)',
                                        marginBottom: 0,
                                        padding: '8px'
                                    };
                                },
                                menuList(base) {
                                    return {
                                        ...base,
                                        height: isMd ? 'auto' : '156px',
                                        padding: 0,
                                        gap: '4px'
                                    };
                                },
                                option(base, props) {
                                    return {
                                        ...base,
                                        cursor: 'pointer',
                                        borderRadius: '8px',
                                        padding: '6px 8px',
                                        marginTop: '4px',
                                        backgroundColor: props.isSelected ? 'var(--surface-container)' : 'var(--surface)',
                                        color: props.isSelected ? 'var(--on-surface-container)' : 'var(--on-surface)',
                                        ':hover': {
                                            backgroundColor: 'var(--surface-container)',
                                            color: 'var(--on-surface-container)'
                                        },
                                        ':first-of-type': {
                                            marginTop: 0
                                        }
                                    };
                                },
                                singleValue(base) {
                                    return { ...base, color: 'var(--on-surface)' };
                                },
                                valueContainer(base) {
                                    return { ...base, padding: 0 };
                                },
                                indicatorSeparator(base) {
                                    return { ...base, display: 'none' };
                                },
                                dropdownIndicator(base) {
                                    return { ...base, color: 'var(--on-surface)' };
                                }
                            }, onChange: e => {
                                field.onChange(e);
                                handleSave();
                            } })) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2 rounded-lg", children: [(0, jsx_runtime_1.jsx)("div", { children: t('audio_speed') }), (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "voiceSpeed", control: control, disabled: updating || !isAudioOn || !outputVoice, render: ({ field }) => ((0, jsx_runtime_1.jsx)(ButtonGroup, { botInfo: botInfo, options: [0.5, 0.75, 1, 1.25, 1.5], ...field, handleSave: handleSave, ref: ref })) })] })] }));
}
const ButtonGroup = (0, react_2.forwardRef)(({ value, onChange, options, disabled, handleSave, botInfo }, ref) => {
    const handleClick = (newValue) => {
        onChange(newValue);
        handleSave();
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: "flex rounded-full bg-surface-container-high border border-default", children: options.map(option => ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('w-1/5 h-9 flex justify-center items-center text-sm font-[600]', {
                'bg-surface text-primary rounded-full shadow-[0_0_2px_0_#B8B5FE] dark:shadow-none': value === option,
                'text-secondary': value !== option
            }, {
                'cursor-pointer opacity-100': !disabled,
                'cursor-not-allowed opacity-30': disabled
            }), onClick: () => {
                if (disabled)
                    return;
                handleClick(option);
            }, children: option }, option))) }));
});
