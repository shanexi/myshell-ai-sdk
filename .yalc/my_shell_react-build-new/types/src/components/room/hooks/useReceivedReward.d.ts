export default function useReceivedReward(): {
    receivedReward: boolean;
    onReceivedReward: () => void;
    onCloseReceivedRewardModal: () => void;
};
