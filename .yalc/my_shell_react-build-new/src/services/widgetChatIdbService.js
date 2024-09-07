"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dexie_1 = __importDefault(require("dexie"));
class WidgetChatIdbService {
    db;
    chats;
    constructor() {
        this.db = new dexie_1.default('widgetChatHisDB');
        this.db.version(1).stores({
            chats: '[userId+widgetId]'
        });
        this.chats = this.db.table('chats');
    }
    async storeChat(userId, widgetId, chatList) {
        if (widgetId) {
            try {
                const userChatList = chatList.filter(chat => chat.userId === userId);
                await this.chats.put({ userId, widgetId, chatList: JSON.stringify(userChatList) });
            }
            catch (error) {
                console.error('Error storing chat:', error);
            }
        }
    }
    async getChat(userId, widgetId) {
        try {
            const chat = await this.chats.get([userId, widgetId]);
            const chatList = chat ? JSON.parse(chat?.chatList) : [];
            return chatList.filter((chat) => chat.userId === userId);
        }
        catch (error) {
            console.error('Error getting chat:', error);
            return null;
        }
    }
}
const widgetChatIdbService = new WidgetChatIdbService();
exports.default = widgetChatIdbService;
