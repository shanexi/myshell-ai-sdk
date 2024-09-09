"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkshopRecommend = getWorkshopRecommend;
exports.getWidgetSearchList = getWidgetSearchList;
exports.getWidgetFilterTags = getWidgetFilterTags;
exports.getWidgetsInChatList = getWidgetsInChatList;
exports.getFeaturePageDetailInfo = getFeaturePageDetailInfo;
exports.listWidgetChatHistory = listWidgetChatHistory;
exports.addWidgetToChatList = addWidgetToChatList;
exports.getWidgetInfo = getWidgetInfo;
exports.getWidgetsInfo = getWidgetsInfo;
exports.ttsWidgetTrail = ttsWidgetTrail;
exports.getTTSListOld = getTTSListOld;
exports.getTTSList = getTTSList;
exports.publishWidgetVoice = publishWidgetVoice;
exports.unpublishWidgetVoice = unpublishWidgetVoice;
exports.deleteWidgetVoice = deleteWidgetVoice;
exports.pinnedWidgetInList = pinnedWidgetInList;
exports.getWidgetSharingCode = getWidgetSharingCode;
exports.getWidgetSharingCodeByWidgetId = getWidgetSharingCodeByWidgetId;
exports.getWidgetProConfig = getWidgetProConfig;
exports.getWidgetProConfigByWidgetId = getWidgetProConfigByWidgetId;
exports.getWidgetSharedDetail = getWidgetSharedDetail;
exports.deleteHistoryMessageByMsgIds = deleteHistoryMessageByMsgIds;
exports.deleteAllWidgetHistory = deleteAllWidgetHistory;
exports.resetWidgetHistory = resetWidgetHistory;
exports.removeWidgetFromChatList = removeWidgetFromChatList;
const workshop_1 = require("../common/constants/enums/workshop.js");
const common_helper_1 = require("../common/utils/common-helper.js");
const APIFetch_1 = require("../core/request/APIFetch.js");
function getWorkshopRecommend() {
    return APIFetch_1.APIFetch.post('/v1/homepage/workshop/recommend', {
        isGoLang: true,
        adapter: res => {
            const formatData = res.list?.map((item) => {
                const itemData = item.type === workshop_1.CardEnum.TYPE_SLIDER ? item?.sliderCard : item?.normalTitleCard;
                return {
                    type: item.type,
                    title: itemData?.title,
                    rightTitle: itemData?.button?.title,
                    rightClickUrl: itemData?.button?.jumpUrl,
                    rightMobileClickUrl: itemData?.button?.jumpMobileUrl,
                    items: itemData?.items?.map((card) => {
                        const cardData = item.type === workshop_1.CardEnum.TYPE_SLIDER ? card?.subCardFeatured : card?.subCardNormal;
                        if (item.type === workshop_1.CardEnum.TYPE_SLIDER) {
                            const button = cardData.bottomZone;
                            const clickUrl = cardData?.baseSubCard?.clickJumpUrl;
                            const botIdMatch = clickUrl.match(/\/(\d+)$/) || clickUrl.match(/botId=(\d+)/);
                            const id = botIdMatch ? botIdMatch?.[1] : '';
                            const isArticle = clickUrl?.includes('/article/');
                            return {
                                featureType: item?.featureType,
                                pageId: item?.pageId,
                                title: cardData?.title,
                                description: cardData?.subTitle,
                                backgroundImageUrl: cardData?.backgroundImageUrl,
                                featuredName: button?.title,
                                featuredDescription: button?.subTitle,
                                featuredLogo: button?.image,
                                buttonTitle: button?.title,
                                buttonUrl: button.jumpUrl,
                                buttonMobileUrl: button.jumpMobileUrl,
                                gotoUrl: clickUrl,
                                articleId: isArticle
                            };
                        }
                        const summary = cardData.widgetSummary || {};
                        return {
                            title: summary.name,
                            description: summary.description,
                            logoUrl: summary.logoUrl,
                            authorName: summary.author?.name,
                            authorNameTag: summary.author?.nameTag,
                            id: summary.id,
                            clickUrl: `/robot-workshop/widget/${summary.id}`,
                            clickMobileUrl: `/robot-workshop/widget/${item.id}`,
                            showVoice: summary.chatCallerType === workshop_1.WidgetChatCallerTypeEnum.WIDGET_CHAT_CALLER_TYPE_VOICE,
                            type: 'WIDGET'
                        };
                    })
                };
            });
            return {
                banners: res.banners,
                list: formatData
            };
        }
    });
}
function getWidgetSearchList({ query = '', pageToken = '0', pageSize = 30, includeTagIds, excludeTagIds, signal }) {
    return APIFetch_1.APIFetch.post('/v1/widget/search', {
        body: {
            listRequest: {
                pageToken,
                pageSize
            },
            ...(query && { query }),
            ...(includeTagIds && includeTagIds?.length > 0 && { includeTagIds }),
            ...(excludeTagIds && excludeTagIds?.length > 0 && { excludeTagIds })
        },
        signal,
        isGoLang: true,
        adapter: res => {
            return {
                list: res.widgets?.map((item) => {
                    return {
                        title: item.name,
                        description: item.description,
                        logoUrl: item.logoUrl,
                        authorName: item.author.name,
                        authorNameTag: item.author.nameTag,
                        id: item.id,
                        clickUrl: `/robot-workshop/widget/${item.id}`,
                        clickMobileUrl: `/robot-workshop/widget/${item.id}`,
                        showVoice: item.chatCallerType === workshop_1.WidgetChatCallerTypeEnum.WIDGET_CHAT_CALLER_TYPE_VOICE,
                        type: 'WIDGET'
                    };
                }),
                listResponse: res.listResponse
            };
        }
    });
}
function getWidgetFilterTags() {
    return APIFetch_1.APIFetch.post('/v1/widget/get_filter_tags', {
        isGoLang: true,
        adapter: (res) => {
            return res.list;
        }
    });
}
function getWidgetsInChatList(pageToken, pageSize) {
    return APIFetch_1.APIFetch.post('/v1/widget/list_widget_in_chat_list', {
        body: {
            listRequest: {
                pageToken,
                pageSize
            }
        },
        isGoLang: true,
        adapter: (res) => {
            return {
                listResponse: res.listResponse,
                widgets: res.widgets.map(widget => ({
                    ...widget,
                    imComponent: {
                        ...widget.imComponent,
                        componentsInput: widget.imComponent?.componentsInput?.map((item) => {
                            let inputType = '';
                            let defaultValue = '';
                            let options = [];
                            const props = {};
                            let supportedFileTypes = [];
                            switch (item.type) {
                                case 'BOT_IM_COMPONENT_INPUT_TYPE_FILE_UPLOAD':
                                    inputType = 'upload';
                                    supportedFileTypes = item.supportedFileTypes;
                                    break;
                                case 'BOT_IM_COMPONENT_INPUT_TYPE_AUDIO_UPLOAD':
                                    inputType = 'upload';
                                    supportedFileTypes = ['MESSAGE_METADATA_TYPE_AUDIO_FILE'];
                                    break;
                                case 'BOT_IM_COMPONENT_INPUT_TYPE_VIDEO_UPLOAD':
                                    inputType = 'upload';
                                    supportedFileTypes = ['MESSAGE_METADATA_TYPE_VIDEO_FILE'];
                                    break;
                                case 'BOT_IM_COMPONENT_INPUT_TYPE_IMAGE_UPLOAD':
                                    inputType = 'upload';
                                    supportedFileTypes = ['MESSAGE_METADATA_TYPE_IMAGE_FILE'];
                                    break;
                                case 'BOT_IM_COMPONENT_INPUT_TYPE_TEXT_UPLOAD':
                                    inputType = 'upload';
                                    supportedFileTypes = ['MESSAGE_METADATA_TYPE_TEXT_FILE'];
                                    break;
                                case 'BOT_IM_COMPONENT_INPUT_TYPE_TEXT_INPUT':
                                    inputType = 'textarea';
                                    defaultValue = item.stringDefault;
                                    break;
                                case 'BOT_IM_COMPONENT_INPUT_TYPE_TEXT_SELECTOR':
                                    inputType = 'select';
                                    defaultValue = item.textSelectorDefault;
                                    options = item.textSelectorAllOf?.map((e) => {
                                        return {
                                            label: e.label || e.value,
                                            value: e.value,
                                            iconUrl: e.iconUrl
                                        };
                                    });
                                    break;
                                case 'BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_INPUT':
                                    inputType = item.hasNumberLimitation ? 'numberSlider' : 'numberInput';
                                    defaultValue = item.numberDefault;
                                    props.maxLength = item.numberMax;
                                    props.minLength = item.numberMin;
                                    break;
                                case 'BOT_IM_COMPONENT_INPUT_TYPE_INTEGER_INPUT':
                                    inputType = item.hasIntegerLimitation ? 'interSlider' : 'interInput';
                                    defaultValue = item.integerDefault;
                                    props.maxLength = item.integerMax;
                                    props.minLength = item.integerMin;
                                    break;
                                case 'BOT_IM_COMPONENT_INPUT_TYPE_CHECKBOX':
                                    inputType = 'checkbox';
                                    defaultValue = item.booleanDefault;
                                    break;
                                case 'BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_SELECTOR':
                                    inputType = 'numberSelect';
                                    defaultValue = item.numberSelectorDefault;
                                    options = item.numberSelectorAllOf?.map((e) => {
                                        return {
                                            label: e.label || e.value,
                                            value: e.value,
                                            iconUrl: e.iconUrl
                                        };
                                    });
                                    break;
                                case 'BOT_IM_COMPONENT_INPUT_TYPE_CODE_EDITOR':
                                    inputType = 'codeEditor';
                                    defaultValue = item.stringDefault;
                                    break;
                            }
                            return {
                                ...item,
                                id: item.fieldName,
                                serverType: item.type,
                                props,
                                rules: props,
                                type: inputType,
                                defaultValue,
                                options,
                                supportedFileTypes
                            };
                        })
                    }
                }))
            };
        }
    });
}
function getFeaturePageDetailInfo({ pageId }) {
    return APIFetch_1.APIFetch.post('/v1/homepage/get_feature_page_detail_info', {
        body: {
            pageId
        },
        isGoLang: true,
        adapter: res => {
            const formatData = {
                ...res.pageInfo,
                items: res.pageInfo?.items?.map((item) => {
                    return {
                        button: item?.normalItem?.button,
                        detail: item?.normalItem?.widgetSummary || item?.normalItem?.botSummary
                    };
                })
            };
            return formatData;
        }
    });
}
function listWidgetChatHistory(widgetId, pageToken, pageSize) {
    return APIFetch_1.APIFetch.post('/v1/widget/chat/list_history_messages', {
        isGoLang: true,
        body: {
            widgetId,
            listRequest: {
                pageToken,
                pageSize
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
function addWidgetToChatList(widgetId, pinned) {
    return APIFetch_1.APIFetch.post('/v1/widget/add_widget_to_chat_list', {
        body: {
            id: widgetId,
            ...(pinned && { pinned })
        },
        isGoLang: true,
        adapter: (res) => {
            return res.greetingMessage;
        }
    });
}
function getWidgetInfo(widgetId) {
    return APIFetch_1.APIFetch.post('/v1/widget/batch_get', {
        body: {
            ids: [widgetId]
        },
        isGoLang: true,
        adapter: (res) => {
            return (res.widgets ?? []).find(item => item.id === widgetId);
        }
    });
}
function getWidgetsInfo(widgetIds) {
    return APIFetch_1.APIFetch.post('/v1/widget/batch_get', {
        body: {
            ids: widgetIds
        },
        isGoLang: true,
        adapter: (res) => {
            return res.widgets;
        }
    });
}
function ttsWidgetTrail(widgetId) {
    return APIFetch_1.APIFetch.post('/v1/widget/chat/voice/trail', {
        body: {
            widgetId
        },
        isGoLang: true,
        adapter: (res) => {
            return res.voiceUrl;
        }
    });
}
function getTTSListOld() {
    return APIFetch_1.APIFetch.post('/v1/widget/voice/list_widget_voice', {
        isGoLang: true,
        body: {
            listRequest: {
                pageToken: '0',
                pageSize: 30
            }
        },
        adapter: (res) => {
            return (res.list || []).map((item) => {
                const tts = item.ttsList[0];
                return {
                    id: tts.id,
                    ttsId: tts.id,
                    voiceId: tts.voiceId,
                    isSystem: item.isSystem,
                    name: item.name,
                    description: item.description,
                    image: item.image,
                    language: tts.language,
                    voiceSampleUrl: item.voiceSampleUrl,
                    status: tts.status,
                    isMulti: item.ttsList.length > 1,
                    isPublic: item?.isPublic,
                    hasPublished: item?.hasPublished,
                    widgetId: item?.widgetId,
                    ids: [...item.ttsList?.map((e) => e.id), item.id],
                    languageVersions: item.ttsList?.map((e) => e.languageVersion),
                    supportLanguages: item.ttsList?.map((e) => e.language.id),
                    supportLanguageNames: item.ttsList?.map((e) => e.language.name),
                    languageVersion: tts.languageVersion,
                    supportedAccents: tts.supportedAccents,
                    ttsList: item.ttsList.map((ttsItem) => {
                        return {
                            baseId: item.id,
                            id: ttsItem.id,
                            name: item.name,
                            image: tts.image,
                            language: ttsItem.language,
                            voiceSampleUrl: item.voiceSampleUrl,
                            status: ttsItem.status,
                            languageVersion: ttsItem.languageVersion,
                            supportedAccents: ttsItem.supportedAccents,
                            isPublic: item.isPublic
                        };
                    })
                };
            });
        }
    });
}
function getTTSList({ botId, languageId, pageSize = 10, pageToken = '0' }) {
    return APIFetch_1.APIFetch.post('/v1/widget/voice/list_voice_widgets', {
        isGoLang: true,
        body: {
            ...(botId && { botId }),
            ...(languageId && languageId != '-1' && { languageId }),
            listRequest: {
                pageToken,
                pageSize
            }
        },
        adapter: (res) => {
            const list = (res.list || []).map((item) => {
                const tts = item.voiceDetail || {};
                return {
                    id: tts.ttsId,
                    ttsId: tts.ttsId,
                    widgetId: item?.id,
                    name: item.name,
                    description: item.description,
                    image: item.logoUrl,
                    language: {
                        id: tts.languageId,
                        name: tts.languageName
                    },
                    voiceSampleUrl: tts.sampleUrl,
                    status: item.status
                };
            });
            return {
                list,
                nextPageToken: res?.listResponse?.nextPageToken,
                hasMore: res?.listResponse?.hasMore
            };
        }
    });
}
function publishWidgetVoice(widgetId, description) {
    return APIFetch_1.APIFetch.post('/v1/widget/voice/publish_widget_voice', {
        body: {
            widgetId,
            description
        },
        isGoLang: true
    });
}
function unpublishWidgetVoice(widgetId) {
    return APIFetch_1.APIFetch.post('/v1/widget/voice/unpublish_widget_voice', {
        body: {
            widgetId
        },
        isGoLang: true
    });
}
function deleteWidgetVoice(widgetId) {
    return APIFetch_1.APIFetch.post('/v1/widget/voice/delete_widget_voice', {
        body: {
            widgetId
        },
        isGoLang: true
    });
}
function pinnedWidgetInList(widgetId, pinned) {
    return APIFetch_1.APIFetch.post('/v1/widget/chat/pinned_widget_in_list', {
        body: {
            widgetId,
            pinned
        },
        isGoLang: true
    });
}
const shareCodeCacheMap$ = new Map();
async function getWidgetSharingCode(widgetId) {
    if (!shareCodeCacheMap$.has(widgetId)) {
        const res = (await getWidgetSharingCodeByWidgetId(widgetId));
        if (res.success && res.data) {
            shareCodeCacheMap$.set(widgetId, res.data.code);
        }
    }
    return shareCodeCacheMap$.get(widgetId);
}
function getWidgetSharingCodeByWidgetId(widgetId) {
    return APIFetch_1.APIFetch.post('/v1/shared/generate_shared_code', {
        body: {
            bizId: widgetId,
            bizType: 'BIZ_TYPE_WIDGET'
        },
        isGoLang: true
    });
}
const proConfigCacheMap$ = new Map();
async function getWidgetProConfig(widgetId) {
    if (!proConfigCacheMap$.has(widgetId)) {
        const res = await getWidgetProConfigByWidgetId(widgetId);
        if (res.success && res.data && res.data.template) {
            proConfigCacheMap$.set(widgetId, { template: res.data.template });
            return {
                template: res.data.template
            };
        }
        return {
            reason: res.reason
        };
    }
    return proConfigCacheMap$.get(widgetId);
}
function getWidgetProConfigByWidgetId(widgetId) {
    return APIFetch_1.APIFetch.post('/v1/widget/get_pro_config_template', {
        body: {
            widgetId
        },
        isGoLang: true
    });
}
function getWidgetSharedDetail(code) {
    return APIFetch_1.APIFetch.post('/v1/shared/get_shared_info', {
        body: {
            code
        },
        isGoLang: true,
        adapter: res => {
            return res?.data?.widgetSummary;
        }
    });
}
function deleteHistoryMessageByMsgIds(ids) {
    return APIFetch_1.APIFetch.post('/v1/chat/deleteHistoryByMsgId', {
        body: {
            msgIdList: ids,
            bizType: 'HISTORY_OPERATION_BIZ_TYPE_WIDGET'
        },
        isGoLang: true
    });
}
function deleteAllWidgetHistory(widgetId) {
    return APIFetch_1.APIFetch.post('/v1/chat/deleteAllHistory', {
        body: {
            bizId: widgetId,
            bizType: 'HISTORY_OPERATION_BIZ_TYPE_WIDGET'
        },
        isGoLang: true
    });
}
function resetWidgetHistory(widgetId) {
    return APIFetch_1.APIFetch.post('/v1/chat/reset', {
        body: {
            bizId: widgetId,
            bizType: 'HISTORY_OPERATION_BIZ_TYPE_WIDGET'
        },
        isGoLang: true
    });
}
function removeWidgetFromChatList(widgetId) {
    return APIFetch_1.APIFetch.post('/v1/widget/chat/remove_widget_from_chat_list', {
        body: {
            widgetId
        },
        isGoLang: true
    });
}
