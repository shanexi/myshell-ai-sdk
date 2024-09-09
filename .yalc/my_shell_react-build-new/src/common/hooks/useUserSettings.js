"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const rxjs_1 = require("rxjs");
const user_1 = require("../../apis/user");
const user_2 = require("../../common/constants/enums/user");
const usePathLocale_1 = require("../../common/hooks/usePathLocale");
const language_1 = require("../../common/utils/language");
const store_1 = require("../../services/store");
function useUserSettings() {
    const currentLanguage = (0, store_1.useGlobalStore)(state => state.language);
    const setLanguage = (0, store_1.useGlobalStore)(state => state.setLanguage);
    const userSettingsInfo = (0, store_1.useUserStore)(state => state.userSettingsInfo);
    const setUserSettingsInfo = (0, store_1.useUserStore)(state => state.setUserSettingsInfo);
    const setShowNsfw = (0, store_1.useUserStore)(state => state.setShowNsfw);
    const token = (0, store_1.useUserStore)(state => state.token);
    const { pathname, locale } = (0, usePathLocale_1.usePathLocale)();
    const router = (0, navigation_1.useRouter)();
    const languageMap = {
        en: 'en',
        zh: 'zh',
        'zh-CN': 'zh',
        'zh-TW': 'zh-tw',
        ja: 'jp',
        es: 'es',
        ru: 'ru',
        ko: 'ko'
    };
    (0, react_1.useEffect)(() => {
        setLanguage(locale);
    }, []);
    const handleGetUserSettings = (0, react_1.useCallback)(async (needRedirect = true, callback) => {
        const res = await (0, user_1.getUserSettings)();
        if (res.success) {
            const { data } = res;
            setUserSettingsInfo(res.data);
            if (data.length > 0 && data.some(item => item.name === user_2.UserSettingEnum.SHOW_NSFW)) {
                const showNsfw = data.filter(item => item.name === user_2.UserSettingEnum.SHOW_NSFW)[0].value;
                setShowNsfw(showNsfw === '1' ? user_2.NsfwEnum.OPEN : user_2.NsfwEnum.CLOSE);
            }
            else {
                setShowNsfw(user_2.NsfwEnum.CLOSE);
            }
            const navigatorLang = ((navigator.language || '').split('-')[0] || '').toLowerCase();
            let language = locale || languageMap[navigatorLang] || '';
            const { lang } = document.documentElement;
            if (!language || !user_2.ALL_LANG_KEYS.includes(language)) {
                language = 'en';
            }
            let userLanguage = '';
            if (data.length > 0 && data.some(item => item.name === user_2.UserSettingEnum.LANGUAGE)) {
                const _currentLanguage = data.filter(item => item.name === user_2.UserSettingEnum.LANGUAGE)[0].value;
                userLanguage = _currentLanguage;
            }
            if (needRedirect && userLanguage && language !== userLanguage) {
                language = userLanguage;
                (0, language_1.setLocaleCookie)(userLanguage);
                if (needRedirect) {
                    router.refresh();
                }
            }
            else if (needRedirect && language !== lang) {
                router.refresh();
            }
            setLanguage(language);
            callback && callback();
        }
    }, [setUserSettingsInfo, token]);
    const handleUpdateLanguage = (0, react_1.useCallback)(async (value) => {
        await (0, rxjs_1.lastValueFrom)((0, user_1.updateLanguage)(value));
        handleGetUserSettings();
    }, [handleGetUserSettings]);
    const handleUpdateUserSettings = (0, react_1.useCallback)(async (setting, reFetchUser, callback) => {
        const res = await (0, user_1.updateUserSettings)(setting);
        if (res.success) {
            if (reFetchUser) {
                handleGetUserSettings(true, callback);
            }
            else {
                callback && callback();
            }
        }
    }, [user_1.updateUserSettings]);
    const handleUpdateRewardsCenterVisited = (0, react_1.useCallback)((seasonName, callback) => {
        handleUpdateUserSettings([
            {
                name: user_2.UserSettingEnum.FLAG_ICON_REWARD,
                value: '1'
            },
            {
                name: user_2.UserSettingEnum.LAST_SEASON,
                value: seasonName
            }
        ], true, callback);
    }, [handleGetUserSettings]);
    const handleUpdateForumCenterVisited = (0, react_1.useCallback)((seasonName, callback) => {
        handleUpdateUserSettings([
            {
                name: user_2.UserSettingEnum.FLAG_ICON_FORUM,
                value: '1'
            },
            {
                name: user_2.UserSettingEnum.LAST_SEASON,
                value: seasonName
            }
        ], true, callback);
    }, [handleGetUserSettings]);
    const handleUpdateFirstPublishGallery = (0, react_1.useCallback)((callback) => {
        handleUpdateUserSettings([
            {
                name: user_2.UserSettingEnum.FLAG_USET_FIRST_PUBLISH_GALLERY,
                value: '1'
            }
        ], true, callback);
    }, [handleGetUserSettings]);
    const handleUpdateFirstVisitGallery = (0, react_1.useCallback)((callback) => {
        handleUpdateUserSettings([
            {
                name: user_2.UserSettingEnum.FLAG_USET_FIRST_VISIT_GALLERY,
                value: '1'
            }
        ], true, callback);
    }, [handleGetUserSettings]);
    const handleUpdateFlagTagNoticeVisited = (0, react_1.useCallback)((seasonName, callback) => {
        handleUpdateUserSettings([
            {
                name: user_2.UserSettingEnum.FLAG_TAG_NOTICE,
                value: '1'
            }
        ], true, callback);
    }, [handleGetUserSettings]);
    const handleModelConfigClicked = (0, react_1.useCallback)(() => {
        handleUpdateUserSettings({
            name: user_2.UserSettingEnum.FLAG_LLM_MODEL_CONFIG,
            value: '1'
        }, true);
    }, [handleGetUserSettings]);
    const handleShowNsfw = (0, react_1.useCallback)((show, callback) => {
        handleUpdateUserSettings({
            name: user_2.UserSettingEnum.SHOW_NSFW,
            value: show ? '1' : '0'
        }, false, () => {
            setShowNsfw(show ? user_2.NsfwEnum.OPEN : user_2.NsfwEnum.CLOSE);
            callback?.();
        });
    }, []);
    const handleNsfwConfirmed = (0, react_1.useCallback)((callback) => {
        handleUpdateUserSettings({
            name: user_2.UserSettingEnum.FLAG_NSFW_CONFIRMED,
            value: '1'
        }, true, callback);
    }, [handleGetUserSettings]);
    const handleVoiceCallUsed = (0, react_1.useCallback)((callback) => {
        handleUpdateUserSettings({
            name: user_2.UserSettingEnum.FLAG_VOICE_CALL_USED,
            value: '1'
        }, true, callback);
    }, [handleGetUserSettings]);
    const handleVideoCallUsed = (0, react_1.useCallback)((callback) => {
        handleUpdateUserSettings({
            name: user_2.UserSettingEnum.FLAG_VIDEO_CALL_USED,
            value: '1'
        }, true, callback);
    }, [handleGetUserSettings]);
    const handleBlockChainGuruTaskOnceCompleted = (0, react_1.useCallback)((callback) => {
        handleUpdateUserSettings({
            name: user_2.UserSettingEnum.FLAG_COMPLETED_OPBNB_CHAIN_TASK,
            value: '1'
        }, true, callback);
    }, [handleGetUserSettings]);
    const handleSilentPeriodConfirmed = (0, react_1.useCallback)((seasonName) => {
        handleUpdateUserSettings({
            name: user_2.UserSettingEnum.FLAG_SILENT_PERIOD_CONFIRMED,
            value: seasonName
        }, true);
    }, [handleGetUserSettings]);
    const handleDeductionConfirmed = (0, react_1.useCallback)((seasonName) => {
        handleUpdateUserSettings({
            name: user_2.UserSettingEnum.DEDUCTION_CONFIRMED,
            value: seasonName
        }, true);
    }, [handleGetUserSettings]);
    const handleSubscribingEarnViewed = (0, react_1.useCallback)((callback) => {
        handleUpdateUserSettings({
            name: user_2.UserSettingEnum.FLAG_stake_earn_VIEWED,
            value: '1'
        }, true, callback);
    }, [handleGetUserSettings]);
    const handleShareKeyEarnPopupConfirmed = (0, react_1.useCallback)((timeStamp) => {
        handleUpdateUserSettings({
            name: user_2.UserSettingEnum.FLAG_SHARE_KEY_EARN_POPUP_CONFIRMED,
            value: timeStamp
        }, true);
    }, [handleGetUserSettings]);
    const handleTimezoneChange = (0, react_1.useCallback)((timezone) => {
        handleUpdateUserSettings({
            name: user_2.UserSettingEnum.TIME_ZONE,
            value: timezone
        }, true);
    }, [handleUpdateUserSettings]);
    const handleReceiveNotification = (0, react_1.useCallback)(async (open, callback) => {
        await handleUpdateUserSettings({
            name: user_2.UserSettingEnum.NOTIFICATION,
            value: open ? '1' : '0'
        }, true, callback);
    }, [handleUpdateUserSettings]);
    return {
        userSettingsInfo,
        handleGetUserSettings,
        handleUpdateLanguage,
        currentLanguage,
        handleUpdateRewardsCenterVisited,
        handleUpdateForumCenterVisited,
        handleUpdateFirstPublishGallery,
        handleUpdateFirstVisitGallery,
        handleUpdateFlagTagNoticeVisited,
        handleModelConfigClicked,
        handleShowNsfw,
        handleNsfwConfirmed,
        handleVoiceCallUsed,
        handleVideoCallUsed,
        handleBlockChainGuruTaskOnceCompleted,
        handleSilentPeriodConfirmed,
        handleDeductionConfirmed,
        handleSubscribingEarnViewed,
        handleShareKeyEarnPopupConfirmed,
        handleTimezoneChange,
        handleReceiveNotification
    };
}
exports.default = useUserSettings;
