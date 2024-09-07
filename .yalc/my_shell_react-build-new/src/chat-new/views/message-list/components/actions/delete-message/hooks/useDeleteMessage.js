"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useDeleteMessage;
const next_intl_1 = require("next-intl");
const react_use_1 = require("react-use");
const new_chat_1 = require("../../../../../../../apis/new-chat.js");
const useNotification_1 = require("../../../../../../../common/hooks/useNotification.js");
function useDeleteMessage(type, id, deleteSpecifiedMessageId) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const [deleting, setDeleting] = (0, react_use_1.useToggle)(false);
    const { success, error } = (0, useNotification_1.useNotification)();
    const deleteMessage = async (msgId) => {
        try {
            setDeleting(true);
            const { success: apiSuccess } = await (0, new_chat_1.deleteHistory)(type, msgId);
            if (apiSuccess) {
                success({
                    content: t('delete_widget_success')
                });
                deleteSpecifiedMessageId?.(msgId);
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
    return {
        deleting,
        deleteMessage
    };
}
