"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useReceivedReward;
const react_use_1 = require("react-use");
function useReceivedReward() {
    const [receivedReward, setReceivedReward] = (0, react_use_1.useToggle)(false);
    const onReceivedReward = () => {
        setReceivedReward(true);
    };
    const onCloseReceivedRewardModal = () => {
        setReceivedReward(false);
    };
    return {
        receivedReward,
        onReceivedReward,
        onCloseReceivedRewardModal
    };
}
