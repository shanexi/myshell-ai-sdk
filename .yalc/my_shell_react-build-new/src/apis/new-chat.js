import { APIFetch } from '../core/request/APIFetch.js';
export function createRoom() {
    return APIFetch.post('/v1/channel/chat/create', {
        isGoLang: true
    });
}
export function removeRoomFromList(id) {
    return APIFetch.post(`/v1/channel/chat/list/delete/${id}`, {
        isGoLang: true
    });
}
export function joinRoom(id) {
    return APIFetch.post(`/v1/channel/chat/join/${id}`, {
        isGoLang: true,
        hideErrorToast: true
    });
}
export function getUserCreatedRoomList() {
    return APIFetch.post('/v1/channel/chat/create/list', {
        isGoLang: true,
        adapter: (res) => {
            return res.channelList;
        }
    });
}
export function getRoomInfo(id) {
    return APIFetch.post(`/v1/channel/chat/${id}`, {
        isGoLang: true
    });
}
export function getRoomMessage(id, pageSize = 33, nextPageToken) {
    return APIFetch.post(`/v1/channel/message/list/${id}`, {
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
export function markAsRead(id) {
    return APIFetch.post('/v1/channel/message/read', {
        body: {
            channelId: id
        },
        isGoLang: true
    });
}
export function getBotMessage(id, pageSize = 33, nextPageToken) {
    return APIFetch.post(`/v1/bot/chat/list_history_messages`, {
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
export function clearHistory(type, id) {
    return APIFetch.post('/v1/chat/deleteAllHistory', {
        body: {
            bizId: id,
            bizType: type === 'widget' ? 'HISTORY_OPERATION_BIZ_TYPE_WIDGET' : 'HISTORY_OPERATION_BIZ_TYPE_BOT'
        },
        isGoLang: true
    });
}
export function deleteHistory(type, msgId) {
    return APIFetch.post('/v1/chat/deleteHistoryByMsgId', {
        body: {
            msgIdList: [msgId],
            bizType: type === 'widget' ? 'HISTORY_OPERATION_BIZ_TYPE_WIDGET' : 'HISTORY_OPERATION_BIZ_TYPE_BOT'
        },
        isGoLang: true
    });
}
export function messageReport(action, messageId) {
    const feedbackStateMap = {
        Liked: 1,
        Dislike: 2,
        Normal: 3
    };
    return APIFetch.post('/v1/feedback/message', {
        body: {
            action: feedbackStateMap[action],
            messageId
        },
        isGoLang: true
    });
}
export function messageFeedback(issueType, messageId, issues, otherDetail) {
    return APIFetch.post('/v1/feedback/issue', {
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
export function ttsRegen(msgId) {
    return APIFetch.post('/v1/bot/chat/regenerate_tts', {
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
export function getAsynJobInfo(jobId) {
    return APIFetch.post('/v1/async_job/get_info', {
        body: {
            jobId
        },
        isGoLang: true
    });
}
export function markMessageAsHandled(msgId) {
    return APIFetch.post('/v1/bot/chat/set_message_handled', {
        body: {
            msgId
        },
        isGoLang: true
    });
}
