"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGetRewardList;
const react_1 = require("react");
const task_1 = require("../../apis/task.js");
const store_1 = require("../../services/store/index.js");
function useGetRewardList() {
    const setRewardList = (0, store_1.useTaskStore)(state => state.setRewardList);
    const rewardList = (0, store_1.useTaskStore)(state => state.rewardList);
    const rewardQuerying = (0, store_1.useTaskStore)(state => state.rewardQuerying);
    const setRewardQuerying = (0, store_1.useTaskStore)(state => state.setRewardQuerying);
    const queryRewardList = (0, react_1.useCallback)(async (seasonId) => {
        try {
            setRewardQuerying(true);
            const { data } = await (0, task_1.getRewards)(seasonId);
            setRewardList(data ?? []);
        }
        catch (e) {
        }
        finally {
            setRewardQuerying(false);
        }
    }, []);
    return { querying: rewardQuerying, queryRewardList, rewardList };
}
