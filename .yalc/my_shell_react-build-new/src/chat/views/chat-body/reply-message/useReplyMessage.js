"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReplyMessage = exports.TranslateStatus = exports.TextMessage = void 0;
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const rxjs_1 = require("rxjs");
const enums_1 = require("../../../../chat/model/enums.js");
const interfaces_1 = require("../../../../chat/model/interfaces.js");
const useGenerateTts_1 = __importDefault(require("../../../../chat/views/hooks/useGenerateTts.js"));
const useDevice_1 = require("../../../../common/hooks/useDevice.js");
const EventEmitter_1 = __importDefault(require("../../../../common/utils/EventEmitter.js"));
const store_1 = require("../../../../services/store/index.js");
const useTranslate_1 = __importDefault(require("../../hooks/translate/useTranslate.js"));
var TextMessage;
(function (TextMessage) {
    TextMessage["origin"] = "origin";
    TextMessage["translation"] = "translation";
})(TextMessage || (exports.TextMessage = TextMessage = {}));
var TranslateStatus;
(function (TranslateStatus) {
    TranslateStatus["default"] = "default";
    TranslateStatus["translating"] = "translating";
    TranslateStatus["translated"] = "translated";
    TranslateStatus["error"] = "error";
})(TranslateStatus || (exports.TranslateStatus = TranslateStatus = {}));
const useReplyMessage = ({ chat, onChangeCopyText, selectedBot, latest, botChatSetting }) => {
    const { translate } = (0, useTranslate_1.default)(chat);
    const setTranslatedText = (0, store_1.useChatStore)(state => state.setTranslatedText);
    const updateMessage = (0, store_1.useChatStore)(state => state.updateMessage);
    const transactionDisplaySet = (0, store_1.useChatStore)(state => state.transactionDisplaySet);
    const chatlocale = (0, next_intl_1.useTranslations)('chat');
    const [textMessageStatus, setTextMessageStatus] = (0, react_1.useState)(TextMessage.origin);
    const [textMessage, setTextMessage] = (0, react_1.useState)(chat.text);
    const [translateStatus, setTranslateStatus] = (0, react_1.useState)(chat.translation ? TranslateStatus.translated : TranslateStatus.default);
    const [isSupportedStream, setIsSupportedStream] = (0, react_1.useState)(false);
    const [pendingForRegenerate, setPendingForRegenerate] = (0, react_1.useState)(false);
    const { isIos } = (0, useDevice_1.useDevice)();
    const { generating, generateTts } = (0, useGenerateTts_1.default)();
    const destroy$ = (0, react_1.useMemo)(() => new rxjs_1.Subject(), []);
    const singleTranscriptionDisplayOpen = (0, react_1.useMemo)(() => {
        return transactionDisplaySet.has(chat.id);
    }, [chat.id, transactionDisplaySet]);
    const translateMessage = (0, react_1.useCallback)(async () => {
        if (translateStatus === TranslateStatus.translating) {
            return;
        }
        setTranslateStatus(TranslateStatus.translating);
        try {
            await translate();
        }
        catch (e) {
            setTranslateStatus(TranslateStatus.error);
        }
    }, [translate, translateStatus]);
    (0, react_1.useEffect)(() => {
        let _textMessage = '';
        if (textMessageStatus === TextMessage.translation) {
            if (chat.translation) {
                _textMessage = chat.translation;
            }
            else if (translateStatus === TranslateStatus.translating) {
                _textMessage = chatlocale('translating');
            }
            else if (translateStatus === TranslateStatus.error) {
                _textMessage = chatlocale('translation_failed');
            }
        }
        else {
            _textMessage = chat.text;
        }
        setTextMessage(_textMessage);
        if (textMessageStatus === TextMessage.translation &&
            !chat.translation &&
            translateStatus !== TranslateStatus.error) {
            translateMessage();
        }
    }, [chat.text, chat.translation, chatlocale, textMessageStatus, translateMessage, translateStatus]);
    (0, react_1.useEffect)(() => {
        return () => {
            destroy$.next();
            destroy$.complete();
        };
    }, [destroy$]);
    (0, react_1.useEffect)(() => {
        if (!isIos) {
            if (window.MediaSource && window.MediaSource.isTypeSupported('audio/mpeg')) {
                setIsSupportedStream(true);
            }
        }
    }, [isIos]);
    (0, react_1.useEffect)(() => {
        if (!botChatSetting?.isTranslationOn) {
            return;
        }
        const type = `translate-${chat.id}`;
        const cb = (data) => {
            if (chat.id === data.id) {
                if (textMessageStatus !== TextMessage.translation && chat.status == enums_1.MessageStatusEnum.DONE) {
                    setTextMessageStatus(TextMessage.translation);
                }
                if (textMessageStatus === TextMessage.translation) {
                    setTextMessageStatus(TextMessage.origin);
                }
            }
        };
        EventEmitter_1.default.subscribe(type, cb);
        return () => {
            EventEmitter_1.default.unSubscribe(type);
        };
    }, [
        botChatSetting?.isTranslationOn,
        textMessageStatus,
        TextMessage.translation,
        setTextMessageStatus,
        chat.id,
        chat.status
    ]);
    const checkIfShowMsg = () => {
        if (chat.feedbackState > 0) {
            return true;
        }
        if (!latest)
            return false;
        if (!chat.textStream || chat.textStream.length === 0)
            return true;
        return chat.textStream.some(e => e.isFinal);
    };
    const toggleTranslate = () => {
        if (textMessageStatus !== TextMessage.translation && chat.status == enums_1.MessageStatusEnum.DONE) {
            setTextMessageStatus(TextMessage.translation);
        }
        if (textMessageStatus === TextMessage.translation) {
            setTextMessageStatus(TextMessage.origin);
        }
    };
    const showAudio = botChatSetting?.isAudioOn &&
        (selectedBot?.botSetting?.outputVoice || (!!chat.componentContainer && !!chat.voiceUrl));
    const iosAudio = isIos && chat.status !== enums_1.MessageStatusEnum.DONE && chat.status !== enums_1.MessageStatusEnum.ERROR;
    const streamAudio = !isIos &&
        isSupportedStream &&
        ((botChatSetting?.isAudioPlayOn &&
            (chat.status === enums_1.MessageStatusEnum.PENDING || chat.status === enums_1.MessageStatusEnum.PROCESSING)) ||
            (chat.status === enums_1.MessageStatusEnum.DONE && !!chat.audioStream?.length));
    const urlAudio = chat.status === enums_1.MessageStatusEnum.DONE && !chat.audioStream?.length && chat.voiceUrl;
    const hasAudio = urlAudio || iosAudio || streamAudio;
    const showProgressBar = !(botChatSetting?.isAudioOn &&
        !botChatSetting?.isTranscriptionOn &&
        !singleTranscriptionDisplayOpen);
    const voiceNeedRegenerate = (0, react_1.useMemo)(() => {
        if (botChatSetting?.isAudioOn && selectedBot?.botSetting?.outputVoice && !hasAudio) {
            return true;
        }
        if (botChatSetting?.audioSpeed && chat.audioSpeed !== interfaces_1.AudioSpeedMap[botChatSetting.audioSpeed]) {
            return true;
        }
        return false;
    }, [
        botChatSetting?.audioSpeed,
        botChatSetting?.isAudioOn,
        chat.audioSpeed,
        hasAudio,
        selectedBot?.botSetting?.outputVoice
    ]);
    const handleRegenerate = () => {
        if (chat.status === enums_1.MessageStatusEnum.DONE) {
            generateTts(chat, botChatSetting?.audioSpeed);
        }
        else {
            setPendingForRegenerate(true);
        }
    };
    (0, react_1.useEffect)(() => {
        if (!botChatSetting?.isTranslationOn) {
            setTextMessageStatus(TextMessage.origin);
        }
    }, [botChatSetting?.isTranslationOn]);
    (0, react_1.useEffect)(() => {
        if (generating)
            return;
        if (chat.status === enums_1.MessageStatusEnum.DONE && pendingForRegenerate) {
            generateTts(chat, botChatSetting?.audioSpeed, () => {
                setPendingForRegenerate(false);
            });
        }
    }, [chat, pendingForRegenerate, generating]);
    return {
        textMessage,
        showProgressBar,
        showAudio,
        urlAudio,
        streamAudio,
        iosAudio,
        pendingForRegenerate,
        generating,
        textMessageStatus,
        toggleTranslate,
        translateMessage,
        translateStatus,
        checkIfShowMsg,
        updateMessage,
        handleRegenerate,
        voiceNeedRegenerate,
        singleTranscriptionDisplayOpen,
        chatlocale
    };
};
exports.useReplyMessage = useReplyMessage;
