"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGetHistoryMessage;
const react_1 = require("react");
const react_use_1 = require("react-use");
const new_chat_1 = require("../../apis/new-chat");
const util_1 = require("../util");
function useGetHistoryMessage(type, id, addMessage) {
    const nextPageToken = (0, react_1.useRef)();
    const pageSize = 33;
    const hasMore = (0, react_1.useRef)(true);
    const [getting, setGetting] = (0, react_use_1.useToggle)(false);
    const getApiFn = () => {
        let apiFn;
        switch (type) {
            case 'room':
                apiFn = new_chat_1.getRoomMessage;
                break;
            case 'bot':
                apiFn = new_chat_1.getBotMessage;
                break;
            default:
                apiFn = new_chat_1.getRoomMessage;
        }
        return apiFn;
    };
    const getHistoryMessage = async () => {
        try {
            setGetting(true);
            const { success, data } = await getApiFn()(id, pageSize, nextPageToken.current);
            if (success) {
                hasMore.current = data.listResponse.hasMore;
                nextPageToken.current = data.listResponse.nextPageToken;
                const { messageList } = data;
                addMessage(messageList.map(message => (0, util_1.serverMessageParser)(message, type)));
                return messageList;
            }
            throw new Error();
        }
        catch (e) {
            console.error(e);
            return [];
        }
        finally {
            setGetting(false);
        }
    };
    return {
        gettingHistory: getting,
        hasMore: hasMore.current,
        getHistoryMessage
    };
}
