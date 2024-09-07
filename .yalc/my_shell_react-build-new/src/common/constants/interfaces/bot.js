"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageGenMessageType = exports.ConversationScenario = exports.DevModeTypeEnum = exports.ModeTypeEnum = exports.AsrLangTypeEnum = exports.KnowledgeSourceStatusEnum = void 0;
var KnowledgeSourceStatusEnum;
(function (KnowledgeSourceStatusEnum) {
    KnowledgeSourceStatusEnum[KnowledgeSourceStatusEnum["Pending"] = 1] = "Pending";
    KnowledgeSourceStatusEnum[KnowledgeSourceStatusEnum["Importing"] = 2] = "Importing";
    KnowledgeSourceStatusEnum[KnowledgeSourceStatusEnum["Active"] = 3] = "Active";
    KnowledgeSourceStatusEnum[KnowledgeSourceStatusEnum["Invalid"] = 4] = "Invalid";
})(KnowledgeSourceStatusEnum || (exports.KnowledgeSourceStatusEnum = KnowledgeSourceStatusEnum = {}));
var AsrLangTypeEnum;
(function (AsrLangTypeEnum) {
    AsrLangTypeEnum["English"] = "English";
    AsrLangTypeEnum["Mixed"] = "Mixed";
})(AsrLangTypeEnum || (exports.AsrLangTypeEnum = AsrLangTypeEnum = {}));
var ModeTypeEnum;
(function (ModeTypeEnum) {
    ModeTypeEnum["CLASSIC"] = "BOT_MODE_TYPE_CLASSIC";
    ModeTypeEnum["DEV"] = "BOT_MODE_TYPE_DEV";
    ModeTypeEnum["NO_CODE"] = "BOT_MODE_TYPE_NO_CODE";
    ModeTypeEnum["SHELL_AGENT"] = "BOT_MODE_TYPE_OPEN_SOURCE";
})(ModeTypeEnum || (exports.ModeTypeEnum = ModeTypeEnum = {}));
var DevModeTypeEnum;
(function (DevModeTypeEnum) {
    DevModeTypeEnum["PRO"] = "PRO_CONFIG_MODE";
    DevModeTypeEnum["API"] = "API_MODE";
})(DevModeTypeEnum || (exports.DevModeTypeEnum = DevModeTypeEnum = {}));
var ConversationScenario;
(function (ConversationScenario) {
    ConversationScenario[ConversationScenario["CONVERSATION_SCENARIO_UNSPECIFIED"] = 0] = "CONVERSATION_SCENARIO_UNSPECIFIED";
    ConversationScenario[ConversationScenario["CONVERSATION_SCENARIO_APKPURE_ANDROID_APP"] = 1] = "CONVERSATION_SCENARIO_APKPURE_ANDROID_APP";
    ConversationScenario[ConversationScenario["CONVERSATION_SCENARIO_WEB_FOR_TESTS"] = 2] = "CONVERSATION_SCENARIO_WEB_FOR_TESTS";
    ConversationScenario[ConversationScenario["CONVERSATION_SCENARIO_IMMERSION_WEB_CHAT"] = 3] = "CONVERSATION_SCENARIO_IMMERSION_WEB_CHAT";
    ConversationScenario[ConversationScenario["CONVERSATION_SCENARIO_WEB_CHAT_NORMAL"] = 4] = "CONVERSATION_SCENARIO_WEB_CHAT_NORMAL";
    ConversationScenario[ConversationScenario["CONVERSATION_SCENARIO_IMMERSION_ANDROID_APP"] = 5] = "CONVERSATION_SCENARIO_IMMERSION_ANDROID_APP";
    ConversationScenario[ConversationScenario["CONVERSATION_SCENARIO_NORMAL_ANDROID_APP"] = 6] = "CONVERSATION_SCENARIO_NORMAL_ANDROID_APP";
    ConversationScenario[ConversationScenario["CONVERSATION_SCENARIO_IMMERSION_IOS_APP"] = 7] = "CONVERSATION_SCENARIO_IMMERSION_IOS_APP";
    ConversationScenario[ConversationScenario["CONVERSATION_SCENARIO_NORMAL_IOS_APP"] = 8] = "CONVERSATION_SCENARIO_NORMAL_IOS_APP";
    ConversationScenario[ConversationScenario["CONVERSATION_SCENARIO_BOT_GENERATION"] = 9] = "CONVERSATION_SCENARIO_BOT_GENERATION";
    ConversationScenario[ConversationScenario["CONVERSATION_SCENARIO_WEB3_CHAT"] = 10] = "CONVERSATION_SCENARIO_WEB3_CHAT";
})(ConversationScenario || (exports.ConversationScenario = ConversationScenario = {}));
var ImageGenMessageType;
(function (ImageGenMessageType) {
    ImageGenMessageType[ImageGenMessageType["IMAGE_GEN_MESSAGE_TYPE_UNSPECIFIED"] = 0] = "IMAGE_GEN_MESSAGE_TYPE_UNSPECIFIED";
    ImageGenMessageType[ImageGenMessageType["IMAGE_GEN_MESSAGE_TYPE_SIMPLE_MESSAGE"] = 1] = "IMAGE_GEN_MESSAGE_TYPE_SIMPLE_MESSAGE";
    ImageGenMessageType[ImageGenMessageType["IMAGE_GEN_MESSAGE_TYPE_COMMAND_MESSAGE"] = 2] = "IMAGE_GEN_MESSAGE_TYPE_COMMAND_MESSAGE";
    ImageGenMessageType[ImageGenMessageType["IMAGE_GEN_MESSAGE_TYPE_PANEL_MESSAGE"] = 3] = "IMAGE_GEN_MESSAGE_TYPE_PANEL_MESSAGE";
    ImageGenMessageType[ImageGenMessageType["IMAGE_GEN_MESSAGE_TYPE_REGENERATE_MESSAGE"] = 4] = "IMAGE_GEN_MESSAGE_TYPE_REGENERATE_MESSAGE";
    ImageGenMessageType[ImageGenMessageType["IMAGE_GEN_MESSAGE_TYPE_VARIATION_MESSAGE"] = 5] = "IMAGE_GEN_MESSAGE_TYPE_VARIATION_MESSAGE";
    ImageGenMessageType[ImageGenMessageType["IMAGE_GEN_MESSAGE_TYPE_UPSCALE_MESSAGE"] = 6] = "IMAGE_GEN_MESSAGE_TYPE_UPSCALE_MESSAGE";
    ImageGenMessageType[ImageGenMessageType["IMAGE_GEN_MESSAGE_TYPE_SIMPLE_GIF"] = 7] = "IMAGE_GEN_MESSAGE_TYPE_SIMPLE_GIF";
})(ImageGenMessageType || (exports.ImageGenMessageType = ImageGenMessageType = {}));
