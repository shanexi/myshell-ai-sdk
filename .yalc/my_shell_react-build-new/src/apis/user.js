import dayjs from 'dayjs';
import { UserMembershipTypeEnum } from '../common/constants/enums/user.js';
import { BondingCurveCreatorStatus } from '../common/constants/interfaces/user.js';
import { rxGet, rxPost, rxUpload } from '../common/utils/rx-http.js';
import { APIFetch } from '../core/request/APIFetch.js';
export function getUserProfile(props) {
    const { userId, name, nameTag } = props || {};
    return APIFetch.post('/v1/user/get_info', {
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
                isGenesisPasscard: membershipInfo.type === UserMembershipTypeEnum.TYPE_GENESIS_WITH_GENESIS_CARD,
                isNftAvatar: summary.isNftAvatar,
                isPasscard: membershipInfo.type === UserMembershipTypeEnum.TYPE_GENESIS_WITH_PASS_CARD,
                level: membershipInfo.type === UserMembershipTypeEnum.TYPE_GENESIS_WITH_GENESIS_CARD ||
                    membershipInfo.type === UserMembershipTypeEnum.TYPE_GENESIS_WITH_PASS_CARD
                    ? 3
                    : membershipInfo.type === UserMembershipTypeEnum.TYPE_PREMIUM
                        ? 2
                        : 1,
                name: summary.name,
                nameTag: summary.nameTag,
                createdDate: summary.userCreatedAt
                    ? dayjs(Number(summary.userCreatedAt)).format('YYYY-MM-DDTHH:mm:ssZ')
                    : undefined,
                createdTime: summary.userCreatedAt
                    ? dayjs(Number(summary.userCreatedAt)).format('YYYY-MM-DD HH:mm:ss.SSS')
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
                rugged: user.bondingCurveCreatorStatus === BondingCurveCreatorStatus.RUGGED
            };
        }
    });
}
export function updateUserProfile(props) {
    const { name, avatar, background, description } = props || {};
    return APIFetch.post('/v1/user/update_user_info', {
        body: {
            ...(name && { name }),
            ...(avatar && { avatar }),
            ...(background && { background }),
            ...(description && { description })
        },
        isGoLang: true
    });
}
export function checkInvitationCode(code) {
    return rxPost('/user/checkInvitationCode', { code }, { allowAnonymous: true });
}
export function getUserEnergyInfo(userId) {
    return APIFetch.post('/v1/user/get_energy', {
        body: {
            userId
        },
        isGoLang: true,
        adapter: (res) => {
            return res.energyInfo;
        }
    });
}
export function updateUserName(name) {
    return rxPost('/user/updateUserName', { name: name || '' }, { noPopupError: true });
}
export function isUserNameAvailable(name) {
    return rxGet('/user/isUserNameAvailable', { name });
}
export function uploadAvatar(file) {
    const formData = new FormData();
    formData.append('file', file);
    return rxUpload('/user/uploadAvatar', formData);
}
export function connectToTelegram(tgData) {
    return rxPost('/user/connectToTelegram', tgData);
}
export function bindTelegram(tgGuid) {
    return rxPost('v1/user/bindTelegram', { tgGuid }, {
        noPopupError: true
    });
}
export function connectToDiscord(code, state, source) {
    return rxPost('/user/connectToDiscord', {
        state,
        code,
        ...(source && { source })
    });
}
export function connectToTwitter(code, state, source) {
    return rxPost('/user/connectToTwitter', {
        state,
        code,
        ...(source && { source })
    });
}
export function getUserConnectedAccounts() {
    return rxGet('/user/getUserConnectedAccounts');
}
export function updateLanguage(language) {
    return rxPost('/user/updateLanguage', { language });
}
export function updateUserSetting(data) {
    return rxPost('/user/updateUserSetting', data);
}
export function kolUseInviteCode(code) {
    return rxPost('/v1/kol-invite/use_code', { code });
}
export function getShellCoins() {
    return APIFetch.post('/v1/shell_coins/get_account', {
        isGoLang: true,
        adapter: (res) => {
            return res.account;
        }
    });
}
export function claimAndUseSeasonPass() {
    return APIFetch.post('/v1/season/reward/auto_redeem_and_use_season_pass_if_needed', {
        isGoLang: true,
        withMyShellSecurityToken: true,
        adapter: (res) => {
            return res.item;
        }
    });
}
export function getPointRecords(pageToken, pageSize, seasonId, pointType) {
    return APIFetch.post('/v1/user/get_user_season_point_records', {
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
export function getCoinRecords(pageToken, pageSize) {
    return APIFetch.post('/v1/shell_coins/list_account_orders', {
        body: {
            listRequest: {
                pageToken,
                pageSize
            }
        },
        isGoLang: true
    });
}
export function tryVerifyYidunCaptcha(sign) {
    return APIFetch.post('/v1/captcha/try_verify', {
        body: {
            sign
        },
        isGoLang: true,
        adapter: (res) => {
            return res.result;
        }
    });
}
export function setUserFollow(targetUserId, followed) {
    return APIFetch.post('/v1/user/follow', {
        body: {
            targetUserId,
            followed
        },
        isGoLang: true
    });
}
export function checkUserNameAvailable(name) {
    return APIFetch.post('/v1/user/check_user_name_available', {
        body: {
            name
        },
        isGoLang: true
    });
}
export function getWidgetsByUser(userId) {
    return APIFetch.post('/v1/widget/list_user_public_widgets', {
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
export function getBotsByUser(userId) {
    return APIFetch.post('/v1/bot/list_user_public_bots', {
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
export function getUserBotUsageInfo() {
    return APIFetch.post('/v1/user/get_bots_usage_info', {
        isGoLang: true
    });
}
export function getInvitation() {
    return APIFetch.post('/v1/user/invitation/get_invitation', {
        isGoLang: true
    });
}
export function getWalletList() {
    return APIFetch.post('/v1/user/get_wallet_info', {
        isGoLang: true,
        adapter: (res) => {
            return res.wallet;
        }
    });
}
export function checkBindPrivyEmail() {
    return APIFetch.post('/v1/user/bind/check_bind_privy_email', {
        isGoLang: true
    });
}
export function bindRemove(bindType) {
    return APIFetch.post('/v1/user/bind/remove', {
        isGoLang: true,
        body: {
            bindType
        }
    });
}
export function updateUserSettings(data) {
    return APIFetch.post('/v1/user/update_user_settings', {
        isGoLang: true,
        body: {
            settings: Array.isArray(data) ? data : [data]
        }
    });
}
export function getUserSettings() {
    return APIFetch.post('/v1/user/get_user_settings', {
        isGoLang: true,
        adapter: res => {
            return res.settings;
        }
    });
}
export function registerFCMUserDevice(token) {
    return APIFetch.post('/v1/user/regist_user_device', {
        body: {
            deviceId: token,
            deviceType: 'DEVICE_TYPE_WEB',
            source: 'DATA_SOURCE_FCM'
        },
        isGoLang: true
    });
}
export function fetchUserPoints() {
    return APIFetch.post('/v1/user/get_user_season_point_info', {
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
export function getExperimentInfo() {
    return APIFetch.post('/v1/config/get_experiment_info', {
        isGoLang: true,
        body: {
            name: 'EXPERIMENT_NAME_RECOMMEND_BOT_TO_NEW_USER'
        }
    });
}
export function userLogout() {
    return APIFetch.post('/v1/user/auth/logout', {
        isGoLang: true
    });
}
