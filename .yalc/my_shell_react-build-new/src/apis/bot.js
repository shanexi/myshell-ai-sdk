import { rxDelete, rxGet, rxPost, rxUpload } from '../common/utils/rx-http.js';
import { APIFetch } from '../core/request/APIFetch.js';
export function getBotListInChatList(source, query) {
    const url = '/v2/bot/chat/list_bot_in_chat_list';
    const adapter = (res) => {
        const bots = res?.botDetails ?? [];
        return bots.map((d) => {
            const { lastMessage = {}, latestInteractionDateUnix, canEditBot, inChatList, photos, pinned, summary = {}, setting = {}, unreadMessageCount, visitorCanChat, widgets, generateVoiceCostEnergy } = d;
            const { backgroundImageThemeHexColors, ...sRest } = summary || {};
            const data = {
                canEditBot,
                pinned,
                inChatList,
                photos,
                generateVoiceCostEnergy,
                official: summary?.isOfficial,
                nsfw: summary?.tagList?.some((tag) => tag.id === '1800000000000000019'),
                userId: Number(summary?.author?.id || 0),
                lastMessage: lastMessage
                    ? {
                        ...lastMessage,
                        createdDate: Number(lastMessage?.createdDateUnix),
                        updatedDate: Number(lastMessage?.updatedDateUnix)
                    }
                    : null,
                ...(sRest || {}),
                createdDate: summary?.createdDateUnix,
                updatedDate: summary?.updatedDateUnix,
                botSetting: setting,
                language: summary?.language?.name ?? 'English',
                unreadMessageCount,
                privateBotId: Number(summary?.privateBotId || 0),
                lastInteractionDate: Number(latestInteractionDateUnix || 0),
                schemes: backgroundImageThemeHexColors?.schemes ?? null,
                visitorCanChat,
                isImageBot: summary?.botGenType === 'BOT_GEN_TYPE_IMAGE' || summary?.botGenType === 'BOT_GEN_TYPE_GIF',
                membershipChatConfig: summary?.membershipChatConfig ?? {},
                stakingDisabled: summary?.stakingDisabled,
                isPanelImageBot: summary?.chatPanelType === 'BOT_CHAT_PANEL_TYPE_COMPONENT',
                isComponentBot: summary?.chatPanelType === 'BOT_CHAT_PANEL_TYPE_COMPONENT',
                imComponent: {
                    ...summary?.imComponent,
                    componentsInput: summary?.imComponent?.componentsInput?.map((item) => {
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
                },
                widgets
            };
            return data;
        });
    };
    const config = {
        isGoLang: true,
        body: {
            listRequest: {
                pageToken: '0',
                pageSize: 50
            },
            ...(query && { query })
        }
    };
    return APIFetch.post(url, {
        ...config,
        adapter
    });
}
export function getOwnBotList() {
    return APIFetch.post('/v1/bot/list_user_owned_bots', {
        isGoLang: true,
        adapter: (res) => {
            return (res.bots || []).map((bot) => {
                const { summary, setting, ...rest } = bot;
                return {
                    ...summary,
                    ...rest,
                    userId: summary?.author?.id,
                    botSetting: setting
                };
            });
        }
    });
}
export function getToolboxList() {
    return APIFetch.post('/v1/bot/list_toolbox_bots', {
        isGoLang: true,
        adapter: (res) => {
            return (res.bots || []).map((bot) => {
                const { summary, setting, ...rest } = bot;
                return {
                    ...summary,
                    ...rest,
                    userId: summary?.author?.id,
                    botSetting: setting
                };
            });
        }
    });
}
export function searchBotList(pageToken, pageSize, query, includeTagIds, excludeTagIds) {
    return APIFetch.post('/v1/bot/search', {
        body: {
            listRequest: {
                pageToken: pageToken || '0',
                pageSize: pageSize || 20
            },
            ...(query && { query }),
            ...(includeTagIds && includeTagIds?.length > 0 && { includeTagIds }),
            ...(excludeTagIds && excludeTagIds?.length > 0 && { excludeTagIds })
        },
        isGoLang: true,
        adapter: (res) => {
            const bots = res.bots?.map((item) => {
                return {
                    ...item,
                    isNsfw: item?.tagList?.some((tag) => tag.id === '1719341073387491328')
                };
            });
            return {
                bots,
                listResponse: res.listResponse
            };
        }
    });
}
export function getSelectedBoForLandingPage(id) {
    return rxGet('/bot/getSelectedBoForLandingPage', { id: id || '' });
}
export function getBotInfo(ids, production) {
    return rxPost('/v1/bot/batch_get', { ids: typeof ids === 'string' ? [ids] : ids }, {
        noPopupError: true,
        isGoLang: true,
        production
    });
}
export function getBotInfoV2(ids, production) {
    return APIFetch.post('/v1/bot/batch_get', {
        body: {
            ids: typeof ids === 'string' ? [ids] : ids
        },
        isGoLang: true,
        production
    });
}
export function voiceCreate(audioUrl) {
    return APIFetch.post('/v1/bot/voice/create', {
        isGoLang: true,
        body: {
            audioUrl
        },
        adapter: res => {
            const voice = res?.botVoice;
            return {
                ttsId: voice?.ttsList?.[0]?.id,
                status: voice?.ttsList?.[0]?.status
            };
        }
    });
}
export function voiceEdit(ttsId, name, imageUrl) {
    return APIFetch.post('/v1/bot/voice/edit', {
        body: {
            id: ttsId,
            ...(name && { name }),
            ...(imageUrl && { imageUrl })
        },
        isGoLang: true
    });
}
export function voicePreview(ttsId, text) {
    return APIFetch.post('/v1/bot/voice/preview', {
        body: {
            ttsId,
            text
        },
        isGoLang: true,
        adapter: (res) => {
            return res.url;
        }
    });
}
export function voiceRecreate(ttsId) {
    return APIFetch.post('/v1/bot/voice/recreate', {
        body: {
            id: ttsId
        },
        isGoLang: true,
        adapter: res => {
            const voice = res?.botVoice;
            return {
                ttsId: voice?.ttsList?.[0]?.id,
                status: voice?.ttsList?.[0]?.status
            };
        }
    });
}
export function voiceUsages(ttsId) {
    return APIFetch.post('/v1/bot/voice/usages', {
        body: {
            id: ttsId
        },
        isGoLang: true,
        adapter: res => {
            return (res.bots || []).map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    logo: item.logo,
                    logoUrl: item.logoUrl,
                    privateBotId: item.privateBotId,
                    status: item.status,
                    userId: item.author?.id
                };
            });
        }
    });
}
export function getTtsList() {
    return rxGet('/bot/getTtsList');
}
export function getMyVoice() {
    return rxPost('/bot/getMyVoice', {});
}
export function createVoice(data) {
    const formData = new FormData();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
        }
    }
    return rxUpload('/bot/createVoice', formData, {
        timeout: 90000
    });
}
export function editVoice(data) {
    const formData = new FormData();
    for (const key in data) {
        if (data.hasOwnProperty(key) && data[key]) {
            formData.append(key, data[key]);
        }
    }
    return rxUpload('/bot/editVoice', formData);
}
export function deleteVoice(id) {
    return rxDelete('/bot/deleteVoice', { id });
}
export function getVoiceUsage(id) {
    return rxGet('/bot/getVoiceUsage', { id });
}
export function voiceReCreation(id) {
    return rxPost('/bot/recreateVoice', { id });
}
export function previewTts(text, ttsUid) {
    return rxPost('/bot/previewTts', {
        text,
        ttsUid
    });
}
export function setBotPinnedStatus(botId, pinned) {
    return APIFetch.post('/v1/bot/chat/pinned_bot_in_list', {
        body: {
            botId,
            pinned: {
                pinned
            }
        },
        isGoLang: true
    });
}
export function createBot(name, prompt, autoPromptTaskId, autoUpdateProfile) {
    return APIFetch.post('/v1/bot/create', {
        body: {
            name,
            prompt,
            autoPromptTaskId,
            autoUpdateProfile
        },
        isGoLang: true
    });
}
export function saveBot(data) {
    return APIFetch.post('/v2/bot/save', {
        body: { ...data },
        isGoLang: true
    });
}
export function getBotJobInfo(jobId) {
    return APIFetch.post('/v1/async_job/get_info', {
        body: {
            jobId
        },
        isGoLang: true
    });
}
export function resetBot(botId) {
    return APIFetch.post('/v1/bot/reset', {
        body: {
            botId
        },
        isGoLang: true
    });
}
export function setMessageHandled(msgId) {
    return APIFetch.post('/v1/bot/chat/set_message_handled', {
        body: {
            msgId
        },
        isGoLang: true
    });
}
export function createOrUpdateUgcBot(data) {
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    return rxUpload('/bot/editUgcBot', formData, {
        timeout: 90000
    });
}
export function resetUnReadMessageCount(botId) {
    return APIFetch.post('/v1/bot/chat/reset_unread_message_count', {
        body: {
            botId
        },
        isGoLang: true
    });
}
export function addBotToChatList(botId, src) {
    return APIFetch.post('/v1/bot/chat/add_bot_to_chat_list', {
        body: {
            botId,
            src,
            conversation_scenario: 3
        },
        isGoLang: true
    });
}
export function removeBotFromChatList(botId) {
    return APIFetch.post('/v1/bot/chat/remove_bot_from_chat_list', {
        body: {
            botId
        },
        isGoLang: true
    });
}
export function validateCreateUgcBotAction() {
    return rxGet('/bot/canCreateUgcBot');
}
export function publishBot(botId) {
    return rxPost('/v1/bot/publish', {
        botId
    }, {
        isGoLang: true
    });
}
export function unpublishBot(botId) {
    return rxPost('/v1/bot/un_publish', {
        botId
    }, {
        isGoLang: true
    });
}
export function getLanguageList() {
    return APIFetch.post('/v1/bot/list_bot_languages', {
        isGoLang: true,
        adapter: (res) => {
            return res.languages || [];
        }
    });
}
export function getSharedBotInfo(code) {
    return rxGet('/bot/getSharedBotInfo', {
        code
    });
}
const shareCodeCacheMap$ = new Map();
export async function getBotSharingCode(botId) {
    if (!shareCodeCacheMap$.has(botId)) {
        const res = (await getBotSharingCodeByBotId(botId));
        if (res.success && res.data.code) {
            shareCodeCacheMap$.set(botId, res.data.code);
        }
    }
    return shareCodeCacheMap$.get(botId);
}
export function getBotSharingCodeByBotId(botId) {
    return APIFetch.post('/v1/bot/shared/generate_bot_shared_code', {
        body: {
            botId
        },
        isGoLang: true
    });
}
export function getBotSharedDetail(code) {
    return APIFetch.post('/v1/bot/shared/get_bot_shared_detail', {
        body: {
            code
        },
        isGoLang: true
    });
}
export function getTagInfos(tagType, showNsfw) {
    return APIFetch.post('/v3/bot/tag/get_tag_infos', {
        body: {
            tagType,
            excludeNsfw: !showNsfw
        },
        isGoLang: true,
        adapter: (res) => {
            return res.list;
        }
    });
}
export function getBotFilters(excludeNsfw) {
    return rxGet('/bot/filters', {
        v: 2,
        excludeNsfw: excludeNsfw ? 'false' : 'true'
    });
}
export function bindTgToken(token, botId) {
    return rxPost('/botTelegram/bindToken', {
        token,
        botId: Number(botId)
    }, {
        noPopupError: true
    });
}
export function createAutoPromptTask(name, description) {
    return rxPost('/bot/createAutoPromptTask', {
        name,
        description
    }, {
        noPopupError: true
    });
}
export function getAdvanedPrompt(botId) {
    return rxPost('/v1/bot/setting/generate_prefix_and_postfix', {
        botId
    }, {
        noPopupError: true,
        isGoLang: true
    });
}
export function getAutoPromptTask(id) {
    return rxGet('/bot/getAutoPromptTask', {
        id
    }, {
        noPopupError: true
    });
}
export function uploadBotPhoto(botId, objectKeys, type) {
    return APIFetch.post('/v1/bot/photo/batch_add', {
        body: {
            objectKeys,
            type,
            botId
        },
        isGoLang: true,
        adapter: (res) => {
            return res.bot;
        }
    });
}
export function removeBotPhoto(data) {
    return APIFetch.post('/v1/bot/photo/batch_remove', {
        body: {
            botId: data.botId,
            photoIds: data.photoIds
        },
        isGoLang: true,
        adapter: (res) => {
            return res.bot;
        }
    });
}
export function getAllBotTags() {
    return rxGet('/bot/tags', {});
}
export function getRecommendBots() {
    return APIFetch.post('/v1/bot/get_recommended_bots', { isGoLang: true });
}
export function addBotToChatListV2(botIds, src = 'USER_BOT_LIST_SRC_USER_REGISTER') {
    return APIFetch.post('/v1/bot/chat/batch_add_bot_to_chat_list', {
        body: {
            botIds,
            src: src || 'USER_BOT_LIST_SRC_USER_REGISTER'
        },
        isGoLang: true
    });
}
export function getBotChatSetting(botId) {
    return APIFetch.post('/v1/bot/setting/get_chat_setting', {
        body: {
            botId
        },
        isGoLang: true
    });
}
export function updateBotChatSetting(params) {
    return APIFetch.post('/v1/bot/setting/update_chat_setting', {
        body: params,
        isGoLang: true
    });
}
export function getAvailableLlmModels() {
    return APIFetch.post('/v1/bot/chat/available_llm_models', {
        isGoLang: true,
        adapter: (res) => {
            return res.models;
        }
    });
}
export function checkBotJointConfig(json) {
    return APIFetch.post('/v1/bot/check_bot_joint_config', {
        body: {
            configJson: json
        },
        isGoLang: true
    });
}
export function terminateGeneration(id, msgId, index) {
    return APIFetch.post('/v1/bot/chat/stop', {
        body: {
            botId: id,
            msgId,
            index
        },
        isGoLang: true
    });
}
export function mediaFileMetadata(params) {
    return APIFetch.post('/v1/bot/im/media_file_metadata', {
        body: params,
        isGoLang: true
    }).then(res => res?.data);
}
