"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useRedeemReward;
const react_1 = require("react");
const task_1 = require("../../apis/task.js");
const store_1 = require("../../services/store/index.js");
function useRedeemReward() {
    const [acting, setActing] = (0, react_1.useState)(false);
    const setNewlyPropsCount = (0, store_1.useTaskStore)(state => state.setNewlyPropsCount);
    const redeem = async (id, count) => {
        setActing(true);
        const res = await (0, task_1.rewardRedeem)(id, count);
        (0, task_1.getNewlyMyPropsCount)().subscribe({
            next: num => {
                setNewlyPropsCount(num);
            }
        });
        setActing(false);
        return res;
    };
    return {
        acting,
        redeem
    };
}
