import Dexie from 'dexie';
class WidgetChatIdbService {
    db;
    chats;
    constructor() {
        this.db = new Dexie('widgetChatHisDB');
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
export default widgetChatIdbService;
