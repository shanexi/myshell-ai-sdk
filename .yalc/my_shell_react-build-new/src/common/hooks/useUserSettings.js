import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { lastValueFrom } from 'rxjs';
import { getUserSettings, updateLanguage, updateUserSettings } from '../../apis/user.js';
import { ALL_LANG_KEYS, NsfwEnum, UserSettingEnum } from '../../common/constants/enums/user.js';
import { usePathLocale } from '../../common/hooks/usePathLocale.js';
import { setLocaleCookie } from '../../common/utils/language.js';
import { useGlobalStore, useUserStore } from '../../services/store/index.js';
function useUserSettings() {
    const currentLanguage = useGlobalStore(state => state.language);
    const setLanguage = useGlobalStore(state => state.setLanguage);
    const userSettingsInfo = useUserStore(state => state.userSettingsInfo);
    const setUserSettingsInfo = useUserStore(state => state.setUserSettingsInfo);
    const setShowNsfw = useUserStore(state => state.setShowNsfw);
    const token = useUserStore(state => state.token);
    const { pathname, locale } = usePathLocale();
    const router = useRouter();
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
    useEffect(() => {
        setLanguage(locale);
    }, []);
    const handleGetUserSettings = useCallback(async (needRedirect = true, callback) => {
        const res = await getUserSettings();
        if (res.success) {
            const { data } = res;
            setUserSettingsInfo(res.data);
            if (data.length > 0 && data.some(item => item.name === UserSettingEnum.SHOW_NSFW)) {
                const showNsfw = data.filter(item => item.name === UserSettingEnum.SHOW_NSFW)[0].value;
                setShowNsfw(showNsfw === '1' ? NsfwEnum.OPEN : NsfwEnum.CLOSE);
            }
            else {
                setShowNsfw(NsfwEnum.CLOSE);
            }
            const navigatorLang = ((navigator.language || '').split('-')[0] || '').toLowerCase();
            let language = locale || languageMap[navigatorLang] || '';
            const { lang } = document.documentElement;
            if (!language || !ALL_LANG_KEYS.includes(language)) {
                language = 'en';
            }
            let userLanguage = '';
            if (data.length > 0 && data.some(item => item.name === UserSettingEnum.LANGUAGE)) {
                const _currentLanguage = data.filter(item => item.name === UserSettingEnum.LANGUAGE)[0].value;
                userLanguage = _currentLanguage;
            }
            if (needRedirect && userLanguage && language !== userLanguage) {
                language = userLanguage;
                setLocaleCookie(userLanguage);
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
    const handleUpdateLanguage = useCallback(async (value) => {
        await lastValueFrom(updateLanguage(value));
        handleGetUserSettings();
    }, [handleGetUserSettings]);
    const handleUpdateUserSettings = useCallback(async (setting, reFetchUser, callback) => {
        const res = await updateUserSettings(setting);
        if (res.success) {
            if (reFetchUser) {
                handleGetUserSettings(true, callback);
            }
            else {
                callback && callback();
            }
        }
    }, [updateUserSettings]);
    const handleUpdateRewardsCenterVisited = useCallback((seasonName, callback) => {
        handleUpdateUserSettings([
            {
                name: UserSettingEnum.FLAG_ICON_REWARD,
                value: '1'
            },
            {
                name: UserSettingEnum.LAST_SEASON,
                value: seasonName
            }
        ], true, callback);
    }, [handleGetUserSettings]);
    const handleUpdateForumCenterVisited = useCallback((seasonName, callback) => {
        handleUpdateUserSettings([
            {
                name: UserSettingEnum.FLAG_ICON_FORUM,
                value: '1'
            },
            {
                name: UserSettingEnum.LAST_SEASON,
                value: seasonName
            }
        ], true, callback);
    }, [handleGetUserSettings]);
    const handleUpdateFirstPublishGallery = useCallback((callback) => {
        handleUpdateUserSettings([
            {
                name: UserSettingEnum.FLAG_USET_FIRST_PUBLISH_GALLERY,
                value: '1'
            }
        ], true, callback);
    }, [handleGetUserSettings]);
    const handleUpdateFirstVisitGallery = useCallback((callback) => {
        handleUpdateUserSettings([
            {
                name: UserSettingEnum.FLAG_USET_FIRST_VISIT_GALLERY,
                value: '1'
            }
        ], true, callback);
    }, [handleGetUserSettings]);
    const handleUpdateFlagTagNoticeVisited = useCallback((seasonName, callback) => {
        handleUpdateUserSettings([
            {
                name: UserSettingEnum.FLAG_TAG_NOTICE,
                value: '1'
            }
        ], true, callback);
    }, [handleGetUserSettings]);
    const handleModelConfigClicked = useCallback(() => {
        handleUpdateUserSettings({
            name: UserSettingEnum.FLAG_LLM_MODEL_CONFIG,
            value: '1'
        }, true);
    }, [handleGetUserSettings]);
    const handleShowNsfw = useCallback((show, callback) => {
        handleUpdateUserSettings({
            name: UserSettingEnum.SHOW_NSFW,
            value: show ? '1' : '0'
        }, false, () => {
            setShowNsfw(show ? NsfwEnum.OPEN : NsfwEnum.CLOSE);
            callback?.();
        });
    }, []);
    const handleNsfwConfirmed = useCallback((callback) => {
        handleUpdateUserSettings({
            name: UserSettingEnum.FLAG_NSFW_CONFIRMED,
            value: '1'
        }, true, callback);
    }, [handleGetUserSettings]);
    const handleVoiceCallUsed = useCallback((callback) => {
        handleUpdateUserSettings({
            name: UserSettingEnum.FLAG_VOICE_CALL_USED,
            value: '1'
        }, true, callback);
    }, [handleGetUserSettings]);
    const handleVideoCallUsed = useCallback((callback) => {
        handleUpdateUserSettings({
            name: UserSettingEnum.FLAG_VIDEO_CALL_USED,
            value: '1'
        }, true, callback);
    }, [handleGetUserSettings]);
    const handleBlockChainGuruTaskOnceCompleted = useCallback((callback) => {
        handleUpdateUserSettings({
            name: UserSettingEnum.FLAG_COMPLETED_OPBNB_CHAIN_TASK,
            value: '1'
        }, true, callback);
    }, [handleGetUserSettings]);
    const handleSilentPeriodConfirmed = useCallback((seasonName) => {
        handleUpdateUserSettings({
            name: UserSettingEnum.FLAG_SILENT_PERIOD_CONFIRMED,
            value: seasonName
        }, true);
    }, [handleGetUserSettings]);
    const handleDeductionConfirmed = useCallback((seasonName) => {
        handleUpdateUserSettings({
            name: UserSettingEnum.DEDUCTION_CONFIRMED,
            value: seasonName
        }, true);
    }, [handleGetUserSettings]);
    const handleSubscribingEarnViewed = useCallback((callback) => {
        handleUpdateUserSettings({
            name: UserSettingEnum.FLAG_stake_earn_VIEWED,
            value: '1'
        }, true, callback);
    }, [handleGetUserSettings]);
    const handleShareKeyEarnPopupConfirmed = useCallback((timeStamp) => {
        handleUpdateUserSettings({
            name: UserSettingEnum.FLAG_SHARE_KEY_EARN_POPUP_CONFIRMED,
            value: timeStamp
        }, true);
    }, [handleGetUserSettings]);
    const handleTimezoneChange = useCallback((timezone) => {
        handleUpdateUserSettings({
            name: UserSettingEnum.TIME_ZONE,
            value: timezone
        }, true);
    }, [handleUpdateUserSettings]);
    const handleReceiveNotification = useCallback(async (open, callback) => {
        await handleUpdateUserSettings({
            name: UserSettingEnum.NOTIFICATION,
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
export default useUserSettings;
