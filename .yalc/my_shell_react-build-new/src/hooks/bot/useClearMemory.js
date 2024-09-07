"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useClearMemory;
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const api_1 = require("../../chat/model/api.js");
const eventTypes_1 = require("../../common/constants/enums/eventTypes.js");
const EventEmitter_1 = __importDefault(require("../../common/utils/EventEmitter.js"));
const store_1 = require("../../services/store/index.js");
const useNotification_1 = require("../../common/hooks/useNotification.js");
function useClearMemory(bot, callback) {
    const commonT = (0, next_intl_1.useTranslations)('common');
    const { success } = (0, useNotification_1.useNotification)();
    const [clearMemorySub, setClearMemorySub] = (0, react_1.useState)(null);
    const addHistoryRecord = (0, store_1.useChatStore)(state => state.addHistoryRecord);
    const clearMemory = async () => {
        if (bot?.id) {
            const res = await (0, api_1.resetBotHistory)(bot?.id);
            if (res.success) {
                success({
                    content: `${bot ? bot?.name : 'Samantha'} ${commonT('memory_cleared_with')}`
                });
                const data = res?.data;
                addHistoryRecord(data?.messages || []);
                EventEmitter_1.default.dispatch(eventTypes_1.EventTypes.DELETE_MEMORY, null);
            }
            callback && callback(res.success);
        }
    };
    (0, react_1.useEffect)(() => {
        return () => {
            clearMemorySub?.unsubscribe();
        };
    }, [clearMemorySub]);
    return clearMemory;
}
