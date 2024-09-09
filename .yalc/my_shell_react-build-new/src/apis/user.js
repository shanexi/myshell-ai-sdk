"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = getUserProfile;
exports.updateUserProfile = updateUserProfile;
exports.checkInvitationCode = checkInvitationCode;
exports.getUserEnergyInfo = getUserEnergyInfo;
exports.updateUserName = updateUserName;
exports.isUserNameAvailable = isUserNameAvailable;
exports.uploadAvatar = uploadAvatar;
exports.connectToTelegram = connectToTelegram;
exports.bindTelegram = bindTelegram;
exports.connectToDiscord = connectToDiscord;
exports.connectToTwitter = connectToTwitter;
exports.getUserConnectedAccounts = getUserConnectedAccounts;
exports.updateLanguage = updateLanguage;
exports.updateUserSetting = updateUserSetting;
exports.kolUseInviteCode = kolUseInviteCode;
exports.getShellCoins = getShellCoins;
exports.claimAndUseSeasonPass = claimAndUseSeasonPass;
exports.getPointRecords = getPointRecords;
exports.getCoinRecords = getCoinRecords;
exports.tryVerifyYidunCaptcha = tryVerifyYidunCaptcha;
exports.setUserFollow = setUserFollow;
exports.checkUserNameAvailable = checkUserNameAvailable;
exports.getWidgetsByUser = getWidgetsByUser;
exports.getBotsByUser = getBotsByUser;
exports.getUserBotUsageInfo = getUserBotUsageInfo;
exports.getInvitation = getInvitation;
exports.getWalletList = getWalletList;
exports.checkBindPrivyEmail = checkBindPrivyEmail;
exports.bindRemove = bindRemove;
exports.updateUserSettings = updateUserSettings;
exports.getUserSettings = getUserSettings;
exports.registerFCMUserDevice = registerFCMUserDevice;
exports.fetchUserPoints = fetchUserPoints;
exports.getExperimentInfo = getExperimentInfo;
exports.userLogout = userLogout;
const dayjs_1 = __importDefault(require("dayjs"));
const user_1 = require("../common/constants/enums/user.js");
const user_2 = require("../common/constants/interfaces/user.js");
const rx_http_1 = require("../common/utils/rx-http.js");
const APIFetch_1 = require("../core/request/APIFetch.js");
function getUserProfile(props) {
    const { userId, name, nameTag } = props || {};
    return APIFetch_1.APIFetch.post('/v1/user/get_info', {
        body: {
            ...(userId && { userId }),
            ...(name && { name: decodeURIComponent(name) }),
            ...(nameTag && { nameTag: decodeURIComponent(nameTag) })
        },
        isGoLang: true,
        adapter: (res) => {
            const user = res.userDetail || {};
            const summary = user?.summary || {};
            const membershipInfo = summary.membershipInfo || {};
            return {
                avatar: summary.avatar,
                email: summary.email,
                id: summary.id,
                isGenesisPasscard: membershipInfo.type === user_1.UserMembershipTypeEnum.TYPE_GENESIS_WITH_GENESIS_CARD,
                isNftAvatar: summary.isNftAvatar,
                isPasscard: membershipInfo.type === user_1.UserMembershipTypeEnum.TYPE_GENESIS_WITH_PASS_CARD,
                level: membershipInfo.type === user_1.UserMembershipTypeEnum.TYPE_GENESIS_WITH_GENESIS_CARD ||
                    membershipInfo.type === user_1.UserMembershipTypeEnum.TYPE_GENESIS_WITH_PASS_CARD
                    ? 3
                    : membershipInfo.type === user_1.UserMembershipTypeEnum.TYPE_PREMIUM
                        ? 2
                        : 1,
                name: summary.name,
                nameTag: summary.nameTag,
                createdDate: summary.userCreatedAt
                    ? (0, dayjs_1.default)(Number(summary.userCreatedAt)).format('YYYY-MM-DDTHH:mm:ssZ')
                    : undefined,
                createdTime: summary.userCreatedAt
                    ? (0, dayjs_1.default)(Number(summary.userCreatedAt)).format('YYYY-MM-DD HH:mm:ss.SSS')
                    : undefined,
                publicAddress: summary.publicAddress,
                source: summary.userSource,
                hasParticleAccount: user.hasParticleAccount,
                privateBotLimit: membershipInfo.privateBotLimit,
                publicBotLimit: membershipInfo.publicBotLimit,
                premiumInfo: {
                    level: membershipInfo.premiumInfo?.level,
                    totalExp: membershipInfo.premiumInfo?.totalExp,
                    nextLevelNeedExp: membershipInfo.premiumInfo?.nextLevelNeedExp,
                    currentLevelExp: membershipInfo.premiumInfo?.currentLevelExp
                },
                canPublishNewBot: user.canPublishNewBot,
                connectInfo: user.connectInfo,
                followedCount: summary.followedCount,
                fansCount: summary.fansCount,
                hasFollowed: summary.hasFollowed,
                followStatus: summary.followStatus,
                description: summary.description,
                backgroundUrl: summary.backgroundUrl,
                loginCredential: user.loginCredential,
                loginType: user.loginType,
                publicKey: user.publicKey,
                isKol: user.isKol,
                rugged: user.bondingCurveCreatorStatus === user_2.BondingCurveCreatorStatus.RUGGED
            };
        }
    });
}
function updateUserProfile(props) {
    const { name, avatar, background, description } = props || {};
    return APIFetch_1.APIFetch.post('/v1/user/update_user_info', {
        body: {
            ...(name && { name }),
            ...(avatar && { avatar }),
            ...(background && { background }),
            ...(description && { description })
        },
        isGoLang: true
    });
}
function checkInvitationCode(code) {
    return (0, rx_http_1.rxPost)('/user/checkInvitationCode', { code }, { allowAnonymous: true });
}
function getUserEnergyInfo(userId) {
    return APIFetch_1.APIFetch.post('/v1/user/get_energy', {
        body: {
            userId
        },
        isGoLang: true,
        adapter: (res) => {
            return res.energyInfo;
        }
    });
}
function updateUserName(name) {
    return (0, rx_http_1.rxPost)('/user/updateUserName', { name: name || '' }, { noPopupError: true });
}
function isUserNameAvailable(name) {
    return (0, rx_http_1.rxGet)('/user/isUserNameAvailable', { name });
}
function uploadAvatar(file) {
    const formData = new FormData();
    formData.append('file', file);
    return (0, rx_http_1.rxUpload)('/user/uploadAvatar', formData);
}
function connectToTelegram(tgData) {
    return (0, rx_http_1.rxPost)('/user/connectToTelegram', tgData);
}
function bindTelegram(tgGuid) {
    return (0, rx_http_1.rxPost)('v1/user/bindTelegram', { tgGuid }, {
        noPopupError: true
    });
}
function connectToDiscord(code, state, source) {
    return (0, rx_http_1.rxPost)('/user/connectToDiscord', {
        state,
        code,
        ...(source && { source })
    });
}
function connectToTwitter(code, state, source) {
    return (0, rx_http_1.rxPost)('/user/connectToTwitter', {
        state,
        code,
        ...(source && { source })
    });
}
function getUserConnectedAccounts() {
    return (0, rx_http_1.rxGet)('/user/getUserConnectedAccounts');
}
function updateLanguage(language) {
    return (0, rx_http_1.rxPost)('/user/updateLanguage', { language });
}
function updateUserSetting(data) {
    return (0, rx_http_1.rxPost)('/user/updateUserSetting', data);
}
function kolUseInviteCode(code) {
    return (0, rx_http_1.rxPost)('/v1/kol-invite/use_code', { code });
}
function getShellCoins() {
    return APIFetch_1.APIFetch.post('/v1/shell_coins/get_account', {
        isGoLang: true,
        adapter: (res) => {
            return res.account;
        }
    });
}
function claimAndUseSeasonPass() {
    return APIFetch_1.APIFetch.post('/v1/season/reward/auto_redeem_and_use_season_pass_if_needed', {
        isGoLang: true,
        withMyShellSecurityToken: true,
        adapter: (res) => {
            return res.item;
        }
    });
}
function getPointRecords(pageToken, pageSize, seasonId, pointType) {
    return APIFetch_1.APIFetch.post('/v1/user/get_user_season_point_records', {
        body: {
            listRequest: {
                pageToken,
                pageSize
            },
            seasonId,
            pointType
        },
        isGoLang: true
    });
}
function getCoinRecords(pageToken, pageSize) {
    return APIFetch_1.APIFetch.post('/v1/shell_coins/list_account_orders', {
        body: {
            listRequest: {
                pageToken,
                pageSize
            }
        },
        isGoLang: true
    });
}
function tryVerifyYidunCaptcha(sign) {
    return APIFetch_1.APIFetch.post('/v1/captcha/try_verify', {
        body: {
            sign
        },
        isGoLang: true,
        adapter: (res) => {
            return res.result;
        }
    });
}
function setUserFollow(targetUserId, followed) {
    return APIFetch_1.APIFetch.post('/v1/user/follow', {
        body: {
            targetUserId,
            followed
        },
        isGoLang: true
    });
}
function checkUserNameAvailable(name) {
    return APIFetch_1.APIFetch.post('/v1/user/check_user_name_available', {
        body: {
            name
        },
        isGoLang: true
    });
}
function getWidgetsByUser(userId) {
    return APIFetch_1.APIFetch.post('/v1/widget/list_user_public_widgets', {
        body: {
            userId
        },
        isGoLang: true,
        adapter: (res) => {
            return {
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
function getBotsByUser(userId) {
    return APIFetch_1.APIFetch.post('/v1/bot/list_user_public_bots', {
        body: {
            userId
        },
        isGoLang: true,
        adapter: (res) => (res?.bots ?? []).map((d) => {
            const { lastMessage = {}, latestInteractionDateUnix, canEditBot, inChatList, photos, pinned, summary = {}, setting = {}, unreadMessageCount, visitorCanChat, widgets } = d;
            const { backgroundImageThemeHexColors, ...sRest } = summary || {};
            const data = {
                canEditBot,
                pinned,
                inChatList,
                photos,
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
        })
    });
}
function getUserBotUsageInfo() {
    return APIFetch_1.APIFetch.post('/v1/user/get_bots_usage_info', {
        isGoLang: true
    });
}
function getInvitation() {
    return APIFetch_1.APIFetch.post('/v1/user/invitation/get_invitation', {
        isGoLang: true
    });
}
function getWalletList() {
    return APIFetch_1.APIFetch.post('/v1/user/get_wallet_info', {
        isGoLang: true,
        adapter: (res) => {
            return res.wallet;
        }
    });
}
function checkBindPrivyEmail() {
    return APIFetch_1.APIFetch.post('/v1/user/bind/check_bind_privy_email', {
        isGoLang: true
    });
}
function bindRemove(bindType) {
    return APIFetch_1.APIFetch.post('/v1/user/bind/remove', {
        isGoLang: true,
        body: {
            bindType
        }
    });
}
function updateUserSettings(data) {
    return APIFetch_1.APIFetch.post('/v1/user/update_user_settings', {
        isGoLang: true,
        body: {
            settings: Array.isArray(data) ? data : [data]
        }
    });
}
function getUserSettings() {
    return APIFetch_1.APIFetch.post('/v1/user/get_user_settings', {
        isGoLang: true,
        adapter: res => {
            return res.settings;
        }
    });
}
function registerFCMUserDevice(token) {
    return APIFetch_1.APIFetch.post('/v1/user/regist_user_device', {
        body: {
            deviceId: token,
            deviceType: 'DEVICE_TYPE_WEB',
            source: 'DATA_SOURCE_FCM'
        },
        isGoLang: true
    });
}
function fetchUserPoints() {
    return APIFetch_1.APIFetch.post('/v1/user/get_user_season_point_info', {
        isGoLang: true,
        adapter: (res) => {
            return [res.currentSeason, res.lastSeason].map(points => {
                return points.map(({ pointType, pointText, point }) => ({
                    type: pointType,
                    text: pointText,
                    point
                }));
            });
        }
    });
}
function getExperimentInfo() {
    return APIFetch_1.APIFetch.post('/v1/config/get_experiment_info', {
        isGoLang: true,
        body: {
            name: 'EXPERIMENT_NAME_RECOMMEND_BOT_TO_NEW_USER'
        }
    });
}
function userLogout() {
    return APIFetch_1.APIFetch.post('/v1/user/auth/logout', {
        isGoLang: true
    });
}
