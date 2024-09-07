"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUnReadMsg = void 0;
const react_1 = require("react");
const bot_1 = require("../../../apis/bot.js");
const store_1 = require("../../../services/store/index.js");
const useUnReadMsg = (botId) => {
    const botList = (0, store_1.useBotStore)(state => state.botList) || [];
    const setBotList = (0, store_1.useBotStore)(state => state.setBotList);
    const generateMultiBotMap = (0, store_1.useChatStore)(state => state.generateMultiBotMap);
    const regetBot = async () => {
        if (botId) {
            const res = await (0, bot_1.resetUnReadMessageCount)(botId);
            if (res.success) {
                const bots = [...(botList || [])].map(item => {
                    const bot = { ...item };
                    if (item.id === botId) {
                        bot.unreadMessageCount = 0;
                    }
                    return bot;
                });
                setBotList(bots);
                generateMultiBotMap(bots);
            }
        }
    };
    (0, react_1.useEffect)(() => {
        const selectChatBot = botList.find(item => item.id === botId);
        const unReadCount = selectChatBot?.unreadMessageCount || 0;
        if (unReadCount > 0) {
            regetBot();
        }
    }, []);
};
exports.useUnReadMsg = useUnReadMsg;
