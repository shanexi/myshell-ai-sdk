"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChatCommonSlice = void 0;
const bot_1 = require("../../apis/bot");
const createChatCommonSlice = (set, get) => {
    return {
        inputType: 'text',
        lastInputType: 'text',
        sharedChatIDList: [],
        multiBotMap: {},
        setInputType(type) {
            set(state => {
                const t1 = ['audio', 'text'];
                const t2 = ['share', 'delete', 'publish'];
                if (t2.includes(type) && t1.includes(state.inputType)) {
                    state.lastInputType = state.inputType;
                }
                else {
                    state.lastInputType = type;
                }
                state.inputType = type;
            }, false, 'setInputType');
        },
        addChatID(id) {
            if (get().sharedChatIDList.includes(id)) {
                return;
            }
            set(state => {
                state.sharedChatIDList.push(id);
            }, false, 'addChatID');
        },
        removeChatID(id) {
            set(state => {
                state.sharedChatIDList = state.sharedChatIDList.filter(e => e !== id);
            }, false, 'removeChatID');
        },
        clearChatID() {
            set(state => {
                state.sharedChatIDList = [];
            }, false, 'clearChatID');
        },
        setMessageHandled({ botId, msgId }) {
            set(state => {
                (0, bot_1.setMessageHandled)(msgId);
                const msg = state.multiBotMap[String(botId)].chatDic.get(msgId);
                state.multiBotMap[String(botId)].chatDic.set(msgId, { ...msg, handled: true });
                state.multiBotMap[String(botId)].chatList = [...state.multiBotMap[String(botId)].chatDic.values()];
            }, false, 'setMessageHandled');
        },
    };
};
exports.createChatCommonSlice = createChatCommonSlice;
