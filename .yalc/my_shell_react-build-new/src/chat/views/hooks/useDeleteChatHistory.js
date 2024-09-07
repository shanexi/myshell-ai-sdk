"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useDeleteChatHistory;
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const api_1 = require("../../../chat/model/api.js");
const useNotification_1 = require("../../../common/hooks/useNotification.js");
const store_1 = require("../../../services/store/index.js");
function useDeleteChatHistory() {
    const selectedDeleteChatList = (0, store_1.useChatStore)(state => state.selectedDeleteChatList);
    const clearDeleteChat = (0, store_1.useChatStore)(state => state.clearDeleteChat);
    const removeHistoryRecord = (0, store_1.useChatStore)(state => state.removeHistoryRecord);
    const removeHistoryRecordExceptSpecifiedMessages = (0, store_1.useChatStore)(state => state.removeHistoryRecordExceptSpecifiedMessages);
    const getBotLastValidInteractionMessage = (0, store_1.useChatStore)(state => state.getBotLastValidInteractionMessage);
    const setBotLastMessage = (0, store_1.useBotStore)(state => state.setBotLastMessage);
    const t = (0, next_intl_1.useTranslations)('workshop');
    const [deleting, setDeleting] = (0, react_1.useState)(false);
    const { success, warning, error } = (0, useNotification_1.useNotification)();
    const deleteAll = async (bot, successCb) => {
        try {
            setDeleting(true);
            const { success: res } = await (0, api_1.deleteAllChatHistory)(bot.id);
            if (res) {
                console.log(res);
                success({
                    content: t('delete_widget_success')
                });
                removeHistoryRecordExceptSpecifiedMessages(bot.id, []);
                successCb?.();
                setBotLastMessage(String(bot.id), getBotLastValidInteractionMessage(String(bot.id)));
            }
            else {
                error({
                    content: t('delete_widget_error')
                });
            }
        }
        catch (e) {
            console.error(e);
            error({
                content: t('delete_widget_error')
            });
        }
        finally {
            setDeleting(false);
        }
    };
    const deleteSelectedChatHistory = async (successCb) => {
        if (!selectedDeleteChatList.length) {
            warning({
                content: t('delete_widget_tip')
            });
            return;
        }
        try {
            setDeleting(true);
            const { success: result } = await (0, api_1.deleteChatHistory)('HISTORY_OPERATION_BIZ_TYPE_BOT', selectedDeleteChatList.map(c => c.id));
            if (result) {
                success({
                    content: t('delete_widget_success')
                });
                removeHistoryRecord(selectedDeleteChatList);
                clearDeleteChat();
                successCb?.();
                const { botId } = selectedDeleteChatList[0];
                setBotLastMessage(String(botId), getBotLastValidInteractionMessage(String(botId)));
            }
            else {
                error({
                    content: t('delete_widget_error')
                });
            }
        }
        catch (e) {
            warning({
                content: '删除失败'
            });
        }
        finally {
            setDeleting(false);
        }
    };
    return {
        deleting,
        deleteAll,
        deleteSelectedChatHistory
    };
}
