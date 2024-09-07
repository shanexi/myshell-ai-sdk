"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useCalcGetChatListFn;
const entity_1 = require("../../services/store/entity.js");
function useCalcGetChatListFn(type) {
    const getChatList = (0, entity_1.useEntityStore)(state => state.getChatList);
    const fn = (actionType) => {
        let listType;
        switch (type) {
            case 'ugc':
                listType = 'ugc';
                break;
            case 'widget':
                listType = 'widget';
                break;
            case 'bot':
            case 'room':
            default:
                listType = 'bot-room';
                break;
        }
        return getChatList(listType, actionType);
    };
    return fn;
}
