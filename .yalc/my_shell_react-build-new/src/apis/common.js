import { rxPost } from '../common/utils/rx-http.js';
import { APIFetch } from '../core/request/APIFetch.js';
export function reportIssue(data) {
    return rxPost('/app/reportIssue', data);
}
export function reportIssueV1(data) {
    return APIFetch.post('/v1/feedback/issue', {
        body: {
            ...data
        },
        isGoLang: true
    });
}
export var Scenario;
(function (Scenario) {
    Scenario["SCENARIO_BOT_PHOTO"] = "SCENARIO_BOT_PHOTO";
    Scenario["SCENARIO_BOT_REPLY_TTS_VOICE"] = "SCENARIO_BOT_REPLY_TTS_VOICE";
    Scenario["SCENARIO_USER_BOT_CHAT_VOICE"] = "SCENARIO_USER_BOT_CHAT_VOICE";
    Scenario["SCENARIO_USER_AVATAR"] = "SCENARIO_USER_AVATAR";
    Scenario["SCENARIO_USER_BACKGROUND"] = "SCENARIO_USER_BACKGROUND";
    Scenario["SCENARIO_BOT_VOICE"] = "SCENARIO_BOT_VOICE";
    Scenario["SCENARIO_BOT_LOGO"] = "SCENARIO_BOT_LOGO";
    Scenario["SCENARIO_BOT_VOICE_SAMPLE_AUDIO"] = "SCENARIO_BOT_VOICE_SAMPLE_AUDIO";
    Scenario["SCENARIO_BOT_VOICE_LOGO"] = "SCENARIO_BOT_VOICE_LOGO";
    Scenario["SCENARIO_IM_CHAT"] = "SCENARIO_IM_CHAT";
    Scenario["SCENARIO_CURVE_COMMENT"] = "SCENARIO_CURVE_COMMENT";
})(Scenario || (Scenario = {}));
export var ContentTypeEnum;
(function (ContentTypeEnum) {
    ContentTypeEnum["PNG"] = "CONTENT_TYPE_IMAGE_PNG";
    ContentTypeEnum["JPEG"] = "CONTENT_TYPE_IMAGE_JPEG";
    ContentTypeEnum["JPG"] = "CONTENT_TYPE_IMAGE_JPG";
    ContentTypeEnum["APNG"] = "CONTENT_TYPE_IMAGE_APNG";
    ContentTypeEnum["GIF"] = "CONTENT_TYPE_IMAGE_GIF";
    ContentTypeEnum["TIFF"] = "CONTENT_TYPE_IMAGE_TIFF";
    ContentTypeEnum["TIF"] = "CONTENT_TYPE_IMAGE_TIFF";
    ContentTypeEnum["BMP"] = "CONTENT_TYPE_IMAGE_BMP";
    ContentTypeEnum["MP3"] = "CONTENT_TYPE_MP3";
    ContentTypeEnum["WAV"] = "CONTENT_TYPE_AUDIO_WAV";
    ContentTypeEnum["OGG"] = "CONTENT_TYPE_AUDIO_OGG";
    ContentTypeEnum["FLAC"] = "CONTENT_TYPE_AUDIO_FLAC";
    ContentTypeEnum["APE"] = "CONTENT_TYPE_AUDIO_APE";
    ContentTypeEnum["WMA"] = "CONTENT_TYPE_AUDIO_WMA";
    ContentTypeEnum["TXT"] = "CONTENT_TYPE_TEXT_TXT";
    ContentTypeEnum["DOC"] = "CONTENT_TYPE_TEXT_DOC";
    ContentTypeEnum["DOCX"] = "CONTENT_TYPE_TEXT_DOCX";
    ContentTypeEnum["PDF"] = "CONTENT_TYPE_TEXT_PDF";
    ContentTypeEnum["MARKDOWN"] = "CONTENT_TYPE_TEXT_MARKDOWN";
    ContentTypeEnum["MD"] = "CONTENT_TYPE_TEXT_MARKDOWN";
    ContentTypeEnum["RTF"] = "CONTENT_TYPE_TEXT_RTF";
    ContentTypeEnum["MP4"] = "CONTENT_TYPE_VIDEO_MP4";
    ContentTypeEnum["AVI"] = "CONTENT_TYPE_VIDEO_AVI";
    ContentTypeEnum["MOV"] = "CONTENT_TYPE_VIDEO_MOV";
    ContentTypeEnum["WMV"] = "CONTENT_TYPE_VIDEO_WMV";
    ContentTypeEnum["FLV"] = "CONTENT_TYPE_VIDEO_FLV";
    ContentTypeEnum["ALL"] = "CONTENT_TYPE_ALL";
})(ContentTypeEnum || (ContentTypeEnum = {}));
export var EmbedObjType;
(function (EmbedObjType) {
    EmbedObjType["UNKNOWN"] = "MESSAGE_METADATA_TYPE_UNSPECIFIED";
    EmbedObjType["IMAGE"] = "MESSAGE_METADATA_TYPE_IMAGE_FILE";
    EmbedObjType["DOC"] = "MESSAGE_METADATA_TYPE_TEXT_FILE";
    EmbedObjType["AUDIO"] = "MESSAGE_METADATA_TYPE_AUDIO_FILE";
    EmbedObjType["VIDEO"] = "MESSAGE_METADATA_TYPE_VIDEO_FILE";
    EmbedObjType["TEXT_CONTENT"] = "MESSAGE_METADATA_TYPE_TEXT_CONTENT";
    EmbedObjType["AUDIO_CONTENT"] = "MESSAGE_METADATA_TYPE_USER_AUDIO";
    EmbedObjType["ALL"] = "MESSAGE_METADATA_TYPE_ALL_FILE";
})(EmbedObjType || (EmbedObjType = {}));
export var EmbedObjStatus;
(function (EmbedObjStatus) {
    EmbedObjStatus["UNKNOWN"] = "EMBED_OBJ_STATUS_UNSPECIFIED";
    EmbedObjStatus["PENDING"] = "EMBED_OBJ_STATUS_PENDING";
    EmbedObjStatus["PROCESSING"] = "EMBED_OBJ_STATUS_PROCESSING";
    EmbedObjStatus["DONE"] = "EMBED_OBJ_STATUS_DONE";
    EmbedObjStatus["ERROR"] = "EMBED_OBJ_STATUS_ERROR";
    EmbedObjStatus["DELETED"] = "EMBED_OBJ_STATUS_DELETED";
    EmbedObjStatus["QUEUEING"] = "EMBED_OBJ_STATUS_QUEUEING";
})(EmbedObjStatus || (EmbedObjStatus = {}));
export var BizTypeEnum;
(function (BizTypeEnum) {
    BizTypeEnum["BIZ_TYPE_FEATURE_PAGE"] = "BIZ_TYPE_FEATURE_PAGE";
    BizTypeEnum["BIZ_TYPE_BOT"] = "BIZ_TYPE_BOT";
    BizTypeEnum["BIZ_TYPE_WIDGET"] = "BIZ_TYPE_WIDGET";
    BizTypeEnum["BIZ_TYPE_UNSPECIFIED"] = "BIZ_TYPE_UNSPECIFIED";
    BizTypeEnum["BIZ_TYPE_FORUM_POST"] = "BIZ_TYPE_FORUM_POST";
})(BizTypeEnum || (BizTypeEnum = {}));
export function getPreSignUrl(fileInfo) {
    return APIFetch.post('/v1/resource/get_put_object_pre_sign_url', {
        body: {
            fileInfo
        },
        isGoLang: true
    });
}
export async function uploadFileToS3(scenario, suffix, file) {
    const contentType = ContentTypeEnum[(suffix.startsWith('.') ? suffix.substring(1) : suffix).toUpperCase()] ?? ContentTypeEnum.ALL;
    const preSignResponse = await getPreSignUrl({
        scenario,
        contentType,
        fileName: file.name,
        contentLength: String(file.size)
    });
    const response = await fetch(preSignResponse.data.uploadUrl, {
        method: 'PUT',
        headers: {
            Expires: preSignResponse.data.expiresAt,
            'Content-Type': preSignResponse.data.contentType
        },
        body: file
    });
    if (response.ok) {
        return preSignResponse.data;
    }
    return { objectKey: '', objectAccessUrl: '' };
}
export async function uploadFileToS3WithProgress({ scenario, contentType, file, onProgress, cancelToken }) {
    const preSignResponse = await getPreSignUrl({
        scenario,
        contentType: contentType || ContentTypeEnum.ALL,
        fileName: file.name,
        contentLength: String(file.size)
    });
    const res = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const cancel = () => {
            xhr.abort();
        };
        if (cancelToken) {
            cancelToken(cancel);
        }
        xhr.timeout = 120000;
        xhr.open('PUT', preSignResponse.data.uploadUrl);
        xhr.setRequestHeader('expires', preSignResponse.data.expiresAt);
        xhr.setRequestHeader('Content-Type', preSignResponse.data.contentType);
        xhr.upload.onprogress = event => {
            if (event.lengthComputable) {
                const p = Math.round((event.loaded * 100) / event.total);
                onProgress(p);
            }
        };
        xhr.onerror = () => {
            reject({ success: false, msg: 'upload error', code: 400 });
        };
        xhr.onabort = () => {
            reject({ success: false, msg: 'the request has been aborted' });
        };
        xhr.upload.onabort = () => {
            reject({ success: false, msg: 'the request has been aborted' });
        };
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve({ success: true, msg: 'upload success' });
            }
        };
        xhr.ontimeout = e => {
            reject({ success: false, msg: 'timeout' });
        };
        xhr.send(file);
    }).catch(e => {
        console.error(e);
        return { success: false, msg: 'something is wrong!', code: 400 };
    });
    if (res.success) {
        return { ...preSignResponse.data, success: true };
    }
    return { objectKey: '', objectAccessUrl: '', success: false, code: res.code };
}
export function generateShareCode(bizId, bizType) {
    return APIFetch.post('/v1/shared/generate_shared_code', {
        body: {
            bizId,
            bizType
        },
        isGoLang: true
    });
}
