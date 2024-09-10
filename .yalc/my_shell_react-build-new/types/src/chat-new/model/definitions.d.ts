import { ReactNode } from 'react';
import { ImSlashCommandInput, MessageComponentsContainer, RecommandationQuestion, ReferenceSource } from '../../chat/model/interfaces';
export declare enum EditorMode {
    NORMAL = 0,
    SHARE = 1
}
export declare enum InputMode {
    TEXT = 0,
    VOICE = 1
}
export declare enum JobTypeEnum {
    UNSPECIFIED = "JOB_TYPE_UNSPECIFIED",
    BOT_CREATE = "JOB_TYPE_BOT_CREATE",
    BOT_UPDATE_PROMPT = "JOB_TYPE_BOT_UPDATE_PROMPT",
    IMAGE_GEN_REQUEST = "JOB_TYPE_GENERATION_IMAGE_REQUEST",
    COMP_GEN_REQUEST = "JOB_TYPE_GENERATION_COMPONENT_REQUEST",
    LEPTON_INNER_GEN_QUEUE = "JOB_TYPE_GENERATION_LEPTON_INNER_QUEUE",
    WIDGET_AUTO_PROMPT = "JOB_TYPE_WIDGET_AUTO_PROMPT",
    WIDGET_VOICE_CLONE = "JOB_TYPE_WIDGET_VOICE_CLONE",
    RUNNING_ASYNC_STATE_MACHINE = "JOB_TYPE_RUNNING_ASYNC_STATE_MACHINE"
}
export declare enum JobStatusEnum {
    WAITING = "JOB_STATUS_WAITING",
    DOING = "JOB_STATUS_DOING",
    DONE = "JOB_STATUS_DONE",
    FAILED = "JOB_STATUS_FAILED",
    CANCELED = "JOB_STATUS_CANCELED"
}
export declare enum EmbedObjStatus {
    UNKNOWN = "EMBED_OBJ_STATUS_UNSPECIFIED",
    PENDING = "EMBED_OBJ_STATUS_PENDING",
    PROCESSING = "EMBED_OBJ_STATUS_PROCESSING",
    DONE = "EMBED_OBJ_STATUS_DONE",
    ERROR = "EMBED_OBJ_STATUS_ERROR",
    DELETED = "EMBED_OBJ_STATUS_DELETED",
    QUEUEING = "EMBED_OBJ_STATUS_QUEUEING"
}
export declare enum EmbedObjType {
    UNKNOWN = "MESSAGE_METADATA_TYPE_UNSPECIFIED",
    IMAGE = "MESSAGE_METADATA_TYPE_IMAGE_FILE",
    DOC = "MESSAGE_METADATA_TYPE_TEXT_FILE",
    AUDIO = "MESSAGE_METADATA_TYPE_AUDIO_FILE",
    VIDEO = "MESSAGE_METADATA_TYPE_VIDEO_FILE",
    TEXT_CONTENT = "MESSAGE_METADATA_TYPE_TEXT_CONTENT",
    AUDIO_CONTENT = "MESSAGE_METADATA_TYPE_USER_AUDIO",
    ALL = "MESSAGE_METADATA_TYPE_ALL_FILE"
}
export declare enum FeedbackState {
    NORMAL = "Normal",
    LIKED = "Liked",
    DISLIKE = "Dislike"
}
export declare enum ChatSettingSpeakingLangEnum {
    UNSPECIFIED = "BOT_CHAT_SETTING_SPEAKING_LANGUAGE_UNSPECIFIED",
    AUTO = "BOT_CHAT_SETTING_SPEAKING_LANGUAGE_AUTO",
    EN = "BOT_CHAT_SETTING_SPEAKING_LANGUAGE_EN",
    ZH = "BOT_CHAT_SETTING_SPEAKING_LANGUAGE_ZH",
    JA = "BOT_CHAT_SETTING_SPEAKING_LANGUAGE_JA",
    RU = "BOT_CHAT_SETTING_SPEAKING_LANGUAGE_RU",
    ES = "BOT_CHAT_SETTING_SPEAKING_LANGUAGE_ES",
    KO = "BOT_CHAT_SETTING_SPEAKING_LANGUAGE_KO"
}
export declare enum ChatSettingAudioSpeed {
    UNSPECIFIED = "BOT_CHAT_SETTING_AUDIO_SPEED_UNSPECIFIED",
    ZERO_POINT_FIVE = "BOT_CHAT_SETTING_AUDIO_SPEED_ZERO_POINT_FIVE",
    ZERO_POINT_SEVEN_FIVE = "BOT_CHAT_SETTING_AUDIO_SPEED_ZERO_POINT_SEVEN_FIVE",
    ONE = "BOT_CHAT_SETTING_AUDIO_SPEED_ONE",
    ONE_POINT_TWENTY_FIVE = "BOT_CHAT_SETTING_AUDIO_SPEED_ONE_POINT_TWENTY_FIVE",
    ONE_POINT_FIVE = "BOT_CHAT_SETTING_AUDIO_SPEED_ONE_POINT_FIVE"
}
export declare enum MenuFunctionEnum {
    REMOVE_FROM_LIST = 0,
    SHARE = 1,
    CLEAR_MEMORY = 2,
    CLEAR_HISTORY = 3
}
export declare enum MenuActionType {
    Like = "Like",
    Dislike = "Dislike",
    Copy_Message = "Copy Message",
    Stop_Generating = "Stop Generating",
    Regenerate = "Regenerate",
    Edit = "Edit",
    Translate = "Translate",
    Show_Text = "Show Text",
    Download_Voice = "Download Voice",
    Share = "Share",
    Delete = "Delete",
    Remove_Dislike = "Remove Dislike",
    Regenerate_Voice = "Regenerate Voice",
    Feedback = "Feedback",
    Save_Image = "Save Image",
    Copy_Image = "Copy Image",
    Copy_Image_Link = "Copy Image Link"
}
export declare enum RunningErrorEnum {
    UNSPECIFIED = "RUNNING_ERROR_TYPE_UNSPECIFIED",
    ENGINE_ERROR = "RUNNING_ERROR_TYPE_ENGINE_ERROR",
    INNER_COMPONENT_ERROR = "RUNNING_ERROR_TYPE_INNER_COMPONENT_ERROR",
    ENERGY_INSUFFICIANT = "RUNNING_ERROR_TYPE_ENERGY_INSUFFICIANT",
    LLM_TOKEN_TOO_LONG = "RUNNING_ERROR_TYPE_LLM_TOKEN_TOO_LONG"
}
export declare enum ImageGenStatus {
    UNSPECIFIED = "MESSAGE_STATUS_UNSPECIFIED",
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    DONE = "DONE",
    ERROR = "ERROR",
    DELETED = "DELETED",
    CANCELED = "CANCELED"
}
export declare enum ImageGenType {
    UNSPECIFIED = "IMAGE_GEN_MESSAGE_TYPE_UNSPECIFIED",
    SIMPLE = "IMAGE_GEN_MESSAGE_TYPE_SIMPLE_MESSAGE",
    COMMAND = "IMAGE_GEN_MESSAGE_TYPE_COMMAND_MESSAGE",
    PANEL = "IMAGE_GEN_MESSAGE_TYPE_PANEL_MESSAGE",
    REGEN = "IMAGE_GEN_MESSAGE_TYPE_REGENERATE_MESSAGE",
    VARIATION = "IMAGE_GEN_MESSAGE_TYPE_VARIATION_MESSAGE",
    UPSCALE = "IMAGE_GEN_MESSAGE_TYPE_UPSCALE_MESSAGE",
    GIF = "IMAGE_GEN_MESSAGE_TYPE_SIMPLE_GIF"
}
export type ServerMessageStatus = 'PENDING' | 'PROCESSING' | 'DONE' | 'ERROR' | 'DELETED';
export type SharedMessageStatus = 'CANCELED';
export type LocalMessageStatus = 'LOCAL_ERROR' | 'CANCELING';
export type DraftMessageStatus = 'DRAFT';
export type MessageStatus = DraftMessageStatus | LocalMessageStatus | SharedMessageStatus | ServerMessageStatus;
type UserSendMessageType = 'TEXT' | 'VOICE' | 'BUTTON_INTERACTION';
export type MessageType = UserSendMessageType | 'REPLY' | 'RESET' | 'PROMPT_UPDATED' | 'GREETING' | 'MORE_BOT_TO_EXPLORER' | 'NEED_TO_REGISTER' | 'VOICE_CALL_END' | 'VOICE_CALL_TEXT' | 'VOICE_CALL_VOICE' | 'VOICE_CALL_REPLY' | 'LLM_MODERATION_REQUEST' | 'WIDGET_PROMPT_UPDATED';
export type LocalMessageType = 'PENDING_FOR_RESPONSE' | 'ROOM_CLOSED' | 'OTHER_SIDE_LEFT' | 'OTHER_SIDE_NO_ENOUGH_ENERGY';
export type MessageDisplayType = 'NORMAL' | 'NOTIFICATION' | 'INFO';
export type MessageSource = 'USER' | 'OTHER';
export type WidgetRunningStatusType = 'PROCESSING' | 'ERROR' | 'DONE';
export type MediaFileMetadata = {
    width?: number;
    height?: number;
    thumbnail?: string;
    generateModel?: string;
};
type MessageInputSetting = {
    canInputText: boolean;
    canInputAudio: boolean;
};
type MessageUploadSetting = {
    supportedFileInfos: Array<{
        fileExtensions: string[];
        maxSingleBytes: number;
        maxTotalBytes: number;
        maxUploadNum: number;
        minUploadNum: number;
        type: string;
    }>;
};
type SdParams = {
    prompt: string;
    negativePrompt: string;
    model: string;
    imageWidth: number;
    imageHeight: number;
    samplingMethod: string;
    samplingSteps: number;
    cfgScale: number;
    seed: number;
    reflectModelId: string;
};
type GenParams = {
    batchNumber: number;
    imageNumber: number;
    batchCount: number;
    sdParam: SdParams;
};
export interface ImageGenDetail {
    imgBatch: Array<{
        img: string[];
    }>;
    genStatus: ImageGenStatus;
    jobId: string;
    metadata?: {
        width?: number;
        height?: number;
        jobId: string;
        genType: ImageGenType;
    };
    genParams?: GenParams;
}
export type AsyncJobInfo = {
    jobId: string;
    componentInput: string;
    status: EmbedObjStatus;
};
export type RunningWidgetInfo = {
    widgetName: string;
    endTimeTimestamp: string;
    startTimeTimestamp: string;
    widgetLogo: string;
    status: WidgetRunningStatusType;
};
export type MessageExtraInfo = {
    canEdit: boolean;
    canRegenerate: boolean;
    consumeEnergy: number;
    runningWidgetInfo?: RunningWidgetInfo[];
};
export type ChatSetting = {
    isAutopushOn: boolean;
    isAudioOn: boolean;
    isAudioPlayOn: boolean;
    isTranscriptionOn: boolean;
    isTranslationOn: boolean;
    speakingLanguage: ChatSettingSpeakingLangEnum;
    audioSpeed: ChatSettingAudioSpeed;
};
export type MemberInfo = {
    id?: string;
    isEntity?: boolean;
    name?: string;
    avatar?: string;
    nameTag?: string;
    isVisitor?: boolean;
};
export type SourceType = 'menubar' | 'contextmenu';
export type MessageDisplayMode = 'NORMAL' | 'TRANSLATION' | 'EDIT';
export type TranslationStatus = 'TRANSLATING' | 'ERROR';
export type RunningError = {
    requireEnergyToUse?: number;
    errorDetail: string;
    errorType: RunningErrorEnum;
};
export interface UserSendEmbedObj {
    title: string;
    type: EmbedObjType;
    url: string;
    mediaFileMetadata?: MediaFileMetadata;
}
export interface EmbedObj extends UserSendEmbedObj {
    id?: string;
    type: EmbedObjType;
    status: EmbedObjStatus;
    extensionName: string;
    iconUrl: string;
}
export interface ServerMessage {
    id: string;
    userId: string;
    botId: string;
    status: ServerMessageStatus | SharedMessageStatus;
    type: MessageType;
    createdDateUnix: string;
    updatedDateUnix: string;
    referenceText?: string;
    text?: string;
    handled?: boolean;
    translation?: string;
    voiceUrl?: string;
    voiceFileDurationSeconds?: number;
    feedbackState?: FeedbackState;
    feedbackIssues?: string[];
    audioSpeed?: number;
    imageGenMessageResponse?: ImageGenDetail;
    embedObjs?: EmbedObj[];
    imSlashCommandInput?: ImSlashCommandInput;
    asyncJobInfo?: AsyncJobInfo;
    widgetId?: string;
    replyId?: string;
    referenceSource?: ReferenceSource[];
    recommendationQuestion?: RecommandationQuestion;
    componentContainer?: MessageComponentsContainer;
    inputSetting?: MessageInputSetting;
    uploadSetting?: MessageUploadSetting;
    regeneratedMessages?: Message[];
    extraInfo?: MessageExtraInfo;
    runningError?: RunningError;
}
interface BaseMessage {
    id: string;
    userId: string;
    entityId: string;
    createdDateUnix: string;
    updatedDateUnix: string;
    type: MessageType | LocalMessageType;
    referenceText?: string;
    text?: string;
    replyId?: string;
}
export interface Message extends BaseMessage {
    audioSpeed?: number;
    audioUrl?: string;
    duration?: number;
    audioBuffer?: ArrayBuffer[];
    translation?: string;
    feedbackState?: FeedbackState;
    feedbackIssues?: string[];
    status: MessageStatus;
    asyncJobInfo?: AsyncJobInfo;
    runningWidgetInfo?: RunningWidgetInfo[];
    runningError?: RunningError;
    handled?: boolean;
    imageGenMessageResponse?: ImageGenDetail;
    inputSetting?: MessageInputSetting;
    uploadSetting?: MessageUploadSetting;
    componentContainer?: MessageComponentsContainer;
}
export interface LocalMessage extends BaseMessage {
    audioBlobDataURI?: string;
    type: Extract<MessageType, 'TEXT' | 'VOICE' | 'BUTTON_INTERACTION'>;
}
export interface DraftMessage extends LocalMessage {
    status: DraftMessageStatus;
}
export interface LocalErrorMessage extends LocalMessage {
    status: Extract<LocalMessageStatus, 'LOCAL_ERROR'>;
}
export interface DisplayMessage extends Message {
    avatar?: string;
    name?: string;
    replyTo?: MemberInfo;
    source: MessageSource;
    msgDisplayType: MessageDisplayType;
    buttons?: ReactNode;
}
export {};
}
export {};
