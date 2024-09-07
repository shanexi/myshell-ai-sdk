"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnchainInteractionError = exports.MessageComponentsButtonActionInteractionInputDisplayTypeEnum = exports.MessageComponentsButtonActionTypeEnum = exports.MessageComponentsButtonContentDirectionEnum = exports.MessageComponentsTypeEnum = exports.ModelStatusEnum = exports.VoiceCallStatusEnum = exports.MessageTypeEnum = exports.MessageStatusEnum = void 0;
var MessageStatusEnum;
(function (MessageStatusEnum) {
    MessageStatusEnum["PENDING"] = "PENDING";
    MessageStatusEnum["PROCESSING"] = "PROCESSING";
    MessageStatusEnum["DONE"] = "DONE";
    MessageStatusEnum["ERROR"] = "ERROR";
    MessageStatusEnum["CANCELING"] = "CANCELING";
    MessageStatusEnum["CANCELED"] = "CANCELED";
})(MessageStatusEnum || (exports.MessageStatusEnum = MessageStatusEnum = {}));
var MessageTypeEnum;
(function (MessageTypeEnum) {
    MessageTypeEnum["TEXT"] = "TEXT";
    MessageTypeEnum["VOICE"] = "VOICE";
    MessageTypeEnum["REPLY"] = "REPLY";
    MessageTypeEnum["RESET"] = "RESET";
    MessageTypeEnum["PROMPT_UPDATED"] = "PROMPT_UPDATED";
    MessageTypeEnum["GREETING"] = "GREETING";
    MessageTypeEnum["MORE_BOT_TO_EXPLORE"] = "MORE_BOT_TO_EXPLORER";
    MessageTypeEnum["NEED_TO_REGISTER"] = "NEED_TO_REGISTER";
    MessageTypeEnum["VOICE_CALL_END"] = "VOICE_CALL_END";
    MessageTypeEnum["VOICE_CALL_TEXT"] = "VOICE_CALL_TEXT";
    MessageTypeEnum["VOICE_CALL_VOICE"] = "VOICE_CALL_VOICE";
    MessageTypeEnum["VOICE_CALL_REPLY"] = "VOICE_CALL_REPLY";
    MessageTypeEnum["LLM_MODERATION_REQUEST"] = "LLM_MODERATION_REQUEST";
    MessageTypeEnum["EMBED_OBJ_STATUS_QUEUEING"] = "EMBED_OBJ_STATUS_QUEUEING";
    MessageTypeEnum["BUTTON_INTERACTION"] = "BUTTON_INTERACTION";
    MessageTypeEnum["WIDGET_PROMPT_UPDATED"] = "WIDGET_PROMPT_UPDATED";
})(MessageTypeEnum || (exports.MessageTypeEnum = MessageTypeEnum = {}));
var VoiceCallStatusEnum;
(function (VoiceCallStatusEnum) {
    VoiceCallStatusEnum["NOT_CONNECTED"] = "NOT_CONNECTED";
    VoiceCallStatusEnum["CONNECTING"] = "CONNECTING";
    VoiceCallStatusEnum["CONNECTED"] = "CONNECTED";
})(VoiceCallStatusEnum || (exports.VoiceCallStatusEnum = VoiceCallStatusEnum = {}));
var ModelStatusEnum;
(function (ModelStatusEnum) {
    ModelStatusEnum["EMBED_OBJ_STATUS_QUEUEING"] = "EMBED_OBJ_STATUS_QUEUEING";
    ModelStatusEnum["EMBED_OBJ_STATUS_PROCESSING"] = "EMBED_OBJ_STATUS_PROCESSING";
    ModelStatusEnum["EMBED_OBJ_STATUS_DONE"] = "EMBED_OBJ_STATUS_DONE";
    ModelStatusEnum["EMBED_OBJ_STATUS_ERROR"] = "EMBED_OBJ_STATUS_ERROR";
})(ModelStatusEnum || (exports.ModelStatusEnum = ModelStatusEnum = {}));
var MessageComponentsTypeEnum;
(function (MessageComponentsTypeEnum) {
    MessageComponentsTypeEnum["ROW"] = "BOT_MESSAGE_COMPONENTS_TYPE_ROW";
    MessageComponentsTypeEnum["BUTTON"] = "BOT_MESSAGE_COMPONENTS_TYPE_BUTTON";
    MessageComponentsTypeEnum["CONTAINER"] = "BOT_MESSAGE_COMPONENTS_TYPE_CONTAINER";
})(MessageComponentsTypeEnum || (exports.MessageComponentsTypeEnum = MessageComponentsTypeEnum = {}));
var MessageComponentsButtonContentDirectionEnum;
(function (MessageComponentsButtonContentDirectionEnum) {
    MessageComponentsButtonContentDirectionEnum["LEFT"] = "BOT_MESSAGE_COMPONENTS_BUTTON_CONTENT_DIRECTION_LEFT";
    MessageComponentsButtonContentDirectionEnum["RIGHT"] = "BOT_MESSAGE_COMPONENTS_BUTTON_CONTENT_DIRECTION_RIGHT";
})(MessageComponentsButtonContentDirectionEnum || (exports.MessageComponentsButtonContentDirectionEnum = MessageComponentsButtonContentDirectionEnum = {}));
var MessageComponentsButtonActionTypeEnum;
(function (MessageComponentsButtonActionTypeEnum) {
    MessageComponentsButtonActionTypeEnum["JUMP_LINK"] = "MESSAGE_COMPONENTS_BUTTON_ACTION_TYPE_JUMP_LINK";
    MessageComponentsButtonActionTypeEnum["POP_UP_FORM"] = "MESSAGE_COMPONENTS_BUTTON_ACTION_TYPE_POP_UP_FORM";
    MessageComponentsButtonActionTypeEnum["INTERACTION"] = "MESSAGE_COMPONENTS_BUTTON_ACTION_TYPE_INTERACTION";
    MessageComponentsButtonActionTypeEnum["CLIPBOARD"] = "MESSAGE_COMPONENTS_BUTTON_ACTION_TYPE_CLIPBOARD";
})(MessageComponentsButtonActionTypeEnum || (exports.MessageComponentsButtonActionTypeEnum = MessageComponentsButtonActionTypeEnum = {}));
var MessageComponentsButtonActionInteractionInputDisplayTypeEnum;
(function (MessageComponentsButtonActionInteractionInputDisplayTypeEnum) {
    MessageComponentsButtonActionInteractionInputDisplayTypeEnum["TEXT"] = "BOT_MESSAGE_COMPONENTS_BUTTON_ACTION_INTERACTION_INPUT_DISPLAY_TYPE_TEXT";
    MessageComponentsButtonActionInteractionInputDisplayTypeEnum["SLASH_COMMAND"] = "BOT_MESSAGE_COMPONENTS_BUTTON_ACTION_INTERACTION_INPUT_DISPLAY_TYPE_SLASH_COMMAND";
    MessageComponentsButtonActionInteractionInputDisplayTypeEnum["NOTHING"] = "BOT_MESSAGE_COMPONENTS_BUTTON_ACTION_INTERACTION_INPUT_DISPLAY_TYPE_NOTHING";
})(MessageComponentsButtonActionInteractionInputDisplayTypeEnum || (exports.MessageComponentsButtonActionInteractionInputDisplayTypeEnum = MessageComponentsButtonActionInteractionInputDisplayTypeEnum = {}));
var OnchainInteractionError;
(function (OnchainInteractionError) {
    OnchainInteractionError["UserReject"] = "rejected the request";
    OnchainInteractionError["OnWrongChain"] = "does not match the target chain";
})(OnchainInteractionError || (exports.OnchainInteractionError = OnchainInteractionError = {}));
