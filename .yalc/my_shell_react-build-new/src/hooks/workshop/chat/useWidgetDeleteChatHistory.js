"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useDeleteWidgetHistory;
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const workshop_1 = require("../../../apis/workshop.js");
const useNotification_1 = require("../../../common/hooks/useNotification.js");
const store_1 = require("../../../services/store/index.js");
function useDeleteWidgetHistory() {
    const selectedWidgetDeleteChatList = (0, store_1.useWorkshopStore)(state => state.selectedWidgetDeleteChatList);
    const clearWidgetDeleteChat = (0, store_1.useWorkshopStore)(state => state.clearWidgetDeleteChat);
    const removeWidgetHistoryRecord = (0, store_1.useWorkshopStore)(state => state.removeWidgetHistoryRecord);
    const getWidgetLastValidInteractionMessage = (0, store_1.useWorkshopStore)(state => state.getWidgetLastValidInteractionMessage);
    const removeHistoryRecordExceptSpecifiedMessages = (0, store_1.useWorkshopStore)(state => state.removeHistoryRecordExceptSpecifiedMessages);
    const t = (0, next_intl_1.useTranslations)('workshop');
    const [deleting, setDeleting] = (0, react_1.useState)(false);
    const { success, warning, error } = (0, useNotification_1.useNotification)();
    const deleteAll = async (widgetId, successCb) => {
        setDeleting(true);
        const res = await (0, workshop_1.deleteAllWidgetHistory)(widgetId);
        if (res.success) {
            success({
                content: t('delete_widget_success')
            });
            removeHistoryRecordExceptSpecifiedMessages(widgetId, []);
            successCb && successCb();
        }
        else {
            error({
                content: t('delete_widget_error')
            });
        }
        setDeleting(false);
    };
    const deleteSelectedWidgetHistory = async (successCb) => {
        if (!selectedWidgetDeleteChatList.length) {
            warning({
                content: t('delete_widget_tip')
            });
            return;
        }
        try {
            setDeleting(true);
            const res = await (0, workshop_1.deleteHistoryMessageByMsgIds)(selectedWidgetDeleteChatList.map(c => c.id));
            if (res.success) {
                success({
                    content: t('delete_widget_success')
                });
                removeWidgetHistoryRecord(selectedWidgetDeleteChatList);
                clearWidgetDeleteChat();
                successCb?.();
                const widgetId = selectedWidgetDeleteChatList[0].id;
            }
            else {
                error({
                    content: t('delete_widget_error')
                });
            }
            setDeleting(false);
        }
        catch (e) {
            warning({
                content: t('delete_widget_error')
            });
            setDeleting(false);
        }
    };
    return {
        deleting,
        deleteAll,
        deleteSelectedWidgetHistory
    };
}
