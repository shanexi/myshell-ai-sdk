"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLMModelStatusEnum = exports.LLMModelCategoryEnum = exports.BotPhotoTypeEnum = exports.VoiceStatus = exports.BotStatusEnum = void 0;
var BotStatusEnum;
(function (BotStatusEnum) {
    BotStatusEnum["BOT_STATUS_UNSPECIFIED"] = "BOT_STATUS_UNSPECIFIED";
    BotStatusEnum["Public"] = "Public";
    BotStatusEnum["Active"] = "Active";
    BotStatusEnum["Inactive"] = "Inactive";
})(BotStatusEnum || (exports.BotStatusEnum = BotStatusEnum = {}));
var VoiceStatus;
(function (VoiceStatus) {
    VoiceStatus["Pending"] = "pending";
    VoiceStatus["Processing"] = "processing";
    VoiceStatus["Failed"] = "failed";
    VoiceStatus["Done"] = "done";
})(VoiceStatus || (exports.VoiceStatus = VoiceStatus = {}));
var BotPhotoTypeEnum;
(function (BotPhotoTypeEnum) {
    BotPhotoTypeEnum["BACKGROUND"] = "BACKGROUND";
    BotPhotoTypeEnum["OTHER"] = "OTHER";
})(BotPhotoTypeEnum || (exports.BotPhotoTypeEnum = BotPhotoTypeEnum = {}));
var LLMModelCategoryEnum;
(function (LLMModelCategoryEnum) {
    LLMModelCategoryEnum["BOT_CHAT_MODEL_CATEGORY_UNSPECIFIED"] = "BOT_CHAT_MODEL_CATEGORY_UNSPECIFIED";
    LLMModelCategoryEnum["BOT_CHAT_MODEL_CATEGORY_CLOSESOURCE"] = "BOT_CHAT_MODEL_CATEGORY_CLOSESOURCE";
    LLMModelCategoryEnum["BOT_CHAT_MODEL_CATEGORY_OPENSOURCE"] = "BOT_CHAT_MODEL_CATEGORY_OPENSOURCE";
    LLMModelCategoryEnum["BOT_CHAT_MODEL_CATEGORY_SELFDEVELOP"] = "BOT_CHAT_MODEL_CATEGORY_SELFDEVELOP";
})(LLMModelCategoryEnum || (exports.LLMModelCategoryEnum = LLMModelCategoryEnum = {}));
var LLMModelStatusEnum;
(function (LLMModelStatusEnum) {
    LLMModelStatusEnum["BOT_CHAT_MODEL_STATUS_UNSPECIFIED"] = "BOT_CHAT_MODEL_STATUS_UNSPECIFIED";
    LLMModelStatusEnum["BOT_CHAT_MODEL_STATUS_ACTIVE"] = "BOT_CHAT_MODEL_STATUS_ACTIVE";
    LLMModelStatusEnum["BOT_CHAT_MODEL_STATUS_INVISIBLE"] = "BOT_CHAT_MODEL_STATUS_INVISIBLE";
    LLMModelStatusEnum["BOT_CHAT_MODEL_STATUS_DISABLE"] = "BOT_CHAT_MODEL_STATUS_DISABLE";
})(LLMModelStatusEnum || (exports.LLMModelStatusEnum = LLMModelStatusEnum = {}));
