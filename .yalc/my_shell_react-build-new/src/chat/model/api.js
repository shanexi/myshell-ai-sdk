"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatHistory = getChatHistory;
exports.listChatHistory = listChatHistory;
exports.resetHistory = resetHistory;
exports.resetBotHistory = resetBotHistory;
exports.deleteAllChatHistory = deleteAllChatHistory;
exports.deleteChatHistory = deleteChatHistory;
exports.createMessageSharedCode = createMessageSharedCode;
exports.getMessageSharedDetail = getMessageSharedDetail;
exports.reportMsg = reportMsg;
exports.reportMsgV1 = reportMsgV1;
exports.regenerateTts = regenerateTts;
exports.getImageParams = getImageParams;
exports.getImageParamsFromImage = getImageParamsFromImage;
exports.getImageParamsFromMsg = getImageParamsFromMsg;
exports.getSharedMessages = getSharedMessages;
const common_helper_1 = require("../../common/utils/common-helper.js");
const rx_http_1 = require("../../common/utils/rx-http.js");
const APIFetch_1 = require("../../core/request/APIFetch.js");
function getChatHistory(params) {
    return (0, rx_http_1.rxGet)('/chat/chatHistory', { ...params });
}
function listChatHistory(params) {
    return APIFetch_1.APIFetch.post('/v1/bot/chat/list_history_messages', {
        isGoLang: true,
        body: {
            botId: params.botId,
            listRequest: {
                pageToken: params.pageToken,
                pageSize: params.pageSize
            }
        },
        adapter: (res) => {
            return {
                data: res.messages.map((e) => {
                    return {
                        ...e,
                        feedbackState: (0, common_helper_1.getFeedbackStatus)(e.feedbackState)
                    };
                }),
                offset: res.listResponse.nextPageToken
            };
        }
    });
}
function resetHistory(botId) {
    return (0, rx_http_1.rxPost)(`/chat/resetHistory`, {
        botId: Number(botId)
    });
}
function resetBotHistory(botId) {
    return APIFetch_1.APIFetch.post('/v1/chat/reset', {
        body: {
            bizId: botId,
            bizType: 'HISTORY_OPERATION_BIZ_TYPE_BOT'
        },
        isGoLang: true
    });
}
function deleteAllChatHistory(botId) {
    return APIFetch_1.APIFetch.post('/v1/chat/deleteAllHistory', {
        body: {
            bizId: botId,
            bizType: 'HISTORY_OPERATION_BIZ_TYPE_BOT'
        },
        isGoLang: true
    });
}
function deleteChatHistory(bizType, idList) {
    return APIFetch_1.APIFetch.post('/v1/chat/deleteHistoryByMsgId', {
        body: {
            msgIdList: idList ?? [],
            bizType
        },
        isGoLang: true
    });
}
function createMessageSharedCode(messageIds) {
    return APIFetch_1.APIFetch.post('/v1/bot/shared/generate_message_shared_code', {
        body: {
            messageIds
        },
        isGoLang: true
    });
}
function getMessageSharedDetail(code) {
    return APIFetch_1.APIFetch.post('/v1/bot/shared/get_message_shared_detail', {
        body: {
            code
        },
        isGoLang: true
    });
}
function reportMsg(action, msgUid) {
    return (0, rx_http_1.rxPost)('/message/feedback', {
        action,
        msgUid
    });
}
function reportMsgV1(data) {
    return APIFetch_1.APIFetch.post('/v1/feedback/message', {
        body: {
            ...data
        },
        isGoLang: true
    });
}
function regenerateTts(msgId) {
    return APIFetch_1.APIFetch.post('/v1/bot/chat/regenerate_tts', {
        body: {
            msgId
        },
        isGoLang: true
    });
}
function getImageParams() {
    return APIFetch_1.APIFetch.post('/v1/bot/image_gen_param', {
        body: {},
        isGoLang: true,
        adapter: res => {
            const { imageSamplerNameList, imageSize, sdModel } = res;
            return {
                ...res,
                sdModel: (sdModel || []).map((s) => {
                    return {
                        ...s,
                        label: s.modelName,
                        value: s.modelId
                    };
                }),
                imageSize: {
                    ...imageSize,
                    imageSizePreset: (imageSize?.imageSizePreset ?? [])
                        .concat({ presetName: 'other', width: imageSize.sizeWidthMin, height: imageSize.sizeHeightMin })
                        .map((s, index) => {
                        return {
                            ...s,
                            label: s.presetName,
                            value: s.presetName
                        };
                    })
                },
                imageSamplerNameList: (imageSamplerNameList || []).map((s) => {
                    return {
                        label: s,
                        value: s
                    };
                })
            };
        }
    });
}
function getImageParamsFromImage(url) {
    return APIFetch_1.APIFetch.post('/v1/bot/resolve_image_gen_param', {
        body: {
            url
        },
        isGoLang: true
    });
}
function getImageParamsFromMsg(msgId) {
    return APIFetch_1.APIFetch.post('/v1/bot/message_gen_param', {
        body: {
            msgId
        },
        isGoLang: true
    });
}
async function getSharedMessages(code) {
    try {
        const res = (await APIFetch_1.APIFetch.post(`/v1/bot/shared/get_message_shared_detail`, {
            isGoLang: true,
            body: { code }
        }));
        if (res.success) {
            return {
                success: res.success,
                data: {
                    ...res.data,
                    isImageBot: res?.data?.botSummary?.botGenType === 'BOT_GEN_TYPE_IMAGE' ||
                        res?.data?.botSummary?.botGenType === 'BOT_GEN_TYPE_GIF'
                }
            };
        }
        return res;
    }
    catch (error) {
        console.error(error);
        return {
            success: false,
            message: error?.message || 'Something is wrong!'
        };
    }
}
