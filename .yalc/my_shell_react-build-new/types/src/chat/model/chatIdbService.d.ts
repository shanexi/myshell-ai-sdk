import { MessageDetail } from '../../../../src/chat/model/interfaces';
declare class ChatIdbService {
    private db;
    private chats;
    constructor();
    storeChat(userId: number, botId: string, chatList: MessageDetail[]): Promise<void>;
    getChat(userId: number, botId: string): Promise<MessageDetail[] | null>;
    deleteChat(userId: number, botId: string): Promise<void>;
}
declare const chatIdbService: ChatIdbService;
export default chatIdbService;
