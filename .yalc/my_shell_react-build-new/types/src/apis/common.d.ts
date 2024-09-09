import type { Observable } from 'rxjs';
import { ReportIssueReqBody } from '../../../src/common/constants/interfaces/common.js';
import { ResponseType } from '../../../src/core/request/APIFetch.js';
export declare function reportIssue(data: ReportIssueReqBody): Observable<any>;
export declare function reportIssueV1(data: ReportIssueReqBody): Promise<ResponseType<any>>;
export declare enum Scenario {
    SCENARIO_BOT_PHOTO = "SCENARIO_BOT_PHOTO",
    SCENARIO_BOT_REPLY_TTS_VOICE = "SCENARIO_BOT_REPLY_TTS_VOICE",
    SCENARIO_USER_BOT_CHAT_VOICE = "SCENARIO_USER_BOT_CHAT_VOICE",
    SCENARIO_USER_AVATAR = "SCENARIO_USER_AVATAR",
    SCENARIO_USER_BACKGROUND = "SCENARIO_USER_BACKGROUND",
    SCENARIO_BOT_VOICE = "SCENARIO_BOT_VOICE",
    SCENARIO_BOT_LOGO = "SCENARIO_BOT_LOGO",
    SCENARIO_BOT_VOICE_SAMPLE_AUDIO = "SCENARIO_BOT_VOICE_SAMPLE_AUDIO",
    SCENARIO_BOT_VOICE_LOGO = "SCENARIO_BOT_VOICE_LOGO",
    SCENARIO_IM_CHAT = "SCENARIO_IM_CHAT",
    SCENARIO_CURVE_COMMENT = "SCENARIO_CURVE_COMMENT"
}
export declare enum ContentTypeEnum {
    PNG = "CONTENT_TYPE_IMAGE_PNG",
    JPEG = "CONTENT_TYPE_IMAGE_JPEG",
    JPG = "CONTENT_TYPE_IMAGE_JPG",
    APNG = "CONTENT_TYPE_IMAGE_APNG",
    GIF = "CONTENT_TYPE_IMAGE_GIF",
    TIFF = "CONTENT_TYPE_IMAGE_TIFF",
    TIF = "CONTENT_TYPE_IMAGE_TIFF",
    BMP = "CONTENT_TYPE_IMAGE_BMP",
    MP3 = "CONTENT_TYPE_MP3",
    WAV = "CONTENT_TYPE_AUDIO_WAV",
    OGG = "CONTENT_TYPE_AUDIO_OGG",
    FLAC = "CONTENT_TYPE_AUDIO_FLAC",
    APE = "CONTENT_TYPE_AUDIO_APE",
    WMA = "CONTENT_TYPE_AUDIO_WMA",
    TXT = "CONTENT_TYPE_TEXT_TXT",
    DOC = "CONTENT_TYPE_TEXT_DOC",
    DOCX = "CONTENT_TYPE_TEXT_DOCX",
    PDF = "CONTENT_TYPE_TEXT_PDF",
    MARKDOWN = "CONTENT_TYPE_TEXT_MARKDOWN",
    MD = "CONTENT_TYPE_TEXT_MARKDOWN",
    RTF = "CONTENT_TYPE_TEXT_RTF",
    MP4 = "CONTENT_TYPE_VIDEO_MP4",
    AVI = "CONTENT_TYPE_VIDEO_AVI",
    MOV = "CONTENT_TYPE_VIDEO_MOV",
    WMV = "CONTENT_TYPE_VIDEO_WMV",
    FLV = "CONTENT_TYPE_VIDEO_FLV",
    ALL = "CONTENT_TYPE_ALL"
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
export declare enum EmbedObjStatus {
    UNKNOWN = "EMBED_OBJ_STATUS_UNSPECIFIED",
    PENDING = "EMBED_OBJ_STATUS_PENDING",
    PROCESSING = "EMBED_OBJ_STATUS_PROCESSING",
    DONE = "EMBED_OBJ_STATUS_DONE",
    ERROR = "EMBED_OBJ_STATUS_ERROR",
    DELETED = "EMBED_OBJ_STATUS_DELETED",
    QUEUEING = "EMBED_OBJ_STATUS_QUEUEING"
}
export declare enum BizTypeEnum {
    BIZ_TYPE_FEATURE_PAGE = "BIZ_TYPE_FEATURE_PAGE",
    BIZ_TYPE_BOT = "BIZ_TYPE_BOT",
    BIZ_TYPE_WIDGET = "BIZ_TYPE_WIDGET",
    BIZ_TYPE_UNSPECIFIED = "BIZ_TYPE_UNSPECIFIED",
    BIZ_TYPE_FORUM_POST = "BIZ_TYPE_FORUM_POST"
}
export interface EmbedObj {
    type: EmbedObjType;
    status: EmbedObjStatus;
    title: string;
    extensionName: string;
    url: string;
    iconUrl: string;
    id?: string;
    mediaFileMetadata?: {
        width?: number;
        height?: number;
        thumbnail?: string;
        generateModel?: string;
    };
}
export type PreSignUrlResponse = {
    uploadUrl: string;
    objectKey: string;
    objectAccessUrl: string;
    expiresAt: string;
    contentType: string;
};
export declare function getPreSignUrl(fileInfo: {
    scenario: Scenario;
    contentType: ContentTypeEnum;
    fileName: string;
    contentLength: string;
}): Promise<ResponseType<PreSignUrlResponse>>;
export declare function uploadFileToS3(scenario: Scenario, suffix: string, file: File): Promise<Pick<PreSignUrlResponse, 'objectKey' | 'objectAccessUrl'>>;
export declare function uploadFileToS3WithProgress({ scenario, contentType, file, onProgress, cancelToken }: {
    scenario: Scenario;
    contentType: ContentTypeEnum;
    file: File;
    onProgress: (value: number) => void;
    cancelToken: any;
}): Promise<{
    objectKey: string;
    objectAccessUrl: string;
    code?: number;
    success: boolean;
}>;
export declare function generateShareCode(bizId: string, bizType: BizTypeEnum): Promise<ResponseType<{
    code: string;
}>>;
