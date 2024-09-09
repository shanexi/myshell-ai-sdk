import { enableMapSet } from 'immer';
import { create } from 'zustand';
import { computed } from 'zustand-computed';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { getUgcBotList, getWidgetList, getChatList as queryChatList } from '../../apis/entity.js';
import CustomError from '../../common/model/CustomError.js';
export var ListStatus;
(function (ListStatus) {
    ListStatus[ListStatus["UNINITIALIZED"] = 0] = "UNINITIALIZED";
    ListStatus[ListStatus["LOADING"] = 1] = "LOADING";
    ListStatus[ListStatus["READY"] = 2] = "READY";
    ListStatus[ListStatus["APPENDING"] = 3] = "APPENDING";
    ListStatus[ListStatus["REMOVING"] = 4] = "REMOVING";
    ListStatus[ListStatus["ERROR"] = 5] = "ERROR";
})(ListStatus || (ListStatus = {}));
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
            api = getUgcBotList;
            break;
        case 'widget':
            api = getWidgetList;
            break;
        case 'bot-room':
        default:
            api = queryChatList;
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
            throw new CustomError(msg, reason);
        }
        else {
            throw new Error();
        }
    }
    catch (e) {
        throw new CustomError(JSON.stringify(e));
    }
}
enableMapSet();
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
                if (e instanceof CustomError) {
                    throw new CustomError(e.msg, e.reason);
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
export const useEntityStore = create()(computed(immer(devtools(createEntitySlice, { store: 'entity' })), computeState));
