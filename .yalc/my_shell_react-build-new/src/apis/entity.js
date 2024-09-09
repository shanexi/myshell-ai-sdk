import { serverMessageParser } from '../chat-new/util.js';
import { serverListItemParser, widgetListParser } from '../common/utils/entity.js';
import { APIFetch } from '../core/request/APIFetch.js';
export function getChatList() {
    return APIFetch.post('/v1/chat/list', {
        isGoLang: true,
        adapter(res) {
            return res.items.map(item => serverListItemParser(item));
        }
    });
}
export function getWidgetList() {
    return APIFetch.post('/v1/widget/list_widget_in_chat_list', {
        body: {
            listRequest: {
                pageToken: 0,
                pageSize: 50
            }
        },
        isGoLang: true,
        adapter: (res) => {
            return res.widgets.map(widget => widgetListParser(widget));
        }
    });
}
export function getUgcBotList() {
    return APIFetch.post('/v1/bot/list_user_owned_bots', {
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
export function clearMemory(type, id) {
    return APIFetch.post('/v1/chat/reset', {
        body: {
            bizId: id,
            bizType: type === 'widget' ? 'HISTORY_OPERATION_BIZ_TYPE_WIDGET' : 'HISTORY_OPERATION_BIZ_TYPE_BOT'
        },
        isGoLang: true,
        adapter: (res) => {
            return res.messages.map(message => serverMessageParser(message, type));
        }
    });
}
export function getBotChatSetting(id) {
    return APIFetch.post('/v1/bot/setting/get_chat_setting', {
        body: {
            botId: id
        },
        isGoLang: true
    });
}
export function updateBotChatSetting(id, params) {
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
    return APIFetch.post('/v1/bot/setting/update_chat_setting', {
        body: {
            botId: id,
            ...requestParams
        },
        isGoLang: true
    });
}
