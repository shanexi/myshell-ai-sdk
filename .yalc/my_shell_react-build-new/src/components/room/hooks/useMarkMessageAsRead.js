"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useMarkMessageAsRead;
const new_chat_1 = require("../../../apis/new-chat.js");
function useMarkMessageAsRead(id) {
    const markMessageAsRead = async () => {
        try {
            const { success, data, msg } = await (0, new_chat_1.markAsRead)(id);
            if (!success) {
                return false;
            }
            return true;
        }
        catch (e) {
            return false;
        }
    };
    return {
        markMessageAsRead
    };
}
