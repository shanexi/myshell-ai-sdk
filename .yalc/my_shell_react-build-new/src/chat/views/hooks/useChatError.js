"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChatError = void 0;
const react_1 = require("react");
const store_1 = require("../../../services/store/index.js");
const useChatError = ({ selectedBotId, userId }) => {
    const errorChatRecordList = (0, store_1.useChatStore)(state => state.errorChatRecordList);
    const [errorChatRecord, setErrorChatRecord] = (0, react_1.useState)(errorChatRecordList);
    const firstErrorList = errorChatRecord.filter((eItem) => eItem.prevId == 0);
    (0, react_1.useEffect)(() => {
        if (selectedBotId && userId) {
            const errorChatRecord = JSON.parse(localStorage.getItem(`errChatRecord-${selectedBotId}-${userId}`)) || [];
            setErrorChatRecord(errorChatRecord);
        }
    }, [selectedBotId, userId, errorChatRecordList?.length]);
    return {
        firstErrorList,
        errorChatRecord
    };
};
exports.useChatError = useChatError;
