"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatService = void 0;
const rxjs_1 = require("rxjs");
const socket_io_client_1 = require("socket.io-client");
const interfaces_1 = require("../../chat/model/interfaces.js");
const identityService_1 = require("../../common/services/identityService.js");
const common_helper_1 = require("../../common/utils/common-helper.js");
const rx_http_1 = require("../../common/utils/rx-http.js");
const salt_1 = require("../../common/utils/salt.js");
const common_helper_2 = require("../../common/utils/common-helper.js");
class ChatService {
    socket;
    disconnect$ = new rxjs_1.Subject();
    messageResponse$ = new rxjs_1.Subject();
    ready() {
        return this.socket && this.socket.connected;
    }
    disconnect() {
        if (!this.ready()) {
            return;
        }
        this.socket?.disconnect();
    }
    reconnect() {
        this.disconnect();
        this.connect();
    }
    async connect() {
        if (this.ready()) {
            return;
        }
        let visitorId;
        const randomVisitorId = ((0, common_helper_2.isClient)() && identityService_1.identityService.getRandomVisitorId()) ?? '';
        if (randomVisitorId) {
            visitorId = randomVisitorId;
        }
        else {
            visitorId = (0, common_helper_1.generateUUID)();
        }
        this.socket?.disconnect();
        this.socket = (0, socket_io_client_1.io)(`${rx_http_1.wsBaseURL}/chat`, {
            path: '/ws',
            transports: ['websocket'],
            auth: {
                token: identityService_1.identityService.getToken(),
                visitorId
            }
        });
        this.socket.on('connect_error', () => {
        });
        this.socket.on('disconnect', (reason) => {
            this.disconnect$.next(reason);
        });
        this.socket.on('connect', () => {
        });
        this.socket.on(interfaces_1.MsgEvents.MSG_ERROR, this.onMessageError);
        this.socket.on(interfaces_1.MsgEvents.EXCEPTION, this.onException);
        this.socket.on(interfaces_1.MsgEvents.MSG_SENT, this.onMessageSent);
        this.socket.on(interfaces_1.MsgEvents.REPLY_MSG_CREATED, this.onReplyMessageCreated);
        this.socket.on(interfaces_1.MsgEvents.MSG_UPDATED, this.onMessageUpdated);
        this.socket.on(interfaces_1.MsgEvents.MSG_TEXT_STREAM, this.onMessageTextStream);
        this.socket.on(interfaces_1.MsgEvents.MSG_AUDIO_STREAM, this.onMessageAudioStream);
        this.socket.on(interfaces_1.MsgEvents.MSG_REPLIED, this.onMessageReplied);
        this.socket.on(interfaces_1.MsgEvents.MSG_TRANSLATED, this.onMessageTranslated);
        this.socket.on(interfaces_1.MsgEvents.TRANSLATION_STREAM, this.onTranslationStream);
        this.socket.on(interfaces_1.MsgEvents.NO_ENOUGH_ENERGY, this.onNoEnoughEnergy);
        this.socket.on(interfaces_1.MsgEvents.RESET_MEMORY, this.onResetMemory);
        this.socket.on(interfaces_1.MsgEvents.BOT_PROMPT_UPDATED, this.onBotPromptUpdated);
        this.socket.on(interfaces_1.MsgEvents.NEED_VERIFY_CAPTCHA, this.onNeedVerifyCaptcha);
        this.socket.on(interfaces_1.MsgEvents.VOICE_CALL_END, this.onVoiceCallEnd);
        this.socket.on(interfaces_1.MsgEvents.CHAT_LOGIN_POPUP, this.onChatLoginPopup);
    }
    textChat(text, botUid, validate) {
        if (!this.ready()) {
            return Promise.reject('Failed to connect to server');
        }
        const reqId = (0, common_helper_1.generateUUID)();
        return (0, rxjs_1.firstValueFrom)(new rxjs_1.Observable((subscriber) => {
            (0, salt_1.addSignature)(text).then(data => {
                const { u, ...rest } = data;
                this.socket.emit('text_chat', {
                    reqId: reqId,
                    botUid: botUid,
                    sourceFrom: 'myshellWebsite',
                    validate,
                    text,
                    ...rest
                });
                subscriber.next();
                subscriber.complete();
            });
        }).pipe((0, rxjs_1.switchMap)(() => {
            return this.messageResponse$;
        }), (0, rxjs_1.first)((value) => {
            return (value.reqId === reqId &&
                (value.eventName === interfaces_1.MsgEvents.MSG_ERROR ||
                    value.eventName === interfaces_1.MsgEvents.NO_ENOUGH_ENERGY ||
                    value.eventName === interfaces_1.MsgEvents.MSG_SENT ||
                    value.eventName === interfaces_1.MsgEvents.NEED_VERIFY_CAPTCHA ||
                    value.eventName === interfaces_1.MsgEvents.CHAT_LOGIN_POPUP));
        }), (0, rxjs_1.switchMap)((value) => {
            if (value.eventName === interfaces_1.MsgEvents.MSG_ERROR) {
                return (0, rxjs_1.throwError)(() => new Error(value.message));
            }
            if (value.eventName === interfaces_1.MsgEvents.NO_ENOUGH_ENERGY) {
                return (0, rxjs_1.throwError)(() => new Error(interfaces_1.MsgEvents.NO_ENOUGH_ENERGY));
            }
            if (value.eventName === interfaces_1.MsgEvents.MSG_REPLIED && value.data.type === 'NEED_TO_REGISTER') {
                return (0, rxjs_1.throwError)(() => new Error(`Need to Login first`));
            }
            if (value.eventName === interfaces_1.MsgEvents.NEED_VERIFY_CAPTCHA) {
                return (0, rxjs_1.throwError)(() => new Error(interfaces_1.MsgEvents.NEED_VERIFY_CAPTCHA));
            }
            if (value.eventName === interfaces_1.MsgEvents.CHAT_LOGIN_POPUP) {
                return (0, rxjs_1.throwError)(() => new Error(interfaces_1.MsgEvents.CHAT_LOGIN_POPUP));
            }
            return (0, rxjs_1.of)(value.data);
        }), (0, rxjs_1.timeout)(15000), (0, rxjs_1.takeUntil)(this.disconnect$)));
    }
    voiceChat(voice, audioType, botUid, validate) {
        if (!this.ready()) {
            return Promise.reject('Failed to connect to server');
        }
        const reqId = (0, common_helper_1.generateUUID)();
        return (0, rxjs_1.firstValueFrom)(new rxjs_1.Observable((subscriber) => {
            this.socket.emit('voice_chat', {
                reqId: reqId,
                botUid: botUid,
                sourceFrom: 'myshellWebsite',
                validate,
                voice,
                audioType
            });
            subscriber.next();
            subscriber.complete();
        }).pipe((0, rxjs_1.switchMap)(() => {
            return this.messageResponse$;
        }), (0, rxjs_1.first)((value) => {
            return (value.reqId === reqId &&
                (value.eventName === interfaces_1.MsgEvents.MSG_ERROR ||
                    value.eventName === interfaces_1.MsgEvents.NO_ENOUGH_ENERGY ||
                    value.eventName === interfaces_1.MsgEvents.MSG_SENT ||
                    value.eventName === interfaces_1.MsgEvents.NEED_VERIFY_CAPTCHA));
        }), (0, rxjs_1.switchMap)((value) => {
            if (value.eventName === interfaces_1.MsgEvents.MSG_ERROR) {
                return (0, rxjs_1.throwError)(() => new Error(value.message));
            }
            if (value.eventName === interfaces_1.MsgEvents.NO_ENOUGH_ENERGY) {
                return (0, rxjs_1.throwError)(() => new Error(interfaces_1.MsgEvents.NO_ENOUGH_ENERGY));
            }
            if (value.eventName === interfaces_1.MsgEvents.NEED_VERIFY_CAPTCHA) {
                return (0, rxjs_1.throwError)(() => new Error(interfaces_1.MsgEvents.NEED_VERIFY_CAPTCHA));
            }
            return (0, rxjs_1.of)(value.data);
        }), (0, rxjs_1.timeout)(15000), (0, rxjs_1.takeUntil)(this.disconnect$)));
    }
    translate(messageId) {
        if (!this.ready()) {
            return (0, rxjs_1.throwError)(() => {
                return new Error('Failed to connect to server');
            });
        }
        const reqId = (0, common_helper_1.generateUUID)();
        return new rxjs_1.Observable((subscriber) => {
            this.socket.emit('translate_message', {
                reqId: reqId,
                messageId: messageId
            });
            subscriber.next();
            subscriber.complete();
        }).pipe((0, rxjs_1.switchMap)(() => {
            return this.messageResponse$;
        }), (0, rxjs_1.first)((value) => {
            return (value.reqId === reqId &&
                (value.eventName === interfaces_1.MsgEvents.MSG_ERROR || value.eventName === interfaces_1.MsgEvents.MSG_TRANSLATED));
        }), (0, rxjs_1.switchMap)((value) => {
            if (value.eventName === interfaces_1.MsgEvents.MSG_ERROR) {
                return (0, rxjs_1.throwError)(() => new Error(value.message));
            }
            return (0, rxjs_1.of)(value.data);
        }), (0, rxjs_1.timeout)(15000), (0, rxjs_1.takeUntil)(this.disconnect$));
    }
    onNoEnoughEnergy = (msg) => {
        this.messageResponse$.next({
            reqId: msg.reqId,
            eventName: interfaces_1.MsgEvents.NO_ENOUGH_ENERGY,
            message: msg.message
        });
    };
    onException = (msg) => {
        if (msg.reqId) {
            this.messageResponse$.next({
                reqId: msg.reqId,
                eventName: interfaces_1.MsgEvents.MSG_ERROR,
                message: msg.message
            });
        }
    };
    onMessageError = (msg) => {
        this.messageResponse$.next({
            reqId: msg.reqId,
            eventName: interfaces_1.MsgEvents.MSG_ERROR,
            message: msg.message
        });
    };
    onMessageSent = (msg) => {
        this.messageResponse$.next({
            reqId: msg.reqId,
            eventName: interfaces_1.MsgEvents.MSG_SENT,
            data: msg.data
        });
    };
    onMessageReplied = (msg) => {
        this.messageResponse$.next({
            reqId: msg.reqId,
            eventName: interfaces_1.MsgEvents.MSG_REPLIED,
            data: msg.data
        });
    };
    onReplyMessageCreated = (msg) => {
        this.messageResponse$.next({
            reqId: msg.reqId,
            eventName: interfaces_1.MsgEvents.REPLY_MSG_CREATED,
            data: msg.data
        });
    };
    onMessageTextStream = (msg) => {
        this.messageResponse$.next({
            reqId: msg.reqId,
            eventName: interfaces_1.MsgEvents.MSG_TEXT_STREAM,
            data: msg.data
        });
    };
    onMessageAudioStream = (msg) => {
        this.messageResponse$.next({
            reqId: msg.reqId,
            eventName: interfaces_1.MsgEvents.MSG_AUDIO_STREAM,
            data: msg.data
        });
    };
    onMessageUpdated = (msg) => {
        this.messageResponse$.next({
            reqId: msg.reqId,
            eventName: interfaces_1.MsgEvents.MSG_UPDATED,
            data: msg.data
        });
    };
    onMessageTranslated = (msg) => {
        this.messageResponse$.next({
            reqId: msg.reqId,
            eventName: interfaces_1.MsgEvents.MSG_TRANSLATED,
            data: msg.data
        });
    };
    onTranslationStream = (msg) => {
        this.messageResponse$.next({
            reqId: msg.reqId,
            eventName: interfaces_1.MsgEvents.TRANSLATION_STREAM,
            data: msg.data
        });
    };
    onResetMemory = (msg) => {
        this.messageResponse$.next({
            reqId: msg.reqId,
            eventName: interfaces_1.MsgEvents.RESET_MEMORY,
            data: msg.message
        });
    };
    onBotPromptUpdated = (msg) => {
        this.messageResponse$.next({
            reqId: msg.reqId,
            eventName: interfaces_1.MsgEvents.BOT_PROMPT_UPDATED,
            data: msg
        });
    };
    onChatLoginPopup = (msg) => {
        this.messageResponse$.next({
            reqId: msg.reqId,
            eventName: interfaces_1.MsgEvents.CHAT_LOGIN_POPUP,
            data: msg.data
        });
    };
    onNeedVerifyCaptcha = (msg) => {
        this.messageResponse$.next({
            reqId: msg.reqId,
            eventName: interfaces_1.MsgEvents.NEED_VERIFY_CAPTCHA,
            data: msg
        });
    };
    onVoiceCallEnd = (msg) => {
        this.messageResponse$.next({
            reqId: msg.reqId,
            eventName: interfaces_1.MsgEvents.VOICE_CALL_END,
            data: msg.data
        });
    };
}
exports.chatService = new ChatService();
