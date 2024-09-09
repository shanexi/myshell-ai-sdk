"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetType = exports.InteractionType = exports.MediaType = exports.ReplyType = exports.CommentStatus = exports.LaunchPadUserSubmissionStatus = exports.PriceDurationType = exports.TradeOrderType = exports.BondingCurveStatus = exports.FileDefaultParamType = exports.SupportedFileTypes = exports.BotImComponentsInputType = exports.SupportedMembershipTypes = exports.BotImSlashCommandParamType = exports.SupportedEmbedTypes = exports.ChatPanelType = exports.BotChatModelStatus = exports.LLMCategory = exports.BotGenType = exports.BotTTSStatus = exports.LanguageVersion = exports.BotSummaryStatus = exports.CurveItemStatus = exports.MembershipInfoType = exports.UserSource = exports.FollowStatus = exports.OrderByFields = exports.OrderSort = void 0;
exports.isPrivyLoginSuccessResponse = isPrivyLoginSuccessResponse;
function isPrivyLoginSuccessResponse(response) {
    return ('token' in response &&
        'userId' in response &&
        'userUid' in response &&
        'isNewUser' in response &&
        'hasReceivedReward' in response &&
        'sharingWidgetCode' in response &&
        'sharingArticleCode' in response &&
        'sharingForumCode' in response &&
        'sharingRoomCode' in response &&
        'sharingBabelBotCode' in response);
}
var OrderSort;
(function (OrderSort) {
    OrderSort["ORDER_SORT_UNSPECIFIED"] = "ORDER_SORT_UNSPECIFIED";
    OrderSort["ORDER_SORT_ASC"] = "ORDER_BY_ASC";
    OrderSort["ORDER_SORT_DESC"] = "ORDER_SORT_DESC";
})(OrderSort || (exports.OrderSort = OrderSort = {}));
var OrderByFields;
(function (OrderByFields) {
    OrderByFields["ORDER_BY_FIELDS_UNSPECIFIED"] = "ORDER_BY_FIELDS_UNSPECIFIED";
    OrderByFields["ORDER_BY_FIELDS_BEGIN_AT"] = "ORDER_BY_FIELDS_BEGIN_AT";
    OrderByFields["ORDER_BY_FIELDS_PRE_SALE_DEADLINE"] = "ORDER_BY_FIELDS_PRE_SALE_DEADLINE";
    OrderByFields["ORDER_BY_FIELDS_PRICE_CHANGE"] = "ORDER_BY_FIELDS_PRICE_CHANGE";
    OrderByFields["ORDER_BY_FIELDS_PRICE"] = "ORDER_BY_FIELDS_PRICE";
    OrderByFields["ORDER_BY_FIELDS_MARKET_CAP"] = "ORDER_BY_FIELDS_MARKET_CAP";
    OrderByFields["ORDER_BY_FIELDS_VOLUME"] = "ORDER_BY_FIELDS_VOLUME";
    OrderByFields["ORDER_BY_FIELDS_HOLDERS"] = "ORDER_BY_FIELDS_HOLDERS";
    OrderByFields["ORDER_BY_FIELDS_PUBLIC_AT"] = "ORDER_BY_FIELDS_PUBLIC_AT";
    OrderByFields["ORDER_BY_FIELDS_PRICE_CHANGE_DAILY"] = "ORDER_BY_FIELDS_PRICE_CHANGE_DAILY";
    OrderByFields["ORDER_BY_FIELDS_LAST_TRADE_AT"] = "ORDER_BY_FIELDS_LAST_TRADE_AT";
    OrderByFields["ORDER_BY_FIELDS_BOT_RANKING"] = "ORDER_BY_FIELDS_BOT_RANKING";
})(OrderByFields || (exports.OrderByFields = OrderByFields = {}));
var FollowStatus;
(function (FollowStatus) {
    FollowStatus["FOLLOW_STATUS_UNSPECIFIED"] = "FOLLOW_STATUS_UNSPECIFIED";
    FollowStatus["FOLLOWED"] = "FOLLOWED";
    FollowStatus["NOT_FOLLOWED"] = "NOT_FOLLOWED";
    FollowStatus["NOT_AVAILABLE"] = "NOT_AVAILABLE";
})(FollowStatus || (exports.FollowStatus = FollowStatus = {}));
var UserSource;
(function (UserSource) {
    UserSource["USER_SOURCE_UNSPECIFIED"] = "USER_SOURCE_UNSPECIFIED";
    UserSource["my_shell"] = "my_shell";
    UserSource["telegram"] = "telegram";
    UserSource["discord"] = "discord";
    UserSource["visitor"] = "visitor";
    UserSource["cyberConnect"] = "cyberConnect";
    UserSource["privy"] = "privy";
})(UserSource || (exports.UserSource = UserSource = {}));
var MembershipInfoType;
(function (MembershipInfoType) {
    MembershipInfoType["TYPE_UNSPECIFIED"] = "TYPE_UNSPECIFIED";
    MembershipInfoType["TYPE_NORMAL"] = "TYPE_NORMAL";
    MembershipInfoType["TYPE_PREMIUM"] = "TYPE_PREMIUM";
    MembershipInfoType["TYPE_GENESIS_WITH_GENESIS_CARD"] = "TYPE_GENESIS_WITH_GENESIS_CARD";
    MembershipInfoType["TYPE_GENESIS_WITH_PASS_CARD"] = "TYPE_GENESIS_WITH_PASS_CARD";
})(MembershipInfoType || (exports.MembershipInfoType = MembershipInfoType = {}));
var CurveItemStatus;
(function (CurveItemStatus) {
    CurveItemStatus["BOUNDING_CURVE_STATUS_UNSPECIFIED"] = "BOUNDING_CURVE_STATUS_UNSPECIFIED";
    CurveItemStatus["BOUNDING_CURVE_STATUS_IN_PROGRESS"] = "BOUNDING_CURVE_STATUS_IN_PROGRESS";
    CurveItemStatus["BOUNDING_CURVE_STATUS_WAITING_FOR_LAUNCH"] = "BOUNDING_CURVE_STATUS_WAITING_FOR_LAUNCH";
    CurveItemStatus["BOUNDING_CURVE_STATUS_LAUNCHED"] = "BOUNDING_CURVE_STATUS_LAUNCHED";
    CurveItemStatus["BOUNDING_CURVE_STATUS_FAILED"] = "BOUNDING_CURVE_STATUS_FAILED";
    CurveItemStatus["BOUNDING_CURVE_STATUS_RUGGED"] = "BOUNDING_CURVE_STATUS_RUGGED";
    CurveItemStatus["BOUNDING_CURVE_STATUS_MY_SOUL_FIRST"] = "BOUNDING_CURVE_STATUS_MY_SOUL_FIRST";
})(CurveItemStatus || (exports.CurveItemStatus = CurveItemStatus = {}));
var BotSummaryStatus;
(function (BotSummaryStatus) {
    BotSummaryStatus["BOT_STATUS_UNSPECIFIED"] = "BOT_STATUS_UNSPECIFIED";
    BotSummaryStatus["Public"] = "Public";
    BotSummaryStatus["Active"] = "Active";
    BotSummaryStatus["Inactive"] = "Inactive";
})(BotSummaryStatus || (exports.BotSummaryStatus = BotSummaryStatus = {}));
var LanguageVersion;
(function (LanguageVersion) {
    LanguageVersion["BOT_LANGUAGE_VERSION_UNSPECIFIED"] = "BOT_LANGUAGE_VERSION_UNSPECIFIED";
    LanguageVersion["BOT_LANGUAGE_VERSION_V1"] = "BOT_LANGUAGE_VERSION_V1";
    LanguageVersion["BOT_LANGUAGE_VERSION_V2"] = "BOT_LANGUAGE_VERSION_V2";
})(LanguageVersion || (exports.LanguageVersion = LanguageVersion = {}));
var BotTTSStatus;
(function (BotTTSStatus) {
    BotTTSStatus["BOT_TTS_STATUS_UNSPECIFIED"] = "BOT_TTS_STATUS_UNSPECIFIED";
    BotTTSStatus["pending"] = "pending";
    BotTTSStatus["processing"] = "processing";
    BotTTSStatus["failed"] = "failed";
    BotTTSStatus["done"] = "done";
})(BotTTSStatus || (exports.BotTTSStatus = BotTTSStatus = {}));
var BotGenType;
(function (BotGenType) {
    BotGenType["BOT_GEN_TYPE_UNSPECIFIED"] = "BOT_GEN_TYPE_UNSPECIFIED";
    BotGenType["BOT_GEN_TYPE_IMAGE"] = "BOT_GEN_TYPE_IMAGE";
    BotGenType["BOT_GEN_TYPE_GIF"] = "BOT_GEN_TYPE_GIF";
})(BotGenType || (exports.BotGenType = BotGenType = {}));
var LLMCategory;
(function (LLMCategory) {
    LLMCategory["BOT_CHAT_MODEL_CATEGORY_UNSPECIFIED"] = "BOT_CHAT_MODEL_CATEGORY_UNSPECIFIED";
    LLMCategory["BOT_CHAT_MODEL_CATEGORY_CLOSESOURCE"] = "BOT_CHAT_MODEL_CATEGORY_CLOSESOURCE";
    LLMCategory["BOT_CHAT_MODEL_CATEGORY_OPENSOURCE"] = "BOT_CHAT_MODEL_CATEGORY_OPENSOURCE";
    LLMCategory["BOT_CHAT_MODEL_CATEGORY_SELFDEVELOP"] = "BOT_CHAT_MODEL_CATEGORY_SELFDEVELOP";
})(LLMCategory || (exports.LLMCategory = LLMCategory = {}));
var BotChatModelStatus;
(function (BotChatModelStatus) {
    BotChatModelStatus["BOT_CHAT_MODEL_STATUS_UNSPECIFIED"] = "BOT_CHAT_MODEL_STATUS_UNSPECIFIED";
    BotChatModelStatus["BOT_CHAT_MODEL_STATUS_ACTIVE"] = "BOT_CHAT_MODEL_STATUS_ACTIVE";
    BotChatModelStatus["BOT_CHAT_MODEL_STATUS_HIDDEN"] = "BOT_CHAT_MODEL_STATUS_HIDDEN";
    BotChatModelStatus["BOT_CHAT_MODEL_STATUS_DISABLE"] = "BOT_CHAT_MODEL_STATUS_DISABLE";
})(BotChatModelStatus || (exports.BotChatModelStatus = BotChatModelStatus = {}));
var ChatPanelType;
(function (ChatPanelType) {
    ChatPanelType["BOT_CHAT_PANEL_TYPE_UNSPECIFIED"] = "BOT_CHAT_PANEL_TYPE_UNSPECIFIED";
    ChatPanelType["BOT_CHAT_PANEL_TYPE_IM"] = "BOT_CHAT_PANEL_TYPE_IM";
    ChatPanelType["BOT_CHAT_PANEL_TYPE_IMAGE_GEN"] = "BOT_CHAT_PANEL_TYPE_IMAGE_GEN";
    ChatPanelType["BOT_CHAT_PANEL_TYPE_COMPONENT"] = "BOT_CHAT_PANEL_TYPE_COMPONENT";
})(ChatPanelType || (exports.ChatPanelType = ChatPanelType = {}));
var SupportedEmbedTypes;
(function (SupportedEmbedTypes) {
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_UNSPECIFIED"] = "MESSAGE_METADATA_TYPE_UNSPECIFIED";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_IMAGE_FILE"] = "MESSAGE_METADATA_TYPE_IMAGE_FILE";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_TEXT_FILE"] = "MESSAGE_METADATA_TYPE_TEXT_FILE";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_AUDIO_FILE"] = "MESSAGE_METADATA_TYPE_AUDIO_FILE";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_VIDEO_FILE"] = "MESSAGE_METADATA_TYPE_VIDEO_FILE";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_TEXT_CONTENT"] = "MESSAGE_METADATA_TYPE_TEXT_CONTENT";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_USER_AUDIO"] = "MESSAGE_METADATA_TYPE_USER_AUDIO";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_COMPONENT_INPUT"] = "MESSAGE_METADATA_TYPE_COMPONENT_INPUT";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_ASYNC_JOB_INFO"] = "MESSAGE_METADATA_TYPE_ASYNC_JOB_INFO";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_REFERENCE_SOURCE"] = "MESSAGE_METADATA_TYPE_REFERENCE_SOURCE";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_RECOMMENDATION_QUESTION"] = "MESSAGE_METADATA_TYPE_RECOMMENDATION_QUESTION";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_AUTO_PROMPT_INPUT"] = "MESSAGE_METADATA_TYPE_AUTO_PROMPT_INPUT";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_MESSAGE_COMPONENT"] = "MESSAGE_METADATA_TYPE_MESSAGE_COMPONENT";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_SLASH_COMMAND_INPUT"] = "MESSAGE_METADATA_TYPE_SLASH_COMMAND_INPUT";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_AUDIO"] = "MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_AUDIO";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_TEXT"] = "MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_TEXT";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_MESSAGE_INPUT_SETTING"] = "MESSAGE_METADATA_TYPE_MESSAGE_INPUT_SETTING";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_MESSAGE_JOINT_CHECKPOINT"] = "MESSAGE_METADATA_TYPE_MESSAGE_JOINT_CHECKPOINT";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_MESSAGE_PURE_DATA"] = "MESSAGE_METADATA_TYPE_MESSAGE_PURE_DATA";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_ALL_FILE"] = "MESSAGE_METADATA_TYPE_ALL_FILE";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_EXTRA"] = "MESSAGE_METADATA_TYPE_EXTRA";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_RUNNING_ERROR"] = "MESSAGE_METADATA_TYPE_RUNNING_ERROR";
    SupportedEmbedTypes["MESSAGE_METADATA_TYPE_RUNNING_WIDGET_INFO"] = "MESSAGE_METADATA_TYPE_RUNNING_WIDGET_INFO";
})(SupportedEmbedTypes || (exports.SupportedEmbedTypes = SupportedEmbedTypes = {}));
var BotImSlashCommandParamType;
(function (BotImSlashCommandParamType) {
    BotImSlashCommandParamType["BOT_IM_SLASH_PARAM_TYPE_UNSPECIFIED"] = "BOT_IM_SLASH_PARAM_TYPE_UNSPECIFIED";
    BotImSlashCommandParamType["BOT_IM_SLASH_PARAM_TYPE_NUMBER"] = "BOT_IM_SLASH_PARAM_TYPE_NUMBER";
    BotImSlashCommandParamType["BOT_IM_SLASH_PARAM_TYPE_STRING"] = "BOT_IM_SLASH_PARAM_TYPE_STRING";
})(BotImSlashCommandParamType || (exports.BotImSlashCommandParamType = BotImSlashCommandParamType = {}));
var SupportedMembershipTypes;
(function (SupportedMembershipTypes) {
    SupportedMembershipTypes["TYPE_UNSPECIFIED"] = "TYPE_UNSPECIFIED";
    SupportedMembershipTypes["TYPE_NORMAL"] = "TYPE_NORMAL";
    SupportedMembershipTypes["TYPE_PREMIUM"] = "TYPE_PREMIUM";
    SupportedMembershipTypes["TYPE_GENESIS_WITH_GENESIS_CARD"] = "TYPE_GENESIS_WITH_GENESIS_CARD";
    SupportedMembershipTypes["TYPE_GENESIS_WITH_PASS_CARD"] = "TYPE_GENESIS_WITH_PASS_CARD";
})(SupportedMembershipTypes || (exports.SupportedMembershipTypes = SupportedMembershipTypes = {}));
var BotImComponentsInputType;
(function (BotImComponentsInputType) {
    BotImComponentsInputType["BOT_IM_COMPONENT_INPUT_TYPE_UNSPECIFIED"] = "BOT_IM_COMPONENT_INPUT_TYPE_UNSPECIFIED";
    BotImComponentsInputType["BOT_IM_COMPONENT_INPUT_TYPE_FILE_UPLOAD"] = "BOT_IM_COMPONENT_INPUT_TYPE_FILE_UPLOAD";
    BotImComponentsInputType["BOT_IM_COMPONENT_INPUT_TYPE_VIDEO_UPLOAD"] = "BOT_IM_COMPONENT_INPUT_TYPE_VIDEO_UPLOAD";
    BotImComponentsInputType["BOT_IM_COMPONENT_INPUT_TYPE_IMAGE_UPLOAD"] = "BOT_IM_COMPONENT_INPUT_TYPE_IMAGE_UPLOAD";
    BotImComponentsInputType["BOT_IM_COMPONENT_INPUT_TYPE_TEXT_UPLOAD"] = "BOT_IM_COMPONENT_INPUT_TYPE_TEXT_UPLOAD";
    BotImComponentsInputType["BOT_IM_COMPONENT_INPUT_TYPE_TEXT_INPUT"] = "BOT_IM_COMPONENT_INPUT_TYPE_TEXT_INPUT";
    BotImComponentsInputType["BOT_IM_COMPONENT_INPUT_TYPE_TEXT_SELECTOR"] = "BOT_IM_COMPONENT_INPUT_TYPE_TEXT_SELECTOR";
    BotImComponentsInputType["BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_INPUT"] = "BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_INPUT";
    BotImComponentsInputType["BOT_IM_COMPONENT_INPUT_TYPE_INTEGER_INPUT"] = "BOT_IM_COMPONENT_INPUT_TYPE_INTEGER_INPUT";
    BotImComponentsInputType["BOT_IM_COMPONENT_INPUT_TYPE_CHECKBOX"] = "BOT_IM_COMPONENT_INPUT_TYPE_CHECKBOX";
    BotImComponentsInputType["BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_SELECTOR"] = "BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_SELECTOR";
    BotImComponentsInputType["BOT_IM_COMPONENT_INPUT_TYPE_CODE_EDITOR"] = "BOT_IM_COMPONENT_INPUT_TYPE_CODE_EDITOR";
})(BotImComponentsInputType || (exports.BotImComponentsInputType = BotImComponentsInputType = {}));
var SupportedFileTypes;
(function (SupportedFileTypes) {
    SupportedFileTypes["MESSAGE_METADATA_TYPE_UNSPECIFIED"] = "MESSAGE_METADATA_TYPE_UNSPECIFIED";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_IMAGE_FILE"] = "MESSAGE_METADATA_TYPE_IMAGE_FILE";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_TEXT_FILE"] = "MESSAGE_METADATA_TYPE_TEXT_FILE";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_AUDIO_FILE"] = "MESSAGE_METADATA_TYPE_AUDIO_FILE";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_VIDEO_FILE"] = "MESSAGE_METADATA_TYPE_VIDEO_FILE";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_TEXT_CONTENT"] = "MESSAGE_METADATA_TYPE_TEXT_CONTENT";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_USER_AUDIO"] = "MESSAGE_METADATA_TYPE_USER_AUDIO";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_COMPONENT_INPUT"] = "MESSAGE_METADATA_TYPE_COMPONENT_INPUT";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_ASYNC_JOB_INFO"] = "MESSAGE_METADATA_TYPE_ASYNC_JOB_INFO";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_REFERENCE_SOURCE"] = "MESSAGE_METADATA_TYPE_REFERENCE_SOURCE";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_RECOMMENDATION_QUESTION"] = "MESSAGE_METADATA_TYPE_RECOMMENDATION_QUESTION";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_AUTO_PROMPT_INPUT"] = "MESSAGE_METADATA_TYPE_AUTO_PROMPT_INPUT";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_MESSAGE_COMPONENT"] = "MESSAGE_METADATA_TYPE_MESSAGE_COMPONENT";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_SLASH_COMMAND_INPUT"] = "MESSAGE_METADATA_TYPE_SLASH_COMMAND_INPUT";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_AUDIO"] = "MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_AUDIO";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_TEXT"] = "MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_TEXT";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_MESSAGE_INPUT_SETTING"] = "MESSAGE_METADATA_TYPE_MESSAGE_INPUT_SETTING";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_MESSAGE_JOINT_CHECKPOINT"] = "MESSAGE_METADATA_TYPE_MESSAGE_JOINT_CHECKPOINT";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_MESSAGE_PURE_DATA"] = "MESSAGE_METADATA_TYPE_MESSAGE_PURE_DATA";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_ALL_FILE"] = "MESSAGE_METADATA_TYPE_ALL_FILE";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_EXTRA"] = "MESSAGE_METADATA_TYPE_EXTRA";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_RUNNING_ERROR"] = "MESSAGE_METADATA_TYPE_RUNNING_ERROR";
    SupportedFileTypes["MESSAGE_METADATA_TYPE_RUNNING_WIDGET_INFO"] = "MESSAGE_METADATA_TYPE_RUNNING_WIDGET_INFO";
})(SupportedFileTypes || (exports.SupportedFileTypes = SupportedFileTypes = {}));
var FileDefaultParamType;
(function (FileDefaultParamType) {
    FileDefaultParamType["MESSAGE_METADATA_TYPE_UNSPECIFIED"] = "MESSAGE_METADATA_TYPE_UNSPECIFIED";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_IMAGE_FILE"] = "MESSAGE_METADATA_TYPE_IMAGE_FILE";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_TEXT_FILE"] = "MESSAGE_METADATA_TYPE_TEXT_FILE";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_AUDIO_FILE"] = "MESSAGE_METADATA_TYPE_AUDIO_FILE";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_VIDEO_FILE"] = "MESSAGE_METADATA_TYPE_VIDEO_FILE";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_TEXT_CONTENT"] = "MESSAGE_METADATA_TYPE_TEXT_CONTENT";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_USER_AUDIO"] = "MESSAGE_METADATA_TYPE_USER_AUDIO";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_COMPONENT_INPUT"] = "MESSAGE_METADATA_TYPE_COMPONENT_INPUT";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_ASYNC_JOB_INFO"] = "MESSAGE_METADATA_TYPE_ASYNC_JOB_INFO";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_REFERENCE_SOURCE"] = "MESSAGE_METADATA_TYPE_REFERENCE_SOURCE";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_RECOMMENDATION_QUESTION"] = "MESSAGE_METADATA_TYPE_RECOMMENDATION_QUESTION";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_AUTO_PROMPT_INPUT"] = "MESSAGE_METADATA_TYPE_AUTO_PROMPT_INPUT";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_MESSAGE_COMPONENT"] = "MESSAGE_METADATA_TYPE_MESSAGE_COMPONENT";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_SLASH_COMMAND_INPUT"] = "MESSAGE_METADATA_TYPE_SLASH_COMMAND_INPUT";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_AUDIO"] = "MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_AUDIO";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_TEXT"] = "MESSAGE_METADATA_TYPE_VOICE_CLONE_INPUT_TEXT";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_MESSAGE_INPUT_SETTING"] = "MESSAGE_METADATA_TYPE_MESSAGE_INPUT_SETTING";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_MESSAGE_JOINT_CHECKPOINT"] = "MESSAGE_METADATA_TYPE_MESSAGE_JOINT_CHECKPOINT";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_MESSAGE_PURE_DATA"] = "MESSAGE_METADATA_TYPE_MESSAGE_PURE_DATA";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_ALL_FILE"] = "MESSAGE_METADATA_TYPE_ALL_FILE";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_EXTRA"] = "MESSAGE_METADATA_TYPE_EXTRA";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_RUNNING_ERROR"] = "MESSAGE_METADATA_TYPE_RUNNING_ERROR";
    FileDefaultParamType["MESSAGE_METADATA_TYPE_RUNNING_WIDGET_INFO"] = "MESSAGE_METADATA_TYPE_RUNNING_WIDGET_INFO";
})(FileDefaultParamType || (exports.FileDefaultParamType = FileDefaultParamType = {}));
var BondingCurveStatus;
(function (BondingCurveStatus) {
    BondingCurveStatus["BOUNDING_CURVE_STATUS_UNSPECIFIED"] = "BOUNDING_CURVE_STATUS_UNSPECIFIED";
    BondingCurveStatus["BOUNDING_CURVE_STATUS_IN_PROGRESS"] = "BOUNDING_CURVE_STATUS_IN_PROGRESS";
    BondingCurveStatus["BOUNDING_CURVE_STATUS_WAITING_FOR_LAUNCH"] = "BOUNDING_CURVE_STATUS_WAITING_FOR_LAUNCH";
    BondingCurveStatus["BOUNDING_CURVE_STATUS_LAUNCHED"] = "BOUNDING_CURVE_STATUS_LAUNCHED";
    BondingCurveStatus["BOUNDING_CURVE_STATUS_FAILED"] = "BOUNDING_CURVE_STATUS_FAILED";
    BondingCurveStatus["BOUNDING_CURVE_STATUS_RUGGED"] = "BOUNDING_CURVE_STATUS_RUGGED";
    BondingCurveStatus["BOUNDING_CURVE_STATUS_MY_SOUL_FIRST"] = "BOUNDING_CURVE_STATUS_MY_SOUL_FIRST";
})(BondingCurveStatus || (exports.BondingCurveStatus = BondingCurveStatus = {}));
var TradeOrderType;
(function (TradeOrderType) {
    TradeOrderType["ORDER_TYPE_UNSPECIFIED"] = "ORDER_TYPE_UNSPECIFIED";
    TradeOrderType["ORDER_TYPE_BUY"] = "ORDER_TYPE_BUY";
    TradeOrderType["ORDER_TYPE_SELL"] = "ORDER_TYPE_SELL";
})(TradeOrderType || (exports.TradeOrderType = TradeOrderType = {}));
var PriceDurationType;
(function (PriceDurationType) {
    PriceDurationType["PRICE_DURATION_TYPE_UNSPECIFIED"] = "PRICE_DURATION_TYPE_UNSPECIFIED";
    PriceDurationType["PRICE_DURATION_TYPE_1H"] = "PRICE_DURATION_TYPE_1H";
    PriceDurationType["PRICE_DURATION_TYPE_1D"] = "PRICE_DURATION_TYPE_1D";
    PriceDurationType["PRICE_DURATION_TYPE_1W"] = "PRICE_DURATION_TYPE_1W";
    PriceDurationType["PRICE_DURATION_TYPE_ORIGINAL"] = "PRICE_DURATION_TYPE_ORIGINAL";
})(PriceDurationType || (exports.PriceDurationType = PriceDurationType = {}));
var LaunchPadUserSubmissionStatus;
(function (LaunchPadUserSubmissionStatus) {
    LaunchPadUserSubmissionStatus["LAUNCH_PAD_USER_SUBMISSION_STATUS_UNSPECIFIED"] = "LAUNCH_PAD_USER_SUBMISSION_STATUS_UNSPECIFIED";
    LaunchPadUserSubmissionStatus["LAUNCH_PAD_USER_SUBMISSION_STATUS_PENDING"] = "LAUNCH_PAD_USER_SUBMISSION_STATUS_PENDING";
    LaunchPadUserSubmissionStatus["LAUNCH_PAD_USER_SUBMISSION_STATUS_APPROVED"] = "LAUNCH_PAD_USER_SUBMISSION_STATUS_APPROVED";
    LaunchPadUserSubmissionStatus["LAUNCH_PAD_USER_SUBMISSION_STATUS_REJECTED"] = "LAUNCH_PAD_USER_SUBMISSION_STATUS_REJECTED";
})(LaunchPadUserSubmissionStatus || (exports.LaunchPadUserSubmissionStatus = LaunchPadUserSubmissionStatus = {}));
var CommentStatus;
(function (CommentStatus) {
    CommentStatus["COMMENT_STATUS_UNSPECIFIED"] = "COMMENT_STATUS_UNSPECIFIED";
    CommentStatus["COMMENT_STATUS_ACTIVE"] = "COMMENT_STATUS_ACTIVE";
    CommentStatus["COMMENT_STATUS_DELETED"] = "COMMENT_STATUS_DELETED";
})(CommentStatus || (exports.CommentStatus = CommentStatus = {}));
var ReplyType;
(function (ReplyType) {
    ReplyType["REPLY_TYPE_UNSPECIFIED"] = "REPLY_TYPE_UNSPECIFIED";
    ReplyType["REPLY_TYPE_COMMENT"] = "REPLY_TYPE_COMMENT";
    ReplyType["REPLY_TYPE_REPLY"] = "REPLY_TYPE_REPLY";
})(ReplyType || (exports.ReplyType = ReplyType = {}));
var MediaType;
(function (MediaType) {
    MediaType["MEDIA_TYPE_UNSPECIFIED"] = "MEDIA_TYPE_UNSPECIFIED";
    MediaType["MEDIA_TYPE_IMAGE"] = "MEDIA_TYPE_IMAGE";
    MediaType["MEDIA_TYPE_VIDEO"] = "MEDIA_TYPE_VIDEO";
})(MediaType || (exports.MediaType = MediaType = {}));
var InteractionType;
(function (InteractionType) {
    InteractionType["INTERACTION_TYPE_UNSPECIFIED"] = "INTERACTION_TYPE_UNSPECIFIED";
    InteractionType["INTERACTION_TYPE_LIKE"] = "INTERACTION_TYPE_LIKE";
    InteractionType["INTERACTION_TYPE_SAD"] = "INTERACTION_TYPE_SAD";
    InteractionType["INTERACTION_TYPE_HAPPY"] = "INTERACTION_TYPE_HAPPY";
    InteractionType["INTERACTION_TYPE_SURPRISED"] = "INTERACTION_TYPE_SURPRISED";
    InteractionType["INTERACTION_TYPE_ANGRY"] = "INTERACTION_TYPE_ANGRY";
    InteractionType["INTERACTION_TYPE_FIRE"] = "INTERACTION_TYPE_FIRE";
    InteractionType["INTERACTION_TYPE_HEART"] = "INTERACTION_TYPE_HEART";
    InteractionType["INTERACTION_TYPE_ROCKET"] = "INTERACTION_TYPE_ROCKET";
})(InteractionType || (exports.InteractionType = InteractionType = {}));
var TargetType;
(function (TargetType) {
    TargetType["TARGET_TYPE_UNSPECIFIED"] = "TARGET_TYPE_UNSPECIFIED";
    TargetType["TARGET_TYPE_COMMENT"] = "TARGET_TYPE_COMMENT";
    TargetType["TARGET_TYPE_REPLY"] = "TARGET_TYPE_REPLY";
})(TargetType || (exports.TargetType = TargetType = {}));
