"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msgDisplayTypeParser = msgDisplayTypeParser;
exports.draftOrLocalMessageParser = draftOrLocalMessageParser;
exports.serverMessageParser = serverMessageParser;
exports.MessageToDisplayParser = MessageToDisplayParser;
function msgDisplayTypeParser(type) {
    let msgDisplayType;
    switch (type) {
        case 'TEXT':
        case 'VOICE':
        case 'REPLY':
        case 'GREETING':
        case 'VOICE_CALL_TEXT':
        case 'VOICE_CALL_VOICE':
        case 'VOICE_CALL_REPLY':
        case 'BUTTON_INTERACTION':
            msgDisplayType = 'NORMAL';
            break;
        case 'PROMPT_UPDATED':
        case 'WIDGET_PROMPT_UPDATED':
        case 'NEED_TO_REGISTER':
        case 'VOICE_CALL_END':
        case 'LLM_MODERATION_REQUEST':
        case 'ROOM_CLOSED':
        case 'OTHER_SIDE_LEFT':
        case 'OTHER_SIDE_NO_ENOUGH_ENERGY':
            msgDisplayType = 'NOTIFICATION';
            break;
        case 'RESET':
            msgDisplayType = 'INFO';
            break;
        default:
            msgDisplayType = 'NORMAL';
    }
    return msgDisplayType;
}
function draftOrLocalMessageParser(message) {
    return {
        id: message.id,
        text: message.text,
        audioUrl: message.audioBlobDataURI,
        status: message.status,
        type: message.type,
        userId: message.userId,
        createdDateUnix: message.createdDateUnix,
        updatedDateUnix: message.updatedDateUnix,
        entityId: message.entityId
    };
}
function serverMessageParser(message, type) {
    return {
        id: message.id,
        userId: message.userId,
        referenceText: message.referenceText,
        text: message.text,
        audioUrl: message.voiceUrl,
        duration: message.voiceFileDurationSeconds,
        audioSpeed: message.audioSpeed,
        status: message.status,
        type: message.type,
        createdDateUnix: message.createdDateUnix,
        updatedDateUnix: message.updatedDateUnix,
        entityId: type === 'widget' ? message.widgetId ?? '' : message.botId,
        replyId: message.replyId,
        feedbackState: message.feedbackState,
        feedbackIssues: message.feedbackIssues,
        asyncJobInfo: message.asyncJobInfo,
        runningWidgetInfo: message.extraInfo?.runningWidgetInfo,
        runningError: message.runningError,
        handled: message.handled,
        imageGenMessageResponse: message.imageGenMessageResponse,
        inputSetting: message.inputSetting,
        componentContainer: message.componentContainer
    };
}
function messageSourceJudgment(messageUserId, userId, messageType) {
    let source = 'OTHER';
    if (messageUserId === userId &&
        (messageType === 'TEXT' ||
            messageType === 'VOICE' ||
            messageType === 'BUTTON_INTERACTION' ||
            messageType === 'VOICE_CALL_TEXT')) {
        source = 'USER';
    }
    return source;
}
function messageAvatarJudgement(message, memberInfoMap) {
    const isEntityMessage = message.type !== 'TEXT' && message.type !== 'VOICE' && message.type !== 'BUTTON_INTERACTION';
    return memberInfoMap.get(`${isEntityMessage ? 'entity' : 'user'}-${isEntityMessage ? message.entityId : message.userId}`)?.avatar;
}
function messageMemberNameJudgement(message, memberInfoMap, visitorNameParser) {
    const isEntityMessage = message.type !== 'TEXT' && message.type !== 'VOICE' && message.type !== 'BUTTON_INTERACTION';
    if (!isEntityMessage) {
        const matchedUserInfo = memberInfoMap.get(`user-${message.userId}`);
        if (matchedUserInfo?.isVisitor) {
            return visitorNameParser ? visitorNameParser(matchedUserInfo.nameTag) : matchedUserInfo.name;
        }
        return matchedUserInfo?.name;
    }
    return memberInfoMap.get(`entity-${message.entityId}`)?.name;
}
function messageReplyToMemberNameJudgement(message, memberInfoMap) {
    if (message.replyId && message.replyId !== '0') {
        return memberInfoMap.get(`user-${message.userId}`);
    }
    return undefined;
}
function MessageToDisplayParser(message, userId, memberInfoMap, showReplyTo = false, visitorNameParser) {
    return {
        ...message,
        avatar: messageAvatarJudgement(message, memberInfoMap),
        name: messageMemberNameJudgement(message, memberInfoMap, visitorNameParser),
        replyTo: showReplyTo ? messageReplyToMemberNameJudgement(message, memberInfoMap) : undefined,
        source: messageSourceJudgment(message.userId, userId, message.type),
        msgDisplayType: msgDisplayTypeParser(message.type)
    };
}
