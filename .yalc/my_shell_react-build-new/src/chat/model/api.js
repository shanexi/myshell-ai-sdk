import { getFeedbackStatus } from '../../common/utils/common-helper.js';
import { rxGet, rxPost } from '../../common/utils/rx-http.js';
import { APIFetch } from '../../core/request/APIFetch.js';
export function getChatHistory(params) {
    return rxGet('/chat/chatHistory', { ...params });
}
export function listChatHistory(params) {
    return APIFetch.post('/v1/bot/chat/list_history_messages', {
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
                        feedbackState: getFeedbackStatus(e.feedbackState)
                    };
                }),
                offset: res.listResponse.nextPageToken
            };
        }
    });
}
export function resetHistory(botId) {
    return rxPost(`/chat/resetHistory`, {
        botId: Number(botId)
    });
}
export function resetBotHistory(botId) {
    return APIFetch.post('/v1/chat/reset', {
        body: {
            bizId: botId,
            bizType: 'HISTORY_OPERATION_BIZ_TYPE_BOT'
        },
        isGoLang: true
    });
}
export function deleteAllChatHistory(botId) {
    return APIFetch.post('/v1/chat/deleteAllHistory', {
        body: {
            bizId: botId,
            bizType: 'HISTORY_OPERATION_BIZ_TYPE_BOT'
        },
        isGoLang: true
    });
}
export function deleteChatHistory(bizType, idList) {
    return APIFetch.post('/v1/chat/deleteHistoryByMsgId', {
        body: {
            msgIdList: idList ?? [],
            bizType
        },
        isGoLang: true
    });
}
export function createMessageSharedCode(messageIds) {
    return APIFetch.post('/v1/bot/shared/generate_message_shared_code', {
        body: {
            messageIds
        },
        isGoLang: true
    });
}
export function getMessageSharedDetail(code) {
    return APIFetch.post('/v1/bot/shared/get_message_shared_detail', {
        body: {
            code
        },
        isGoLang: true
    });
}
export function reportMsg(action, msgUid) {
    return rxPost('/message/feedback', {
        action,
        msgUid
    });
}
export function reportMsgV1(data) {
    return APIFetch.post('/v1/feedback/message', {
        body: {
            ...data
        },
        isGoLang: true
    });
}
export function regenerateTts(msgId) {
    return APIFetch.post('/v1/bot/chat/regenerate_tts', {
        body: {
            msgId
        },
        isGoLang: true
    });
}
export function getImageParams() {
    return APIFetch.post('/v1/bot/image_gen_param', {
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
export function getImageParamsFromImage(url) {
    return APIFetch.post('/v1/bot/resolve_image_gen_param', {
        body: {
            url
        },
        isGoLang: true
    });
}
export function getImageParamsFromMsg(msgId) {
    return APIFetch.post('/v1/bot/message_gen_param', {
        body: {
            msgId
        },
        isGoLang: true
    });
}
export async function getSharedMessages(code) {
    try {
        const res = (await APIFetch.post(`/v1/bot/shared/get_message_shared_detail`, {
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
