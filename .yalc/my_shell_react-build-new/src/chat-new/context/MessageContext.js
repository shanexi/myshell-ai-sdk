"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageContext = void 0;
const react_1 = require("react");
const defaultFn = () => { };
const defaultAsyncFn = async () => { };
exports.MessageContext = (0, react_1.createContext)({
    messageMap: new Map(),
    exceptionsForTextDisplay: {},
    addTextDisplayException: defaultFn,
    messageIdList: [],
    sending: false,
    interacting: false,
    scrollToBottom: 0,
    setDraftMessage: defaultFn,
    sendTextMessage: defaultFn,
    sendAudioMessage: defaultAsyncFn,
    terminate: defaultFn,
    hasMore: false,
    gettingHistory: false,
    getHistoryMessage: async () => [],
    addMessage: defaultFn,
    updateMessage: defaultFn,
    deleteSpecifiedMessageId: defaultFn,
    partialUpdateMessage: defaultFn,
    translate: defaultFn,
    playingAudio: '',
    playNext: defaultFn,
    enQueue: defaultFn,
    clearQueue: defaultFn
});
