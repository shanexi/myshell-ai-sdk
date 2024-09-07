"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioSpeedMap = exports.defaultChatSetting = void 0;
const definitions_1 = require("./definitions.js");
exports.defaultChatSetting = {
    isAutopushOn: true,
    isAudioOn: false,
    isAudioPlayOn: false,
    isTranscriptionOn: true,
    isTranslationOn: true,
    speakingLanguage: definitions_1.ChatSettingSpeakingLangEnum.AUTO,
    audioSpeed: definitions_1.ChatSettingAudioSpeed.ONE
};
exports.AudioSpeedMap = {
    BOT_CHAT_SETTING_AUDIO_SPEED_ZERO_POINT_FIVE: 0.5,
    BOT_CHAT_SETTING_AUDIO_SPEED_ZERO_POINT_SEVEN_FIVE: 0.75,
    BOT_CHAT_SETTING_AUDIO_SPEED_ONE: 1,
    BOT_CHAT_SETTING_AUDIO_SPEED_ONE_POINT_TWENTY_FIVE: 1.25,
    BOT_CHAT_SETTING_AUDIO_SPEED_ONE_POINT_FIVE: 1.5
};
