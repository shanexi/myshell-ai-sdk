export var EditorMode;
(function (EditorMode) {
    EditorMode[EditorMode["NORMAL"] = 0] = "NORMAL";
    EditorMode[EditorMode["SHARE"] = 1] = "SHARE";
})(EditorMode || (EditorMode = {}));
export var InputMode;
(function (InputMode) {
    InputMode[InputMode["TEXT"] = 0] = "TEXT";
    InputMode[InputMode["VOICE"] = 1] = "VOICE";
})(InputMode || (InputMode = {}));
export var JobTypeEnum;
(function (JobTypeEnum) {
    JobTypeEnum["UNSPECIFIED"] = "JOB_TYPE_UNSPECIFIED";
    JobTypeEnum["BOT_CREATE"] = "JOB_TYPE_BOT_CREATE";
    JobTypeEnum["BOT_UPDATE_PROMPT"] = "JOB_TYPE_BOT_UPDATE_PROMPT";
    JobTypeEnum["IMAGE_GEN_REQUEST"] = "JOB_TYPE_GENERATION_IMAGE_REQUEST";
    JobTypeEnum["COMP_GEN_REQUEST"] = "JOB_TYPE_GENERATION_COMPONENT_REQUEST";
    JobTypeEnum["LEPTON_INNER_GEN_QUEUE"] = "JOB_TYPE_GENERATION_LEPTON_INNER_QUEUE";
    JobTypeEnum["WIDGET_AUTO_PROMPT"] = "JOB_TYPE_WIDGET_AUTO_PROMPT";
    JobTypeEnum["WIDGET_VOICE_CLONE"] = "JOB_TYPE_WIDGET_VOICE_CLONE";
    JobTypeEnum["RUNNING_ASYNC_STATE_MACHINE"] = "JOB_TYPE_RUNNING_ASYNC_STATE_MACHINE";
})(JobTypeEnum || (JobTypeEnum = {}));
export var JobStatusEnum;
(function (JobStatusEnum) {
    JobStatusEnum["WAITING"] = "JOB_STATUS_WAITING";
    JobStatusEnum["DOING"] = "JOB_STATUS_DOING";
    JobStatusEnum["DONE"] = "JOB_STATUS_DONE";
    JobStatusEnum["FAILED"] = "JOB_STATUS_FAILED";
    JobStatusEnum["CANCELED"] = "JOB_STATUS_CANCELED";
})(JobStatusEnum || (JobStatusEnum = {}));
export var EmbedObjStatus;
(function (EmbedObjStatus) {
    EmbedObjStatus["UNKNOWN"] = "EMBED_OBJ_STATUS_UNSPECIFIED";
    EmbedObjStatus["PENDING"] = "EMBED_OBJ_STATUS_PENDING";
    EmbedObjStatus["PROCESSING"] = "EMBED_OBJ_STATUS_PROCESSING";
    EmbedObjStatus["DONE"] = "EMBED_OBJ_STATUS_DONE";
    EmbedObjStatus["ERROR"] = "EMBED_OBJ_STATUS_ERROR";
    EmbedObjStatus["DELETED"] = "EMBED_OBJ_STATUS_DELETED";
    EmbedObjStatus["QUEUEING"] = "EMBED_OBJ_STATUS_QUEUEING";
})(EmbedObjStatus || (EmbedObjStatus = {}));
export var EmbedObjType;
(function (EmbedObjType) {
    EmbedObjType["UNKNOWN"] = "MESSAGE_METADATA_TYPE_UNSPECIFIED";
    EmbedObjType["IMAGE"] = "MESSAGE_METADATA_TYPE_IMAGE_FILE";
    EmbedObjType["DOC"] = "MESSAGE_METADATA_TYPE_TEXT_FILE";
    EmbedObjType["AUDIO"] = "MESSAGE_METADATA_TYPE_AUDIO_FILE";
    EmbedObjType["VIDEO"] = "MESSAGE_METADATA_TYPE_VIDEO_FILE";
    EmbedObjType["TEXT_CONTENT"] = "MESSAGE_METADATA_TYPE_TEXT_CONTENT";
    EmbedObjType["AUDIO_CONTENT"] = "MESSAGE_METADATA_TYPE_USER_AUDIO";
    EmbedObjType["ALL"] = "MESSAGE_METADATA_TYPE_ALL_FILE";
})(EmbedObjType || (EmbedObjType = {}));
export var FeedbackState;
(function (FeedbackState) {
    FeedbackState["NORMAL"] = "Normal";
    FeedbackState["LIKED"] = "Liked";
    FeedbackState["DISLIKE"] = "Dislike";
})(FeedbackState || (FeedbackState = {}));
export var ChatSettingSpeakingLangEnum;
(function (ChatSettingSpeakingLangEnum) {
    ChatSettingSpeakingLangEnum["UNSPECIFIED"] = "BOT_CHAT_SETTING_SPEAKING_LANGUAGE_UNSPECIFIED";
    ChatSettingSpeakingLangEnum["AUTO"] = "BOT_CHAT_SETTING_SPEAKING_LANGUAGE_AUTO";
    ChatSettingSpeakingLangEnum["EN"] = "BOT_CHAT_SETTING_SPEAKING_LANGUAGE_EN";
    ChatSettingSpeakingLangEnum["ZH"] = "BOT_CHAT_SETTING_SPEAKING_LANGUAGE_ZH";
    ChatSettingSpeakingLangEnum["JA"] = "BOT_CHAT_SETTING_SPEAKING_LANGUAGE_JA";
    ChatSettingSpeakingLangEnum["RU"] = "BOT_CHAT_SETTING_SPEAKING_LANGUAGE_RU";
    ChatSettingSpeakingLangEnum["ES"] = "BOT_CHAT_SETTING_SPEAKING_LANGUAGE_ES";
    ChatSettingSpeakingLangEnum["KO"] = "BOT_CHAT_SETTING_SPEAKING_LANGUAGE_KO";
})(ChatSettingSpeakingLangEnum || (ChatSettingSpeakingLangEnum = {}));
export var ChatSettingAudioSpeed;
(function (ChatSettingAudioSpeed) {
    ChatSettingAudioSpeed["UNSPECIFIED"] = "BOT_CHAT_SETTING_AUDIO_SPEED_UNSPECIFIED";
    ChatSettingAudioSpeed["ZERO_POINT_FIVE"] = "BOT_CHAT_SETTING_AUDIO_SPEED_ZERO_POINT_FIVE";
    ChatSettingAudioSpeed["ZERO_POINT_SEVEN_FIVE"] = "BOT_CHAT_SETTING_AUDIO_SPEED_ZERO_POINT_SEVEN_FIVE";
    ChatSettingAudioSpeed["ONE"] = "BOT_CHAT_SETTING_AUDIO_SPEED_ONE";
    ChatSettingAudioSpeed["ONE_POINT_TWENTY_FIVE"] = "BOT_CHAT_SETTING_AUDIO_SPEED_ONE_POINT_TWENTY_FIVE";
    ChatSettingAudioSpeed["ONE_POINT_FIVE"] = "BOT_CHAT_SETTING_AUDIO_SPEED_ONE_POINT_FIVE";
})(ChatSettingAudioSpeed || (ChatSettingAudioSpeed = {}));
export var MenuFunctionEnum;
(function (MenuFunctionEnum) {
    MenuFunctionEnum[MenuFunctionEnum["REMOVE_FROM_LIST"] = 0] = "REMOVE_FROM_LIST";
    MenuFunctionEnum[MenuFunctionEnum["SHARE"] = 1] = "SHARE";
    MenuFunctionEnum[MenuFunctionEnum["CLEAR_MEMORY"] = 2] = "CLEAR_MEMORY";
    MenuFunctionEnum[MenuFunctionEnum["CLEAR_HISTORY"] = 3] = "CLEAR_HISTORY";
})(MenuFunctionEnum || (MenuFunctionEnum = {}));
export var MenuActionType;
(function (MenuActionType) {
    MenuActionType["Like"] = "Like";
    MenuActionType["Dislike"] = "Dislike";
    MenuActionType["Copy_Message"] = "Copy Message";
    MenuActionType["Stop_Generating"] = "Stop Generating";
    MenuActionType["Regenerate"] = "Regenerate";
    MenuActionType["Edit"] = "Edit";
    MenuActionType["Translate"] = "Translate";
    MenuActionType["Show_Text"] = "Show Text";
    MenuActionType["Download_Voice"] = "Download Voice";
    MenuActionType["Share"] = "Share";
    MenuActionType["Delete"] = "Delete";
    MenuActionType["Remove_Dislike"] = "Remove Dislike";
    MenuActionType["Regenerate_Voice"] = "Regenerate Voice";
    MenuActionType["Feedback"] = "Feedback";
    MenuActionType["Save_Image"] = "Save Image";
    MenuActionType["Copy_Image"] = "Copy Image";
    MenuActionType["Copy_Image_Link"] = "Copy Image Link";
})(MenuActionType || (MenuActionType = {}));
export var RunningErrorEnum;
(function (RunningErrorEnum) {
    RunningErrorEnum["UNSPECIFIED"] = "RUNNING_ERROR_TYPE_UNSPECIFIED";
    RunningErrorEnum["ENGINE_ERROR"] = "RUNNING_ERROR_TYPE_ENGINE_ERROR";
    RunningErrorEnum["INNER_COMPONENT_ERROR"] = "RUNNING_ERROR_TYPE_INNER_COMPONENT_ERROR";
    RunningErrorEnum["ENERGY_INSUFFICIANT"] = "RUNNING_ERROR_TYPE_ENERGY_INSUFFICIANT";
    RunningErrorEnum["LLM_TOKEN_TOO_LONG"] = "RUNNING_ERROR_TYPE_LLM_TOKEN_TOO_LONG";
})(RunningErrorEnum || (RunningErrorEnum = {}));
export var ImageGenStatus;
(function (ImageGenStatus) {
    ImageGenStatus["UNSPECIFIED"] = "MESSAGE_STATUS_UNSPECIFIED";
    ImageGenStatus["PENDING"] = "PENDING";
    ImageGenStatus["PROCESSING"] = "PROCESSING";
    ImageGenStatus["DONE"] = "DONE";
    ImageGenStatus["ERROR"] = "ERROR";
    ImageGenStatus["DELETED"] = "DELETED";
    ImageGenStatus["CANCELED"] = "CANCELED";
})(ImageGenStatus || (ImageGenStatus = {}));
export var ImageGenType;
(function (ImageGenType) {
    ImageGenType["UNSPECIFIED"] = "IMAGE_GEN_MESSAGE_TYPE_UNSPECIFIED";
    ImageGenType["SIMPLE"] = "IMAGE_GEN_MESSAGE_TYPE_SIMPLE_MESSAGE";
    ImageGenType["COMMAND"] = "IMAGE_GEN_MESSAGE_TYPE_COMMAND_MESSAGE";
    ImageGenType["PANEL"] = "IMAGE_GEN_MESSAGE_TYPE_PANEL_MESSAGE";
    ImageGenType["REGEN"] = "IMAGE_GEN_MESSAGE_TYPE_REGENERATE_MESSAGE";
    ImageGenType["VARIATION"] = "IMAGE_GEN_MESSAGE_TYPE_VARIATION_MESSAGE";
    ImageGenType["UPSCALE"] = "IMAGE_GEN_MESSAGE_TYPE_UPSCALE_MESSAGE";
    ImageGenType["GIF"] = "IMAGE_GEN_MESSAGE_TYPE_SIMPLE_GIF";
})(ImageGenType || (ImageGenType = {}));
