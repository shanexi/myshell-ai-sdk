import { Observable, Subject } from 'rxjs';
import { AudioStreamDetail, MessageDetail, MsgEvents, TextStreamDetail } from '../../../../src/chat/model/interfaces.js';
declare class ChatService {
    private socket;
    private disconnect$;
    messageResponse$: Subject<{
        reqId: string;
        eventName: MsgEvents;
        data?: MessageDetail | TextStreamDetail | AudioStreamDetail | any;
        message?: string;
    }>;
    ready(): boolean;
    disconnect(): void;
    reconnect(): void;
    connect(): Promise<void>;
    textChat(text: string, botUid: string, validate?: string): Promise<MessageDetail>;
    voiceChat(voice: Blob, audioType: string, botUid: string, validate?: string): Promise<MessageDetail>;
    translate(messageId: string): Observable<MessageDetail>;
    private onNoEnoughEnergy;
    private onException;
    private onMessageError;
    private onMessageSent;
    private onMessageReplied;
    private onReplyMessageCreated;
    private onMessageTextStream;
    private onMessageAudioStream;
    private onMessageUpdated;
    private onMessageTranslated;
    private onTranslationStream;
    private onResetMemory;
    private onBotPromptUpdated;
    private onChatLoginPopup;
    private onNeedVerifyCaptcha;
    private onVoiceCallEnd;
}
export declare const chatService: ChatService;
export {};
