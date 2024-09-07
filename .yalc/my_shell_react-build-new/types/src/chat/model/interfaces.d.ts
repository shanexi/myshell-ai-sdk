import { MessageComponentsButtonActionInteractionInputDisplayTypeEnum, MessageComponentsButtonActionTypeEnum, MessageComponentsButtonContentDirectionEnum, MessageComponentsTypeEnum, MessageStatusEnum, MessageTypeEnum } from './enums';
import { ImComponent } from '../../common/constants/interfaces/workshop';
export interface ReferenceSource {
    title: string;
    link: string;
    snippet: string;
    displayLint: string;
}
export interface RecommandationQuestion {
    question: string[];
}
export type WidgetRunningStatusType = 'PROCESSING' | 'ERROR' | 'DONE';
export interface MessageComponentsContainer {
    type: MessageComponentsTypeEnum;
    components: MessageComponentsContainer[];
    button?: MessageComponentsButton;
}
export interface MessageComponentsButtonStyle {
    fontColorHex: string;
    backgroundColorHex: string;
    borderColorHex: string;
    darkModeBackgroundColorHex: string;
    darkModeFontColorHex: string;
    darkModeBorderColorHex: string;
    iconLineColorHex: string;
    darkModeIconLineColorHex: string;
}
export interface MessageComponentsButtonContent {
    text: string;
    iconUrl?: string;
    iconLabel?: string;
    direction?: MessageComponentsButtonContentDirectionEnum;
    description?: string;
}
export interface MessageComponentsButtonActionInteraction {
    displayType: MessageComponentsButtonActionInteractionInputDisplayTypeEnum;
    slashCommandInput: ImSlashCommandInput;
    content: string;
}
export interface MessageComponentsButtonAction {
    action: MessageComponentsButtonActionTypeEnum;
    actionLink?: string;
    componentInput?: ImComponent;
    clipboardContent?: string;
    interactionInput?: MessageComponentsButtonActionInteraction;
}
export interface MessageComponentsButton {
    content: MessageComponentsButtonContent;
    style: MessageComponentsButtonStyle;
    buttonId: string;
    actions: MessageComponentsButtonAction[];
    disabled: boolean;
    doubleCheck: {
        isNeedDoubleCheck: boolean;
        title: string;
        description: string;
    };
}
export interface ImSlashCommandInput {
    name: string;
    paramMap: Record<string, string>;
}
export interface IRunningWidgetInfo {
    widgetName: string;
    endTimeTimestamp: string;
    startTimeTimestamp: string;
    widgetLogo: string;
    status: WidgetRunningStatusType;
}
export interface MessageDetail {
    id: string;
    localId?: string;
    replaceId?: string;
    deleteId?: string;
    userId: string;
    status: MessageStatusEnum;
    type: MessageTypeEnum;
    text: string;
    translation?: string;
    botId: string;
    botUid: string;
    replyUid?: string;
    voiceUrl?: string;
    duration?: number;
    createdDate: string | number;
    updatedDate?: string | number;
    handled?: boolean;
    isFromHistory?: boolean;
    feedbackState: number;
    feedbackIssues?: string[];
    voiceFileDurationSeconds: number;
    textStream?: TextStreamDetail[];
    audioStream?: AudioStreamDetail[];
    imageGenMessageResponse?: ImageDetail;
    translationStream?: TranslationStreamDetail[];
    audioSpeed: number;
    userSentMsg?: MessageDetail;
    embedObjs?: any[];
    asyncJobInfo?: any;
    modelStatus?: string;
    createdDateUnix: string;
    referenceSource?: ReferenceSource[];
    recommendationQuestion?: RecommandationQuestion;
    imSlashCommandInput: ImSlashCommandInput;
    componentContainer: MessageComponentsContainer;
    isLocalSend?: boolean;
    isLocalReply?: boolean;
    replaceLocalSend?: boolean;
    replaceLocalReply?: boolean;
    inputSetting?: IUploadSettings & {
        canInputText: boolean;
        canInputAudio: boolean;
        canUploadFile: boolean;
    };
    callAgentTx?: `0x${string}`;
    extraInfo?: {
        runningWidgetInfo?: IRunningWidgetInfo[];
    };
    runningError?: {
        requireEnergyToUse?: number;
        errorDetail: string;
        errorType: MessageRunningErrorType;
    };
    [key: string]: any | undefined;
}
export declare enum MessageRunningErrorType {
    RUNNING_ERROR_TYPE_UNSPECIFIED = "RUNNING_ERROR_TYPE_UNSPECIFIED",
    RUNNING_ERROR_TYPE_ENGINE_ERROR = "RUNNING_ERROR_TYPE_ENGINE_ERROR",
    RUNNING_ERROR_TYPE_INNER_COMPONENT_ERROR = "RUNNING_ERROR_TYPE_INNER_COMPONENT_ERROR",
    RUNNING_ERROR_TYPE_ENERGY_INSUFFICIANT = "RUNNING_ERROR_TYPE_ENERGY_INSUFFICIANT",
    RUNNING_ERROR_TYPE_LLM_TOKEN_TOO_LONG = "RUNNING_ERROR_TYPE_LLM_TOKEN_TOO_LONG"
}
export interface IUploadSettings {
    supportedEmbedTypes?: string[];
    embedNumberLimit?: number;
    embedNumberMinimum?: number;
    embedMaxFileBytesEach?: string;
}
export declare const FeedbackSateEnum: {
    readonly Normal: 0;
    readonly Liked: 1;
    readonly Dislike: 2;
};
export interface ErrorMessageDetail {
    id: string;
    status: MessageStatusEnum;
    type: MessageTypeEnum;
    text?: string;
    base64?: string;
    voiceUrl?: string;
}
export interface StreamDetail {
    index: number;
    isFinal: boolean;
}
export interface TextStreamDetail extends StreamDetail {
    replyMessage: MessageDetail;
    text: string;
    modelStatus?: string;
    embedObjs?: any;
    isJob?: boolean;
}
export interface AudioStreamDetail extends StreamDetail {
    replyMessage: MessageDetail;
    audio: ArrayBuffer;
}
export declare enum ImageStatus {
    DONE = "DONE",
    PROCESSING = "PROCESSING",
    ERROR = "ERROR"
}
export interface ImageStreamDetail {
    replyMessage: MessageDetail;
    imageGenMessageResponse: ImageDetail;
    genStatus: ImageStatus;
}
interface Image {
    img: string[];
}
export interface ImageDetail {
    imgBatch: Image[];
    metadata?: {
        width?: string | number;
        height?: string | number;
        [key: string]: any;
    };
    genStatus: ImageStatus;
    jobId?: string;
    [key: string]: any;
}
export interface TranslationStreamDetail extends StreamDetail {
    message: MessageDetail;
    text: string;
}
export interface Language {
    id: number;
    name: string;
    displayName: string;
}
export interface VoiceChatAzureToken {
    token: string;
    region: string;
}
export declare enum MsgEvents {
    AUTH_FAIL = "auth_fail",
    MSG_ERROR = "message_error",
    MSG_SENT = "message_sent",
    REPLY_MSG_CREATED = "reply_message_created",
    MSG_UPDATED = "message_updated",
    MSG_TEXT_STREAM = "text_stream",
    MSG_AUDIO_STREAM = "audio_stream",
    MSG_REPLIED = "message_replied",
    MSG_TRANSLATED = "message_translated",
    TRANSLATION_STREAM = "translation_stream",
    ENERGY_INFO = "energy_info",
    NO_ENOUGH_ENERGY = "no_enough_energy",
    EXCEPTION = "exception",
    RESET_MEMORY = "reset_memory",
    BOT_PROMPT_UPDATED = "bot_prompt_updated",
    CONNECTED_TO_DISCORD = "connected_to_discord",
    CONNECTED_TO_TWITTER = "connected_to_twitter",
    NEED_VERIFY_CAPTCHA = "need_verify_captcha",
    VOICE_CALL_END = "voice_call_end",
    CHAT_LOGIN_POPUP = "chat_login_popup"
}
export declare const SSEEvents: {
    readonly MESSAGE_SENT: "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_USER_SENT_MESSAGE_CREATED";
    readonly MESSAGE_REPLYING: "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_USER_SENT_MESSAGE_REPLYING";
    readonly MESSAGE_IS_TEXT: "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_TEXT";
    readonly MESSAGE_TEXT_DONE: "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_TEXT_STREAM_PUSH_FINISHED";
    readonly MESSAGE_REPLIED: "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_USER_SENT_MESSAGE_REPLIED";
    readonly MESSAGE_VOICE_RECEIVED: "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_VOICE_FILE_UPLOADED";
    readonly DURATION_CALCULATED: "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_AUDIO_FILE_DURATION_CALCULATED";
    readonly MESSAGE_VOICE_BYTE: "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_VOICE_BYTES";
    readonly MESSAGE_CONSUME_ENERGY: "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_USER_CONSUMED_ENERGY";
    readonly MESSAGE_INTERNAL_ERROR: "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_ERROR";
    readonly IMAGE_GEN_PROCESSING: "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_IMAGE_GEN_PROCESSING";
    readonly IMAGE_GEN_DONE: "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_IMAGE_GEN_DONE";
    readonly IMAGE_GEN_ERROR: "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_IMAGE_GEN_ERROR";
    readonly LLM_MODERATION_REQUEST: "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_LLM_MODERATION_REQUEST";
    readonly EMBED_OBJ_PUSHED: "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_EMBED_OBJ_PUSHED";
    readonly MESSAGE_REPLY_GENERATION_JOB_CREATED: "MESSAGE_REPLY_GENERATION_JOB_CREATED";
    readonly MESSAGE_REPLY_REFERENCE_SOURCE: "MESSAGE_REPLY_GENERATION_JOB_CREATED";
    readonly MESSAGE_REPLY_RECOMMND_QUESTION: "MESSAGE_REPLY_RECOMMND_QUESTION";
    readonly MESSAGE_REPLY_UPDATE_HISTORY_MESSAGE: "MESSAGE_REPLY_UPDATE_HISTORY_MESSAGE";
    readonly MESSAGE_REPLY_CREATE_WHOLD_MESSAGE: "MESSAGE_REPLY_CREATE_WHOLD_MESSAGE";
    readonly MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_RECOMMEND_BOT_SUCCESS: "MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_RECOMMEND_BOT_SUCCESS";
};
export declare const AzureLanguageCode: {
    [key: string]: string;
};
export interface ChatSetting {
    isAutopushOn: boolean;
    isAudioOn: boolean;
    isAudioPlayOn: boolean;
    isTranscriptionOn: boolean;
    isTranslationOn: boolean;
    speakingLanguage: string;
    audioSpeed: string;
    energyPerChat?: number;
    energyPerLevelByPass?: number[];
}
export declare const AudioSpeedMap: {
    [key: string]: number;
};
export declare const AudioSpeedValue2KeyMap: {
    [key: number]: string;
};
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
export {};
