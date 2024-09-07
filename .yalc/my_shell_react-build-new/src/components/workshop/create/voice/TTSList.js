"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TTSList;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner.js"));
const ChevronDownIcon_1 = __importDefault(require("@heroicons/react/24/solid/ChevronDownIcon"));
const PauseIcon_1 = __importDefault(require("@heroicons/react/24/solid/PauseIcon"));
const PlayIcon_1 = __importDefault(require("@heroicons/react/24/solid/PlayIcon"));
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const react_infinite_scroll_component_1 = __importDefault(require("react-infinite-scroll-component"));
const CheckOutline_1 = __importDefault(require("../../../../common/components/icons/workshop/tts/CheckOutline.js"));
const Voice_1 = __importDefault(require("../../../../common/components/icons/workshop/tts/Voice.js"));
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const workshop_1 = require("../../../../services/store/workshop.js");
const TTSFilters_1 = __importDefault(require("./TTSFilters.js"));
const TTSLoadingSkeleton_1 = __importDefault(require("./TTSLoadingSkeleton.js"));
function TTSList({ form, queryingLangs, ttsList, selectedTTS, isGuide, imgPreviewUrl, onTTSChanged, selectedTTSItem, onPlay, selectedLang, setSelectedLang, playing, loading, isUnpublishTTS, botTts, queryTTSList, queryingVoiceList, currentToken, hasMore }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const uncheckedSet = (0, workshop_1.useWorkshopStore)(state => state.uncheckedSet);
    const removeItemFromUncheckedSet = (0, workshop_1.useWorkshopStore)(state => state.removeItemFromUncheckedSet);
    const languageList = (0, workshop_1.useWorkshopStore)(state => state.languageList);
    const botT = (0, next_intl_1.useTranslations)('bot');
    const [selectedPlayTTSId, setSelectedPlayTTSId] = (0, react_2.useState)('');
    const getLatestVoice = (0, workshop_1.useWorkshopStore)(state => state.getLatestVoice);
    const selectedElementRef = (0, react_2.useRef)(null);
    const currentForm = (0, workshop_1.useWorkshopStore)(state => state.currentForm);
    const buttonItem = selectedTTSItem?.name
        ? selectedTTSItem
        : ttsList?.find(tts => tts.ttsId === currentForm?.ttsId);
    const listBoxRef = (0, react_2.useRef)(null);
    (0, react_2.useEffect)(() => {
        if (currentToken === '0' && listBoxRef.current) {
            listBoxRef.current.scrollTop = 0;
        }
    }, [currentToken, ttsList]);
    const filterTTSId = (tts) => {
        const curTTSItem = ttsList?.find(item => item.ttsId == tts?.id);
        const filterItem = curTTSItem?.ttsList?.filter(item => {
            return selectedLang === item.language.id;
        })?.[0];
        return filterItem?.id || curTTSItem?.ttsId;
    };
    const clickVoiceItemHandle = (tts) => {
        if (!isGuide) {
            const ttsId = filterTTSId(tts);
            onTTSChanged(ttsId);
            if (!tts.isSystem) {
                if (uncheckedSet.has(ttsId)) {
                    removeItemFromUncheckedSet(ttsId);
                }
            }
        }
    };
    function VoiceAvatar(tts) {
        return ((0, jsx_runtime_1.jsx)(react_1.Flex, { flexShrink: 0, w: "32px", h: "32px", borderRadius: "full", justifyContent: "center", alignItems: "center", position: "relative", border: tts?.image ? 'none' : '1.2px solid var(--border)', children: `${tts?.id}` === selectedTTS && imgPreviewUrl ? ((0, jsx_runtime_1.jsx)(image_1.default, { src: imgPreviewUrl, className: "w-full h-full rounded-full object-cover inline-block", alt: "tts image", width: 32, height: 32 })) :
                tts?.image ? ((0, jsx_runtime_1.jsx)(image_1.default, { src: (0, common_helper_1.getAssetsUrl)(tts?.image), className: "w-full h-full rounded-full object-cover inline-block", alt: "tts image", width: 32, height: 32 })) : ((0, jsx_runtime_1.jsx)(Voice_1.default, { className: "stroke-[--secondary] text-secondary" })) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { id: "voiceList", className: "z-[3]", children: (0, jsx_runtime_1.jsxs)(react_1.Menu, { onOpen: () => {
            }, children: [(0, jsx_runtime_1.jsx)(react_1.MenuButton, { h: "48px", w: "fit-content", minW: "100%", p: "12px", display: "flex", as: react_1.Button, variant: "unstyled", border: "1px solid var(--border)", borderRadius: "12px", color: "var(--on-surface)", boxShadow: "0px 1px 0px 0px #0000000D", rightIcon: (0, jsx_runtime_1.jsx)(ChevronDownIcon_1.default, { className: "w-[24px] h-[24px]" }), isDisabled: queryingLangs || isGuide, isLoading: queryingLangs, children: (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-between", children: isUnpublishTTS ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [VoiceAvatar(botTts), (0, jsx_runtime_1.jsx)(react_1.Text, { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", className: "ml-2 text-[16px]", children: botTts?.name })] })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: buttonItem?.name && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [VoiceAvatar(buttonItem), (0, jsx_runtime_1.jsx)(react_1.Text, { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", className: "ml-2 text-[16px]", children: buttonItem?.name })] })) })) }) }), (0, jsx_runtime_1.jsxs)(react_1.MenuList, { gap: "0", borderRadius: "12px", borderColor: "var(--border)", minW: "100%", className: "bg-surface w-[92vw] max-w-[600px]", children: [(0, jsx_runtime_1.jsx)("div", { className: "pb-1", children: (0, jsx_runtime_1.jsx)(TTSFilters_1.default, { queryingLangs: queryingLangs, isGuide: isGuide, selectedLang: selectedLang, setSelectedLang: setSelectedLang }) }), (0, jsx_runtime_1.jsx)("div", { ref: listBoxRef, className: "h-[250px] px-3 overflow-auto mt-2", children: queryingVoiceList && currentToken === '0' ? ((0, jsx_runtime_1.jsx)(TTSLoadingSkeleton_1.default, { num: 4 })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: ttsList?.length > 0 ? ((0, jsx_runtime_1.jsx)(react_infinite_scroll_component_1.default, { className: "overflow-auto space-y-3 no-scrollbar", dataLength: ttsList.length, next: queryTTSList, hasMore: hasMore, loader: (0, jsx_runtime_1.jsx)(TTSLoadingSkeleton_1.default, { num: 4 }), endMessage: (0, jsx_runtime_1.jsx)("p", { className: "text-center", children: t('no_more') }), height: 250, children: ttsList?.map(tts => {
                                        const langTag = languageList?.filter(e => tts?.language?.id === `${e.id}`)?.[0];
                                        const isItemSelected = tts.id === buttonItem?.id;
                                        return ((0, jsx_runtime_1.jsx)(react_1.MenuItem, { className: "flex w-full items-center rounded-xl relative h-[60px] bg-surface-default", onClick: () => clickVoiceItemHandle(tts), p: "0", ref: tts.ttsId === selectedTTS ? selectedElementRef : null, children: (0, jsx_runtime_1.jsxs)("div", { className: `flex w-full px-2 py-3 items-center rounded-xl border-[1px] border-default relative hover:bg-surface-container ${isItemSelected && 'bg-surface-accent-gray-subtle'}`, children: [(0, jsx_runtime_1.jsx)(react_1.Flex, { className: "bg-primary mr-[8px] flex justify-center items-center w-6 h-6 rounded-full min-w-0", onClick: e => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            onPlay(tts?.widgetId);
                                                            setSelectedPlayTTSId(tts.id);
                                                            e.stopPropagation();
                                                        }, children: playing && tts.id === selectedPlayTTSId ? ((0, jsx_runtime_1.jsx)(PauseIcon_1.default, { className: "w-4 h-4 bg-primary fill-[#fff]" })) : loading && tts.id === selectedPlayTTSId ? ((0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-white", size: "xs" })) : ((0, jsx_runtime_1.jsx)(PlayIcon_1.default, { className: "w-4 h-4 ml-[2px] bg-primary fill-[#fff]" })) }), VoiceAvatar(tts), (0, jsx_runtime_1.jsx)(react_1.Text, { className: "ml-2 text-[16px]", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", children: tts.name }), langTag?.displayName && ((0, jsx_runtime_1.jsx)("div", { className: "px-[8px] py-[3px] bg-surface-container-low text-secondary text-[12px] mx-[8px] font-semibold rounded-[6px]", children: langTag?.displayName })), tts?.id === buttonItem?.id && ((0, jsx_runtime_1.jsx)(CheckOutline_1.default, { color: "#3E5CFA", className: "absolute right-[12px]", fontSize: "16px" }))] }) }, tts.id));
                                    }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center h-[80%]", children: t('nothing_found') })) })) })] })] }) }));
}
