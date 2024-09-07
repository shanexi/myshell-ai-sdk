export declare enum UserSettingEnum {
    LAST_SEASON = "lastSeason",
    LANGUAGE = "language",
    SHOW_NSFW = "showNsfw",
    FLAG_ICON_REWARD = "flagIconReward",
    FLAG_ICON_FORUM = "flagIconForum",
    FLAG_LLM_MODEL_CONFIG = "flagLlmModelConfig",
    FLAG_NSFW_CONFIRMED = "flagNsfwConfirmed",
    FLAG_VOICE_CALL_USED = "flagVoiceCallUsed",
    FLAG_VIDEO_CALL_USED = "flagVideoCallUsed",
    FLAG_ETH_LINEA_TRANSFERRED = "flagEthLineaTransferred",
    DEDUCTION_CONFIRMED = "flagDeductionConfirmed",
    FLAG_COMPLETED_OPBNB_CHAIN_TASK = "flagCompletedOpBnbChainTask",
    FLAG_SILENT_PERIOD_CONFIRMED = "flagSilentPeriodConfirmed",
    FLAG_stake_earn_VIEWED = "flagSubscribingEarnViewed",
    FLAG_SHARE_KEY_EARN_POPUP_CONFIRMED = "flagShareKeyEarnPopupConfirmed",
    TIME_ZONE = "timezone",
    NOTIFICATION = "receiveAutoPush",
    FLAG_TAG_NOTICE = "flagTagNotice",
    FLAG_USET_FIRST_PUBLISH_GALLERY = "flagUserFirstPublishGallery",
    FLAG_USET_FIRST_VISIT_GALLERY = "flagUserFirstVisitGallery"
}
export declare enum VisitorEnum {
    INIT = 0,
    YES = 1,
    NO = 2
}
export declare enum NsfwEnum {
    INIT = 0,
    OPEN = 1,
    CLOSE = 2
}
export declare const ALL_LANG_OPTIONS: Record<string, string>;
export declare const ALL_LANG_KEYS: string[];
export declare enum UserMembershipTypeEnum {
    TYPE_UNSPECIFIED = "TYPE_UNSPECIFIED",
    TYPE_NORMAL = "TYPE_NORMAL",
    TYPE_PREMIUM = "TYPE_PREMIUM",
    TYPE_GENESIS_WITH_GENESIS_CARD = "TYPE_GENESIS_WITH_GENESIS_CARD",
    TYPE_GENESIS_WITH_PASS_CARD = "TYPE_GENESIS_WITH_PASS_CARD"
}
export declare enum UserSourceEnum {
    APKPURE_BANNER = "apkpure_banner",
    MYSHELL = "myshell",
    VISITOR = "visitor"
}
export declare enum FollowStatus {
    FOLLOW_STATUS_UNSPECIFIED = "FOLLOW_STATUS_UNSPECIFIED",
    FOLLOWED = "FOLLOWED",
    NOT_FOLLOWED = "NOT_FOLLOWED",
    NOT_AVAILABLE = "NOT_AVAILABLE"
}
export declare enum LoginType {
    LOGIN_TYPE_UNSPECIFIED = "LOGIN_TYPE_UNSPECIFIED",
    LOGIN_TYPE_EMAIL = "LOGIN_TYPE_EMAIL",
    LOGIN_TYPE_GOOGLE = "LOGIN_TYPE_GOOGLE",
    LOGIN_TYPE_APPLE = "LOGIN_TYPE_APPLE",
    LOGIN_TYPE_FACEBOOK = "LOGIN_TYPE_FACEBOOK",
    LOGIN_TYPE_PUBLIC_ADDRESS = "LOGIN_TYPE_PUBLIC_ADDRESS"
}
export declare enum BindType {
    BIND_TYPE_UNSPECIFIED = "BIND_TYPE_UNSPECIFIED",
    BIND_TYPE_EVM_ADDRESS = "BIND_TYPE_EVM_ADDRESS",
    BIND_TYPE_TWITTER = "BIND_TYPE_TWITTER",
    BIND_TYPE_DISCORD = "BIND_TYPE_DISCORD",
    BIND_TYPE_TG = "BIND_TYPE_TG"
}
export declare enum WalletType {
    Privy = "Privy",
    Particle = "Particle",
    Other = "Other"
}
export declare enum WalletAssetType {
    CreatorPass = "CreatorPass",
    MYSOUL = "MYSOUL",
    ETH = "ETH_MAINNET",
    ETH_MYSHELL = "ETH_MYSHELL",
    BNB_OP = "BNB_OP",
    BNB_BSC = "BNB_BSC",
    testETH = "testETH",
    HER = "HER",
    PIC = "PIC",
    LLM = "LLM",
    SD = "SD",
    TTS = "TTS"
}
