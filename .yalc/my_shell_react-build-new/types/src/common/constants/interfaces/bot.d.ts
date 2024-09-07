import { ReactNode } from 'react';
import { WidgetInfo } from './workshop';
import { MessageDetail } from '../../../chat/model/interfaces';
import { BotPhotoTypeEnum, BotStatusEnum, LLMModelCategoryEnum, LLMModelStatusEnum, VoiceStatus } from '../enums/bot';
export interface TagInfo {
    id: string;
    label: string;
    iconUrl: string;
    labelColors?: {
        light: string;
        dark: string;
    };
    backgroundColors?: {
        light: string;
        dark: string;
    };
    isComingSoon?: string;
    publicBotNum?: string;
    childTags?: TagInfo[];
    parentId?: string;
    extra?: {
        isShowHover?: boolean;
        hoverText?: string | ReactNode;
        isMutexSearch?: boolean;
    };
}
export type AuthorInfo = {
    id: string;
    name: string;
    email: string;
    nameTag: string;
    avatar: string;
    publicAddress: string;
    isNftAvatar: boolean;
    description: string;
    backgroundUrl: string;
    followedCount: number;
    fansCount: number;
    followStatus: string;
    userSource: string;
    membershipInfo: null;
    currentSeasonInfo: null;
    lastSeasonInfo: null;
    userCreatedAt: string;
};
export interface BotInfo {
    userId: string;
    pinned?: boolean;
    id: string;
    language: string | {
        id: string;
        name: string;
    };
    author: AuthorInfo;
    lastInteractionDate?: string | number;
    logo?: string;
    logoUrl?: string;
    description: string;
    name: string;
    token: string;
    privateBotId: number | string;
    botSetting?: {
        inputText: boolean;
        inputVoice: boolean;
        outputText: boolean;
        outputVoice: boolean;
        textMasking: boolean;
        textDisplay: boolean;
        textTranslation: boolean;
        imageInput: boolean;
        imageOutput: boolean;
        openUseSse?: boolean;
        publishBot: boolean;
    };
    tags: Array<{
        id: number;
        label: string;
    }>;
    tagList: TagInfo[];
    energyPerChat: number;
    lastMessage?: MessageDetail;
    status: BotStatusEnum;
    voiceCall: {
        isVoiceCall: boolean;
        isVideoCall: boolean;
        param: string;
    };
    tgName?: string;
    isNsfw: boolean;
    isOfficial: boolean;
    isOfficalAssistantBot: boolean;
    nsfw?: boolean;
    official?: boolean;
    canEditBot?: boolean;
    generateVoiceCostEnergy: number;
    unreadMessageCount: number;
    backgroundImageUrl?: string;
    isSSE?: boolean;
    schemes?: Record<string, any>;
    botPrivateInfo?: Record<string, any>;
    visitorCanChat?: boolean;
    llmModel?: {
        energyPerLevelByPass?: number[];
        model?: LLMModel;
        temperature?: number;
        topP?: number;
        presencePenalty?: number;
        frequencyPenalty?: number;
        maxTokens?: number;
    };
    membershipChatConfig?: {
        isLockByMembershipType: boolean;
        supportedMembershipTypes?: string[];
    };
    imComponent?: any;
    stakingDisabled?: boolean;
    tagsInMyBotList: TagInfo[];
    allTagList: TagInfo[];
    introInfo: string;
    botGenType: string;
    chatPanelType: string;
    backgroundImageThemeHexColors: {
        schemes: {
            light: Record<string, string>;
            dark: Record<string, string>;
        };
    };
    imPanelChatConfig: {
        supportedEmbedTypes: unknown[];
        embedNumberLimit: number;
        supportedSlashCommand: null;
        embedNumberMinimum: number;
    };
    imPanelConfig: {
        supportedFileInfos: Array<{
            fileExtensions: string[];
            maxSingleBytes: number;
            maxTotalBytes: number;
            maxUploadNum: number;
            minUploadNum: number;
            type: string;
        }>;
    };
    createdDateUnix: string;
    updatedDateUnix: string;
    isChannelEntry: boolean;
    isImageGenerator: boolean;
    [key: string]: any | undefined;
}
export interface BotDetail {
    summary?: BotInfo;
    setting?: {
        promptAntiTheft: boolean;
        knowledgeBase: boolean;
        isAsrMultiLanguage: boolean;
        inputText: boolean;
        inputVoice: boolean;
        outputText: boolean;
        outputVoice: boolean;
        textMasking: boolean;
        textDisplay: boolean;
        textTranslation: boolean;
        imageInput: boolean;
        imageOutput: boolean;
        sendIntroMessage: boolean;
        openPrefix: boolean;
        openPostfix: boolean;
        openUseSse: boolean;
        autoUpdatePrefixSuffix: boolean;
        publishPrompt: boolean;
        publishBot: boolean;
    };
    photos?: PhotoInfo[];
    canEditBot?: boolean;
    generateVoiceCostEnergy: number;
    widgets: WidgetInfo[];
    visitorCanChat?: boolean;
    fansKeyInfo: null;
    pinned: boolean;
    inChatList: boolean;
    lastMessage?: MessageDetail;
    unreadMessageCount: number;
    latestInteractionDateUnix: string;
    modeType: ModeTypeEnum;
    devModeRawInput: string;
}
export interface BotsInfo {
    bots?: Record<string, BotDetail>;
}
export interface ReturnedBotInfo {
    photos: PhotoInfo[];
    summary: BotInfo;
}
export interface PhotoInfo {
    id: number;
    imageUrl: string;
    originImageUrl: string;
    thumbnailUrl: string;
    thumbnail: string;
    type: BotPhotoTypeEnum;
}
export interface TTSInfo {
    id: string;
    ttsId: string;
    voiceId: string;
    ids: string[];
    isSystem: string;
    name: string;
    description?: string;
    image: string | null;
    language: {
        id: string;
        name: string;
    };
    languageVersions: string[];
    supportLanguages: string[];
    supportLanguageNames: string[];
    languageVersion: string;
    supportedAccents: string[];
    isMulti: boolean;
    voiceSampleUrl: string | null;
    status: VoiceStatus;
    error?: string | null;
    waitingCount?: number;
    ttsList: any[];
    isPublic?: boolean;
    hasPublished?: boolean;
    widgetId?: string;
}
export interface KnowledgeBaseInfo {
    source: string;
    sourceUid: string;
    sourceType: string;
    status: number;
}
export declare enum KnowledgeSourceStatusEnum {
    Pending = 1,
    Importing = 2,
    Active = 3,
    Invalid = 4
}
export declare enum AsrLangTypeEnum {
    English = "English",
    Mixed = "Mixed"
}
export declare enum ModeTypeEnum {
    CLASSIC = "BOT_MODE_TYPE_CLASSIC",
    DEV = "BOT_MODE_TYPE_DEV",
    NO_CODE = "BOT_MODE_TYPE_NO_CODE",
    SHELL_AGENT = "BOT_MODE_TYPE_OPEN_SOURCE"
}
export declare enum DevModeTypeEnum {
    PRO = "PRO_CONFIG_MODE",
    API = "API_MODE"
}
export interface WorkShopForm {
    botId?: string;
    logo: string;
    logoUrl: string;
    name: string;
    description: string;
    model: string;
    temperature: number;
    topP: number;
    presencePenalty: number;
    frequencyPenalty: number;
    maxTokens: number;
    promptName: string;
    promptDescription: string;
    prompt: string;
    autoUpdatePrefixSuffix: boolean;
    introMessage: string;
    sendIntroMessage: boolean;
    telegramToken: string;
    inputText: boolean;
    inputVoice: boolean;
    outputText: boolean;
    outputVoice: boolean;
    textMasking: boolean;
    textDisplay: boolean;
    textTranslation: boolean;
    imageInput: boolean;
    imageOutput: boolean;
    asrLangType: AsrLangTypeEnum;
    ttsId: string;
    knowledgeBase: boolean;
    tagIds: string;
    prefix?: string;
    postfix?: string;
    openPrefix?: boolean;
    openPostfix?: boolean;
    autoUpdateProfile?: boolean;
    ttsAccent: string;
    voiceId?: string;
    publishPrompt?: boolean;
    publishBot?: boolean;
    isFirstPublishPromptWidget?: boolean;
    modeType?: ModeTypeEnum;
    devModeRawInput?: string;
    nocodeModeStructuredInput?: string;
    opensourceModeInputFile?: string;
    nocodeUsedWidgetIds?: string[];
    devModeType?: DevModeTypeEnum;
}
export interface Filters {
    id: number;
    name: string;
    count: number;
}
export interface BotFilters {
    type: Filters[];
    language: Filters[];
    function: Filters[];
}
export type ActiveType = 'all' | 'mine';
export interface AutoPromptTaskOutput {
    id: number;
    status: 'Done' | 'Processing' | 'Failed';
    errorType?: 'cannot_create_config' | 'timeout';
    error: string;
    name?: string;
    description?: string;
    prompt?: string;
    introMessage?: string;
}
export interface BotTag {
    id: number;
    label: string;
}
export interface ugcList {
    bots: BotInfo[];
    listResponse: {
        hasMore: true | false;
        nextPageToken: string;
    };
}
export interface KolInfo {
    id: string;
    name: string;
    startDateUnix: string;
    awardDateUnix: string;
    endDateUnix: string;
    banner: string;
    bannerSm: string;
    starBots: [
        {
            bot: {
                id: string;
                name: string;
                description: string;
                status: string;
                author: {
                    id: string;
                    name: string;
                    email: string;
                    nameTag: string;
                    avatar: string;
                    publicAddress: string;
                    isNftAvatar: boolean;
                    level: number;
                    isPassCard: boolean;
                    isGenesisCard: boolean;
                };
                logo: string;
                logoUrl: string;
                isNsfw: boolean;
                isOfficial: boolean;
                tgName: string;
                energyPerChat: number;
                privateBotId: string;
                backgroundImageUrl: string;
                introInfo: string;
                botPrivateInfo: {
                    autoPromptTask: {
                        id: string;
                        status: string;
                        prompt: string;
                        introMessage: string;
                        error: string;
                        createdDate: string;
                        errorType: string;
                        name: string;
                        description: string;
                    };
                    model: string;
                    prompt: string;
                    prefix: string;
                    postfix: string;
                    introMessage: string;
                    temperature: number;
                    topP: number;
                    presencePenalty: number;
                    frequencyPenalty: number;
                    maxTokens: number;
                    tgToken: string;
                };
                tags: [
                    {
                        id: string;
                        label: string;
                    }
                ];
                language: {
                    id: string;
                    name: string;
                };
                voiceCall: {
                    isVoiceCall: boolean;
                    isVideoCall: boolean;
                    param: string;
                };
                createdDateUnix: number;
                updatedDateUnix: number;
            };
            tags: string[];
            realAuthorName: string;
            finalScore: number;
            description: string;
            characterImage: string;
        }
    ];
    totalParticipants: number;
    totalPoints: number;
    votedBotId: string;
    votedBotPoints: number;
    earnedPoints: number;
    status: string;
}
export declare enum ConversationScenario {
    CONVERSATION_SCENARIO_UNSPECIFIED = 0,
    CONVERSATION_SCENARIO_APKPURE_ANDROID_APP = 1,
    CONVERSATION_SCENARIO_WEB_FOR_TESTS = 2,
    CONVERSATION_SCENARIO_IMMERSION_WEB_CHAT = 3,
    CONVERSATION_SCENARIO_WEB_CHAT_NORMAL = 4,
    CONVERSATION_SCENARIO_IMMERSION_ANDROID_APP = 5,
    CONVERSATION_SCENARIO_NORMAL_ANDROID_APP = 6,
    CONVERSATION_SCENARIO_IMMERSION_IOS_APP = 7,
    CONVERSATION_SCENARIO_NORMAL_IOS_APP = 8,
    CONVERSATION_SCENARIO_BOT_GENERATION = 9,
    CONVERSATION_SCENARIO_WEB3_CHAT = 10
}
export declare enum ImageGenMessageType {
    IMAGE_GEN_MESSAGE_TYPE_UNSPECIFIED = 0,
    IMAGE_GEN_MESSAGE_TYPE_SIMPLE_MESSAGE = 1,
    IMAGE_GEN_MESSAGE_TYPE_COMMAND_MESSAGE = 2,
    IMAGE_GEN_MESSAGE_TYPE_PANEL_MESSAGE = 3,
    IMAGE_GEN_MESSAGE_TYPE_REGENERATE_MESSAGE = 4,
    IMAGE_GEN_MESSAGE_TYPE_VARIATION_MESSAGE = 5,
    IMAGE_GEN_MESSAGE_TYPE_UPSCALE_MESSAGE = 6,
    IMAGE_GEN_MESSAGE_TYPE_SIMPLE_GIF = 7
}
export interface LLMModel {
    id: string;
    categories: LLMModelCategoryEnum;
    iconUrl?: string;
    modelName: string;
    modelDescription: string;
    description: string;
    status: LLMModelStatusEnum;
    maxChatToken: number;
    energyPerLevelByPass: number[];
    energyPerChatBase: number;
}
