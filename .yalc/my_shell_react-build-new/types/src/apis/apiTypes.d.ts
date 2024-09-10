import { BotDetail, BotInfo, TagInfo } from '../common/constants/interfaces/bot';
export interface BasePagedRequest {
    listRequest: {
        pageToken: string;
        pageSize: number;
    };
}
interface BasePagedResopnse {
    listResponse: {
        hasMore: boolean;
        nextPageToken: string;
    };
}
export interface PrivyLoginRequestParam {
    token: string;
    visitorId: string;
    invitationCode?: string;
    botSharingCode?: string;
    inviteLink?: string;
    tgGuid?: string;
    sharingWidgetCode?: string;
    sharingArticleCode?: string;
    sharingForumCode?: string;
    sharingRoomCode?: string;
    sharingBabelBotCode?: string;
}
export interface ParticleLoginRequestParam extends PrivyLoginRequestParam {
    uuid: string;
}
export interface PrivyLoginBody {
    token: string;
    visitorId: string;
    invitationCode?: string;
    botSharingCode?: string;
    tgGuid?: string;
    sharedCode?: string;
    inviteLink?: string;
}
export interface PrivyLoginSuccessResponse {
    expiration: number;
    token: string;
    userId: number;
    userUid: string;
    isNewUser: boolean;
    hasReceivedReward: boolean;
    sharingWidgetCode: string;
    sharingArticleCode: string;
    sharingForumCode: string;
    sharingRoomCode: string;
    sharingBabelBotCode: string;
}
export interface PrivyLoginErrorResponse {
    code: number;
    message: string;
    metadata: unknown;
    reason: string;
}
export declare function isPrivyLoginSuccessResponse(response: any): response is PrivyLoginSuccessResponse;
export type PrivyLoginResponse = PrivyLoginSuccessResponse | PrivyLoginErrorResponse;
export interface VerifySignatureRequestParam {
    publicAddress: string;
    signature: string;
    visitorId: string;
    invitationCode?: string;
    botSharingCode?: string;
    inviteLink?: string;
    tgGuid?: string;
    sharingWidgetCode?: string;
    sharingArticleCode?: string;
    sharingForumCode?: string;
    sharingRoomCode?: string;
    sharingBabelBotCode?: string;
}
export interface VerifySignatureBody {
    publicAddress: string;
    visitorId: string;
    signature?: string;
    invitationCode?: string;
    botSharingCode?: string;
    tgGuid?: string;
    sharedCode?: string;
}
export declare enum OrderSort {
    ORDER_SORT_UNSPECIFIED = "ORDER_SORT_UNSPECIFIED",
    ORDER_SORT_ASC = "ORDER_BY_ASC",
    ORDER_SORT_DESC = "ORDER_SORT_DESC"
}
export declare enum OrderByFields {
    ORDER_BY_FIELDS_UNSPECIFIED = "ORDER_BY_FIELDS_UNSPECIFIED",
    ORDER_BY_FIELDS_BEGIN_AT = "ORDER_BY_FIELDS_BEGIN_AT",
    ORDER_BY_FIELDS_PRE_SALE_DEADLINE = "ORDER_BY_FIELDS_PRE_SALE_DEADLINE",
    ORDER_BY_FIELDS_PRICE_CHANGE = "ORDER_BY_FIELDS_PRICE_CHANGE",
    ORDER_BY_FIELDS_PRICE = "ORDER_BY_FIELDS_PRICE",
    ORDER_BY_FIELDS_MARKET_CAP = "ORDER_BY_FIELDS_MARKET_CAP",
    ORDER_BY_FIELDS_VOLUME = "ORDER_BY_FIELDS_VOLUME",
    ORDER_BY_FIELDS_HOLDERS = "ORDER_BY_FIELDS_HOLDERS",
    ORDER_BY_FIELDS_PUBLIC_AT = "ORDER_BY_FIELDS_PUBLIC_AT",
    ORDER_BY_FIELDS_PRICE_CHANGE_DAILY = "ORDER_BY_FIELDS_PRICE_CHANGE_DAILY",
    ORDER_BY_FIELDS_LAST_TRADE_AT = "ORDER_BY_FIELDS_LAST_TRADE_AT",
    ORDER_BY_FIELDS_BOT_RANKING = "ORDER_BY_FIELDS_BOT_RANKING"
}
export declare enum FollowStatus {
    FOLLOW_STATUS_UNSPECIFIED = "FOLLOW_STATUS_UNSPECIFIED",
    FOLLOWED = "FOLLOWED",
    NOT_FOLLOWED = "NOT_FOLLOWED",
    NOT_AVAILABLE = "NOT_AVAILABLE"
}
export declare enum UserSource {
    USER_SOURCE_UNSPECIFIED = "USER_SOURCE_UNSPECIFIED",
    my_shell = "my_shell",
    telegram = "telegram",
    discord = "discord",
    visitor = "visitor",
    cyberConnect = "cyberConnect",
    privy = "privy"
}
export declare enum MembershipInfoType {
    TYPE_UNSPECIFIED = "TYPE_UNSPECIFIED",
    TYPE_NORMAL = "TYPE_NORMAL",
    TYPE_PREMIUM = "TYPE_PREMIUM",
    TYPE_GENESIS_WITH_GENESIS_CARD = "TYPE_GENESIS_WITH_GENESIS_CARD",
    TYPE_GENESIS_WITH_PASS_CARD = "TYPE_GENESIS_WITH_PASS_CARD"
}
export declare enum CurveItemStatus {
    BOUNDING_CURVE_STATUS_UNSPECIFIED = "BOUNDING_CURVE_STATUS_UNSPECIFIED",
    BOUNDING_CURVE_STATUS_IN_PROGRESS = "BOUNDING_CURVE_STATUS_IN_PROGRESS",
    BOUNDING_CURVE_STATUS_WAITING_FOR_LAUNCH = "BOUNDING_CURVE_STATUS_WAITING_FOR_LAUNCH",
    BOUNDING_CURVE_STATUS_LAUNCHED = "BOUNDING_CURVE_STATUS_LAUNCHED",
    BOUNDING_CURVE_STATUS_FAILED = "BOUNDING_CURVE_STATUS_FAILED",
    BOUNDING_CURVE_STATUS_RUGGED = "BOUNDING_CURVE_STATUS_RUGGED",
    BOUNDING_CURVE_STATUS_MY_SOUL_FIRST = "BOUNDING_CURVE_STATUS_MY_SOUL_FIRST"
}
export declare enum BotSummaryStatus {
    BOT_STATUS_UNSPECIFIED = "BOT_STATUS_UNSPECIFIED",
    Public = "Public",
    Active = "Active",
    Inactive = "Inactive"
}
export declare enum LanguageVersion {
    BOT_LANGUAGE_VERSION_UNSPECIFIED = "BOT_LANGUAGE_VERSION_UNSPECIFIED",
    BOT_LANGUAGE_VERSION_V1 = "BOT_LANGUAGE_VERSION_V1",
    BOT_LANGUAGE_VERSION_V2 = "BOT_LANGUAGE_VERSION_V2"
}
export declare enum BotTTSStatus {
    BOT_TTS_STATUS_UNSPECIFIED = "BOT_TTS_STATUS_UNSPECIFIED",
    pending = "pending",
    processing = "processing",
    failed = "failed",
    done = "done"
}
export declare enum BotGenType {
    BOT_GEN_TYPE_UNSPECIFIED = "BOT_GEN_TYPE_UNSPECIFIED",
    BOT_GEN_TYPE_IMAGE = "BOT_GEN_TYPE_IMAGE",
    BOT_GEN_TYPE_GIF = "BOT_GEN_TYPE_GIF"
}
export declare enum LLMCategory {
    BOT_CHAT_MODEL_CATEGORY_UNSPECIFIED = "BOT_CHAT_MODEL_CATEGORY_UNSPECIFIED",
    BOT_CHAT_MODEL_CATEGORY_CLOSESOURCE = "BOT_CHAT_MODEL_CATEGORY_CLOSESOURCE",
    BOT_CHAT_MODEL_CATEGORY_OPENSOURCE = "BOT_CHAT_MODEL_CATEGORY_OPENSOURCE",
    BOT_CHAT_MODEL_CATEGORY_SELFDEVELOP = "BOT_CHAT_MODEL_CATEGORY_SELFDEVELOP"
}
export declare enum BotChatModelStatus {
    BOT_CHAT_MODEL_STATUS_UNSPECIFIED = "BOT_CHAT_MODEL_STATUS_UNSPECIFIED",
    BOT_CHAT_MODEL_STATUS_ACTIVE = "BOT_CHAT_MODEL_STATUS_ACTIVE",
    BOT_CHAT_MODEL_STATUS_HIDDEN = "BOT_CHAT_MODEL_STATUS_HIDDEN",
    BOT_CHAT_MODEL_STATUS_DISABLE = "BOT_CHAT_MODEL_STATUS_DISABLE"
}
export declare enum ChatPanelType {
    BOT_CHAT_PANEL_TYPE_UNSPECIFIED = "BOT_CHAT_PANEL_TYPE_UNSPECIFIED",
    BOT_CHAT_PANEL_TYPE_IM = "BOT_CHAT_PANEL_TYPE_IM",
    BOT_CHAT_PANEL_TYPE_IMAGE_GEN = "BOT_CHAT_PANEL_TYPE_IMAGE_GEN",
    BOT_CHAT_PANEL_TYPE_COMPONENT = "BOT_CHAT_PANEL_TYPE_COMPONENT"
}
export declare enum SupportedEmbedTypes {
    MESSAGE_METADATA_TYPE_UNSPECIFIED = "MESSAGE_METADATA_TYPE_UNSPECIFIED",
    MESSAGE_METADATA_TYPE_IMAGE_FILE = "MESSAGE_METADATA_TYPE_IMAGE_FILE",
    MESSAGE_METADATA_TYPE_TEXT_FILE = "MESSAGE_METADATA_TYPE_TEXT_FILE",
    MESSAGE_METADATA_TYPE_AUDIO_FILE = "MESSAGE_METADATA_TYPE_AUDIO_FILE",
    MESSAGE_METADATA_TYPE_VIDEO_FILE = "MESSAGE_METADATA_TYPE_VIDEO_FILE",
    MESSAGE_METADATA_TYPE_TEXT_CONTENT = "MESSAGE_METADATA_TYPE_TEXT_CONTENT",
    MESSAGE_METADATA_TYPE_USER_AUDIO = "MESSAGE_METADATA_TYPE_USER_AUDIO",
    MESSAGE_METADATA_TYPE_COMPONENT_INPUT = "MESSAGE_METADATA_TYPE_COMPONENT_INPUT",
    MESSAGE_METADATA_TYPE_ASYNC_JOB_INFO = "MESSAGE_METADATA_TYPE_ASYNC_JOB_INFO",
    MESSAGE_METADATA_TYPE_REFERENCE_SOURCE = "MESSAGE_METADATA_TYPE_REFERENCE_SOURCE",
    MESSAGE_METADATA_TYPE_RECOMMENDATION_QUESTION = "MESSAGE_METADATA_TYPE_RECOMMENDATION_QUESTION",
    MESSAGE_METADATA_TYPE_AUTO_PROMPT_INPUT = "MESSAGE_METADATA_TYPE_AUTO_PROMPT_INPUT",
    MESSAGE_METADATA_TYPE_MESSAGE_COMPONENT = "MESSAGE_METADATA_TYPE_MESSAGE_COMPONENT",
    MESSAGE_METADATA_TYPE_SLASH_COMMAND_INPUT = "MESSAGE_METADATA_TYPE_SLASH_COMMAND_INPUT",
    MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_AUDIO = "MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_AUDIO",
    MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_TEXT = "MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_TEXT",
    MESSAGE_METADATA_TYPE_MESSAGE_INPUT_SETTING = "MESSAGE_METADATA_TYPE_MESSAGE_INPUT_SETTING",
    MESSAGE_METADATA_TYPE_MESSAGE_JOINT_CHECKPOINT = "MESSAGE_METADATA_TYPE_MESSAGE_JOINT_CHECKPOINT",
    MESSAGE_METADATA_TYPE_MESSAGE_PURE_DATA = "MESSAGE_METADATA_TYPE_MESSAGE_PURE_DATA",
    MESSAGE_METADATA_TYPE_ALL_FILE = "MESSAGE_METADATA_TYPE_ALL_FILE",
    MESSAGE_METADATA_TYPE_EXTRA = "MESSAGE_METADATA_TYPE_EXTRA",
    MESSAGE_METADATA_TYPE_RUNNING_ERROR = "MESSAGE_METADATA_TYPE_RUNNING_ERROR",
    MESSAGE_METADATA_TYPE_RUNNING_WIDGET_INFO = "MESSAGE_METADATA_TYPE_RUNNING_WIDGET_INFO"
}
export declare enum BotImSlashCommandParamType {
    BOT_IM_SLASH_PARAM_TYPE_UNSPECIFIED = "BOT_IM_SLASH_PARAM_TYPE_UNSPECIFIED",
    BOT_IM_SLASH_PARAM_TYPE_NUMBER = "BOT_IM_SLASH_PARAM_TYPE_NUMBER",
    BOT_IM_SLASH_PARAM_TYPE_STRING = "BOT_IM_SLASH_PARAM_TYPE_STRING"
}
export declare enum SupportedMembershipTypes {
    TYPE_UNSPECIFIED = "TYPE_UNSPECIFIED",
    TYPE_NORMAL = "TYPE_NORMAL",
    TYPE_PREMIUM = "TYPE_PREMIUM",
    TYPE_GENESIS_WITH_GENESIS_CARD = "TYPE_GENESIS_WITH_GENESIS_CARD",
    TYPE_GENESIS_WITH_PASS_CARD = "TYPE_GENESIS_WITH_PASS_CARD"
}
export declare enum BotImComponentsInputType {
    BOT_IM_COMPONENT_INPUT_TYPE_UNSPECIFIED = "BOT_IM_COMPONENT_INPUT_TYPE_UNSPECIFIED",
    BOT_IM_COMPONENT_INPUT_TYPE_FILE_UPLOAD = "BOT_IM_COMPONENT_INPUT_TYPE_FILE_UPLOAD",
    BOT_IM_COMPONENT_INPUT_TYPE_VIDEO_UPLOAD = "BOT_IM_COMPONENT_INPUT_TYPE_VIDEO_UPLOAD",
    BOT_IM_COMPONENT_INPUT_TYPE_IMAGE_UPLOAD = "BOT_IM_COMPONENT_INPUT_TYPE_IMAGE_UPLOAD",
    BOT_IM_COMPONENT_INPUT_TYPE_TEXT_UPLOAD = "BOT_IM_COMPONENT_INPUT_TYPE_TEXT_UPLOAD",
    BOT_IM_COMPONENT_INPUT_TYPE_TEXT_INPUT = "BOT_IM_COMPONENT_INPUT_TYPE_TEXT_INPUT",
    BOT_IM_COMPONENT_INPUT_TYPE_TEXT_SELECTOR = "BOT_IM_COMPONENT_INPUT_TYPE_TEXT_SELECTOR",
    BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_INPUT = "BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_INPUT",
    BOT_IM_COMPONENT_INPUT_TYPE_INTEGER_INPUT = "BOT_IM_COMPONENT_INPUT_TYPE_INTEGER_INPUT",
    BOT_IM_COMPONENT_INPUT_TYPE_CHECKBOX = "BOT_IM_COMPONENT_INPUT_TYPE_CHECKBOX",
    BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_SELECTOR = "BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_SELECTOR",
    BOT_IM_COMPONENT_INPUT_TYPE_CODE_EDITOR = "BOT_IM_COMPONENT_INPUT_TYPE_CODE_EDITOR"
}
export declare enum SupportedFileTypes {
    MESSAGE_METADATA_TYPE_UNSPECIFIED = "MESSAGE_METADATA_TYPE_UNSPECIFIED",
    MESSAGE_METADATA_TYPE_IMAGE_FILE = "MESSAGE_METADATA_TYPE_IMAGE_FILE",
    MESSAGE_METADATA_TYPE_TEXT_FILE = "MESSAGE_METADATA_TYPE_TEXT_FILE",
    MESSAGE_METADATA_TYPE_AUDIO_FILE = "MESSAGE_METADATA_TYPE_AUDIO_FILE",
    MESSAGE_METADATA_TYPE_VIDEO_FILE = "MESSAGE_METADATA_TYPE_VIDEO_FILE",
    MESSAGE_METADATA_TYPE_TEXT_CONTENT = "MESSAGE_METADATA_TYPE_TEXT_CONTENT",
    MESSAGE_METADATA_TYPE_USER_AUDIO = "MESSAGE_METADATA_TYPE_USER_AUDIO",
    MESSAGE_METADATA_TYPE_COMPONENT_INPUT = "MESSAGE_METADATA_TYPE_COMPONENT_INPUT",
    MESSAGE_METADATA_TYPE_ASYNC_JOB_INFO = "MESSAGE_METADATA_TYPE_ASYNC_JOB_INFO",
    MESSAGE_METADATA_TYPE_REFERENCE_SOURCE = "MESSAGE_METADATA_TYPE_REFERENCE_SOURCE",
    MESSAGE_METADATA_TYPE_RECOMMENDATION_QUESTION = "MESSAGE_METADATA_TYPE_RECOMMENDATION_QUESTION",
    MESSAGE_METADATA_TYPE_AUTO_PROMPT_INPUT = "MESSAGE_METADATA_TYPE_AUTO_PROMPT_INPUT",
    MESSAGE_METADATA_TYPE_MESSAGE_COMPONENT = "MESSAGE_METADATA_TYPE_MESSAGE_COMPONENT",
    MESSAGE_METADATA_TYPE_SLASH_COMMAND_INPUT = "MESSAGE_METADATA_TYPE_SLASH_COMMAND_INPUT",
    MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_AUDIO = "MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_AUDIO",
    MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_TEXT = "MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_TEXT",
    MESSAGE_METADATA_TYPE_MESSAGE_INPUT_SETTING = "MESSAGE_METADATA_TYPE_MESSAGE_INPUT_SETTING",
    MESSAGE_METADATA_TYPE_MESSAGE_JOINT_CHECKPOINT = "MESSAGE_METADATA_TYPE_MESSAGE_JOINT_CHECKPOINT",
    MESSAGE_METADATA_TYPE_MESSAGE_PURE_DATA = "MESSAGE_METADATA_TYPE_MESSAGE_PURE_DATA",
    MESSAGE_METADATA_TYPE_ALL_FILE = "MESSAGE_METADATA_TYPE_ALL_FILE",
    MESSAGE_METADATA_TYPE_EXTRA = "MESSAGE_METADATA_TYPE_EXTRA",
    MESSAGE_METADATA_TYPE_RUNNING_ERROR = "MESSAGE_METADATA_TYPE_RUNNING_ERROR",
    MESSAGE_METADATA_TYPE_RUNNING_WIDGET_INFO = "MESSAGE_METADATA_TYPE_RUNNING_WIDGET_INFO"
}
export declare enum FileDefaultParamType {
    MESSAGE_METADATA_TYPE_UNSPECIFIED = "MESSAGE_METADATA_TYPE_UNSPECIFIED",
    MESSAGE_METADATA_TYPE_IMAGE_FILE = "MESSAGE_METADATA_TYPE_IMAGE_FILE",
    MESSAGE_METADATA_TYPE_TEXT_FILE = "MESSAGE_METADATA_TYPE_TEXT_FILE",
    MESSAGE_METADATA_TYPE_AUDIO_FILE = "MESSAGE_METADATA_TYPE_AUDIO_FILE",
    MESSAGE_METADATA_TYPE_VIDEO_FILE = "MESSAGE_METADATA_TYPE_VIDEO_FILE",
    MESSAGE_METADATA_TYPE_TEXT_CONTENT = "MESSAGE_METADATA_TYPE_TEXT_CONTENT",
    MESSAGE_METADATA_TYPE_USER_AUDIO = "MESSAGE_METADATA_TYPE_USER_AUDIO",
    MESSAGE_METADATA_TYPE_COMPONENT_INPUT = "MESSAGE_METADATA_TYPE_COMPONENT_INPUT",
    MESSAGE_METADATA_TYPE_ASYNC_JOB_INFO = "MESSAGE_METADATA_TYPE_ASYNC_JOB_INFO",
    MESSAGE_METADATA_TYPE_REFERENCE_SOURCE = "MESSAGE_METADATA_TYPE_REFERENCE_SOURCE",
    MESSAGE_METADATA_TYPE_RECOMMENDATION_QUESTION = "MESSAGE_METADATA_TYPE_RECOMMENDATION_QUESTION",
    MESSAGE_METADATA_TYPE_AUTO_PROMPT_INPUT = "MESSAGE_METADATA_TYPE_AUTO_PROMPT_INPUT",
    MESSAGE_METADATA_TYPE_MESSAGE_COMPONENT = "MESSAGE_METADATA_TYPE_MESSAGE_COMPONENT",
    MESSAGE_METADATA_TYPE_SLASH_COMMAND_INPUT = "MESSAGE_METADATA_TYPE_SLASH_COMMAND_INPUT",
    MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_AUDIO = "MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_AUDIO",
    MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_TEXT = "MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_TEXT",
    MESSAGE_METADATA_TYPE_MESSAGE_INPUT_SETTING = "MESSAGE_METADATA_TYPE_MESSAGE_INPUT_SETTING",
    MESSAGE_METADATA_TYPE_MESSAGE_JOINT_CHECKPOINT = "MESSAGE_METADATA_TYPE_MESSAGE_JOINT_CHECKPOINT",
    MESSAGE_METADATA_TYPE_MESSAGE_PURE_DATA = "MESSAGE_METADATA_TYPE_MESSAGE_PURE_DATA",
    MESSAGE_METADATA_TYPE_ALL_FILE = "MESSAGE_METADATA_TYPE_ALL_FILE",
    MESSAGE_METADATA_TYPE_EXTRA = "MESSAGE_METADATA_TYPE_EXTRA",
    MESSAGE_METADATA_TYPE_RUNNING_ERROR = "MESSAGE_METADATA_TYPE_RUNNING_ERROR",
    MESSAGE_METADATA_TYPE_RUNNING_WIDGET_INFO = "MESSAGE_METADATA_TYPE_RUNNING_WIDGET_INFO"
}
export declare enum BondingCurveStatus {
    BOUNDING_CURVE_STATUS_UNSPECIFIED = "BOUNDING_CURVE_STATUS_UNSPECIFIED",
    BOUNDING_CURVE_STATUS_IN_PROGRESS = "BOUNDING_CURVE_STATUS_IN_PROGRESS",
    BOUNDING_CURVE_STATUS_WAITING_FOR_LAUNCH = "BOUNDING_CURVE_STATUS_WAITING_FOR_LAUNCH",
    BOUNDING_CURVE_STATUS_LAUNCHED = "BOUNDING_CURVE_STATUS_LAUNCHED",
    BOUNDING_CURVE_STATUS_FAILED = "BOUNDING_CURVE_STATUS_FAILED",
    BOUNDING_CURVE_STATUS_RUGGED = "BOUNDING_CURVE_STATUS_RUGGED",
    BOUNDING_CURVE_STATUS_MY_SOUL_FIRST = "BOUNDING_CURVE_STATUS_MY_SOUL_FIRST"
}
export declare enum TradeOrderType {
    ORDER_TYPE_UNSPECIFIED = "ORDER_TYPE_UNSPECIFIED",
    ORDER_TYPE_BUY = "ORDER_TYPE_BUY",
    ORDER_TYPE_SELL = "ORDER_TYPE_SELL"
}
export declare enum PriceDurationType {
    PRICE_DURATION_TYPE_UNSPECIFIED = "PRICE_DURATION_TYPE_UNSPECIFIED",
    PRICE_DURATION_TYPE_1H = "PRICE_DURATION_TYPE_1H",
    PRICE_DURATION_TYPE_1D = "PRICE_DURATION_TYPE_1D",
    PRICE_DURATION_TYPE_1W = "PRICE_DURATION_TYPE_1W",
    PRICE_DURATION_TYPE_ORIGINAL = "PRICE_DURATION_TYPE_ORIGINAL"
}
export declare enum LaunchPadUserSubmissionStatus {
    LAUNCH_PAD_USER_SUBMISSION_STATUS_UNSPECIFIED = "LAUNCH_PAD_USER_SUBMISSION_STATUS_UNSPECIFIED",
    LAUNCH_PAD_USER_SUBMISSION_STATUS_PENDING = "LAUNCH_PAD_USER_SUBMISSION_STATUS_PENDING",
    LAUNCH_PAD_USER_SUBMISSION_STATUS_APPROVED = "LAUNCH_PAD_USER_SUBMISSION_STATUS_APPROVED",
    LAUNCH_PAD_USER_SUBMISSION_STATUS_REJECTED = "LAUNCH_PAD_USER_SUBMISSION_STATUS_REJECTED"
}
export interface UserSummary {
    id: string;
    name: string;
    email: string;
    nameTag: string;
    avatar: string;
    publicAddress: string;
    isNftAvatar: true;
    description: string;
    backgroundUrl: string;
    followedCount: number;
    fansCount: number;
    followStatus: FollowStatus;
    userSource: UserSource;
    membershipInfo: {
        type: MembershipInfoType;
        premiumInfo: {
            level: number;
            totalExp: number;
            nextLevelNeedExp: number;
            currentLevelExp: number;
        };
        privateBotLimit: number;
        publicBotLimit: number;
        levelInfo: {
            level: number;
            totalExp: number;
            nextLevelNeedExp: number;
            currentLevelExp: number;
        };
    };
    currentSeasonInfo: {
        seasonId: number;
        point: number;
        pointText: string;
    };
    lastSeasonInfo: {
        seasonId: number;
        point: number;
        pointText: string;
    };
    userCreatedAt: number;
}
export interface IHolder {
    holder: UserSummary;
    walletAddress: string;
    holdCount: number;
}
export type OrderBy = {
    sort: OrderSort;
    field: OrderByFields;
};
export interface CurveSummary {
    id: string;
    symbol: string;
    creator: UserSummary;
    botSummary: BotInfo;
    curveTags: TagInfo[];
    creatorFirstDeadlineUnixStamp: string;
    marketCap: string;
    marketCapInU?: string;
    marketCapInUFormatted?: string;
    price: string;
    priceInU?: string;
    holdersCount: number;
    changesDaily: {
        change: number;
    };
    status: BondingCurveStatus;
    targetSold: number;
    currentSold: number;
    holdInfo: {
        holdCount: number;
        holdValue: string;
        holdValueInU: string;
    };
    preSaleDeadlineUnixStamp: string;
    beginAtUnixStamp?: string;
    openPrice?: string;
    tradingVolume?: string;
    tradingVolumeInUFormatted?: string;
    botRankingIndex?: number;
}
export interface EarningStats {
    averagePrice: string;
    buyCost: string;
    curveId: string;
    earning: string;
    earningRate: string;
    userAddress: string;
}
export interface ITopTradeOrder {
    orderType: TradeOrderType;
    userSummary: UserSummary;
    walletAddress: string;
    happenedAtUnixStamp: number;
    badgeAmount: number;
}
export type ITopHolder = IHolder;
export interface PriceHistory {
    dateUnix: number;
    price: string;
}
export interface ICurve {
    detail: {
        boundingCurveSummary: CurveSummary;
        priceHistory: PriceHistory[];
        topTradeOrders: ITopTradeOrder[];
        topHolders: ITopHolder[];
    };
}
export type GetMyCollectionsRequestParam = BasePagedRequest;
export interface GetMyCollectionsResponse extends BasePagedResopnse {
    curves: CurveSummary[];
    curvesWithEarningStats: Array<{
        curve: CurveSummary;
        earningStats: EarningStats;
    }>;
}
export interface GetHoldersRequestParam extends BasePagedRequest {
    botId: string;
}
export interface GetHoldersResponse extends BasePagedResopnse {
    holder: IHolder;
    walletAddress: string;
    holdCount: number;
}
export interface GetTradeOrdersResponse extends BasePagedResopnse {
    tradeOrders: ITradeOrder[];
}
export interface ITradeOrder {
    orderType: TradeOrderType;
    userSummary: UserSummary;
    walletAddress: string;
    happenedAtUnixStamp: number;
    badgeAmount: number;
}
export interface GetRankingRequestParams extends BasePagedRequest {
    botNameQuery?: string;
    tagsQuery?: string[];
    statuses: CurveItemStatus[];
    orderBy: OrderBy[];
}
export interface GetRankingReponse extends BasePagedResopnse {
    curves: CurveSummary[];
}
export interface SearchCurveWithBotNameParams {
    query: string;
}
export interface SearchCurveWithBotNameResponse {
    curves: CurveSummary[];
}
export interface GetCurvePriceHistoryRequestParams {
    curveId: string;
    endAt: number;
    beginAt: number;
    priceDurationType: PriceDurationType;
}
export interface CurvePrice {
    dateUnix: number;
    price: string;
    PriceDurationType: PriceDurationType;
}
export interface GetCurvePriceHistoryResponse {
    curvePrices: CurvePrice[];
}
export type GetCurveResponse = ICurve;
export interface CheckRuggedResponse extends BasePagedResopnse {
    curves: CurveSummary[];
}
export interface GetLaunchInfoResponse {
    level: number;
    creatorPassCount: number;
    publicBotCount: number;
    curves: CurveSummary[];
    botsCanLaunch: BotDetail[];
}
export interface LaunchPadActivityDetail {
    id: string;
    title: string;
    theme: string;
    startDateUnix: number;
    endDateUnix: number;
    submissionStartDateUnix: number;
    submissionEndDateUnix: number;
    submissionUrl: string;
    userSubmissionStatus: LaunchPadUserSubmissionStatus;
    botId: string;
    botSummary: BotInfo;
}
export declare enum CommentStatus {
    COMMENT_STATUS_UNSPECIFIED = "COMMENT_STATUS_UNSPECIFIED",
    COMMENT_STATUS_ACTIVE = "COMMENT_STATUS_ACTIVE",
    COMMENT_STATUS_DELETED = "COMMENT_STATUS_DELETED"
}
export declare enum ReplyType {
    REPLY_TYPE_UNSPECIFIED = "REPLY_TYPE_UNSPECIFIED",
    REPLY_TYPE_COMMENT = "REPLY_TYPE_COMMENT",
    REPLY_TYPE_REPLY = "REPLY_TYPE_REPLY"
}
export declare enum MediaType {
    MEDIA_TYPE_UNSPECIFIED = "MEDIA_TYPE_UNSPECIFIED",
    MEDIA_TYPE_IMAGE = "MEDIA_TYPE_IMAGE",
    MEDIA_TYPE_VIDEO = "MEDIA_TYPE_VIDEO"
}
export declare enum InteractionType {
    INTERACTION_TYPE_UNSPECIFIED = "INTERACTION_TYPE_UNSPECIFIED",
    INTERACTION_TYPE_LIKE = "INTERACTION_TYPE_LIKE",
    INTERACTION_TYPE_SAD = "INTERACTION_TYPE_SAD",
    INTERACTION_TYPE_HAPPY = "INTERACTION_TYPE_HAPPY",
    INTERACTION_TYPE_SURPRISED = "INTERACTION_TYPE_SURPRISED",
    INTERACTION_TYPE_ANGRY = "INTERACTION_TYPE_ANGRY",
    INTERACTION_TYPE_FIRE = "INTERACTION_TYPE_FIRE",
    INTERACTION_TYPE_HEART = "INTERACTION_TYPE_HEART",
    INTERACTION_TYPE_ROCKET = "INTERACTION_TYPE_ROCKET"
}
export interface Media {
    url: string;
    type: string;
}
export interface InteractionStats {
    interactionType: InteractionType;
    count: number;
    currentUserInteracted: boolean;
}
export interface UserMini {
    id: string;
    name: string;
    description: string;
    avatarUrl: string;
}
export interface Reply {
    id: string;
    commentId: string;
    content: string;
    userMini: UserMini | undefined;
    medias: Media[];
    curveId: string;
    botId: string;
    createdAt: number;
    interactionStats: InteractionStats[];
    replyType: ReplyType;
    replyToId: number;
    commentStatus: CommentStatus;
    currentLoginUserCanDelete: boolean;
}
export interface Comment {
    id: string;
    content: string;
    userMini: UserMini | undefined;
    medias: Media[];
    curveId: string;
    botId: string;
    createdAt: number;
    interactionStats: InteractionStats[];
    topReply?: Reply | undefined;
    repliesCount: number;
    commentStatus: CommentStatus;
    currentLoginUserCanDelete: boolean;
}
export declare enum TargetType {
    TARGET_TYPE_UNSPECIFIED = "TARGET_TYPE_UNSPECIFIED",
    TARGET_TYPE_COMMENT = "TARGET_TYPE_COMMENT",
    TARGET_TYPE_REPLY = "TARGET_TYPE_REPLY"
}
export interface ListCommentsRequest extends BasePagedRequest {
    curveId: string;
}
export interface ListCommentsResponse extends BasePagedResopnse {
    comments: Comment[];
}
export interface ListRepliesRequest extends BasePagedRequest {
    commentId: string;
}
export interface ListRepliesResponse extends BasePagedResopnse {
    replies: Reply[];
}
export interface CreateCommentRequest {
    curveId: string;
    content: string;
    medias?: Media[];
}
export interface CreateCommentResponse {
    comment: Comment;
}
export interface CreateReplyRequest {
    commentId: string;
    content: string;
    medias?: Media[];
}
export interface CreateReplyResponse {
    reply: Reply;
}
export interface DeleteCommentRequest {
    targetId: string;
    targetType: TargetType;
}
export interface InteractCommentRequest {
    targetId: string;
    targetType: TargetType;
    interactType: InteractionType;
}
export interface CancelInteractCommentRequest {
    targetId: string;
    targetType: TargetType;
    interactType: InteractionType;
}
export {};
}
export {};
