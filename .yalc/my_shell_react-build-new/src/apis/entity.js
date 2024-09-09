"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatList = getChatList;
exports.getWidgetList = getWidgetList;
exports.getUgcBotList = getUgcBotList;
exports.clearMemory = clearMemory;
exports.getBotChatSetting = getBotChatSetting;
exports.updateBotChatSetting = updateBotChatSetting;
const util_1 = require("../chat-new/util.js");
const entity_1 = require("../common/utils/entity.js");
const APIFetch_1 = require("../core/request/APIFetch.js");
function getChatList() {
    return APIFetch_1.APIFetch.post('/v1/chat/list', {
        isGoLang: true,
        adapter(res) {
            return res.items.map(item => (0, entity_1.serverListItemParser)(item));
        }
    });
}
function getWidgetList() {
    return APIFetch_1.APIFetch.post('/v1/widget/list_widget_in_chat_list', {
        body: {
            listRequest: {
                pageToken: 0,
                pageSize: 50
            }
        },
        isGoLang: true,
        adapter: (res) => {
            return res.widgets.map(widget => (0, entity_1.widgetListParser)(widget));
        }
    });
}
function getUgcBotList() {
    return APIFetch_1.APIFetch.post('/v1/bot/list_user_owned_bots', {
        isGoLang: true,
        adapter: (res) => {
            return (res.bots ?? []).map((bot) => {
                return {
                    type: 'ugc',
                    id: bot.summary.id,
                    name: bot.summary.name,
                    unreadMessageCount: bot.unreadMessageCount,
                    lastMessage: bot.lastMessage,
                    logoUrl: bot.summary.logoUrl,
                    isOfficial: bot.summary.official,
                    visitorCanChat: bot.visitorCanChat
                };
            });
        }
    });
}
function clearMemory(type, id) {
    return APIFetch_1.APIFetch.post('/v1/chat/reset', {
        body: {
            bizId: id,
            bizType: type === 'widget' ? 'HISTORY_OPERATION_BIZ_TYPE_WIDGET' : 'HISTORY_OPERATION_BIZ_TYPE_BOT'
        },
        isGoLang: true,
        adapter: (res) => {
            return res.messages.map(message => (0, util_1.serverMessageParser)(message, type));
        }
    });
}
function getBotChatSetting(id) {
    return APIFetch_1.APIFetch.post('/v1/bot/setting/get_chat_setting', {
        body: {
            botId: id
        },
        isGoLang: true
    });
}
function updateBotChatSetting(id, params) {
    const requestParams = {
        updateAudioOn: {
            isAudioOn: params.isAudioOn
        },
        updateAudioPlayOn: {
            isAudioPlayOn: params.isAudioPlayOn
        },
        updateTranscriptionOn: {
            isTranscriptionOn: params.isTranscriptionOn
        },
        updateTranslationOn: {
            isTranslationOn: params.isTranslationOn
        },
        speakingLanguage: params.speakingLanguage,
        audioSpeed: params.audioSpeed,
        isAutopushOn: params.isAutopushOn
    };
    return APIFetch_1.APIFetch.post('/v1/bot/setting/update_chat_setting', {
        body: {
            botId: id,
            ...requestParams
        },
        isGoLang: true
    });
}
