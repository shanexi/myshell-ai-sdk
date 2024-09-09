"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEntityStore = exports.ListStatus = void 0;
const immer_1 = require("immer");
const zustand_1 = require("zustand");
const zustand_computed_1 = require("zustand-computed");
const middleware_1 = require("zustand/middleware");
const immer_2 = require("zustand/middleware/immer");
const entity_1 = require("../../apis/entity");
const CustomError_1 = __importDefault(require("../../common/model/CustomError"));
var ListStatus;
(function (ListStatus) {
    ListStatus[ListStatus["UNINITIALIZED"] = 0] = "UNINITIALIZED";
    ListStatus[ListStatus["LOADING"] = 1] = "LOADING";
    ListStatus[ListStatus["READY"] = 2] = "READY";
    ListStatus[ListStatus["APPENDING"] = 3] = "APPENDING";
    ListStatus[ListStatus["REMOVING"] = 4] = "REMOVING";
    ListStatus[ListStatus["ERROR"] = 5] = "ERROR";
})(ListStatus || (exports.ListStatus = ListStatus = {}));
function listActionModeParser(listActionMode) {
    let status;
    switch (listActionMode) {
        case 'initialize':
            status = ListStatus.LOADING;
            break;
        case 'append':
            status = ListStatus.APPENDING;
            break;
        case 'remove':
            status = ListStatus.REMOVING;
            break;
        case 'silent_update':
        default:
            status = ListStatus.READY;
            break;
    }
    return status;
}
function getListApi(type) {
    let api;
    switch (type) {
        case 'ugc':
            api = entity_1.getUgcBotList;
            break;
        case 'widget':
            api = entity_1.getWidgetList;
            break;
        case 'bot-room':
        default:
            api = entity_1.getChatList;
            break;
    }
    return api;
}
async function getList(listType) {
    try {
        const { success, data, msg, reason } = await getListApi(listType)();
        if (success) {
            return data;
        }
        if (msg) {
            throw new CustomError_1.default(msg, reason);
        }
        else {
            throw new Error();
        }
    }
    catch (e) {
        throw new CustomError_1.default(JSON.stringify(e));
    }
}
(0, immer_1.enableMapSet)();
const DEFAULT_STATE = {
    listDataMap: {
        'bot-room': {
            status: ListStatus.UNINITIALIZED,
            listItems: []
        },
        ugc: {
            status: ListStatus.UNINITIALIZED,
            listItems: []
        },
        widget: {
            status: ListStatus.UNINITIALIZED,
            listItems: []
        }
    },
    detailMap: new Map(),
    chatSettingMap: {}
};
const createEntitySlice = (set, get) => {
    return {
        ...DEFAULT_STATE,
        setChatList: (type, list) => {
            set(state => {
                state.listDataMap[type].listItems = list;
            });
        },
        updateChatListItem: (type, item) => {
            set(state => {
                const index = state.listDataMap[type].listItems.findIndex(i => i.id === item.id);
                if (index !== -1) {
                    state.listDataMap[type].listItems[index] = item;
                }
            });
        },
        async getChatList(listType, type = 'silent_update') {
            try {
                const listStatus = listActionModeParser(type);
                set(state => {
                    state.listDataMap[listType].status = listStatus;
                });
                const data = await getList(listType);
                get().setChatList(listType, data);
                return data;
            }
            catch (e) {
                if (e instanceof CustomError_1.default) {
                    throw new CustomError_1.default(e.msg, e.reason);
                }
                else {
                    throw new Error(JSON.stringify(e));
                }
            }
            finally {
                set(state => {
                    state.listDataMap[listType].status = ListStatus.READY;
                });
            }
        },
        setDetail(type, id, detail) {
            set(state => {
                const mapKey = `${type}-${id}`;
                state.detailMap.set(mapKey, detail);
            });
        },
        partialUpdateDetail(type, id, partialDetail) {
            set(state => {
                const mapKey = `${type}-${id}`;
                const currentDetail = state.detailMap.get(mapKey);
                if (currentDetail) {
                    state.detailMap.set(mapKey, {
                        ...currentDetail,
                        ...partialDetail
                    });
                }
            });
        },
        setChatSetting(type, id, setting) {
            set(state => {
                const mapKey = `${type}-${id}`;
                state.chatSettingMap[mapKey] = setting;
            });
        }
    };
};
const computeState = (state) => ({
    sumUnReadMessageCount: state.listDataMap['bot-room'].listItems.reduce((acc, cur) => {
        return acc + (cur.unreadMessageCount ?? 0);
    }, 0),
    chatListStatus: state.listDataMap['bot-room'].status,
    chatList: state.listDataMap['bot-room'].listItems
});
exports.useEntityStore = (0, zustand_1.create)()((0, zustand_computed_1.computed)((0, immer_2.immer)((0, middleware_1.devtools)(createEntitySlice, { store: 'entity' })), computeState));
