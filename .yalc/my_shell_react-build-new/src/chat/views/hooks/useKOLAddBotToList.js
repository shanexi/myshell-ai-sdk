"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKOLAddBotToList = useKOLAddBotToList;
const react_1 = require("react");
const bot_1 = require("../../../apis/bot.js");
const championship_1 = require("../../../apis/championship.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const useCalcGetChatListFn_1 = __importDefault(require("../../../entity/hooks/useCalcGetChatListFn.js"));
const store_1 = require("../../../services/store/index.js");
function useKOLAddBotToList() {
    const setKolInfo = (0, store_1.useBotStore)(state => state.setKolInfo);
    const setChatBodyType = (0, store_1.useChatStore)(state => state.setChatBodyType);
    const user = (0, store_1.useUserStore)(state => state.user);
    const getChatList = (0, useCalcGetChatListFn_1.default)('bot');
    const getKolBot = async () => {
        try {
            const res = await (0, championship_1.getKolInfo)();
            if (res.success) {
                const kolInfo = res.data;
                setKolInfo(kolInfo);
                if ((0, common_helper_1.isKOL)() && kolInfo?.id) {
                    setChatBodyType('kol');
                    const botIds = kolInfo?.starBots?.map(item => item?.bot?.id);
                    if (botIds?.length > 0) {
                        await (0, bot_1.addBotToChatListV2)(botIds);
                        getChatList();
                    }
                }
                if ((0, common_helper_1.isOpenKOL)() && kolInfo?.id) {
                    setChatBodyType('kol');
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    (0, react_1.useEffect)(() => {
        getKolBot();
    }, [user?.level]);
}
