import { extractPublicKey, isNullOrUndefined } from '../../common/utils/common-helper.js';
class IdentityService {
    constructor() {
    }
    getIsNewUser() {
        const userId = localStorage.getItem('userId');
        return localStorage.getItem(`isnew-${userId}`) === '1';
    }
    setIsNewUser(isNew) {
        const userId = localStorage.getItem('userId');
        localStorage.setItem(`isnew-${userId}`, isNew ? '1' : '0');
    }
    getIsKol() {
        return localStorage.getItem('kol') === '1';
    }
    setIsKol(isKol) {
        localStorage.setItem('kol', isKol ? '1' : '0');
    }
    setIsFirstToAIpp(value) {
        localStorage.setItem('isFirstToAIpp', value.toString());
    }
    getIsFirstToAIpp() {
        return localStorage.getItem('isFirstToAIpp') || undefined;
    }
    setIsViewedHowToPlay(value) {
        localStorage.setItem('isViewedHowToPlay', value.toString());
    }
    getIsViewedHowToPlay() {
        return localStorage.getItem('isViewedHowToPlay') || undefined;
    }
    getMySoulCount() {
        return Number(localStorage.getItem('mySoulCount')) || 0;
    }
    getUserPublicKey() {
        return localStorage.getItem('publicKey');
    }
    setUserPublicKey(value) {
        localStorage.setItem('publicKey', extractPublicKey(value));
    }
    getLoginMethod() {
        return localStorage.getItem('loginMethod');
    }
    getPrivyToken() {
        return localStorage.getItem('privy:token');
    }
    getToken() {
        return localStorage.getItem('token');
    }
    setToken(value) {
        if (value) {
            localStorage.setItem('token', value);
            document.cookie = `token=${value}; path=/; max-age=31536000`;
        }
        else {
            localStorage.removeItem('token');
            document.cookie = 'token=; path=/; max-age=0';
        }
    }
    getKol() {
        return localStorage.getItem('kol');
    }
    setKol(kol) {
        localStorage.setItem('kol', kol ?? '');
    }
    getChannel() {
        return localStorage.getItem('Channel');
    }
    setChannel(Channel) {
        localStorage.setItem('Channel', Channel ?? '');
    }
    getLanguage() {
        return localStorage.getItem('language');
    }
    setLanguage(language) {
        localStorage.setItem('language', language ?? 'en');
    }
    getVersionTip() {
        return localStorage.getItem('version_tip');
    }
    setVersionTip(tip) {
        localStorage.setItem('version_tip', tip ?? '');
    }
    getInviteCode() {
        return localStorage.getItem('inviteCode');
    }
    setInviteCode(value) {
        if (value) {
            localStorage.setItem('inviteCode', value);
        }
        else {
            localStorage.removeItem('inviteCode');
        }
    }
    getPageSearch(pageId) {
        return sessionStorage.getItem(`${pageId}-searchparams`);
    }
    setPageSearch(pageId, value) {
        if (value) {
            sessionStorage.setItem(`${pageId}-searchparams`, value);
        }
        else {
            sessionStorage.removeItem(`${pageId}-searchparams`);
        }
    }
    getFromWeb3() {
        return localStorage.getItem('fromWeb3');
    }
    setFromWeb3(value) {
        if (value) {
            localStorage.setItem('fromWeb3', value);
        }
        else {
            localStorage.removeItem('fromWeb3');
        }
    }
    getSharingArticleCode() {
        return localStorage.getItem('sharingArticleCode');
    }
    setSharingArticleCode(value) {
        if (value) {
            localStorage.setItem('sharingArticleCode', value);
        }
        else {
            localStorage.removeItem('sharingArticleCode');
        }
    }
    getSharingForumCode() {
        return localStorage.getItem('sharingForumCode');
    }
    setSharingForumCode(value) {
        if (value) {
            localStorage.setItem('sharingForumCode', value);
        }
        else {
            localStorage.removeItem('sharingForumCode');
        }
    }
    getSharingWidgetCode() {
        return localStorage.getItem('sharingWidgetCode');
    }
    setSharingWidgetCode(value) {
        if (value) {
            localStorage.setItem('sharingWidgetCode', value);
        }
        else {
            localStorage.removeItem('sharingWidgetCode');
        }
    }
    getSharingBotCode() {
        return localStorage.getItem('sharingBotCode');
    }
    setSharingBotCode(value) {
        if (value) {
            localStorage.setItem('sharingBotCode', value);
        }
        else {
            localStorage.removeItem('sharingBotCode');
        }
    }
    getSharingBabelBotCode() {
        return localStorage.getItem('sharingBabelBotCode');
    }
    setSharingBabelBotCode(value) {
        if (value) {
            localStorage.setItem('sharingBabelBotCode', value);
        }
        else {
            localStorage.removeItem('sharingBabelBotCode');
        }
    }
    getSharingRoomCode() {
        return localStorage.getItem('sharingRoomCode');
    }
    setSharingRoomCode(value) {
        if (value) {
            localStorage.setItem('sharingRoomCode', value);
        }
        else {
            localStorage.removeItem('sharingRoomCode');
        }
    }
    getSharingBotId() {
        return localStorage.getItem('sharingBotId');
    }
    setSharingBotId(value) {
        if (value) {
            localStorage.setItem('sharingBotId', value);
        }
        else {
            localStorage.removeItem('sharingBotId');
        }
    }
    getRandomVisitorId() {
        return localStorage.getItem('visitorId');
    }
    setRandomVisitorId(value) {
        if (value) {
            localStorage.setItem('visitorId', value);
        }
        else {
            localStorage?.removeItem('visitorId');
        }
    }
    getAnonymousId() {
        return localStorage.getItem('mix_sc_anonymous_id');
    }
    setAnonymousId(value) {
        if (value) {
            localStorage.setItem('mix_sc_anonymous_id', value);
        }
        else {
            localStorage?.removeItem('mix_sc_anonymous_id');
        }
    }
    getSCDeviceId() {
        return localStorage.getItem('mix_sc_device_id');
    }
    setSCDeviceId(value) {
        if (value) {
            localStorage.setItem('mix_sc_device_id', value);
        }
        else {
            localStorage?.removeItem('mix_sc_device_id');
        }
    }
    getUserId() {
        return localStorage.getItem('userId');
    }
    setUserId(value) {
        if (isNullOrUndefined(value)) {
            localStorage.removeItem('userId');
        }
        else {
            localStorage.setItem('userId', value);
        }
    }
    getPublicAddress() {
        const publicAddressStr = localStorage.getItem('publicAddress');
        return publicAddressStr || null;
    }
    setPublicAddress(value) {
        if (isNullOrUndefined(value)) {
            localStorage.removeItem('publicAddress');
        }
        else {
            localStorage.setItem('publicAddress', `${value}`);
        }
    }
    getYidunValidate() {
        return localStorage.getItem('yidun_validate') ?? undefined;
    }
    setYidunValidate(validate) {
        localStorage.setItem('yidun_validate', validate);
    }
    setShareWidgetLink(link) {
        if (link) {
            localStorage.setItem('shareWidgetLink', link);
        }
        else {
            localStorage.removeItem('shareWidgetLink');
        }
    }
    getShareWidgetLink() {
        return localStorage.getItem('shareWidgetLink') ?? undefined;
    }
    setInviteInfo(link) {
        return localStorage.setItem('inviteLink', link);
    }
    getInviteInfo() {
        return localStorage.getItem('inviteLink') ?? undefined;
    }
    removeInviteInfo() {
        localStorage.removeItem('inviteLink');
    }
    setTgGuid(tgGuid) {
        localStorage.setItem('tgGuid', tgGuid);
    }
    getTgGuid() {
        return localStorage.getItem('tgGuid') ?? undefined;
    }
    setAutoEnhanced(autoEnhanced) {
        localStorage.setItem('autoEnhanced', autoEnhanced);
    }
    getAutoEnhanced() {
        return localStorage.getItem('autoEnhanced') ?? undefined;
    }
    setTryAdvanced(tryAdvanced) {
        localStorage.setItem('tryAdvanced', tryAdvanced);
    }
    getTryAdvanced() {
        return localStorage.getItem('tryAdvanced') ?? undefined;
    }
    setHasPrivyMarquee(hasPrivyMarquee) {
        const userId = localStorage.getItem('userId');
        localStorage.setItem(`hasPrivyMarquee-${userId}`, hasPrivyMarquee);
    }
    getHasPrivyMarquee() {
        const userId = localStorage.getItem('userId');
        return localStorage.getItem(`hasPrivyMarquee-${userId}`) ?? undefined;
    }
    setUserGuide(userGuide) {
        const userId = localStorage.getItem('userId');
        localStorage.setItem(`userGuide-${userId}`, userGuide);
    }
    getChatDrivered() {
        return localStorage.getItem('handleOpenDrivered') ?? undefined;
    }
    setChatDrivered(isDriverd) {
        localStorage.setItem('handleOpenDrivered', isDriverd);
    }
    getUserGuide() {
        const userId = localStorage.getItem('userId');
        return localStorage.getItem(`userGuide-${userId}`) ?? undefined;
    }
    clearTgGuid() {
        localStorage.removeItem('tgGuid');
    }
    clearInvitationData() {
        this.removeInviteInfo();
        localStorage.removeItem('inviteCode');
        localStorage.removeItem('sharingBotCode');
        localStorage.removeItem('sharingBotUid');
        localStorage.removeItem('sharingBotId');
        localStorage.removeItem('sharingWidgetCode');
        localStorage.removeItem('sharingArticleCode');
    }
    setBlockChainTransactionCalled(userId, step, expireTimeStamp) {
        let blockChainTransactionCalledUserMap = {};
        const blockChainTransactionCalledData = this.getBlockChainTransactionCalled();
        if (blockChainTransactionCalledData) {
            blockChainTransactionCalledUserMap = {
                ...JSON.parse(blockChainTransactionCalledData)
            };
        }
        blockChainTransactionCalledUserMap[`${userId}`] = {
            step,
            expireTimeStamp
        };
        localStorage.setItem('blockChainTransactionCalled', JSON.stringify(blockChainTransactionCalledUserMap));
    }
    clearBlockChainTransactionCalled(userId) {
        let blockChainTransactionCalledUserMap = {};
        const blockChainTransactionCalledData = this.getBlockChainTransactionCalled();
        if (blockChainTransactionCalledData) {
            blockChainTransactionCalledUserMap = {
                ...JSON.parse(blockChainTransactionCalledData)
            };
        }
        delete blockChainTransactionCalledUserMap[`${userId}`];
        localStorage.setItem('blockChainTransactionCalled', JSON.stringify(blockChainTransactionCalledUserMap));
    }
    getBlockChainTransactionCalled() {
        return localStorage.getItem('blockChainTransactionCalled');
    }
    setBlockChainGuruStep(userId, step) {
        let blockChainGuruStepUserMap = {};
        const data = this.getBlockChainGuruStep();
        if (data) {
            blockChainGuruStepUserMap = { ...JSON.parse(data) };
        }
        blockChainGuruStepUserMap[userId] = `${step}`;
        localStorage.setItem('blockChainGuruStep', JSON.stringify(blockChainGuruStepUserMap));
    }
    getBlockChainGuruStep() {
        return localStorage.getItem('blockChainGuruStep');
    }
    setBlockChainGuruHash(userId, hash) {
        let blockChainGuruHashUserMap = {};
        const data = this.getBlockChainGuruHash();
        if (data) {
            blockChainGuruHashUserMap = {
                ...JSON.parse(data)
            };
        }
        blockChainGuruHashUserMap[`${userId}`] = hash;
        localStorage.setItem('blockChainGuruHash', JSON.stringify(blockChainGuruHashUserMap));
    }
    clearBlockChainGuruHash(userId) {
        let blockChainGuruHashUserMap = {};
        const data = this.getBlockChainGuruHash();
        if (data) {
            blockChainGuruHashUserMap = {
                ...JSON.parse(data)
            };
        }
        delete blockChainGuruHashUserMap[`${userId}`];
        localStorage.setItem('blockChainGuruHash', JSON.stringify(blockChainGuruHashUserMap));
    }
    getBlockChainGuruHash() {
        return localStorage.getItem('blockChainGuruHash');
    }
    getLoginPopup() {
        return localStorage.getItem('loginPopup');
    }
    setLoginPopup(val) {
        if (val) {
            localStorage.setItem('loginPopup', val);
        }
        else {
            localStorage.removeItem('loginPopup');
        }
    }
    setTheme(value) {
        localStorage.setItem('theme', value);
    }
    getTheme() {
        return localStorage.getItem('theme');
    }
    setTransactionDisplaySet(set) {
        return localStorage.setItem('transactionDisplaySet', JSON.stringify(Array.from(set)));
    }
    setWidgetTransactionDisplaySet(set) {
        return localStorage.setItem('widgetTransactionDisplaySet', JSON.stringify(Array.from(set)));
    }
    getTransactionDisplaySet() {
        const d = localStorage.getItem('transactionDisplaySet');
        if (!isNullOrUndefined(d)) {
            return new Set(JSON.parse(localStorage.getItem('transactionDisplaySet')));
        }
        return new Set();
    }
    getTextInputMap() {
        const d = localStorage.getItem('textInputMap');
        if (!isNullOrUndefined(d)) {
            return JSON.parse(d);
        }
        return {};
    }
    getWidgetTextInputMap() {
        const d = localStorage.getItem('widgetTextInputMap');
        if (!isNullOrUndefined(d)) {
            return JSON.parse(d);
        }
        return {};
    }
    setTextInputMap(val) {
        localStorage.setItem('textInputMap', JSON.stringify(val));
    }
    setWidgetTextInputMap(val) {
        localStorage.setItem('widgetTextInputMap', JSON.stringify(val));
    }
    removeTextInputMap() {
        localStorage.removeItem('textInputMap');
    }
    removeWidgetTextInputMap() {
        localStorage.removeItem('widgetTextInputMap');
    }
    setFilterValues(val) {
        const userId = localStorage.getItem('userId');
        localStorage.setItem(`filterValues_${userId}`, JSON.stringify(val));
    }
    getFilterValues() {
        const userId = localStorage.getItem('userId');
        const d = localStorage.getItem(`filterValues_${userId}`);
        if (!isNullOrUndefined(d)) {
            return JSON.parse(d);
        }
        return {};
    }
    setChildTagsObj(val) {
        const userId = localStorage.getItem('userId');
        localStorage.setItem(`childTagsObj_${userId}`, JSON.stringify(val));
    }
    getChildTagsObj() {
        const userId = localStorage.getItem('userId');
        const d = localStorage.getItem(`childTagsObj_${userId}`);
        if (!isNullOrUndefined(d)) {
            return JSON.parse(d);
        }
        return {};
    }
    setCreateDraft(val) {
        const userId = localStorage.getItem('userId');
        if (val === null) {
            localStorage.removeItem(`createDraft${userId}`);
        }
        localStorage.setItem(`createDraft${userId}`, JSON.stringify(val));
    }
    getCreateDraft() {
        const userId = localStorage.getItem('userId');
        const d = localStorage.getItem(`createDraft${userId}`);
        if (!isNullOrUndefined(d)) {
            return JSON.parse(d);
        }
        return null;
    }
    setDontShow2FA(val) {
        localStorage.setItem('DontShow2FA', JSON.stringify(val));
    }
    getDontShow2FA() {
        const val = localStorage.getItem('DontShow2FA');
        if (!isNullOrUndefined(val)) {
            return JSON.parse(val);
        }
        return false;
    }
    clearAll(clearInvitation) {
        const userId = localStorage.getItem('userId');
        if (clearInvitation) {
            this.clearInvitationData();
        }
        localStorage.removeItem('publicAddress');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('selected_bot_id');
        localStorage.removeItem('selected_ugc_bot_id');
        localStorage.removeItem('language');
        localStorage.removeItem('yidun_validate');
        localStorage.removeItem(`filterValues_${userId}`);
        localStorage.removeItem(`childTagsObj_${userId}`);
        localStorage.removeItem('sharingWidgetCode');
        localStorage.removeItem('fromWeb3');
        localStorage.removeItem('loginMethod');
        localStorage.removeItem('mySoulCount');
        localStorage.removeItem('publicKey');
    }
}
export const identityService = new IdentityService();
