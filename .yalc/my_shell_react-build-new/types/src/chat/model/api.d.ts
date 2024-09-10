import type { Observable } from 'rxjs';
import { MessageDetail } from '../../chat/model/interfaces';
import { EnergyInfo } from '../../common/constants/interfaces/user';
import { ResponseType } from '../../core/request/APIFetch';
interface ChatHistoryParams {
    offset?: number;
    limit?: number;
    afterId?: number;
    botUid?: string;
}
export declare function getChatHistory(params: ChatHistoryParams): Observable<{
    data: MessageDetail[];
    total: number;
    offset: number;
    limit: number;
}>;
export declare function listChatHistory(params: any): Promise<ResponseType<{
    data: MessageDetail[];
    offset: number;
}>>;
export declare function resetHistory(botId?: string): Observable<boolean>;
export declare function resetBotHistory(botId: string): Promise<ResponseType<unknown>>;
export declare function deleteAllChatHistory(botId: string): Promise<ResponseType<void>>;
export declare function deleteChatHistory(bizType: 'HISTORY_OPERATION_BIZ_TYPE_BOT' | 'HISTORY_OPERATION_BIZ_TYPE_WIDGET', idList?: string[]): Promise<ResponseType<any>>;
export declare function createMessageSharedCode(messageIds: string[]): Promise<ResponseType<unknown>>;
export declare function getMessageSharedDetail(code: string): Promise<ResponseType<unknown>>;
export declare function reportMsg(action: 1 | 2 | 3, msgUid: string): Observable<unknown>;
export declare function reportMsgV1(data: {
    action: 1 | 2 | 3;
    messageId: string;
}): Promise<ResponseType<unknown>>;
export declare function regenerateTts(msgId: string): Promise<ResponseType<{
    voiceBytes: string;
    audioFileDurationSeconds: number;
    voiceUrl: string;
    userEnergyInfo: EnergyInfo | null;
}>>;
export declare function getImageParams(): Promise<ResponseType<any>>;
export declare function getImageParamsFromImage(url: string): Promise<ResponseType<any>>;
export declare function getImageParamsFromMsg(msgId: string): Promise<ResponseType<any>>;
export declare function getSharedMessages(code: string): Promise<any>;
export {};
ode: string): Promise<any>;
export {};
