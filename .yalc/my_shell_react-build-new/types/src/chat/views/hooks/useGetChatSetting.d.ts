export default function useChatSetting(): {
    loading: boolean;
    getChatSetting: (botId: string) => Promise<void>;
    updating: boolean;
    updateChatSetting: (botId: string, params: {
        botId: string;
        isAutopushOn: boolean;
        updateAudioOn: {
            isAudioOn: boolean;
        };
        updateAudioPlayOn: {
            isAudioPlayOn: boolean;
        };
        updateTranscriptionOn: {
            isTranscriptionOn: boolean;
        };
        updateTranslationOn: {
            isTranslationOn: boolean;
        };
        speakingLanguage: string;
        audioSpeed: string;
    }) => Promise<void>;
};
