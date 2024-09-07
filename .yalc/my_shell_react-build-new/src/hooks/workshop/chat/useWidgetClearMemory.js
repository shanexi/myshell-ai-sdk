"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useWidgetClearMemory;
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const workshop_1 = require("../../../apis/workshop.js");
const eventTypes_1 = require("../../../common/constants/enums/eventTypes.js");
const useNotification_1 = require("../../../common/hooks/useNotification.js");
const EventEmitter_1 = __importDefault(require("../../../common/utils/EventEmitter.js"));
const store_1 = require("../../../services/store/index.js");
function useWidgetClearMemory(widgetInfo, callback) {
    const commonT = (0, next_intl_1.useTranslations)('common');
    const t = (0, next_intl_1.useTranslations)('workshop');
    const { success, error } = (0, useNotification_1.useNotification)();
    const [clearMemorySub, setClearMemorySub] = (0, react_1.useState)(null);
    const widgetAddHistoryRecord = (0, store_1.useWorkshopStore)(state => state.widgetAddHistoryRecord);
    const clearWidgetMemory = async () => {
        if (widgetInfo?.id) {
            const res = await (0, workshop_1.resetWidgetHistory)(widgetInfo.id);
            if (res.success) {
                success({
                    content: `${widgetInfo ? widgetInfo?.name : ''} ${commonT('memory_cleared_with')}`
                });
                const data = res?.data;
                widgetAddHistoryRecord(data?.messages || []);
                EventEmitter_1.default.dispatch(eventTypes_1.EventTypes.DELETE_WIDGET_MEMORY, null);
            }
            else {
                error({
                    content: t('clear_widget_error')
                });
            }
            callback && callback(res.success);
        }
    };
    (0, react_1.useEffect)(() => {
        return () => {
            clearMemorySub?.unsubscribe();
        };
    }, [clearMemorySub]);
    return clearWidgetMemory;
}
