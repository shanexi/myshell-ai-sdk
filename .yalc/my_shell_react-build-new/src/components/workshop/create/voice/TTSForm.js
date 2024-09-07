"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TTSForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const bot_1 = require("../../../../apis/bot.js");
const workshop_1 = require("../../../../apis/workshop.js");
const useHandleAnyFormValueChange_1 = require("../../../../components/workshop/create/hooks/useHandleAnyFormValueChange.js");
const TTSList_1 = __importDefault(require("../../../../components/workshop/create/voice/TTSList.js"));
const useGetEnergyInfo_1 = __importDefault(require("../../../../hooks/user/useGetEnergyInfo.js"));
const store_1 = require("../../../../services/store/index.js");
const workshop_2 = require("../../../../services/store/workshop.js");
const WidgetsButtons_1 = __importDefault(require("../WidgetsButtons.js"));
const languageLangIdMap = {
    en: 1,
    zh: 3,
    es: 8,
    jp: 2,
    ru: 4
};
function TTSForm({ form, disable, showLearnMore, isGuide, languageName, setLanguageName, bot, botId }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const handleAnyFormValueChange = (0, useHandleAnyFormValueChange_1.useHandleAnyFormValueChange)();
    const { getEnergyInfo } = (0, useGetEnergyInfo_1.default)();
    const setSelectedTTSId = (0, workshop_2.useWorkshopStore)(state => state.setSelectedTTSId);
    const ttsList = (0, workshop_2.useWorkshopStore)(state => state.ttsList) || [];
    const setTTSList = (0, workshop_2.useWorkshopStore)(state => state.setTTSList);
    const getTtsContent = (0, workshop_2.useWorkshopStore)(state => state.getTtsContent);
    const languageList = (0, workshop_2.useWorkshopStore)(state => state.languageList);
    const setLanguageList = (0, workshop_2.useWorkshopStore)(state => state.setLanguageList);
    const language = (0, store_1.useGlobalStore)(state => state.language);
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const [text, setText] = (0, react_2.useState)('');
    const [loading, setLoading] = (0, react_2.useState)(false);
    const [playing, setPlaying] = (0, react_2.useState)(false);
    const [previewUrl, setPreviewUrl] = (0, react_2.useState)('');
    const audioRef = (0, react_2.useRef)(null);
    const [queryingVoiceList, setQueryingVoiceList] = (0, react_2.useState)(false);
    const [queryingLangs, setQueryingLangs] = (0, react_2.useState)(false);
    const [selectedLang, setSelectedLang] = (0, react_2.useState)('-1');
    const [imgPreviewUrl, setImgPreviewUrl] = (0, react_2.useState)();
    const currentForm = (0, workshop_2.useWorkshopStore)(state => state.currentForm);
    const setCurrentForm = (0, workshop_2.useWorkshopStore)(state => state.setCurrentForm);
    const [selectedTTS, setSelectedTTS] = (0, react_2.useState)(currentForm?.ttsId);
    const [isUnpublishTTS, setIsUnpublishTTS] = (0, react_2.useState)(false);
    const [selectedTTSItem, setSelectedTTSItem] = (0, react_2.useState)(ttsList?.find(tts => tts.ttsId === currentForm?.ttsId));
    const setEditNotSave = (0, workshop_2.useWorkshopStore)(state => state.setEditNotSave);
    const onTTSChanged = (0, react_2.useCallback)((ttsId) => {
        setIsUnpublishTTS(false);
        setSelectedTTS(ttsId);
        form.setFieldValue('ttsId', ttsId);
        handleAnyFormValueChange();
        setCurrentForm({ ...currentForm, ttsId });
        setEditNotSave();
    }, [ttsList, form, setCurrentForm, currentForm, selectedLang]);
    const playHandle = (previewUrl) => {
        if (audioRef.current) {
            audioRef.current.src = previewUrl;
            audioRef.current.load();
            audioRef.current.play();
            audioRef.current.addEventListener('play', onPlay, { once: true });
            audioRef.current.addEventListener('ended', onEnded, { once: true });
        }
    };
    const playVoice = (widgetId) => {
        setLoading(true);
        if (widgetId) {
            (0, workshop_1.ttsWidgetTrail)(widgetId)
                .then(res => {
                const url = res.data;
                setPreviewUrl(url);
                if (audioRef.current) {
                    playHandle(url);
                    onPlay();
                    getEnergyInfo();
                }
            })
                .finally(() => {
                setLoading(false);
            });
        }
    };
    const onPlay = () => {
        setLoading(false);
        setPlaying(true);
    };
    const onEnded = () => {
        setPlaying(false);
    };
    const stopPlaying = () => {
        if (audioRef.current) {
            audioRef.current?.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.removeEventListener('ended', onEnded);
            setPlaying(false);
        }
    };
    const pageTokenRef = (0, react_2.useRef)('0');
    const hasMoreRef = (0, react_2.useRef)(true);
    (0, react_2.useEffect)(() => {
        pageTokenRef.current = '0';
        hasMoreRef.current = true;
        queryTTSList();
    }, [selectedLang]);
    const queryTTSList = (0, react_2.useCallback)(async () => {
        if (queryingVoiceList || !hasMoreRef.current)
            return;
        setQueryingVoiceList(true);
        try {
            const res = await (0, workshop_1.getTTSList)({
                pageToken: pageTokenRef.current,
                languageId: selectedLang,
                botId
            });
            const data = res?.data || {};
            setTTSList(pageTokenRef.current == '0' ? data.list : [...ttsList, ...data.list]);
            pageTokenRef.current = data?.nextPageToken;
            hasMoreRef.current = data?.hasMore;
            return res;
        }
        catch {
            console.warn('tts list err');
            return null;
        }
        finally {
            setQueryingVoiceList(false);
        }
    }, [queryingVoiceList, selectedLang, ttsList, setTTSList, currentForm]);
    const queryLanguageList = (0, react_2.useCallback)(async () => {
        setQueryingLangs(true);
        const res = await (0, bot_1.getLanguageList)();
        if (res.success) {
            setLanguageList(res.data);
        }
        setQueryingLangs(false);
    }, [setLanguageList]);
    (0, react_2.useEffect)(() => {
        const playedVoiceUrl = getTtsContent(selectedTTS, text);
        if (playedVoiceUrl) {
            setPreviewUrl(playedVoiceUrl);
        }
        else {
            setPreviewUrl('');
        }
        if (audioRef.current) {
            audioRef.current?.pause();
            audioRef.current.currentTime = 0;
            setPlaying(false);
        }
    }, [text, selectedTTS]);
    (0, react_2.useEffect)(() => {
        if (ttsList?.length > 0) {
            if (currentForm?.ttsId) {
                const notFindTTS = ttsList?.every((tts) => {
                    return tts.id !== currentForm?.ttsId;
                });
                if (notFindTTS) {
                    setIsUnpublishTTS(true);
                }
            }
            else {
                const userLangId = languageLangIdMap[language] || '1';
                if (ttsList?.some((tts) => tts.language?.id === userLangId)) {
                    onTTSChanged(`${ttsList?.find((tts) => tts.language?.id === userLangId)?.ttsId}` ?? '');
                }
                else {
                    onTTSChanged(`${ttsList[0]?.ttsId}`);
                }
            }
        }
    }, [ttsList?.length, language, currentForm]);
    (0, react_2.useEffect)(() => {
        setSelectedTTSId(selectedTTS);
        setSelectedTTSItem(ttsList?.find(tts => tts.ttsId === currentForm?.ttsId));
    }, [selectedTTS, setSelectedTTSId]);
    (0, react_2.useEffect)(() => {
        if (languageList?.length !== 0)
            return;
        queryLanguageList();
    }, [languageList?.length, queryLanguageList]);
    (0, react_2.useEffect)(() => {
        setSelectedTTS(currentForm?.ttsId);
        const tag = languageList?.filter(e => selectedTTSItem?.language?.id === `${e.id}`)?.[0];
        tag?.name && setLanguageName(tag?.name);
    }, [currentForm?.ttsId, languageList, selectedTTSItem?.id]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-[6px]", id: "voice", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl mr-1", children: t('voice') }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xl", children: ["(", t('tts'), ")"] })] }), (0, jsx_runtime_1.jsx)(form.Field, { name: "outputVoice", children: field => ((0, jsx_runtime_1.jsx)(react_1.Switch, { name: field.name, size: "md", colorScheme: "brand", disabled: isGuide, isChecked: field.getValue(), ...field.getInputProps(), onChange: (e) => {
                                                if (!isGuide) {
                                                    field.setValue(e.target.checked);
                                                    handleAnyFormValueChange();
                                                    setCurrentForm({ ...currentForm, outputVoice: e.target.checked });
                                                }
                                            } })) })] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-secondary", children: [t('voice_desc'), (0, jsx_runtime_1.jsx)("span", { onClick: () => {
                                            if (!isGuide) {
                                                showLearnMore('tts_learn_more');
                                            }
                                        }, className: "text-primary cursor-pointer", children: t('learn_more') })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "h-full bg-surface-default", children: (0, jsx_runtime_1.jsxs)(react_1.Flex, { flexGrow: "1", borderRadius: "12px", className: "flex flex-col space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row justify-between items-center w-full h-auto md:h-9", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-full md:w-[40%] text-sm md:text-base", children: t('voice_list') }), (0, jsx_runtime_1.jsx)("div", { className: "w-full flex justify-start md:justify-end pt-2 md:py-0", children: (0, jsx_runtime_1.jsx)(WidgetsButtons_1.default, { links: {
                                                    widget: '1742195173967794176',
                                                    tool: '1742195260089438208$$1742972311058780160'
                                                } }) })] }), (0, jsx_runtime_1.jsx)(TTSList_1.default, { form: form, queryingLangs: queryingLangs, ttsList: ttsList, selectedTTS: selectedTTS, imgPreviewUrl: imgPreviewUrl, isGuide: isGuide, onTTSChanged: onTTSChanged, selectedTTSItem: selectedTTSItem, onPlay: (widgetId) => {
                                        if (playing) {
                                            stopPlaying();
                                        }
                                        else {
                                            playVoice(widgetId);
                                        }
                                    }, selectedLang: selectedLang, setSelectedLang: setSelectedLang, playing: playing, loading: loading, isUnpublishTTS: isUnpublishTTS, botTts: bot?.botPrivateInfo?.botTts, queryTTSList: queryTTSList, queryingVoiceList: queryingVoiceList, currentToken: pageTokenRef.current, hasMore: hasMoreRef.current })] }) })] }), (0, jsx_runtime_1.jsx)("audio", { ref: audioRef })] }));
}
