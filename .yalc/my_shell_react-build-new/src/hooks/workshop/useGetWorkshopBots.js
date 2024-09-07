"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGetWorkshopBots;
const bot_1 = require("../../apis/bot.js");
const draft_1 = require("../../common/utils/workshop/draft.js");
const store_1 = require("../../services/store/index.js");
const workshop_1 = require("../../services/store/workshop.js");
const useNotification_1 = require("../../common/hooks/useNotification.js");
function useGetWorkshopBots() {
    const setGettingChatBotList = (0, workshop_1.useWorkshopStore)(state => state.setGettingChatBotList);
    const { warning } = (0, useNotification_1.useNotification)();
    const setSidebarMyBotList = (0, workshop_1.useWorkshopStore)(state => state.setSidebarMyBotList);
    const setSidebarToolboxList = (0, workshop_1.useWorkshopStore)(state => state.setSidebarToolboxList);
    const setDraftBotIds = (0, workshop_1.useWorkshopStore)(state => state.setDraftBotIds);
    const generateMultiBotMap = (0, store_1.useChatStore)(state => state.generateMultiBotMap);
    const getMyBotList = async () => {
        try {
            setGettingChatBotList(true);
            const [{ data, success, msg }, toolboxResp] = await Promise.all([(0, bot_1.getOwnBotList)(), (0, bot_1.getToolboxList)()]);
            if (!success) {
                warning({
                    content: msg ?? ''
                });
                return;
            }
            setSidebarMyBotList(data);
            setSidebarToolboxList(toolboxResp.data);
            const draftBotIds = new Set();
            for (const item of data) {
                const id = item?.id;
                if (!id) {
                    continue;
                }
                if ((0, draft_1.hasBotSettingsDraft)(id)) {
                    draftBotIds.add(id);
                }
            }
            setDraftBotIds(draftBotIds);
            generateMultiBotMap([...(data || []), ...(toolboxResp.data || [])]);
        }
        catch (e) {
        }
        finally {
            setGettingChatBotList(false);
        }
    };
    return {
        getMyBotList
    };
}
