export default function useGetRewardList(): {
    querying: boolean;
    queryRewardList: (seasonId?: string) => Promise<void>;
    rewardList: import("../../common/constants/interfaces/task").RewardInfo[];
};
