"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetChatCallerTypeEnum = exports.ImComponentsInputTypeEnum = exports.supportedEmbedTypesEnum = exports.ParamTypeEnum = exports.ChatPanelTypeEnum = exports.WidgetStatusEnum = exports.MediaEnum = exports.CardEnum = void 0;
var CardEnum;
(function (CardEnum) {
    CardEnum["TYPE_NORMAL_TITLE"] = "TYPE_NORMAL_TITLE";
    CardEnum["TYPE_SLIDER"] = "TYPE_SLIDER";
    CardEnum["TYPE_UNSPECIFIED"] = "TYPE_UNSPECIFIED";
})(CardEnum || (exports.CardEnum = CardEnum = {}));
var MediaEnum;
(function (MediaEnum) {
    MediaEnum["MEDIA_TYPE_VIDEO"] = "MEDIA_TYPE_VIDEO";
    MediaEnum["MEDIA_TYPE_IMAGE"] = "MEDIA_TYPE_IMAGE";
    MediaEnum["MEDIA_TYPE_UNSPECIFIED"] = "MEDIA_TYPE_UNSPECIFIED";
})(MediaEnum || (exports.MediaEnum = MediaEnum = {}));
var WidgetStatusEnum;
(function (WidgetStatusEnum) {
    WidgetStatusEnum["STATUS_UNSPECIFIED"] = "STATUS_UNSPECIFIED";
    WidgetStatusEnum["STATUS_PUBLIC"] = "STATUS_PUBLIC";
    WidgetStatusEnum["STATUS_PRIVATE"] = "STATUS_PRIVATE";
})(WidgetStatusEnum || (exports.WidgetStatusEnum = WidgetStatusEnum = {}));
var ChatPanelTypeEnum;
(function (ChatPanelTypeEnum) {
    ChatPanelTypeEnum["BOT_CHAT_PANEL_TYPE_UNSPECIFIED"] = "BOT_CHAT_PANEL_TYPE_UNSPECIFIED";
    ChatPanelTypeEnum["BOT_CHAT_PANEL_TYPE_IM"] = "BOT_CHAT_PANEL_TYPE_IM";
    ChatPanelTypeEnum["BOT_CHAT_PANEL_TYPE_IMAGE_GEN"] = "BOT_CHAT_PANEL_TYPE_IMAGE_GEN";
    ChatPanelTypeEnum["BOT_CHAT_PANEL_TYPE_COMPONENT"] = "BOT_CHAT_PANEL_TYPE_COMPONENT";
})(ChatPanelTypeEnum || (exports.ChatPanelTypeEnum = ChatPanelTypeEnum = {}));
var ParamTypeEnum;
(function (ParamTypeEnum) {
    ParamTypeEnum["BOT_IM_SLASH_PARAM_TYPE_UNSPECIFIED"] = "BOT_IM_SLASH_PARAM_TYPE_UNSPECIFIED";
    ParamTypeEnum["BOT_IM_SLASH_PARAM_TYPE_NUMBER"] = "BOT_IM_SLASH_PARAM_TYPE_NUMBER";
    ParamTypeEnum["BOT_IM_SLASH_PARAM_TYPE_STRING"] = "BOT_IM_SLASH_PARAM_TYPE_STRING";
})(ParamTypeEnum || (exports.ParamTypeEnum = ParamTypeEnum = {}));
var supportedEmbedTypesEnum;
(function (supportedEmbedTypesEnum) {
    supportedEmbedTypesEnum["MESSAGE_METADATA_TYPE_UNSPECIFIED"] = "MESSAGE_METADATA_TYPE_UNSPECIFIED";
    supportedEmbedTypesEnum["MESSAGE_METADATA_TYPE_IMAGE_FILE"] = "MESSAGE_METADATA_TYPE_IMAGE_FILE";
    supportedEmbedTypesEnum["MESSAGE_METADATA_TYPE_TEXT_FILE"] = "MESSAGE_METADATA_TYPE_TEXT_FILE";
    supportedEmbedTypesEnum["MESSAGE_METADATA_TYPE_ALL_FILE"] = "MESSAGE_METADATA_TYPE_ALL_FILE";
    supportedEmbedTypesEnum["MESSAGE_METADATA_TYPE_AUDIO_FILE"] = "MESSAGE_METADATA_TYPE_AUDIO_FILE";
    supportedEmbedTypesEnum["MESSAGE_METADATA_TYPE_VIDEO_FILE"] = "MESSAGE_METADATA_TYPE_VIDEO_FILE";
    supportedEmbedTypesEnum["MESSAGE_METADATA_TYPE_TEXT_CONTENT"] = "MESSAGE_METADATA_TYPE_TEXT_CONTENT";
    supportedEmbedTypesEnum["MESSAGE_METADATA_TYPE_USER_AUDIO"] = "MESSAGE_METADATA_TYPE_USER_AUDIO";
    supportedEmbedTypesEnum["MESSAGE_METADATA_TYPE_COMPONENT_INPUT"] = "MESSAGE_METADATA_TYPE_COMPONENT_INPUT";
    supportedEmbedTypesEnum["MESSAGE_METADATA_TYPE_ASYNC_JOB_INFO"] = "MESSAGE_METADATA_TYPE_ASYNC_JOB_INFO";
})(supportedEmbedTypesEnum || (exports.supportedEmbedTypesEnum = supportedEmbedTypesEnum = {}));
var ImComponentsInputTypeEnum;
(function (ImComponentsInputTypeEnum) {
    ImComponentsInputTypeEnum["BOT_IM_COMPONENT_INPUT_TYPE_UNSPECIFIED"] = "BOT_IM_COMPONENT_INPUT_TYPE_UNSPECIFIED";
    ImComponentsInputTypeEnum["BOT_IM_COMPONENT_INPUT_TYPE_FILE_UPLOAD"] = "BOT_IM_COMPONENT_INPUT_TYPE_FILE_UPLOAD";
    ImComponentsInputTypeEnum["BOT_IM_COMPONENT_INPUT_TYPE_VIDEO_UPLOAD"] = "BOT_IM_COMPONENT_INPUT_TYPE_VIDEO_UPLOAD";
    ImComponentsInputTypeEnum["BOT_IM_COMPONENT_INPUT_TYPE_IMAGE_UPLOAD"] = "BOT_IM_COMPONENT_INPUT_TYPE_IMAGE_UPLOAD";
    ImComponentsInputTypeEnum["BOT_IM_COMPONENT_INPUT_TYPE_TEXT_UPLOAD"] = "BOT_IM_COMPONENT_INPUT_TYPE_TEXT_UPLOAD";
    ImComponentsInputTypeEnum["BOT_IM_COMPONENT_INPUT_TYPE_TEXT_INPUT"] = "BOT_IM_COMPONENT_INPUT_TYPE_TEXT_INPUT";
    ImComponentsInputTypeEnum["BOT_IM_COMPONENT_INPUT_TYPE_TEXT_SELECTOR"] = "BOT_IM_COMPONENT_INPUT_TYPE_TEXT_SELECTOR";
    ImComponentsInputTypeEnum["BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_INPUT"] = "BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_INPUT";
    ImComponentsInputTypeEnum["BOT_IM_COMPONENT_INPUT_TYPE_INTEGER_INPUT"] = "BOT_IM_COMPONENT_INPUT_TYPE_INTEGER_INPUT";
    ImComponentsInputTypeEnum["BOT_IM_COMPONENT_INPUT_TYPE_CHECKBOX"] = "BOT_IM_COMPONENT_INPUT_TYPE_CHECKBOX";
    ImComponentsInputTypeEnum["BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_SELECTOR"] = "BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_SELECTOR";
    ImComponentsInputTypeEnum["BOT_IM_COMPONENT_INPUT_TYPE_CODE_EDITOR"] = "BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_SELECTOR";
})(ImComponentsInputTypeEnum || (exports.ImComponentsInputTypeEnum = ImComponentsInputTypeEnum = {}));
var WidgetChatCallerTypeEnum;
(function (WidgetChatCallerTypeEnum) {
    WidgetChatCallerTypeEnum["WIDGET_CHAT_CALLER_TYPE_UNSPECFIED"] = "WIDGET_CHAT_CALLER_TYPE_UNSPECFIED";
    WidgetChatCallerTypeEnum["WIDGET_CHAT_CALLER_TYPE_PROMPT"] = "WIDGET_CHAT_CALLER_TYPE_PROMPT";
    WidgetChatCallerTypeEnum["WIDGET_CHAT_CALLER_TYPE_VOICE"] = "WIDGET_CHAT_CALLER_TYPE_VOICE";
    WidgetChatCallerTypeEnum["WIDGET_CHAT_CALLER_TYPE_COMPONENT"] = "WIDGET_CHAT_CALLER_TYPE_COMPONENT";
})(WidgetChatCallerTypeEnum || (exports.WidgetChatCallerTypeEnum = WidgetChatCallerTypeEnum = {}));
