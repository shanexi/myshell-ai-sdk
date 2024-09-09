import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { StaticContext } from '../../../../chat-new/context/StaticContext.js';
import { defaultChatSetting } from '../../../../chat-new/model/constants.js';
import { ChatSettingAudioSpeed, ChatSettingSpeakingLangEnum } from '../../../../chat-new/model/definitions.js';
import { Button } from '../../../../common/components/ui/button.js';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../../../../common/components/ui/form.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../common/components/ui/select.js';
import { Separator } from '../../../../common/components/ui/separator.js';
import { Switch } from '../../../../common/components/ui/switch.js';
export default function ChatSettingForm() {
    const formSchema = z.object({
        isAutopushOn: z.boolean(),
        audio: z.boolean(),
        audioAutoplay: z.boolean(),
        transcription: z.boolean(),
        translation: z.boolean(),
        speakLanguage: z.nativeEnum(ChatSettingSpeakingLangEnum),
        voiceSpeed: z.nativeEnum(ChatSettingAudioSpeed)
    });
    const { chatSetting, chatSettingDisabled, chatSettingLoading, updateChatSetting, entitySetting } = useContext(StaticContext);
    const { outputVoice } = entitySetting || {};
    const t = useTranslations('chat.chat_setting');
    const langOptions = [
        {
            label: t('speaking_lang.auto_detection'),
            value: ChatSettingSpeakingLangEnum.AUTO
        },
        {
            label: t('speaking_lang.en'),
            value: ChatSettingSpeakingLangEnum.EN
        },
        {
            label: t('speaking_lang.zh'),
            value: ChatSettingSpeakingLangEnum.ZH
        },
        {
            label: t('speaking_lang.jp'),
            value: ChatSettingSpeakingLangEnum.JA
        },
        {
            label: t('speaking_lang.ru'),
            value: ChatSettingSpeakingLangEnum.RU
        },
        {
            label: t('speaking_lang.es'),
            value: ChatSettingSpeakingLangEnum.ES
        },
        {
            label: t('speaking_lang.ko'),
            value: ChatSettingSpeakingLangEnum.KO
        }
    ];
    const audioSpeedOptions = [
        {
            label: '0.5',
            value: ChatSettingAudioSpeed.ZERO_POINT_FIVE
        },
        {
            label: '0.75',
            value: ChatSettingAudioSpeed.ZERO_POINT_SEVEN_FIVE
        },
        {
            label: '1',
            value: ChatSettingAudioSpeed.ONE
        },
        {
            label: '1.25',
            value: ChatSettingAudioSpeed.ONE_POINT_TWENTY_FIVE
        },
        {
            label: '1.5',
            value: ChatSettingAudioSpeed.ONE_POINT_FIVE
        }
    ];
    const form = useForm({
        defaultValues: {
            isAutopushOn: chatSetting?.isAutopushOn ?? defaultChatSetting.isAutopushOn,
            audio: chatSetting?.isAudioOn ?? defaultChatSetting.isAudioOn,
            audioAutoplay: chatSetting?.isAudioPlayOn ?? defaultChatSetting.isAudioPlayOn,
            transcription: chatSetting?.isTranscriptionOn ?? defaultChatSetting.isTranscriptionOn,
            translation: chatSetting?.isTranslationOn ?? defaultChatSetting.isTranslationOn,
            speakLanguage: chatSetting?.speakingLanguage
                ? chatSetting.speakingLanguage === ChatSettingSpeakingLangEnum.UNSPECIFIED
                    ? ChatSettingSpeakingLangEnum.AUTO
                    : chatSetting.speakingLanguage
                : defaultChatSetting.speakingLanguage,
            voiceSpeed: chatSetting?.audioSpeed
                ? chatSetting.audioSpeed === ChatSettingAudioSpeed.UNSPECIFIED
                    ? ChatSettingAudioSpeed.ONE
                    : chatSetting.audioSpeed
                : defaultChatSetting.audioSpeed
        },
        disabled: chatSettingDisabled || chatSettingLoading,
        resolver: zodResolver(formSchema)
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
    return (_jsx("div", { className: "flex flex-col gap-4 text-default", children: _jsx(Form, { ...form, children: _jsxs("form", { className: "space-y-4", children: [_jsx("div", { className: "text-lg md:text-xs tracking-[0.8px]", children: t('bot_setting') }), _jsx(FormField, { control: form.control, name: "isAutopushOn", render: ({ field }) => (_jsxs(FormItem, { className: "flex justify-between items-center !space-y-0", children: [_jsx(FormLabel, { children: t('push_messages') }), _jsx(FormControl, { children: _jsx(Switch, { disabled: field.disabled, checked: field.value, onCheckedChange: (checked) => {
                                            field.onChange(checked);
                                            onSave();
                                        } }) })] })) }), _jsx("div", { className: "text-lg md:text-xs tracking-[0.8px]", children: t('title') }), _jsx(FormField, { control: form.control, name: "audio", render: ({ field }) => (_jsxs(FormItem, { className: "flex justify-between items-center !space-y-0", children: [_jsx(FormLabel, { children: t('audio') }), _jsx(FormControl, { children: _jsx(Switch, { disabled: field.disabled || !outputVoice, checked: field.value && outputVoice, onCheckedChange: checked => {
                                            field.onChange(checked);
                                            if (!checked) {
                                                setValue('transcription', true);
                                                setValue('audioAutoplay', false);
                                            }
                                            onSave();
                                        } }) })] })) }), _jsx(FormField, { control: form.control, name: "audioAutoplay", render: ({ field }) => (_jsxs(FormItem, { className: "flex justify-between items-center !space-y-0", children: [_jsx(FormLabel, { children: t('audio_autoplay') }), _jsx(FormControl, { children: _jsx(Switch, { disabled: field.disabled || !isAudioOn || !outputVoice, checked: field.value && outputVoice, onCheckedChange: checked => {
                                            field.onChange(checked);
                                            onSave();
                                        } }) })] })) }), _jsx(FormField, { control: form.control, name: "transcription", render: ({ field }) => (_jsxs(FormItem, { className: "flex justify-between items-center !space-y-0", children: [_jsx(FormLabel, { children: t('transcription') }), _jsx(FormControl, { children: _jsx(Switch, { disabled: field.disabled || !isAudioOn, checked: field.value, onCheckedChange: checked => {
                                            field.onChange(checked);
                                            if (!checked) {
                                                setValue('translation', false);
                                            }
                                            onSave();
                                        } }) })] })) }), _jsx(FormField, { control: form.control, name: "translation", render: ({ field }) => (_jsxs(FormItem, { className: "flex justify-between items-center !space-y-0", children: [_jsx(FormLabel, { children: t('translation') }), _jsx(FormControl, { children: _jsx(Switch, { disabled: field.disabled || !isTranscriptionOn, checked: field.value, onCheckedChange: checked => {
                                            field.onChange(checked);
                                            onSave();
                                        } }) })] })) }), _jsx(Separator, { className: "bg-[var(--border)]" }), _jsx(FormField, { control: form.control, name: "speakLanguage", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: t('speaking_lang.title') }), _jsxs(Select, { disabled: field.disabled, defaultValue: field.value, onValueChange: value => {
                                        field.onChange(value);
                                        onSave();
                                    }, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }) }), _jsx(SelectContent, { children: langOptions.map(({ label, value }) => (_jsx(SelectItem, { value: value, children: label }, value))) })] })] })) }), _jsx(FormField, { control: form.control, name: "voiceSpeed", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: t('audio_speed') }), _jsx("div", { className: "flex rounded-full border border-default", children: audioSpeedOptions.map(option => (_jsx(Button, { type: "button", className: clsx('w-1/5 border-none text-default', field.value === option.value && 'text-brand'), size: "md", disabled: field.disabled || !isAudioOn || !outputVoice, variant: "outline", onClick: e => {
                                            e.preventDefault();
                                            field.onChange(option.value);
                                            onSave();
                                        }, children: option.label }, option.value))) })] })) })] }) }) }));
}
