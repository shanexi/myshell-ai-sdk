import { ChatModuleType } from '../../../src/chat/ChatStaticContext.js';
import { DisplayMessage, DraftMessage, LocalErrorMessage, LocalMessageType, MemberInfo, Message, MessageDisplayType, MessageType, ServerMessage } from './model/definitions';
export declare function msgDisplayTypeParser(type: MessageType | LocalMessageType): MessageDisplayType;
export declare function draftOrLocalMessageParser(message: DraftMessage | LocalErrorMessage): Message;
export declare function serverMessageParser(message: ServerMessage, type: ChatModuleType): Message;
export declare function MessageToDisplayParser(message: Message, userId: string, memberInfoMap: Map<string, MemberInfo>, showReplyTo?: boolean, visitorNameParser?: (name?: string) => string): DisplayMessage;
