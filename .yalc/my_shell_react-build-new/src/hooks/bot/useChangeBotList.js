"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useChangeBotList;
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_use_1 = require("react-use");
const bot_1 = require("../../apis/bot.js");
const useCalcGetChatListFn_1 = __importDefault(require("../../entity/hooks/useCalcGetChatListFn.js"));
const entity_1 = require("../../services/store/entity.js");
const useNotification_1 = require("../../common/hooks/useNotification.js");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
function useChangeBotList(botInfo) {
    const [removing, toggleRemoving] = (0, react_use_1.useToggle)(false);
    const [pinActing, toggle] = (0, react_use_1.useToggle)(false);
    const commonT = (0, next_intl_1.useTranslations)('common');
    const { success } = (0, useNotification_1.useNotification)();
    const { isMobile, locale } = (0, usePathLocale_1.usePathLocale)();
    const router = (0, navigation_1.useRouter)();
    const chatList = (0, entity_1.useEntityStore)(state => state.chatList);
    const setDetail = (0, entity_1.useEntityStore)(state => state.setDetail);
    const getChatList = (0, useCalcGetChatListFn_1.default)('bot');
    const setBotPinned = async (pinned) => {
        if (botInfo) {
            try {
                toggle(true);
                const res = await (0, bot_1.setBotPinnedStatus)(botInfo.id, pinned);
                if (res.success) {
                    const newBotInfo = {
                        ...botInfo,
                        pinned
                    };
                    setDetail('bot', botInfo.id, newBotInfo);
                    getChatList();
                }
            }
            catch (e) {
            }
            finally {
                toggle(false);
            }
        }
    };
    const removeBot = async (callback) => {
        if (botInfo) {
            const botId = botInfo.id;
            try {
                toggleRemoving(true);
                const res = await (0, bot_1.removeBotFromChatList)(botInfo.id);
                if (res.success) {
                    getChatList('remove');
                    success({
                        content: commonT('removed')
                    });
                    callback?.();
                    if (isMobile) {
                        router.replace(`/m/chat`);
                        return;
                    }
                    const filteredListItem = chatList.filter(item => item.type === 'bot' && item.id !== botId);
                    if (filteredListItem.length) {
                        const firstItem = filteredListItem[0];
                        let target;
                        if (firstItem.type === 'bot') {
                            target = `/chat/${firstItem.id}`;
                        }
                        else {
                            target = `/room/${firstItem.id}`;
                        }
                        router.replace(target);
                    }
                    else {
                        router.replace(`/explore`);
                    }
                    getChatList('remove');
                }
            }
            catch (e) {
            }
            finally {
                toggleRemoving(false);
            }
        }
    };
    return {
        setBotPinned,
        removing,
        removeBot,
        pinActing
    };
}
