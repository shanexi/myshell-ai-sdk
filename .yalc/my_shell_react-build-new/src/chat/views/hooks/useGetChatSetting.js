"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useChatSetting;
const react_1 = require("react");
const bot_1 = require("../../../apis/bot.js");
const store_1 = require("../../../services/store/index.js");
function useChatSetting() {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [updating, setUpdating] = (0, react_1.useState)(false);
    const setBotChatSetting = (0, store_1.useBotStore)(state => state.setBotChatSetting);
    const updateBotEnergyPerChat = (0, store_1.useBotStore)(state => state.updateBotEnergyPerChat);
    const getChatSetting = async (botId) => {
        setLoading(true);
        try {
            const { data } = await (0, bot_1.getBotChatSetting)(botId.toString());
            setBotChatSetting(botId, data);
        }
        catch (e) {
        }
        finally {
            setLoading(false);
        }
    };
    const updateChatSetting = async (botId, params) => {
        setUpdating(true);
        try {
            const { data } = await (0, bot_1.updateBotChatSetting)(params);
            const { energyPerChat, energyPerLevelByPass } = data;
            setBotChatSetting(botId, data);
            !!energyPerChat && !!energyPerLevelByPass && updateBotEnergyPerChat(botId, energyPerChat, energyPerLevelByPass);
        }
        catch (e) {
        }
        finally {
            setUpdating(false);
        }
    };
    return {
        loading,
        getChatSetting,
        updating,
        updateChatSetting
    };
}
