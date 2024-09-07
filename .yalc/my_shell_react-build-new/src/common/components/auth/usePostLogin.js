"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePostLogin = void 0;
const react_auth_1 = require("@privy-io/react-auth");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const bot_1 = require("../../../apis/bot.js");
const championship_1 = require("../../../apis/championship.js");
const user_1 = require("../../../apis/user.js");
const chatService_1 = require("../../../chat/model/chatService.js");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const useUserSettings_1 = __importDefault(require("../../../common/hooks/useUserSettings.js"));
const identityService_1 = require("../../../common/services/identityService.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const gtm_1 = require("../../../common/utils/gtm.js");
const useCalcGetChatListFn_1 = __importDefault(require("../../../entity/hooks/useCalcGetChatListFn.js"));
const sensors_1 = require("../../../lib/sensors/index.js");
const store_1 = require("../../../services/store/index.js");
const usePostLogin = () => {
    const router = (0, navigation_1.useRouter)();
    const { locale } = (0, usePathLocale_1.usePathLocale)();
    const { user } = (0, react_auth_1.usePrivy)();
    const toggleInvitecodeModal = (0, store_1.useGlobalStore)(state => state.toggleInvitecodeModal);
    const setInviteCodeStep = (0, store_1.useGlobalStore)(state => state.setInviteCodeStep);
    const setToken = (0, store_1.useUserStore)(state => state.setToken);
    const clearUser = (0, store_1.useUserStore)(state => state.clearUser);
    const showNsfw = (0, store_1.useUserStore)(state => state.showNsfw);
    const nsfwConfirmed = (0, store_1.useUserStore)(state => state.nsfwConfirmed);
    const setLoginPopVisible = (0, store_1.useChatStore)(state => state.setLoginPopVisible);
    const clearTextInput = (0, store_1.useChatStore)(state => state.clearTextInput);
    const clearChatRecord = (0, store_1.useChatStore)(state => state.clearChatRecord);
    const showOnboarding = (0, store_1.useGlobalStore)(state => state.showOnboarding);
    const setShowChatBotRecommend = (0, store_1.useGlobalStore)(state => state.setShowChatBotRecommend);
    const sensors = (0, sensors_1.useSensors)();
    const { handleShowNsfw, handleNsfwConfirmed } = (0, useUserSettings_1.default)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const setLoginTimestamp = (0, store_1.useUserStore)(state => state.setLoginTimestamp);
    const getChatList = (0, useCalcGetChatListFn_1.default)('bot');
    const afterLogin = async ({ res, account, userInfo, invitationCode, sharingBotCode, sharingWidgetCode, sharingArticleCode, sharingForumCode, sharingRoomCode, sharingBabelBotCode, inviteLink, sharingBotUid, sharingBotId, closeModal, from, loginMethod, shareWidgetLink }) => {
        clearChatRecord();
        clearUser();
        setToken(res.token);
        setLoginPopVisible(false);
        setLoginTimestamp(new Date().getTime());
        chatService_1.chatService.reconnect();
        const searchParams = new URLSearchParams(window.location.search);
        if (typeof window !== 'undefined') {
            identityService_1.identityService.clearTgGuid();
            identityService_1.identityService.setUserId(String(res.userId));
            getChatList();
            identityService_1.identityService.removeInviteInfo();
            (0, gtm_1.pushUserIdToDataLayer)(res.isNewUser ? 'sign_up' : 'login', res.userId);
        }
        if (res.hasReceivedReward) {
            toggleInvitecodeModal(true);
            setInviteCodeStep(4);
        }
        const showInviteModal = res.isNewUser &&
            !invitationCode &&
            !sharingBotCode &&
            !sharingWidgetCode &&
            !sharingArticleCode &&
            !sharingForumCode &&
            !sharingRoomCode &&
            !sharingBabelBotCode &&
            (!inviteLink || !(0, common_helper_1.isValidInviteLink)(inviteLink));
        if (showInviteModal) {
            toggleInvitecodeModal(true);
        }
        const isFromWallet = from === 'wallet';
        sensors?.track('LoginSuccessful', {
            login_method: loginMethod,
            is_new_user: res.isNewUser
        });
        identityService_1.identityService.setIsNewUser(res.isNewUser);
        if (res.isNewUser) {
            handleShowNsfw(showNsfw === 1);
            if ((0, common_helper_1.isKOL)()) {
                (0, championship_1.recordUserFromPromotion)(`${res.userId}`);
            }
            if (searchParams.get('from') === 'rewards-center') {
                router.push(`/rewards-center`);
            }
            else if (shareWidgetLink && shareWidgetLink.includes('/widgetShare')) {
                const url = new URL(shareWidgetLink);
                const shareSearchParams = new URLSearchParams(url.search);
                const widgetId = shareSearchParams.get('widgetId');
                identityService_1.identityService.setShareWidgetLink('');
                if (widgetId) {
                    router.push(`${window.location.origin}/robot-workshop/widget/${widgetId}`);
                }
            }
            else {
                const exRes = await (0, user_1.getExperimentInfo)();
                const exData = JSON.parse(exRes?.data?.data || {});
                if (exRes.success && exData?.result) {
                    setShowChatBotRecommend(true);
                }
                else {
                    showOnboarding(true);
                }
            }
        }
        else if (searchParams.get('from') === 'rewards-center') {
            router.push(`/rewards-center`);
        }
        else if (shareWidgetLink && shareWidgetLink.includes('/widgetShare')) {
            const url = new URL(shareWidgetLink);
            const shareSearchParams = new URLSearchParams(url.search);
            const widgetId = shareSearchParams.get('widgetId');
            if (widgetId) {
                router.push(`${window.location.origin}/robot-workshop/widget/${widgetId}`);
            }
            else {
                router.push(`${window.location.origin}/robot-workshop`);
            }
        }
        nsfwConfirmed && handleNsfwConfirmed();
        if (sharingBotId) {
            if (isFromWallet) {
                setLoading(true);
            }
            try {
                const { success, data } = await (0, bot_1.addBotToChatList)(sharingBotId);
                if (success) {
                    if (typeof closeModal === 'function') {
                        closeModal();
                    }
                }
            }
            catch (e) {
            }
            finally {
                identityService_1.identityService.clearInvitationData();
                clearTextInput();
                if (isFromWallet) {
                    setLoading(false);
                }
            }
        }
        else {
            identityService_1.identityService.clearInvitationData();
            identityService_1.identityService.clearTgGuid();
            clearTextInput();
            if (typeof closeModal === 'function') {
                closeModal();
            }
            if (isFromWallet) {
                setLoading(true);
            }
        }
    };
    const afterLoginRef = (0, react_1.useRef)(afterLogin);
    const getDataFromStorage = (0, react_1.useCallback)(() => {
        const sharingBotCode = identityService_1.identityService.getSharingBotCode() || '';
        const sharingWidgetCode = identityService_1.identityService.getSharingWidgetCode() || '';
        const sharingArticleCode = identityService_1.identityService.getSharingArticleCode() || '';
        const sharingForumCode = identityService_1.identityService.getSharingForumCode() || '';
        const sharingRoomCode = identityService_1.identityService.getSharingRoomCode() || '';
        const sharingBabelBotCode = identityService_1.identityService.getSharingBabelBotCode() || '';
        const sharingBotId = identityService_1.identityService.getSharingBotId() || '';
        const tgGuid = identityService_1.identityService.getTgGuid();
        const inviteLink = identityService_1.identityService.getInviteInfo() ?? '';
        const shareWidgetLink = identityService_1.identityService.getShareWidgetLink() ?? '';
        return {
            sharingBotCode,
            sharingWidgetCode,
            sharingArticleCode,
            sharingForumCode,
            sharingRoomCode,
            sharingBabelBotCode,
            sharingBotId,
            tgGuid,
            inviteLink,
            shareWidgetLink
        };
    }, []);
    (0, react_1.useMemo)(() => {
        afterLoginRef.current = afterLogin;
    }, [afterLogin]);
    return { afterLoginRef, getDataFromStorage, loading, setLoading, afterLogin };
};
exports.usePostLogin = usePostLogin;
