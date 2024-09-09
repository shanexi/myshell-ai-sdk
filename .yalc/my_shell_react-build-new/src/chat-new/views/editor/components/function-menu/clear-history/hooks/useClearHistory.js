"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useClearHistory;
const next_intl_1 = require("next-intl");
const react_use_1 = require("react-use");
const new_chat_1 = require("../../../../../../../apis/new-chat.js");
const useNotification_1 = require("../../../../../../../common/hooks/useNotification.js");
function useClearHistory(type, id, deleteSpecifiedMessageId) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const [clearing, setClearing] = (0, react_use_1.useToggle)(false);
    const { success, error } = (0, useNotification_1.useNotification)();
    const deleteAll = async () => {
        try {
            setClearing(true);
            const { success: apiSuccess } = await (0, new_chat_1.clearHistory)(type, id);
            if (apiSuccess) {
                success({
                    content: t('delete_widget_success')
                });
                deleteSpecifiedMessageId?.();
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
            setClearing(false);
        }
    };
    return {
        clearing,
        clearHistory: deleteAll
    };
}
