"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWidgetChatError = void 0;
const react_1 = require("react");
const store_1 = require("../../../services/store/index.js");
const useWidgetChatError = ({ widgetId, userId }) => {
    const widgetErrorChatRecordList = (0, store_1.useWorkshopStore)(state => state.widgetErrorChatRecordList);
    const [widgetErrorChatRecord, setWidgetErrorChatRecord] = (0, react_1.useState)(widgetErrorChatRecordList);
    const firstWidgetErrorList = widgetErrorChatRecord.filter((eItem) => eItem.prevId == 0);
    (0, react_1.useEffect)(() => {
        if (widgetId && userId) {
            const errorChatRecord = JSON.parse(localStorage.getItem(`widgetErrChatRecord-${widgetId}-${userId}`)) || [];
            setWidgetErrorChatRecord(errorChatRecord);
        }
    }, [widgetId, userId, widgetErrorChatRecordList?.length]);
    return {
        firstWidgetErrorList,
        widgetErrorChatRecord
    };
};
exports.useWidgetChatError = useWidgetChatError;
