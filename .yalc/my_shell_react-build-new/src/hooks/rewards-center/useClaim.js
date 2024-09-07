"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useClaim;
const react_1 = require("react");
const task_1 = require("../../apis/task.js");
const useNotification_1 = require("../../common/hooks/useNotification.js");
function useClaim() {
    const [claimingAll, setClamingAll] = (0, react_1.useState)(false);
    const { warning } = (0, useNotification_1.useNotification)();
    const claimOne = (0, react_1.useCallback)(async (taskId, successCb, errorCb) => {
        try {
            const { success, msg } = await (0, task_1.taskGemClaim)(taskId);
            if (success) {
                successCb && successCb();
            }
            else {
                warning({
                    content: msg
                });
                throw new Error(msg);
            }
        }
        catch (e) {
            errorCb && errorCb();
        }
    }, []);
    const claimAll = (0, react_1.useCallback)(async (successCb) => {
        try {
            setClamingAll(true);
            const { success, msg } = await (0, task_1.taskGemBatchClaim)();
            if (success) {
                successCb && successCb();
            }
            else {
                warning({
                    content: msg
                });
                throw new Error(msg);
            }
        }
        catch (e) {
        }
        finally {
            setClamingAll(false);
        }
    }, []);
    return {
        claimingAll,
        claimOne,
        claimAll
    };
}
