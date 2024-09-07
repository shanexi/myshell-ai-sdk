"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWidgetReplyMessage = exports.TranslateStatus = exports.TextMessage = void 0;
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const rxjs_1 = require("rxjs");
const enums_1 = require("../../../chat/model/enums.js");
const useDevice_1 = require("../../../common/hooks/useDevice.js");
const EventEmitter_1 = __importDefault(require("../../../common/utils/EventEmitter.js"));
const store_1 = require("../../../services/store/index.js");
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
const useWidgetReplyMessage = ({ chat, onChangeCopyText, widgetInfo, latest }) => {
    const setWidgetTranslatedText = (0, store_1.useWorkshopStore)(state => state.setWidgetTranslatedText);
    const updateWidgetMessage = (0, store_1.useWorkshopStore)(state => state.updateWidgetMessage);
    const chatlocale = (0, next_intl_1.useTranslations)('chat');
    const [textMessageStatus, setTextMessageStatus] = (0, react_1.useState)(TextMessage.origin);
    const [textMessage, setTextMessage] = (0, react_1.useState)(chat.text);
    const [translateStatus, setTranslateStatus] = (0, react_1.useState)(chat.translation ? TranslateStatus.translated : TranslateStatus.default);
    const [isSupportedStream, setIsSupportedStream] = (0, react_1.useState)(false);
    const { isIos } = (0, useDevice_1.useDevice)();
    const destroy$ = (0, react_1.useMemo)(() => new rxjs_1.Subject(), []);
    const translateMessage = (0, react_1.useCallback)(() => {
        if (translateStatus === TranslateStatus.translating) {
            return;
        }
        setTranslateStatus(TranslateStatus.translating);
        setWidgetTranslatedText({ ...chat, translation: '翻译还是走的 websocket，需要迁移' });
        setTranslateStatus(TranslateStatus.translated);
    }, [chat.id, destroy$, setWidgetTranslatedText, translateStatus]);
    (0, react_1.useEffect)(() => {
        let _textMessage = '';
        if (textMessageStatus === TextMessage.translation) {
            if (chat.translation) {
                _textMessage = chat.translation;
            }
            else {
                if (translateStatus === TranslateStatus.translating) {
                    _textMessage = chatlocale('translating');
                }
                else if (translateStatus === TranslateStatus.error) {
                    _textMessage = chatlocale('translation_failed');
                }
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
    }, [textMessageStatus, TextMessage.translation, setTextMessageStatus, chat.id, chat.status]);
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
    const showAudio = !!(chat.audioStream ?? []).length || !!chat.voiceUrl;
    const iosAudio = isIos && chat.status !== enums_1.MessageStatusEnum.DONE && chat.status !== enums_1.MessageStatusEnum.ERROR;
    const streamAudio = !isIos &&
        isSupportedStream &&
        (chat.status === enums_1.MessageStatusEnum.PENDING ||
            chat.status === enums_1.MessageStatusEnum.PROCESSING ||
            (chat.status === enums_1.MessageStatusEnum.DONE && !!chat.audioStream?.length));
    const urlAudio = chat.status === enums_1.MessageStatusEnum.DONE && !chat.audioStream?.length && chat.voiceUrl;
    const showProgressBar = !!chat.text && !!chat.text.length;
    return {
        textMessage,
        showProgressBar,
        showAudio,
        urlAudio,
        streamAudio,
        iosAudio,
        textMessageStatus,
        toggleTranslate,
        translateMessage,
        translateStatus,
        checkIfShowMsg,
        updateWidgetMessage,
        chatlocale
    };
};
exports.useWidgetReplyMessage = useWidgetReplyMessage;
