import { Observable } from 'rxjs';
import { ChatSetting, Language, MessageDetail } from '../../../src/chat/model/interfaces';
import { AutoPromptTaskOutput, BotFilters, BotInfo, BotsInfo, BotTag, LLMModel, ReturnedBotInfo, TagInfo, TTSInfo, ugcList } from '../../../src/common/constants/interfaces/bot';
import { ResponseType } from '../../../src/core/request/APIFetch';
export declare function getBotListInChatList(source?: 'web3' | 'web2', query?: string): Promise<ResponseType<BotInfo[]>>;
export declare function getOwnBotList(): Promise<ResponseType<BotInfo[]>>;
export declare function getToolboxList(): Promise<ResponseType<BotInfo[]>>;
export declare function searchBotList(pageToken?: string, pageSize?: number, query?: string, includeTagIds?: string[], excludeTagIds?: string[]): Promise<ResponseType<ugcList>>;
export declare function getSelectedBoForLandingPage(id?: string): Observable<BotInfo[]>;
export declare function getBotInfo(ids: string | string[], production?: boolean): Observable<BotsInfo>;
export declare function getBotInfoV2(ids: string | string[], production?: boolean): Promise<ResponseType<BotsInfo>>;
export declare function voiceCreate(audioUrl: string): Promise<ResponseType<{
    ttsId: any;
    status: any;
}>>;
export declare function voiceEdit(ttsId: string, name: string, imageUrl: string): Promise<ResponseType<TTSInfo>>;
export declare function voicePreview(ttsId: string, text: string): Promise<ResponseType<string>>;
export declare function voiceRecreate(ttsId: string): Promise<ResponseType<{
    ttsId: any;
    status: any;
}>>;
export declare function voiceUsages(ttsId: string): Promise<ResponseType<any>>;
export declare function getTtsList(): Observable<TTSInfo[]>;
export declare function getMyVoice(): Observable<TTSInfo[]>;
export declare function createVoice(data: {
    file: File;
}): Observable<TTSInfo>;
export declare function editVoice(data: {
    id: number;
    name?: string;
    file?: File;
}): Observable<TTSInfo>;
export declare function deleteVoice(id: number): Observable<boolean>;
export declare function getVoiceUsage(id: number): Observable<any[]>;
export declare function voiceReCreation(id: number): Observable<boolean>;
export declare function previewTts(text: string, ttsUid: string): Observable<string>;
export declare function setBotPinnedStatus(botId: string, pinned: boolean): Promise<ResponseType<void>>;
export declare function createBot(name: string, prompt: string, autoPromptTaskId: string, autoUpdateProfile: boolean): Promise<ResponseType<unknown>>;
export declare function saveBot(data: Partial<{
    botId: string;
    logo?: File | string | null;
    name?: string;
    description?: string;
    inputText?: boolean;
    inputVoice?: boolean;
    outputText?: boolean;
    outputVoice?: boolean;
    textMasking?: boolean;
    textDisplay?: boolean;
    textTranslation?: boolean;
    imageInput?: boolean;
    imageOutput?: boolean;
    isAsrMultiLanguage?: boolean;
    ttsId?: string;
    ttsAccent?: string;
    knowledgeBase?: boolean;
    tags?: string;
    autoUpdatePrefixSuffix?: boolean;
    introMessage?: string;
    sendIntroMessage?: boolean;
    model?: string;
    temperature?: string;
    prompt?: string;
    prefix: string;
    postfix: string;
    openPrefix: boolean;
    openPostfix: boolean;
    autoUpdateProfile: boolean;
    modelParm: {
        modelId?: string;
        temperature?: number;
        topP?: number;
        presencePenalty?: number;
        frequencyPenalty?: number;
        maxTokens?: number;
    };
    publishPrompt?: boolean;
    publishBot?: boolean;
    [key: string]: any;
}>): Promise<ResponseType<unknown>>;
export declare function getBotJobInfo(jobId: string): Promise<ResponseType<unknown>>;
export declare function resetBot(botId: string): Promise<ResponseType<any>>;
export declare function setMessageHandled(msgId: string): Promise<ResponseType<any>>;
export declare function createOrUpdateUgcBot(data: Partial<{
    logo?: File | null;
    name: string;
    description: string;
    prompt: string;
    inputText: boolean;
    inputVoice: boolean;
    outputText: boolean;
    outputVoice: boolean;
    textMasking: boolean;
    textDisplay: boolean;
    textTranslation: boolean;
    imageInput: boolean;
    imageOutput: boolean;
    isAsrMultiLanguage: boolean;
    autoUpdatePrefixSuffix: boolean;
    introMessage: string;
    sendIntroMessage: boolean;
    model: string;
    temperature: number;
    topP: number;
    presencePenalty: number;
    frequencyPenalty: number;
    maxTokens: number;
    [key: string]: any;
}>): Observable<BotInfo>;
export declare function resetUnReadMessageCount(botId: string): Promise<ResponseType<unknown>>;
export declare function addBotToChatList(botId: string, src?: number): Promise<ResponseType<{
    botInfo: {
        id: string;
        name: string;
    };
    greetingMessage: MessageDetail;
}>>;
export declare function removeBotFromChatList(botId: string): Promise<ResponseType<void>>;
export declare function validateCreateUgcBotAction(): Observable<boolean>;
export declare function publishBot(botId: string): Observable<any>;
export declare function unpublishBot(botId: string): Observable<any>;
export declare function getLanguageList(): Promise<ResponseType<Language[]>>;
export declare function getSharedBotInfo(code: string): Observable<BotInfo>;
export declare function getBotSharingCode(botId: string): Promise<string>;
export declare function getBotSharingCodeByBotId(botId: string): Promise<ResponseType<{
    code: "";
}>>;
export declare function getBotSharedDetail(code: string): Promise<ResponseType<unknown>>;
export declare function getTagInfos(tagType: 'BOT_TAG_TYPE_SEARCH' | 'BOT_TAG_TYPE_EDIT', showNsfw?: boolean): Promise<ResponseType<TagInfo[]>>;
export declare function getBotFilters(excludeNsfw: boolean): Observable<BotFilters>;
export declare function bindTgToken(token: string, botId: string): Observable<void>;
export declare function createAutoPromptTask(name: string, description: string): Observable<AutoPromptTaskOutput>;
export declare function getAdvanedPrompt(botId: string): Observable<Record<string, string>>;
export declare function getAutoPromptTask(id: number): Observable<AutoPromptTaskOutput>;
export declare function uploadBotPhoto(botId: string, objectKeys: string[], type: 'OTHER' | 'BACKGROUND'): Promise<ResponseType<ReturnedBotInfo>>;
export declare function removeBotPhoto(data: {
    botId: string;
    photoIds: string[];
}): Promise<ResponseType<ReturnedBotInfo>>;
export declare function getAllBotTags(): Observable<BotTag[]>;
export declare function getRecommendBots(): Promise<any>;
export declare function addBotToChatListV2(botIds: string[], src?: string): Promise<any>;
export declare function getBotChatSetting(botId: string): Promise<ResponseType<ChatSetting>>;
export declare function updateBotChatSetting(params: {
    botId: string;
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
}): Promise<ResponseType<ChatSetting>>;
export declare function getAvailableLlmModels(): Promise<ResponseType<LLMModel[]>>;
export declare function checkBotJointConfig(json: string): Promise<ResponseType<unknown>>;
export declare function terminateGeneration(id: string, msgId: string, index?: string): Promise<ResponseType<unknown>>;
export declare function mediaFileMetadata(params: {
    media_file_url: string;
}): Promise<{
    meta: {
        generateModel: string;
        height: number;
        thumbnail: string;
        width: number;
    };
}>;
