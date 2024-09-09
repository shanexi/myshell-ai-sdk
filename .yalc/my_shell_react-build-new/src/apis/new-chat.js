"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoom = createRoom;
exports.removeRoomFromList = removeRoomFromList;
exports.joinRoom = joinRoom;
exports.getUserCreatedRoomList = getUserCreatedRoomList;
exports.getRoomInfo = getRoomInfo;
exports.getRoomMessage = getRoomMessage;
exports.markAsRead = markAsRead;
exports.getBotMessage = getBotMessage;
exports.clearHistory = clearHistory;
exports.deleteHistory = deleteHistory;
exports.messageReport = messageReport;
exports.messageFeedback = messageFeedback;
exports.ttsRegen = ttsRegen;
exports.getAsynJobInfo = getAsynJobInfo;
exports.markMessageAsHandled = markMessageAsHandled;
const APIFetch_1 = require("../core/request/APIFetch.js");
function createRoom() {
    return APIFetch_1.APIFetch.post('/v1/channel/chat/create', {
        isGoLang: true
    });
}
function removeRoomFromList(id) {
    return APIFetch_1.APIFetch.post(`/v1/channel/chat/list/delete/${id}`, {
        isGoLang: true
    });
}
function joinRoom(id) {
    return APIFetch_1.APIFetch.post(`/v1/channel/chat/join/${id}`, {
        isGoLang: true,
        hideErrorToast: true
    });
}
function getUserCreatedRoomList() {
    return APIFetch_1.APIFetch.post('/v1/channel/chat/create/list', {
        isGoLang: true,
        adapter: (res) => {
            return res.channelList;
        }
    });
}
function getRoomInfo(id) {
    return APIFetch_1.APIFetch.post(`/v1/channel/chat/${id}`, {
        isGoLang: true
    });
}
function getRoomMessage(id, pageSize = 33, nextPageToken) {
    return APIFetch_1.APIFetch.post(`/v1/channel/message/list/${id}`, {
        body: {
            pageSize,
            nextPageToken
        },
        isGoLang: true,
        adapter: (res) => {
            return {
                listResponse: {
                    hasMore: res.hasMore,
                    nextPageToken: res.nextPageToken
                },
                messageList: res.messageList
            };
        }
    });
}
function markAsRead(id) {
    return APIFetch_1.APIFetch.post('/v1/channel/message/read', {
        body: {
            channelId: id
        },
        isGoLang: true
    });
}
function getBotMessage(id, pageSize = 33, nextPageToken) {
    return APIFetch_1.APIFetch.post(`/v1/bot/chat/list_history_messages`, {
        body: {
            botId: id,
            listRequest: {
                pageToken: nextPageToken,
                pageSize
            }
        },
        isGoLang: true,
        adapter: (res) => {
            return {
                listResponse: {
                    hasMore: res.hasMore,
                    nextPageToken: res.nextPageToken
                },
                messageList: res.messages
            };
        }
    });
}
function clearHistory(type, id) {
    return APIFetch_1.APIFetch.post('/v1/chat/deleteAllHistory', {
        body: {
            bizId: id,
            bizType: type === 'widget' ? 'HISTORY_OPERATION_BIZ_TYPE_WIDGET' : 'HISTORY_OPERATION_BIZ_TYPE_BOT'
        },
        isGoLang: true
    });
}
function deleteHistory(type, msgId) {
    return APIFetch_1.APIFetch.post('/v1/chat/deleteHistoryByMsgId', {
        body: {
            msgIdList: [msgId],
            bizType: type === 'widget' ? 'HISTORY_OPERATION_BIZ_TYPE_WIDGET' : 'HISTORY_OPERATION_BIZ_TYPE_BOT'
        },
        isGoLang: true
    });
}
function messageReport(action, messageId) {
    const feedbackStateMap = {
        Liked: 1,
        Dislike: 2,
        Normal: 3
    };
    return APIFetch_1.APIFetch.post('/v1/feedback/message', {
        body: {
            action: feedbackStateMap[action],
            messageId
        },
        isGoLang: true
    });
}
function messageFeedback(issueType, messageId, issues, otherDetail) {
    return APIFetch_1.APIFetch.post('/v1/feedback/issue', {
        body: {
            entityId: messageId,
            issueType,
            content: JSON.stringify({
                issues,
                othersContent: otherDetail
            })
        },
        isGoLang: true
    });
}
function ttsRegen(msgId) {
    return APIFetch_1.APIFetch.post('/v1/bot/chat/regenerate_tts', {
        body: {
            msgId
        },
        isGoLang: true,
        adapter: (res) => {
            return {
                duration: res.audioFileDurationSeconds,
                audioSpeed: res.audioSpeed,
                audioUrl: res.voiceUrl,
                energyInfo: res.userEnergyInfo
            };
        }
    });
}
function getAsynJobInfo(jobId) {
    return APIFetch_1.APIFetch.post('/v1/async_job/get_info', {
        body: {
            jobId
        },
        isGoLang: true
    });
}
function markMessageAsHandled(msgId) {
    return APIFetch_1.APIFetch.post('/v1/bot/chat/set_message_handled', {
        body: {
            msgId
        },
        isGoLang: true
    });
}
