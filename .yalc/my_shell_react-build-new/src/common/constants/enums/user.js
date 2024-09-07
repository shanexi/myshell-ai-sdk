"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletAssetType = exports.WalletType = exports.BindType = exports.LoginType = exports.FollowStatus = exports.UserSourceEnum = exports.UserMembershipTypeEnum = exports.ALL_LANG_KEYS = exports.ALL_LANG_OPTIONS = exports.NsfwEnum = exports.VisitorEnum = exports.UserSettingEnum = void 0;
var UserSettingEnum;
(function (UserSettingEnum) {
    UserSettingEnum["LAST_SEASON"] = "lastSeason";
    UserSettingEnum["LANGUAGE"] = "language";
    UserSettingEnum["SHOW_NSFW"] = "showNsfw";
    UserSettingEnum["FLAG_ICON_REWARD"] = "flagIconReward";
    UserSettingEnum["FLAG_ICON_FORUM"] = "flagIconForum";
    UserSettingEnum["FLAG_LLM_MODEL_CONFIG"] = "flagLlmModelConfig";
    UserSettingEnum["FLAG_NSFW_CONFIRMED"] = "flagNsfwConfirmed";
    UserSettingEnum["FLAG_VOICE_CALL_USED"] = "flagVoiceCallUsed";
    UserSettingEnum["FLAG_VIDEO_CALL_USED"] = "flagVideoCallUsed";
    UserSettingEnum["FLAG_ETH_LINEA_TRANSFERRED"] = "flagEthLineaTransferred";
    UserSettingEnum["DEDUCTION_CONFIRMED"] = "flagDeductionConfirmed";
    UserSettingEnum["FLAG_COMPLETED_OPBNB_CHAIN_TASK"] = "flagCompletedOpBnbChainTask";
    UserSettingEnum["FLAG_SILENT_PERIOD_CONFIRMED"] = "flagSilentPeriodConfirmed";
    UserSettingEnum["FLAG_stake_earn_VIEWED"] = "flagSubscribingEarnViewed";
    UserSettingEnum["FLAG_SHARE_KEY_EARN_POPUP_CONFIRMED"] = "flagShareKeyEarnPopupConfirmed";
    UserSettingEnum["TIME_ZONE"] = "timezone";
    UserSettingEnum["NOTIFICATION"] = "receiveAutoPush";
    UserSettingEnum["FLAG_TAG_NOTICE"] = "flagTagNotice";
    UserSettingEnum["FLAG_USET_FIRST_PUBLISH_GALLERY"] = "flagUserFirstPublishGallery";
    UserSettingEnum["FLAG_USET_FIRST_VISIT_GALLERY"] = "flagUserFirstVisitGallery";
})(UserSettingEnum || (exports.UserSettingEnum = UserSettingEnum = {}));
var VisitorEnum;
(function (VisitorEnum) {
    VisitorEnum[VisitorEnum["INIT"] = 0] = "INIT";
    VisitorEnum[VisitorEnum["YES"] = 1] = "YES";
    VisitorEnum[VisitorEnum["NO"] = 2] = "NO";
})(VisitorEnum || (exports.VisitorEnum = VisitorEnum = {}));
var NsfwEnum;
(function (NsfwEnum) {
    NsfwEnum[NsfwEnum["INIT"] = 0] = "INIT";
    NsfwEnum[NsfwEnum["OPEN"] = 1] = "OPEN";
    NsfwEnum[NsfwEnum["CLOSE"] = 2] = "CLOSE";
})(NsfwEnum || (exports.NsfwEnum = NsfwEnum = {}));
exports.ALL_LANG_OPTIONS = {
    zh: '简体中文',
    'zh-tw': '繁體中文',
    en: 'English',
    jp: '日本語',
    es: 'Español',
    ru: 'Русский',
    ko: '한국어'
};
exports.ALL_LANG_KEYS = Object.keys(exports.ALL_LANG_OPTIONS);
var UserMembershipTypeEnum;
(function (UserMembershipTypeEnum) {
    UserMembershipTypeEnum["TYPE_UNSPECIFIED"] = "TYPE_UNSPECIFIED";
    UserMembershipTypeEnum["TYPE_NORMAL"] = "TYPE_NORMAL";
    UserMembershipTypeEnum["TYPE_PREMIUM"] = "TYPE_PREMIUM";
    UserMembershipTypeEnum["TYPE_GENESIS_WITH_GENESIS_CARD"] = "TYPE_GENESIS_WITH_GENESIS_CARD";
    UserMembershipTypeEnum["TYPE_GENESIS_WITH_PASS_CARD"] = "TYPE_GENESIS_WITH_PASS_CARD";
})(UserMembershipTypeEnum || (exports.UserMembershipTypeEnum = UserMembershipTypeEnum = {}));
var UserSourceEnum;
(function (UserSourceEnum) {
    UserSourceEnum["APKPURE_BANNER"] = "apkpure_banner";
    UserSourceEnum["MYSHELL"] = "myshell";
    UserSourceEnum["VISITOR"] = "visitor";
})(UserSourceEnum || (exports.UserSourceEnum = UserSourceEnum = {}));
var FollowStatus;
(function (FollowStatus) {
    FollowStatus["FOLLOW_STATUS_UNSPECIFIED"] = "FOLLOW_STATUS_UNSPECIFIED";
    FollowStatus["FOLLOWED"] = "FOLLOWED";
    FollowStatus["NOT_FOLLOWED"] = "NOT_FOLLOWED";
    FollowStatus["NOT_AVAILABLE"] = "NOT_AVAILABLE";
})(FollowStatus || (exports.FollowStatus = FollowStatus = {}));
var LoginType;
(function (LoginType) {
    LoginType["LOGIN_TYPE_UNSPECIFIED"] = "LOGIN_TYPE_UNSPECIFIED";
    LoginType["LOGIN_TYPE_EMAIL"] = "LOGIN_TYPE_EMAIL";
    LoginType["LOGIN_TYPE_GOOGLE"] = "LOGIN_TYPE_GOOGLE";
    LoginType["LOGIN_TYPE_APPLE"] = "LOGIN_TYPE_APPLE";
    LoginType["LOGIN_TYPE_FACEBOOK"] = "LOGIN_TYPE_FACEBOOK";
    LoginType["LOGIN_TYPE_PUBLIC_ADDRESS"] = "LOGIN_TYPE_PUBLIC_ADDRESS";
})(LoginType || (exports.LoginType = LoginType = {}));
var BindType;
(function (BindType) {
    BindType["BIND_TYPE_UNSPECIFIED"] = "BIND_TYPE_UNSPECIFIED";
    BindType["BIND_TYPE_EVM_ADDRESS"] = "BIND_TYPE_EVM_ADDRESS";
    BindType["BIND_TYPE_TWITTER"] = "BIND_TYPE_TWITTER";
    BindType["BIND_TYPE_DISCORD"] = "BIND_TYPE_DISCORD";
    BindType["BIND_TYPE_TG"] = "BIND_TYPE_TG";
})(BindType || (exports.BindType = BindType = {}));
var WalletType;
(function (WalletType) {
    WalletType["Privy"] = "Privy";
    WalletType["Particle"] = "Particle";
    WalletType["Other"] = "Other";
})(WalletType || (exports.WalletType = WalletType = {}));
var WalletAssetType;
(function (WalletAssetType) {
    WalletAssetType["CreatorPass"] = "CreatorPass";
    WalletAssetType["MYSOUL"] = "MYSOUL";
    WalletAssetType["ETH"] = "ETH_MAINNET";
    WalletAssetType["ETH_MYSHELL"] = "ETH_MYSHELL";
    WalletAssetType["BNB_OP"] = "BNB_OP";
    WalletAssetType["BNB_BSC"] = "BNB_BSC";
    WalletAssetType["testETH"] = "testETH";
    WalletAssetType["HER"] = "HER";
    WalletAssetType["PIC"] = "PIC";
    WalletAssetType["LLM"] = "LLM";
    WalletAssetType["SD"] = "SD";
    WalletAssetType["TTS"] = "TTS";
})(WalletAssetType || (exports.WalletAssetType = WalletAssetType = {}));
