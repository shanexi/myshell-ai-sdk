"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useClearMemory;
const next_intl_1 = require("next-intl");
const entity_1 = require("../../../../../../../apis/entity.js");
const useNotification_1 = require("../../../../../../../common/hooks/useNotification.js");
function useClearMemory(type, id, addMessage, name) {
    const commonT = (0, next_intl_1.useTranslations)('common');
    const t = (0, next_intl_1.useTranslations)('workshop');
    const { success, error } = (0, useNotification_1.useNotification)();
    const handleClearMemory = async () => {
        try {
            const { success: apiSuccess, data } = await (0, entity_1.clearMemory)(type, id);
            if (apiSuccess) {
                success({
                    content: `${name ?? ''} ${commonT('memory_cleared_with')}`
                });
                addMessage(data ?? []);
            }
        }
        catch (e) {
            error({
                content: t('clear_widget_error')
            });
        }
    };
    return handleClearMemory;
}
