"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useRoomManagement;
const react_1 = require("react");
const react_use_1 = require("react-use");
const new_chat_1 = require("../../../apis/new-chat.js");
const useCalcGetChatListFn_1 = __importDefault(require("../../../entity/hooks/useCalcGetChatListFn.js"));
function useRoomManagement(getList) {
    const [gettingList, setGettingList] = (0, react_use_1.useToggle)(false);
    const [roomList, setRoomList] = (0, react_1.useState)([]);
    const getChatList = (0, useCalcGetChatListFn_1.default)('bot');
    const [creating, setCreating] = (0, react_use_1.useToggle)(false);
    const create = (0, react_1.useCallback)(async () => {
        try {
            setCreating(true);
            const { success, data } = await (0, new_chat_1.createRoom)();
            if (success) {
                setRoomList([...roomList, data]);
            }
            getChatList('append');
            getList('append');
        }
        catch (e) {
        }
        finally {
            setCreating(false);
        }
    }, [getChatList, getList, roomList, setCreating]);
    const getCreatedRoomList = async () => {
        try {
            setGettingList(true);
            const { success, data } = await (0, new_chat_1.getUserCreatedRoomList)();
            if (success) {
                setRoomList(data);
            }
        }
        catch (e) {
        }
        finally {
            setGettingList(false);
        }
    };
    (0, react_use_1.useEffectOnce)(() => {
        getCreatedRoomList();
    });
    return {
        creating,
        create,
        gettingList,
        roomList
    };
}
