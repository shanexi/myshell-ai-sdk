import { ChatSettingAudioSpeed, ChatSettingSpeakingLangEnum } from './definitions.js';
export const defaultChatSetting = {
    isAutopushOn: true,
    isAudioOn: false,
    isAudioPlayOn: false,
    isTranscriptionOn: true,
    isTranslationOn: true,
    speakingLanguage: ChatSettingSpeakingLangEnum.AUTO,
    audioSpeed: ChatSettingAudioSpeed.ONE
};
export const AudioSpeedMap = {
    BOT_CHAT_SETTING_AUDIO_SPEED_ZERO_POINT_FIVE: 0.5,
    BOT_CHAT_SETTING_AUDIO_SPEED_ZERO_POINT_SEVEN_FIVE: 0.75,
    BOT_CHAT_SETTING_AUDIO_SPEED_ONE: 1,
    BOT_CHAT_SETTING_AUDIO_SPEED_ONE_POINT_TWENTY_FIVE: 1.25,
    BOT_CHAT_SETTING_AUDIO_SPEED_ONE_POINT_FIVE: 1.5
};
