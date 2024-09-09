import { EmbedObj } from '../../../../../src/apis/common';
import { TagInfo } from './bot';
import { MessageStatusEnum, MessageTypeEnum } from '../../../chat/model/enums';
import { ImSlashCommandInput, ImageDetail, ImageStatus, MessageComponentsContainer, RecommandationQuestion, ReferenceSource, StreamDetail, TranslationStreamDetail } from '../../../chat/model/interfaces';
import { ChatPanelTypeEnum, ImComponentsInputTypeEnum, ParamTypeEnum, WidgetChatCallerTypeEnum, WidgetStatusEnum, supportedEmbedTypesEnum } from '../enums/workshop';
export interface ImPanelChatConfig {
    supportedEmbedTypes: supportedEmbedTypesEnum;
    embedNumberLimit: number;
    supportedSlashCommand: {
        name: string;
        description: string;
        params: {
            name: string;
            paramType: ParamTypeEnum;
            numberDefault: number;
            numberMax: number;
            numberMin: number;
            stringDefault: string;
            stringMaxLen: string;
            stringMinLen: string;
        };
    };
    embedNumberMinimum: number;
}
export interface ImComponentInput {
    type: ImComponentsInputTypeEnum;
    name: string;
    description: string;
    stringDefault: string;
    numberDefault: number;
    hasNumberLimitation: boolean;
    numberMax: number;
    numberMin: number;
    integerDefault: number;
    hasIntegerLimitation: boolean;
    integerMax: number;
    integerMin: number;
    booleanDefault: boolean;
    textSelectorDefault: string;
    textSelectorAllOf: {
        label?: string;
        value: string;
        iconUrl: string;
    };
    numberSelectorDefault: number;
    numberSelectorAllOf: {
        label?: number;
        value: number;
        iconUrl: string;
    };
    fieldName: string;
    isRequired: boolean;
    supportedFileTypes: supportedEmbedTypesEnum;
    fileDefaultParam: string;
    fileDefaultParamType: supportedEmbedTypesEnum;
    fileUploadSizeMaximum: number;
}
export interface ImComponent {
    name: string;
    description: string;
    githubUrl: string;
    componentsInput: ImComponentInput[];
    componentsFunction: Array<{
        functionName: string;
    }>;
    energyConsumePerUse: number;
    saveButtonContent: string;
}
export interface WidgetInfo {
    id: string;
    name: string;
    description: string;
    logoUrl?: string;
    backgroundImageUrl?: string;
    tags: TagInfo[];
    allTagList: TagInfo[];
    status: WidgetStatusEnum;
    displaySellPrice?: boolean;
    sellPrice: string;
    chatPanelType: ChatPanelTypeEnum;
    imPanelChatConfig: ImPanelChatConfig;
    imComponent: any;
    energyPerChat: number;
    hasUnlocked: boolean;
    chatCallerType: WidgetChatCallerTypeEnum;
    needShowUnlock: boolean;
    pinned: boolean;
    author: {
        id: string;
        name: string;
        nameTag: string;
        avatar: string;
    };
    showCopyProConfig: boolean;
    settings: any[];
    visitorCanChat: boolean;
}
export interface WidgetMessageDetail {
    id: string;
    localId?: string;
    replaceId?: string;
    deleteId?: string;
    userId: string;
    status: MessageStatusEnum;
    type: MessageTypeEnum;
    text: string;
    translation?: string;
    widgetId: string;
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
    textStream?: WidgetTextStreamDetail[];
    audioStream?: WidgetAudioStreamDetail[];
    imageGenMessageResponse?: ImageDetail;
    translationStream?: TranslationStreamDetail[];
    audioSpeed: number;
    userSentMsg?: WidgetMessageDetail;
    embedObjs?: EmbedObj[];
    asyncJobInfo?: any;
    modelStatus?: string;
    referenceSource?: ReferenceSource[];
    recommendationQuestion?: RecommandationQuestion;
    imSlashCommandInput: ImSlashCommandInput;
    componentContainer: MessageComponentsContainer;
    isLocalSend?: boolean;
    isLocalReply?: boolean;
    replaceLocalSend?: boolean;
    replaceLocalReply?: boolean;
    inputSetting?: {
        canInputText: boolean;
        canInputAudio: boolean;
    };
    [key: string]: any | undefined;
}
export interface WidgetTextStreamDetail extends StreamDetail {
    replyMessage: WidgetMessageDetail;
    text: string;
    modelStatus?: string;
    embedObjs?: any;
    isJob?: boolean;
}
export interface WidgetAudioStreamDetail extends StreamDetail {
    replyMessage: WidgetMessageDetail;
    audio: ArrayBuffer;
}
export interface WidgetImageStreamDetail {
    replyMessage: WidgetMessageDetail;
    imageGenMessageResponse: ImageDetail;
    genStatus: ImageStatus;
}
