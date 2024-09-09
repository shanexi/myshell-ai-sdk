"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatSettingForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const zod_1 = require("@hookform/resolvers/zod");
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const zod_2 = require("zod");
const StaticContext_1 = require("../../../../chat-new/context/StaticContext.js");
const constants_1 = require("../../../../chat-new/model/constants.js");
const definitions_1 = require("../../../../chat-new/model/definitions.js");
const button_1 = require("../../../../common/components/ui/button.js");
const form_1 = require("../../../../common/components/ui/form.js");
const select_1 = require("../../../../common/components/ui/select.js");
const separator_1 = require("../../../../common/components/ui/separator.js");
const switch_1 = require("../../../../common/components/ui/switch.js");
function ChatSettingForm() {
    const formSchema = zod_2.z.object({
        isAutopushOn: zod_2.z.boolean(),
        audio: zod_2.z.boolean(),
        audioAutoplay: zod_2.z.boolean(),
        transcription: zod_2.z.boolean(),
        translation: zod_2.z.boolean(),
        speakLanguage: zod_2.z.nativeEnum(definitions_1.ChatSettingSpeakingLangEnum),
        voiceSpeed: zod_2.z.nativeEnum(definitions_1.ChatSettingAudioSpeed)
    });
    const { chatSetting, chatSettingDisabled, chatSettingLoading, updateChatSetting, entitySetting } = (0, react_1.useContext)(StaticContext_1.StaticContext);
    const { outputVoice } = entitySetting || {};
    const t = (0, next_intl_1.useTranslations)('chat.chat_setting');
    const langOptions = [
        {
            label: t('speaking_lang.auto_detection'),
            value: definitions_1.ChatSettingSpeakingLangEnum.AUTO
        },
        {
            label: t('speaking_lang.en'),
            value: definitions_1.ChatSettingSpeakingLangEnum.EN
        },
        {
            label: t('speaking_lang.zh'),
            value: definitions_1.ChatSettingSpeakingLangEnum.ZH
        },
        {
            label: t('speaking_lang.jp'),
            value: definitions_1.ChatSettingSpeakingLangEnum.JA
        },
        {
            label: t('speaking_lang.ru'),
            value: definitions_1.ChatSettingSpeakingLangEnum.RU
        },
        {
            label: t('speaking_lang.es'),
            value: definitions_1.ChatSettingSpeakingLangEnum.ES
        },
        {
            label: t('speaking_lang.ko'),
            value: definitions_1.ChatSettingSpeakingLangEnum.KO
        }
    ];
    const audioSpeedOptions = [
        {
            label: '0.5',
            value: definitions_1.ChatSettingAudioSpeed.ZERO_POINT_FIVE
        },
        {
            label: '0.75',
            value: definitions_1.ChatSettingAudioSpeed.ZERO_POINT_SEVEN_FIVE
        },
        {
            label: '1',
            value: definitions_1.ChatSettingAudioSpeed.ONE
        },
        {
            label: '1.25',
            value: definitions_1.ChatSettingAudioSpeed.ONE_POINT_TWENTY_FIVE
        },
        {
            label: '1.5',
            value: definitions_1.ChatSettingAudioSpeed.ONE_POINT_FIVE
        }
    ];
    const form = (0, react_hook_form_1.useForm)({
        defaultValues: {
            isAutopushOn: chatSetting?.isAutopushOn ?? constants_1.defaultChatSetting.isAutopushOn,
            audio: chatSetting?.isAudioOn ?? constants_1.defaultChatSetting.isAudioOn,
            audioAutoplay: chatSetting?.isAudioPlayOn ?? constants_1.defaultChatSetting.isAudioPlayOn,
            transcription: chatSetting?.isTranscriptionOn ?? constants_1.defaultChatSetting.isTranscriptionOn,
            translation: chatSetting?.isTranslationOn ?? constants_1.defaultChatSetting.isTranslationOn,
            speakLanguage: chatSetting?.speakingLanguage
                ? chatSetting.speakingLanguage === definitions_1.ChatSettingSpeakingLangEnum.UNSPECIFIED
                    ? definitions_1.ChatSettingSpeakingLangEnum.AUTO
                    : chatSetting.speakingLanguage
                : constants_1.defaultChatSetting.speakingLanguage,
            voiceSpeed: chatSetting?.audioSpeed
                ? chatSetting.audioSpeed === definitions_1.ChatSettingAudioSpeed.UNSPECIFIED
                    ? definitions_1.ChatSettingAudioSpeed.ONE
                    : chatSetting.audioSpeed
                : constants_1.defaultChatSetting.audioSpeed
        },
        disabled: chatSettingDisabled || chatSettingLoading,
        resolver: (0, zod_1.zodResolver)(formSchema)
    });
    const { watch, setValue, getValues } = form;
    const isAudioOn = watch('audio');
    const isTranscriptionOn = watch('transcription');
    const onSave = () => {
        const values = getValues();
        updateChatSetting?.({
            isAutopushOn: values.isAutopushOn,
            isAudioOn: values.audio,
            isAudioPlayOn: values.audioAutoplay,
            isTranscriptionOn: values.transcription,
            isTranslationOn: values.translation,
            speakingLanguage: values.speakLanguage,
            audioSpeed: values.voiceSpeed
        });
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-4 text-default", children: (0, jsx_runtime_1.jsx)(form_1.Form, { ...form, children: (0, jsx_runtime_1.jsxs)("form", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-lg md:text-xs tracking-[0.8px]", children: t('bot_setting') }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "isAutopushOn", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { className: "flex justify-between items-center !space-y-0", children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: t('push_messages') }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(switch_1.Switch, { disabled: field.disabled, checked: field.value, onCheckedChange: (checked) => {
                                            field.onChange(checked);
                                            onSave();
                                        } }) })] })) }), (0, jsx_runtime_1.jsx)("div", { className: "text-lg md:text-xs tracking-[0.8px]", children: t('title') }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "audio", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { className: "flex justify-between items-center !space-y-0", children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: t('audio') }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(switch_1.Switch, { disabled: field.disabled || !outputVoice, checked: field.value && outputVoice, onCheckedChange: checked => {
                                            field.onChange(checked);
                                            if (!checked) {
                                                setValue('transcription', true);
                                                setValue('audioAutoplay', false);
                                            }
                                            onSave();
                                        } }) })] })) }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "audioAutoplay", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { className: "flex justify-between items-center !space-y-0", children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: t('audio_autoplay') }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(switch_1.Switch, { disabled: field.disabled || !isAudioOn || !outputVoice, checked: field.value && outputVoice, onCheckedChange: checked => {
                                            field.onChange(checked);
                                            onSave();
                                        } }) })] })) }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "transcription", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { className: "flex justify-between items-center !space-y-0", children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: t('transcription') }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(switch_1.Switch, { disabled: field.disabled || !isAudioOn, checked: field.value, onCheckedChange: checked => {
                                            field.onChange(checked);
                                            if (!checked) {
                                                setValue('translation', false);
                                            }
                                            onSave();
                                        } }) })] })) }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "translation", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { className: "flex justify-between items-center !space-y-0", children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: t('translation') }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(switch_1.Switch, { disabled: field.disabled || !isTranscriptionOn, checked: field.value, onCheckedChange: checked => {
                                            field.onChange(checked);
                                            onSave();
                                        } }) })] })) }), (0, jsx_runtime_1.jsx)(separator_1.Separator, { className: "bg-[var(--border)]" }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "speakLanguage", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: t('speaking_lang.title') }), (0, jsx_runtime_1.jsxs)(select_1.Select, { disabled: field.disabled, defaultValue: field.value, onValueChange: value => {
                                        field.onChange(value);
                                        onSave();
                                    }, children: [(0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {}) }) }), (0, jsx_runtime_1.jsx)(select_1.SelectContent, { children: langOptions.map(({ label, value }) => ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: value, children: label }, value))) })] })] })) }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "voiceSpeed", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: t('audio_speed') }), (0, jsx_runtime_1.jsx)("div", { className: "flex rounded-full border border-default", children: audioSpeedOptions.map(option => ((0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", className: (0, clsx_1.default)('w-1/5 border-none text-default', field.value === option.value && 'text-brand'), size: "md", disabled: field.disabled || !isAudioOn || !outputVoice, variant: "outline", onClick: e => {
                                            e.preventDefault();
                                            field.onChange(option.value);
                                            onSave();
                                        }, children: option.label }, option.value))) })] })) })] }) }) }));
}
