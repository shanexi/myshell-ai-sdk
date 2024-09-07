"use strict";
'use client';
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
exports.default = WorkshopSettingForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const react_form_1 = require("@tanstack/react-form");
const driver_js_1 = require("driver.js");
const dynamic_1 = __importDefault(require("next/dynamic"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const react_use_1 = require("react-use");
const rxjs_1 = require("rxjs");
const bot_1 = require("../../../apis/bot.js");
const workshop_1 = require("../../../apis/workshop.js");
const bot_2 = require("../../../common/constants/interfaces/bot.js");
const useNotification_1 = require("../../../common/hooks/useNotification.js");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const identityService_1 = require("../../../common/services/identityService.js");
const tokenizer_1 = require("../../../common/utils/tokenizer.js");
const draft_1 = require("../../../common/utils/workshop/draft.js");
const TopBarSkeleton_1 = __importDefault(require("../../../components/skeleton/workshop/TopBarSkeleton.js"));
const SocialMedia_1 = __importDefault(require("../../../components/workshop/create/SocialMedia.js"));
const IframeModal_1 = __importDefault(require("../../../components/workshop/create/components/IframeModal.js"));
const PreviewCard_1 = __importDefault(require("../../../components/workshop/create/components/PreviewCard.js"));
const ProfileForm_1 = __importDefault(require("../../../components/workshop/create/components/ProfileForm.js"));
const FormChangeContext_1 = require("../../../components/workshop/create/context/FormChangeContext.js");
const useGetListWidgets_1 = __importDefault(require("../../../hooks/workshop/useGetListWidgets.js"));
const useGetWorkshopBots_1 = __importDefault(require("../../../hooks/workshop/useGetWorkshopBots.js"));
const sensors_1 = require("../../../lib/sensors/index.js");
const store_1 = require("../../../services/store/index.js");
const bot_3 = require("../../../services/store/bot.js");
const workshop_2 = require("../../../services/store/workshop.js");
require("driver.js/dist/driver.css");
const user_1 = require("../../../common/constants/enums/user.js");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
const TopBar = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../components/workshop/TopBar.js'))), {
    ssr: false,
    loading: () => (0, jsx_runtime_1.jsx)(TopBarSkeleton_1.default, {})
});
const PromptForm = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../components/workshop/create/components/PromptForm.js'))), {
    ssr: false,
    loading: () => (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-[338px] rounded-md" })
});
const TTSForm = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../components/workshop/create/voice/TTSForm.js'))), {
    ssr: false
});
const KnowledgeBaseForm = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../components/workshop/create/components/KnowledgeBaseForm.js'))), {
    ssr: false
});
const SettingFooter = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./SettingFooter.js'))), {
    ssr: false
});
const WidgetsButtons = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./WidgetsButtons.js'))), {
    ssr: false
});
const IntroMessage = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./components/IntroMessage.js'))), {
    ssr: false
});
const ModeTypeForm = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./components/ModeType.js'))), {
    ssr: false,
    loading: () => (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-9 rounded-full" })
});
const ShellAgent = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./components/ShellAgent.js'))), {
    ssr: false,
    loading: () => (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-[120px] rounded-md" })
});
const ResetTipModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./components/ResetTipModal.js'))), {
    ssr: false
});
const SaveTipModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./components/SaveTipModal.js'))), {
    ssr: false
});
const DevMode = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./components/dev-mode/index.js'))), {
    ssr: false,
    loading: () => (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-[338px] rounded-md" })
});
function WorkshopCreateForm() {
    const commonT = (0, next_intl_1.useTranslations)('common');
    const requestT = (0, next_intl_1.useTranslations)('request');
    const t = (0, next_intl_1.useTranslations)('workshop');
    const createAutoPromptTaskResult = (0, store_1.useGlobalStore)(state => state.createAutoPromptTaskResult);
    const setAutoPromptTaskResult = (0, store_1.useGlobalStore)(state => state.setAutoPromptTaskResult);
    const sensors = (0, sensors_1.useSensors)();
    const router = (0, navigation_1.useRouter)();
    const params = (0, navigation_1.useParams)();
    const { locale } = (0, usePathLocale_1.usePathLocale)();
    const [botId, setBotId] = (0, react_2.useState)(params.botId);
    const timerRef = (0, react_2.useRef)(null);
    const guideRef = (0, react_2.useRef)(null);
    const setOwnUgcBotList = (0, bot_3.useBotStore)(state => state.setOwnUgcBotList);
    const setSelectedUgcBotId = (0, bot_3.useBotStore)(state => state.setSelectedUgcBotId);
    const setOriForm = (0, workshop_2.useWorkshopStore)(state => state.setOriForm);
    const setCurrentForm = (0, workshop_2.useWorkshopStore)(state => state.setCurrentForm);
    const setCurrentFormItem = (0, workshop_2.useWorkshopStore)(state => state.setCurrentFormItem);
    const oriForm = (0, workshop_2.useWorkshopStore)(state => state.oriForm);
    const currentForm = (0, workshop_2.useWorkshopStore)(state => state.currentForm);
    const setEditNotSave = (0, workshop_2.useWorkshopStore)(state => state.setEditNotSave);
    const draftBotIds = (0, workshop_2.useWorkshopStore)(state => state.draftBotIds);
    const noCodeCheckPassed = (0, workshop_2.useWorkshopStore)(state => state.noCodeCheckPassed);
    const setNoCodeCheckPassed = (0, workshop_2.useWorkshopStore)(state => state.setNoCodeCheckPassed);
    const setDraftBotIds = (0, workshop_2.useWorkshopStore)(state => state.setDraftBotIds);
    const widgets = (0, workshop_2.useWorkshopStore)(state => state.sidebarWidgetList)?.map(({ id }) => id) || [];
    const setActiveType = (0, bot_3.useBotStore)(state => state.setActiveType);
    const [iframeUrl, setIframeUrl] = (0, react_2.useState)('');
    const [disable, setDisable] = (0, react_2.useState)(false);
    const [loading, setLoading] = (0, react_2.useState)(false);
    const [dataLoading, setDataLoading] = (0, react_2.useState)(false);
    const [isGuide, setIsGuide] = (0, react_2.useState)(false);
    const visitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const [codeChecking, setCodeChecking] = (0, react_use_1.useToggle)(false);
    const [codeCheckPassed, setCodeCheckPassed] = (0, react_use_1.useToggle)(true);
    const [noCodeChecking, setNoCodeChecking] = (0, react_use_1.useToggle)(false);
    const [codeCheckError, setCodeCheckError] = (0, react_2.useState)();
    const [startInterval, setStartInterval] = (0, react_2.useState)(false);
    const { success, warning, error } = (0, useNotification_1.useNotification)();
    const [knowledgeList, setKnowledgeList] = (0, react_2.useState)([]);
    const oriPrompt = (0, react_2.useRef)('');
    const [modelOptions, setModelOptions] = (0, react_2.useState)([]);
    const [queryingModelOptions, setQueryingModelOptions] = (0, react_2.useState)(false);
    const [saveTipVisible, setSaveTipVisible] = (0, react_2.useState)(false);
    const [resetTipVisible, setResetTipVisible] = (0, react_2.useState)(false);
    const [errorPath, setErrorPath] = (0, react_2.useState)('');
    const [errorMsg, setErrorMsg] = (0, react_2.useState)({
        reason: '',
        msg: ''
    });
    const showDiscardDraft = draftBotIds.has(oriForm?.botId);
    const firstExpose = (0, react_2.useRef)(true);
    const { getMyBotList } = (0, useGetWorkshopBots_1.default)();
    const { getListWidgets } = (0, useGetListWidgets_1.default)();
    const confirmToGoBack = () => {
        setCurrentForm({ ...oriForm });
        router.push(isMobile ? '/robot-workshop/widgets' : '/robot-workshop');
    };
    const defaultValues = {
        botId: botId || '',
        logo: '',
        logoUrl: 'https://image.myshell.ai/cdn-cgi/image/quality=40,format=webp/image/bot/logo/20240106/default.png',
        name: '',
        description: '',
        promptName: '',
        promptDescription: '',
        prompt: '',
        publishPrompt: false,
        publishBot: false,
        autoUpdatePrefixSuffix: false,
        introMessage: '',
        sendIntroMessage: true,
        model: '1700150483',
        temperature: 0.5,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        maxTokens: 1000,
        telegramToken: '',
        inputText: true,
        inputVoice: true,
        outputText: true,
        outputVoice: true,
        textMasking: false,
        textDisplay: true,
        textTranslation: true,
        imageInput: false,
        imageOutput: false,
        asrLangType: bot_2.AsrLangTypeEnum.Mixed,
        ttsId: '',
        voiceId: '',
        knowledgeBase: false,
        tagIds: '',
        prefix: '',
        postfix: '',
        openPrefix: true,
        openPostfix: true,
        ttsAccent: '',
        modeType: bot_2.ModeTypeEnum.CLASSIC,
        devModeRawInput: '',
        nocodeModeStructuredInput: '',
        opensourceModeInputFile: '',
        nocodeUsedWidgetIds: [],
        devModeType: bot_2.DevModeTypeEnum.PRO
    };
    const form = (0, react_form_1.useForm)({
        defaultValues: (0, react_2.useMemo)(() => {
            return {
                ...defaultValues
            };
        }, [])
    });
    const [botData, setBotData] = (0, react_2.useState)({ detail: {} });
    const [tagOptions, setTagOptions] = (0, react_2.useState)([]);
    const [languageName, setLanguageName] = (0, react_2.useState)('');
    const [isOpenNoCode, setIsOpenNoCode] = (0, react_2.useState)(false);
    const user = (0, store_1.useUserStore)(state => state.user);
    const queryBot = async () => {
        setDataLoading(true);
        if (!botId) {
            setformValues();
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
                sensors?.track('EnterCreationPage');
            }, 3000);
            setDataLoading(false);
            return;
        }
        const data = await (0, rxjs_1.lastValueFrom)((0, bot_1.getBotInfo)(botId));
        const curentBot = data?.bots?.[botId];
        setDataLoading(false);
        if (curentBot?.summary?.author.id !== user?.id) {
            router.push(isMobile ? '/robot-workshop/widgets' : '/robot-workshop');
            return;
        }
        if (curentBot?.summary?.isOfficalAssistantBot) {
            router.push(`/robot-workshop/bot/${botId}/chat`);
            return;
        }
        setBotData({
            detail: {
                ...curentBot?.summary,
                botSetting: curentBot?.setting
            }
        });
        const botInfo = curentBot?.summary?.botPrivateInfo;
        oriPrompt.current = botInfo?.prompt || '';
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            sensors?.track('EnterBotEditPage', {
                bot_id: botId,
                bot_name: curentBot?.summary?.name
            });
        }, 3000);
        setformValues(curentBot);
        setIsOpenNoCode(curentBot?.modeType === bot_2.ModeTypeEnum.NO_CODE);
    };
    (0, react_2.useEffect)(() => {
        const queryTags = async () => {
            setDataLoading(true);
            const res = await (0, bot_1.getTagInfos)('BOT_TAG_TYPE_EDIT');
            if (res.success) {
                setTagOptions(res.data?.map(item => {
                    return { ...item, value: item?.id };
                }));
            }
            setDataLoading(false);
        };
        if (tagOptions?.length === 0) {
            queryTags();
        }
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);
    (0, react_2.useEffect)(() => {
        if (tagOptions?.length > 0 && ((visitor === user_1.VisitorEnum.NO && user?.id) || visitor === user_1.VisitorEnum.YES)) {
            queryBot();
        }
    }, [tagOptions, visitor, user]);
    const setformValues = (bot) => {
        if (!botId) {
            form.setFieldValue('promptDescription', '');
            form.setFieldValue('promptName', '');
        }
        const createDraft = botId ? {} : identityService_1.identityService.getCreateDraft();
        const defaults = {
            ...defaultValues,
            ...createDraft
        };
        const summary = bot?.summary || {};
        const setting = bot?.setting || {};
        const botInfo = bot?.summary?.botPrivateInfo || {};
        const llmModel = summary?.llmModel || {};
        const curTagList = summary?.tagList;
        form.setFieldValue('botId', `${summary?.id || botId || ''}`);
        form.setFieldValue('logo', summary?.logo ?? defaults?.logo);
        form.setFieldValue('logoUrl', summary?.logoUrl ? summary?.logoUrl : defaults.logoUrl);
        form.setFieldValue('name', summary?.name ?? defaults.name);
        form.setFieldValue('description', summary?.description ?? defaults.description);
        form.setFieldValue('prompt', botInfo?.prompt ?? defaults.prompt);
        form.setFieldValue('publishPrompt', setting?.publishPrompt ?? defaults.publishPrompt);
        form.setFieldValue('publishBot', setting?.publishBot ?? defaults.publishBot);
        form.setFieldValue('telegramToken', botInfo?.tgToken ?? defaults.telegramToken);
        form.setFieldValue('autoUpdatePrefixSuffix', setting?.autoUpdatePrefixSuffix ?? defaults.autoUpdatePrefixSuffix);
        form.setFieldValue('introMessage', botInfo?.introMessage ?? defaults.introMessage);
        form.setFieldValue('sendIntroMessage', setting?.sendIntroMessage ?? defaults.sendIntroMessage);
        form.setFieldValue('model', llmModel?.model?.id ?? defaults.model);
        form.setFieldValue('temperature', llmModel?.temperature ?? defaults.temperature);
        form.setFieldValue('topP', llmModel?.topP ?? defaults.topP);
        form.setFieldValue('presencePenalty', llmModel?.presencePenalty ?? defaults.presencePenalty);
        form.setFieldValue('frequencyPenalty', llmModel?.frequencyPenalty ?? defaults.frequencyPenalty);
        form.setFieldValue('maxTokens', llmModel?.maxTokens ?? defaults.maxTokens);
        form.setFieldValue('ttsAccent', botInfo?.ttsAccent ?? defaults.ttsAccent);
        form.setFieldValue('inputText', setting?.inputText ?? defaults.inputText);
        form.setFieldValue('inputVoice', setting?.inputVoice ?? defaults.inputVoice);
        form.setFieldValue('outputText', setting?.outputText ?? defaults.outputText);
        form.setFieldValue('outputVoice', setting?.outputVoice ?? defaults.outputVoice);
        form.setFieldValue('textMasking', setting?.textMasking ?? defaults.textMasking);
        form.setFieldValue('textDisplay', setting?.textDisplay ?? defaults.textDisplay);
        form.setFieldValue('textTranslation', setting?.textTranslation ?? defaults.textTranslation);
        form.setFieldValue('imageInput', setting?.imageInput ?? defaults.imageInput);
        form.setFieldValue('imageOutput', setting?.imageOutput ?? defaults.imageOutput);
        form.setFieldValue('asrLangType', !botId ? bot_2.AsrLangTypeEnum.Mixed : setting?.isAsrMultiLanguage ? bot_2.AsrLangTypeEnum.Mixed : bot_2.AsrLangTypeEnum.English);
        form.setFieldValue('knowledgeBase', setting?.knowledgeBase ?? defaults.knowledgeBase);
        form.setFieldValue('ttsId', botInfo?.botTts?.id ?? defaults.ttsId);
        form.setFieldValue('voiceId', botInfo?.botTts?.voiceId > 0 ? botInfo?.botTts?.voiceId : botInfo?.botTts?.id ?? defaults.voiceId);
        form.setFieldValue('tagIds', curTagList?.length > 0 ? curTagList?.map((e) => e.id).join(',') : defaults.tagIds);
        form.setFieldValue('prefix', botInfo?.prefix ?? defaults.prefix);
        form.setFieldValue('postfix', botInfo?.postfix ?? defaults.postfix);
        form.setFieldValue('openPrefix', setting && 'openPrefix' in setting ? !!setting.openPrefix : defaults.openPrefix);
        form.setFieldValue('openPostfix', setting && 'openPostfix' in setting ? !!setting.openPostfix : defaults.openPostfix);
        form.setFieldValue('modeType', bot?.modeType ?? defaults.modeType);
        form.setFieldValue('devModeRawInput', bot?.devModeRawInput ?? defaults.devModeRawInput);
        form.setFieldValue('devModeType', defaults.devModeType);
        form.setFieldValue('nocodeModeStructuredInput', bot?.nocodeModeStructuredInput ?? defaults.nocodeModeStructuredInput);
        form.setFieldValue('opensourceModeInputFile', bot?.opensourceModeInputFile ?? defaults.opensourceModeInputFile);
        form.setFieldValue('nocodeUsedWidgetIds', bot?.nocodeUsedWidgetIds ?? defaults.nocodeUsedWidgetIds);
        const initData = transformData();
        const draftData = botId ? (0, draft_1.loadBotSettingsDraft)(initData) : identityService_1.identityService.getCreateDraft();
        if (draftData) {
            for (const key of Object.keys(draftData)) {
                form.setFieldValue(key, draftData[key]);
            }
        }
        if (initData.botId) {
            const newDraftBotIds = new Set(draftBotIds);
            if (draftData) {
                newDraftBotIds.add(initData.botId);
            }
            else {
                newDraftBotIds.delete(initData.botId);
            }
            setDraftBotIds(newDraftBotIds);
        }
        if (initData && draftData && initData?.devModeRawInput !== draftData?.devModeRawInput) {
            setCodeCheckPassed(false);
        }
        if (initData && draftData && initData?.nocodeModeStructuredInput !== draftData?.nocodeModeStructuredInput) {
            setNoCodeCheckPassed(false);
        }
        setOriForm({ ...initData });
        setCurrentForm({
            ...initData,
            ...draftData
        });
        setIsOpenNoCode(initData?.modeType === bot_2.ModeTypeEnum.NO_CODE);
        setStartInterval(true);
    };
    const validateInput = (0, react_2.useCallback)(() => {
        if (!botId && disable) {
            warning({ content: commonT('reached_limit') });
            return false;
        }
        if (!form.getFieldValue('name')) {
            warning({ content: commonT('name_bot_first') });
            return false;
        }
        if ((0, tokenizer_1.getTokenCount)(form.getFieldValue('introMessage')) > 500) {
            warning({ content: t('maximum_support', { count: 500 }) });
            return false;
        }
        if ((0, tokenizer_1.getTokenCount)(`${form.getFieldValue('prefix')}`) > 200) {
            warning({ content: t('maximum_support', { count: 200 }) });
            return false;
        }
        if ((0, tokenizer_1.getTokenCount)(`${form.getFieldValue('postfix')}`) > 200) {
            warning({ content: t('maximum_support', { count: 200 }) });
            return false;
        }
        if ((0, tokenizer_1.getTokenCount)(form.getFieldValue('prompt')) > 3000) {
            warning({ content: commonT('maximum_support', { count: 3000 }) });
            return false;
        }
        if ((0, tokenizer_1.getTokenCount)(form.getFieldValue('prefix') || '') > 200) {
            warning({ content: t('maximum_support', { count: 200 }) });
            return false;
        }
        if ((0, tokenizer_1.getTokenCount)(form.getFieldValue('postfix') || '') > 200) {
            warning({ content: t('maximum_support', { count: 200 }) });
            return false;
        }
        if (form.getFieldValue('sendIntroMessage') && !form.getFieldValue('introMessage')) {
            warning({
                content: t('no_intro_message_tip')
            });
            return false;
        }
        if (form.getFieldValue('modeType') === bot_2.ModeTypeEnum.DEV) {
            if (!form.getFieldValue('devModeRawInput')) {
                warning({
                    content: t('no_pro_config_tip')
                });
                setCodeCheckError(t('no_pro_config_tip'));
                return false;
            }
            if (!codeCheckPassed) {
                warning({
                    content: t('validate_pro_config_tip')
                });
                return false;
            }
        }
        if (form.getFieldValue('modeType') === bot_2.ModeTypeEnum.NO_CODE) {
            if (!form.getFieldValue('nocodeModeStructuredInput')) {
                warning({
                    content: 'Please enter nocode'
                });
                return false;
            }
            if (!noCodeCheckPassed) {
                warning({
                    content: 'Please validate nocode first.'
                });
                return false;
            }
        }
        if (form.getFieldValue('modeType') === bot_2.ModeTypeEnum.SHELL_AGENT) {
            if (!form.getFieldValue('opensourceModeInputFile')) {
                warning({
                    content: 'Please upload ShellAgent JSON file'
                });
                return false;
            }
        }
        return true;
    }, [commonT, disable, form, codeCheckPassed, noCodeCheckPassed, t, botId, warning]);
    const transformData = (0, react_2.useCallback)(() => {
        return {
            botId: form.getFieldValue('botId'),
            logo: form.getFieldValue('logo'),
            logoUrl: form.getFieldValue('logoUrl'),
            name: form.getFieldValue('name'),
            description: form.getFieldValue('description'),
            inputText: form.getFieldValue('inputText'),
            inputVoice: form.getFieldValue('inputVoice'),
            outputText: form.getFieldValue('outputText'),
            outputVoice: form.getFieldValue('outputVoice'),
            textMasking: form.getFieldValue('textMasking'),
            textDisplay: form.getFieldValue('textDisplay'),
            textTranslation: form.getFieldValue('textTranslation'),
            imageInput: form.getFieldValue('imageInput'),
            imageOutput: form.getFieldValue('imageOutput'),
            isAsrMultiLanguage: form.getFieldValue('asrLangType') === bot_2.AsrLangTypeEnum.Mixed,
            ttsId: form.getFieldValue('ttsId') ?? '',
            knowledgeBase: form.getFieldValue('knowledgeBase') ?? false,
            tagIds: form.getFieldValue('tagIds'),
            autoUpdatePrefixSuffix: form.getFieldValue('autoUpdatePrefixSuffix'),
            introMessage: form.getFieldValue('introMessage'),
            sendIntroMessage: form.getFieldValue('sendIntroMessage'),
            model: form.getFieldValue('model'),
            temperature: `${form.getFieldValue('temperature')}`,
            topP: form.getFieldValue('topP'),
            presencePenalty: form.getFieldValue('presencePenalty'),
            frequencyPenalty: form.getFieldValue('frequencyPenalty'),
            maxTokens: form.getFieldValue('maxTokens'),
            prompt: (form.getFieldValue('prompt') || '').trim(),
            prefix: form.getFieldValue('prefix') || '',
            postfix: form.getFieldValue('postfix') || '',
            openPrefix: form.getFieldValue('openPrefix') || false,
            openPostfix: form.getFieldValue('openPostfix') || false,
            promptDescription: form.getFieldValue('promptDescription') || '',
            autoUpdateProfile: form.getFieldValue('autoUpdateProfile') || false,
            publishPrompt: form.getFieldValue('publishPrompt') || false,
            publishBot: form.getFieldValue('publishBot') || false,
            ttsAccent: form.getFieldValue('ttsAccent') || '',
            modeType: form.getFieldValue('modeType') || bot_2.ModeTypeEnum.CLASSIC,
            devModeRawInput: form.getFieldValue('devModeRawInput') || '',
            nocodeModeStructuredInput: form.getFieldValue('nocodeModeStructuredInput') || '',
            opensourceModeInputFile: form.getFieldValue('opensourceModeInputFile') || '',
            nocodeUsedWidgetIds: form.getFieldValue('nocodeUsedWidgetIds') || []
        };
    }, [form, createAutoPromptTaskResult]);
    const regetBotInfo = async (updateData, id, callback) => {
        const data = await (0, rxjs_1.lastValueFrom)((0, bot_1.getBotInfo)(id && Number(id) > 0 ? id : botId));
        const curentBot = data?.bots?.[id && Number(id) > 0 ? id : botId];
        setBotData({
            detail: {
                ...curentBot?.summary,
                botSetting: curentBot?.setting
            }
        });
        if (updateData) {
            const temp = {
                ...oriForm,
                ...updateData
            };
            delete temp.modelParam;
            if (updateData?.modeType === bot_2.ModeTypeEnum.CLASSIC) {
                const codeInput = curentBot?.devModeRawInput;
                temp.devModeRawInput = codeInput;
                form?.setFieldValue('devModeRawInput', codeInput);
                setCurrentFormItem('devModeRawInput', codeInput);
            }
            setOriForm(temp);
        }
        else {
            setformValues(curentBot);
        }
        callback && callback(true, id);
    };
    const getLLMModelList = async () => {
        try {
            setQueryingModelOptions(true);
            const { success, data } = await (0, bot_1.getAvailableLlmModels)();
            if (success) {
                setModelOptions(data);
            }
        }
        catch (e) {
        }
        finally {
            setQueryingModelOptions(false);
        }
    };
    (0, react_2.useEffect)(() => {
        if (!modelOptions.length) {
            getLLMModelList();
        }
    }, [modelOptions]);
    const onSaveHandle = () => {
        onSave(success => {
            if (!success) {
                return;
            }
            const botId = oriForm?.botId;
            if (botId) {
                (0, draft_1.removeBotSettingsDraft)(botId);
                setDraftBotIds(draftBotIds => {
                    const newDraftBotIds = new Set(draftBotIds);
                    newDraftBotIds.delete(botId);
                    return newDraftBotIds;
                });
            }
        });
    };
    const setRecommend = (0, workshop_2.useWorkshopStore)(state => state.setRecommend);
    const onSave = (0, react_2.useCallback)(async (callback) => {
        setLoading(true);
        const updateData = {
            ...transformData(),
            modelParam: form.getFieldValue('model')
                ? {
                    modelId: form.getFieldValue('model'),
                    temperature: form.getFieldValue('temperature'),
                    topP: form.getFieldValue('topP'),
                    presencePenalty: form.getFieldValue('presencePenalty'),
                    frequencyPenalty: form.getFieldValue('frequencyPenalty'),
                    maxTokens: form.getFieldValue('maxTokens')
                }
                : undefined,
            botId: form.getFieldValue('botId'),
            nocodeModeStructuredInput: form.getFieldValue('nocodeModeStructuredInput') || '',
            opensourceModeInputFile: form.getFieldValue('opensourceModeInputFile') || ''
        };
        if (!validateInput()) {
            callback && callback(false);
            setLoading(false);
            return;
        }
        try {
            const res = await (0, bot_1.saveBot)(updateData);
            if (res.success) {
                const data = res.data;
                setAutoPromptTaskResult(null);
                regetBotInfo(updateData);
                callback && callback(true);
                if (!botId && data.botId) {
                    setDisable(true);
                    identityService_1.identityService.setCreateDraft(null);
                }
                setEditNotSave();
                success({ content: botId ? t('congrats_updated') : t('congrats_created') });
                getMyBotList();
                getListWidgets();
                router.push(`/robot-workshop/bot/${data.botId}/chat`);
            }
            else {
                if (res?.reason === 'ERROR_REASON_NOT_ALLOWED_DELETE_CURVE' && res.msg === 'bot has curve') {
                    warning({ content: requestT('error.can_not_delist_when_have_curve') });
                }
                else if (res?.reason !== 'request-400') {
                    const content = res.reason === 'ERROR_REASON_USER_CANT_CREATE_BOT' ? commonT('reached_limit') : requestT('error.common');
                    warning({ content });
                }
                callback && callback(false);
            }
        }
        catch (e) {
            callback && callback(false);
        }
        finally {
            setLoading(false);
        }
    }, [router, setActiveType, setSelectedUgcBotId, setOwnUgcBotList, success, transformData, botId, validateInput]);
    const onReset = (0, react_2.useCallback)(async (callback) => {
        const res = await (0, bot_1.resetBot)(botId);
        if (res.success) {
            queryBot();
            (0, draft_1.removeBotSettingsDraft)(botId);
            setKnowledgeList([]);
            getMyBotList();
            getListWidgets();
            const res = await (0, workshop_1.getWorkshopRecommend)();
            if (res.success) {
                setRecommend(res.data);
            }
            success({ content: t('congrats_updated') });
        }
        else {
            warning({ content: requestT('error.common') });
        }
        callback();
    }, [botId]);
    const profileRef = (0, react_2.useRef)(null);
    const ttsFormRef = (0, react_2.useRef)(null);
    const socialMediaRef = (0, react_2.useRef)(null);
    const promptFormRef = (0, react_2.useRef)(null);
    const knowledgeBaseFormRef = (0, react_2.useRef)(null);
    setEditNotSave();
    const scrollIntoView = (type) => {
        let curRef = profileRef?.current;
        switch (type) {
            case 'prompt':
                curRef = promptFormRef?.current;
                break;
        }
        curRef?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const setIframeUrlHandle = (section) => {
        setIframeUrl(section);
    };
    const guideContent = `${t('guide_prompt_buttons_description1')}<br/>${t('guide_prompt_buttons_description2')}<br/>${t('guide_prompt_buttons_description3')}`;
    const guideSteps = {
        prompt: [
            {
                element: '#prompt-widget-buttons',
                popover: {
                    title: t('guide_prompt_buttons_title'),
                    description: guideContent,
                    side: 'bottom',
                    align: 'start'
                }
            }
        ]
    };
    const driverObj = (0, react_2.useRef)(null);
    const driverGuide = (step, steps) => {
        if (guideRef.current) {
            clearTimeout(guideRef.current);
        }
        const userGuide = identityService_1.identityService.getUserGuide()?.split(',') || [];
        const hasGuide = userGuide?.includes(step);
        if (!hasGuide) {
            scrollIntoView(step);
            guideRef.current = setTimeout(() => {
                setIsGuide(true);
                driverObj.current = (0, driver_js_1.driver)({
                    nextBtnText: t('guide_next'),
                    doneBtnText: t('guide_done'),
                    showProgress: true,
                    allowClose: false,
                    showButtons: ['next'],
                    progressText: '{{current}}/{{total}}',
                    steps,
                    onDestroyed: () => {
                        setIsGuide(false);
                    }
                });
                driverObj.current.drive();
                userGuide?.push(step);
                identityService_1.identityService.setUserGuide(userGuide?.join(','));
            }, 1000);
        }
    };
    const handleIntersection = entries => {
        entries.forEach(entry => {
            const { target, isIntersecting } = entry;
            if (isIntersecting) {
                if (target === promptFormRef.current) {
                    driverGuide('prompt', guideSteps.prompt);
                }
            }
        });
    };
    const handleAnyFormValueChange = (0, react_2.useCallback)(() => {
        const draftData = transformData();
        if (!firstExpose.current) {
            if (botId) {
                const hasDraft = (0, draft_1.saveBotSettingsDraft)(oriForm, draftData);
                setDraftBotIds(draftBotIds => {
                    const newDraftBotIds = new Set(draftBotIds);
                    if (hasDraft) {
                        newDraftBotIds.add(botId);
                    }
                    else {
                        newDraftBotIds.delete(botId);
                    }
                    return newDraftBotIds;
                });
            }
            setEditNotSave();
            !botId && identityService_1.identityService.setCreateDraft(draftData);
        }
        else {
            firstExpose.current = false;
        }
    }, [botId, oriForm, transformData]);
    (0, react_2.useEffect)(() => {
        if (!startInterval) {
            return;
        }
        const interval = setInterval(() => {
            const draftData = transformData();
            const hasDraft = (0, draft_1.saveBotSettingsDraft)(oriForm, draftData);
            setDraftBotIds(draftBotIds => {
                const newDraftBotIds = new Set(draftBotIds);
                const botId = draftData.botId;
                if (hasDraft) {
                    newDraftBotIds.add(botId);
                }
                else {
                    newDraftBotIds.delete(botId);
                }
                return newDraftBotIds;
            });
        }, 500);
        return () => {
            clearInterval(interval);
        };
    }, [oriForm, setDraftBotIds, startInterval, transformData]);
    (0, react_2.useEffect)(() => {
        const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
        const refs = [promptFormRef.current];
        refs.map(item => {
            item && observer.unobserve(item);
        });
        refs.map(item => {
            item && observer.observe(item);
        });
        return () => {
            refs.map(item => {
                item && observer.unobserve(item);
            });
        };
    }, [botId]);
    (0, react_2.useEffect)(() => {
        return () => {
            isGuide && driverObj.current && driverObj.current.destroy();
        };
    }, []);
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const handleCheckCode = (0, react_2.useCallback)(async () => {
        try {
            setCodeChecking(true);
            const { success: apiSuccess, msg, metadata, reason } = await (0, bot_1.checkBotJointConfig)(form.getFieldValue('devModeRawInput') ?? '');
            if (!apiSuccess) {
                setCodeCheckError(msg);
                setErrorPath(metadata?.paths || '');
                setErrorMsg({
                    msg,
                    reason
                });
            }
            else {
                success({
                    content: t('pro_config_validate_success')
                });
                setErrorMsg({
                    msg: '',
                    reason: ''
                });
                setErrorPath('');
                setCodeCheckPassed(true);
            }
        }
        catch (e) {
        }
        finally {
            setCodeChecking(false);
        }
    }, [form, setCodeCheckPassed, setCodeChecking]);
    const handleCheckNoCode = (0, react_2.useCallback)(async () => {
        try {
            setNoCodeChecking(true);
            const { success: apiSuccess, msg } = await (0, bot_1.checkBotJointConfig)(form.getFieldValue('nocodeModeStructuredInput') ?? '');
            if (!apiSuccess) {
                if (msg) {
                    error({
                        content: msg
                    });
                }
            }
            else {
                success({
                    content: 'success'
                });
                setNoCodeCheckPassed(true);
            }
        }
        catch (e) {
        }
        finally {
            setNoCodeChecking(false);
        }
    }, [form, setNoCodeCheckPassed, setNoCodeChecking]);
    const onCodeChange = (clearError = false) => {
        setEditNotSave();
        setCodeCheckPassed(false);
        const codeValue = form?.getFieldValue('devModeRawInput');
        if (clearError) {
            setCodeCheckError(undefined);
        }
        else {
            setCodeCheckError(!codeValue ? t('no_pro_config_tip') : undefined);
        }
    };
    const onNoCodeChange = () => {
        setEditNotSave();
        handleAnyFormValueChange();
    };
    return ((0, jsx_runtime_1.jsxs)(FormChangeContext_1.FormChangeContext.Provider, { value: handleAnyFormValueChange, children: [(0, jsx_runtime_1.jsxs)("div", { id: "workshop-setting", className: "w-full h-full bg-surface-default text-sm relative", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full flex flex-col flex-nowrap text-on-surface border-b border-b-outline md:", children: [isMobile && ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-[100px] flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(TopBar, { botId: botId, active: botId ? 'setting' : 'create', onBack: () => {
                                        if (isMobile && !botId) {
                                            const isTip = currentForm?.name || currentForm?.prompt || currentForm?.description || currentForm?.tags;
                                            if (isTip) {
                                                setSaveTipVisible(true);
                                            }
                                            else {
                                                router.push(`/robot-workshop`);
                                            }
                                        }
                                    } }) })), (0, jsx_runtime_1.jsx)(react_1.Box, { className: "flex flex-grow items-center md:px-[2.78vw] pr-0 overflow-hidden w-full", children: (0, jsx_runtime_1.jsxs)(react_1.Flex, { h: "full", w: "full", className: "relative", children: [(0, jsx_runtime_1.jsx)(form.Form, { onChange: handleAnyFormValueChange, className: `${isGuide ? 'overflow-hidden' : 'overflow-y-auto'} overflow-x-hidden no-scrollbar w-full relative`, children: (0, jsx_runtime_1.jsxs)("div", { className: "md:pb-6 px-0 md:px-5 w-full xl:max-w-[65%] large:max-w-[70%] md:pt-[10px] ", children: [(0, jsx_runtime_1.jsxs)("div", { ref: profileRef, className: "px-4 md:px-0 pt-6 md:pt-5 border-b-[6px] md:border-b-[1px] border-surface-container-default dark:border-[#42434A]", children: [(0, jsx_runtime_1.jsx)(ProfileForm_1.default, { form: form, disable: disable, showLearnMore: setIframeUrlHandle, isGuide: isGuide, tagOptions: tagOptions, loading: dataLoading }), (0, jsx_runtime_1.jsx)(IntroMessage, { form: form, isGuide: isGuide, loading: dataLoading })] }), (0, jsx_runtime_1.jsx)("div", { className: "pb-5 pt-6 px-4 md:px-0 md:pt-5", children: (0, jsx_runtime_1.jsx)(ModeTypeForm, { form: form }) }), currentForm?.modeType === bot_2.ModeTypeEnum.SHELL_AGENT ? ((0, jsx_runtime_1.jsx)(ShellAgent, { form: form, onNoCodeChange: onNoCodeChange, isMobile: isMobile })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: currentForm?.modeType === bot_2.ModeTypeEnum.DEV ? ((0, jsx_runtime_1.jsx)("div", { className: "px-4 md:px-0", children: (0, jsx_runtime_1.jsx)(DevMode, { form: form, handleCheckCode: handleCheckCode, checking: codeChecking, errorInfo: codeCheckError, onCodeChange: onCodeChange, errorPath: errorPath, errorMsg: errorMsg }) })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { ref: promptFormRef, className: "px-4 md:px-0 pt-6 md:pt-5 pb-2.5 border-b-[6px] md:border-b-[1px] border-surface-container-default dark:border-[#42434A]", children: (0, jsx_runtime_1.jsx)(PromptForm, { form: form, isGuide: isGuide, modelOptions: modelOptions, queryingModelOptions: queryingModelOptions }) }), (0, jsx_runtime_1.jsx)("div", { ref: ttsFormRef, className: "px-4 md:px-0 pt-6 md:pt-5 border-b-[6px] md:border-b-[1px] border-surface-container-default dark:border-[#42434A] pb-5", children: (0, jsx_runtime_1.jsx)(TTSForm, { form: form, disable: disable, showLearnMore: setIframeUrlHandle, isGuide: isGuide, languageName: languageName, setLanguageName: setLanguageName, bot: botData.detail, botId: botId }) }), (0, jsx_runtime_1.jsx)("div", { ref: socialMediaRef, className: "px-4 md:px-0 pt-6 md:pt-5 pb-5 border-b-[6px] md:border-b-[1px] border-surface-container-default dark:border-[#42434A]", children: (0, jsx_runtime_1.jsx)(SocialMedia_1.default, { form: form, showLearnMore: setIframeUrlHandle, isGuide: isGuide }) }), (0, jsx_runtime_1.jsx)("div", { ref: knowledgeBaseFormRef, className: "px-4 md:px-0 pt-6 md:pt-5 pb-5 border-b-[6px] md:border-b-[1px] border-surface-container-default dark:border-[#42434A]", children: (0, jsx_runtime_1.jsx)(KnowledgeBaseForm, { botId: botId, disable: disable, onUpdateId: setBotId, form: form, knowledgeList: knowledgeList, setKnowledgeList: setKnowledgeList, showLearnMore: setIframeUrlHandle, isGuide: isGuide, onSave: onSaveHandle }) }), (0, jsx_runtime_1.jsxs)("div", { className: "px-4 md:px-0 pt-6 md:pt-5 w-full flex flex-col md:flex-row justify-between items-start md:items-center", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-[20px] text-on-surface opacity-50 pb-2 md:pb-0", children: t('widgets_btn') }), (0, jsx_runtime_1.jsx)(WidgetsButtons, { isDisabled: true })] }), (0, jsx_runtime_1.jsxs)("p", { className: "px-4 md:px-0 text-secondary text-sm mt-1.5 pb-5", children: [t('widget_intro'), (0, jsx_runtime_1.jsx)("span", { className: "text-secondary px-1", children: t('coming_soon') })] })] })) })), botId && ((0, jsx_runtime_1.jsxs)("div", { className: "pt-5 border-t-[6px] md:border-t border-surface-container-default dark:border-[#42434A]", children: [(0, jsx_runtime_1.jsx)("p", { className: "px-4 md:px-0 text-xl text-on-surface", children: t('reset_bot_title') }), (0, jsx_runtime_1.jsx)("p", { className: "px-4 md:px-0 text-secondary text-sm mt-2 pb-4", children: t('reset_bot_tip') }), (0, jsx_runtime_1.jsx)("div", { className: "px-4 md:px-0 pb-4", children: (0, jsx_runtime_1.jsx)("button", { className: "h-[36px] md:h-[44px] min-w-[120px] flex justify-center items-center rounded-full text-[#EC2F0D] border-[#EC2F0D] border px-4 py-2 font-medium text-sm cursor-pointer", onClick: () => {
                                                                        setResetTipVisible(true);
                                                                    }, children: t('reset_all_btn') }) })] }))] }) }), (0, jsx_runtime_1.jsx)(PreviewCard_1.default, { form: form, bot: botData.detail, tagOptions: tagOptions, languageName: languageName, modelOptions: modelOptions, loading: dataLoading })] }) }), (0, jsx_runtime_1.jsx)(SettingFooter, { onSave: onSaveHandle, onDiscardDraft: showDiscardDraft && !loading
                                    ? () => {
                                        setCurrentForm(oriForm);
                                        for (const key of Object.keys(oriForm)) {
                                            form.setFieldValue(key, oriForm[key]);
                                        }
                                        const id = oriForm.botId;
                                        (0, draft_1.removeBotSettingsDraft)(id);
                                        if (draftBotIds.has(id)) {
                                            const newDraftBotIds = new Set(draftBotIds);
                                            newDraftBotIds.delete(id);
                                            setDraftBotIds(newDraftBotIds);
                                        }
                                        onCodeChange(true);
                                        onNoCodeChange();
                                    }
                                    : undefined, form: form, botId: botId, loading: loading, disable: disable, setDisable: setDisable })] }), (0, jsx_runtime_1.jsx)("div", { id: "nocode-window", className: "absolute inset-0 hidden overflow-hidden" })] }), iframeUrl && ((0, jsx_runtime_1.jsx)(IframeModal_1.default, { isOpen: !!iframeUrl, onClose: () => {
                    setIframeUrl('');
                }, url: t(`${iframeUrl}`) })), saveTipVisible && ((0, jsx_runtime_1.jsx)(SaveTipModal, { isOpen: saveTipVisible, onClose: () => {
                    setSaveTipVisible(false);
                    confirmToGoBack();
                }, onConfirmed: (callback) => {
                    onSave((res) => {
                        setSaveTipVisible(false);
                        callback();
                        res && confirmToGoBack();
                    });
                } })), resetTipVisible && ((0, jsx_runtime_1.jsx)(ResetTipModal, { isOpen: resetTipVisible, onClose: () => {
                    setResetTipVisible(false);
                }, onConfirmed: () => {
                    onReset(() => {
                        setResetTipVisible(false);
                    });
                } }))] }));
}
function WorkshopSettingForm() {
    const params = (0, navigation_1.useParams)();
    return (0, jsx_runtime_1.jsx)(WorkshopCreateForm, {}, params.botId || 'default');
}
