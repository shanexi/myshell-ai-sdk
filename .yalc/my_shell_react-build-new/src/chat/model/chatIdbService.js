import Dexie from 'dexie';
class ChatIdbService {
    db;
    chats;
    constructor() {
        this.db = new Dexie('chatHisDB');
        this.db.version(2).stores({
            chats: '[userId+botId]'
        });
        this.chats = this.db.table('chats');
    }
    async storeChat(userId, botId, chatList) {
        if (botId) {
            try {
                const userChatList = chatList.filter(chat => Number(chat.userId) === userId);
                await this.chats.put({ userId, botId, chatList: JSON.stringify(userChatList) });
            }
            catch (error) {
                console.error('Error storing chat:', error);
            }
        }
    }
    async getChat(userId, botId) {
        try {
            const startTimeStamp = new Date().getTime();
            console.log(startTimeStamp);
            const chat = await this.chats.get([userId, botId]);
            const chatList = chat ? JSON.parse(chat?.chatList) : [];
            const endTimeStamp = new Date().getTime();
            console.log(endTimeStamp);
            return chatList.filter((chat) => Number(chat.userId) === userId);
        }
        catch (error) {
            const endTimeStamp = new Date().getTime();
            console.log(endTimeStamp);
            console.error('Error getting chat:', error);
            return null;
        }
    }
    async deleteChat(userId, botId) {
        try {
            await this.chats.where([userId, botId]).delete();
        }
        catch (error) {
            console.error('Error deleting chat:', error);
        }
    }
}
const chatIdbService = new ChatIdbService();
export default chatIdbService;
