import { type Dayjs } from 'dayjs';
import { BlockChainInteractionState } from '../../../../src/components/rewards-center/earn/components/BlockChainGuruModal.js';
import { HoldBadge, PropInfo, RewardInfo, SeasonInfo, Task, Point, ExchangePoint } from '../../../../src/common/constants/interfaces/task.js';
export type TaskState = {
    seasons: [SeasonInfo, SeasonInfo] | null;
    seasonIndex: number;
    taskList: Task[];
    points?: Point[][];
    newlyPropsCount: number;
    claimedPoints: number;
    exchangePoints: ExchangePoint[];
    unclaimedPoints?: Point[];
    myProps: PropInfo[];
    deductionPoints: Point[] | null;
    seasonPassUseSuccessModalVisible: boolean;
    holdBadges: HoldBadge[];
    txHash: `0x${string}` | undefined;
    blockChainInteractionState: BlockChainInteractionState;
    rewardList: RewardInfo[];
    rewardQuerying: boolean;
    myPropsQuerying: boolean;
};
export type TaskActions = {
    setSeasonIndex: (index: number) => void;
    setSeasons: (seasons: SeasonInfo, lastSeason: SeasonInfo) => void;
    setExchangePoints: (points: ExchangePoint[]) => void;
    setTaskList: (taskList: Task[]) => void;
    setPoints: (points: Point[][], addToClaimed?: boolean) => void;
    clearClaimedPoints: () => void;
    setUnclaimedPoints: (points: Point[]) => void;
    setMyProps: (myProps: PropInfo[]) => void;
    setNewlyPropsCount: (num: number) => void;
    setDeductionPoints: (points: Point[]) => void;
    setHoldBadges(badges: HoldBadge[]): void;
    setTxHash: (hash: `0x${string}` | undefined) => void;
    setBlockChainInteractionState: (state: BlockChainInteractionState) => void;
    setSeasonPassUseSuccessModalVisible: (state: boolean) => void;
    setRewardList: (rewardList: RewardInfo[]) => void;
    setRewardQuerying: (rewardQuerying: boolean) => void;
    setMyPropsQuerying: (myPropsQuerying: boolean) => void;
};
type TaskStore = TaskState & TaskActions;
type ComputedStore = {
    seasonId: string | null;
    seasonName: string | null;
    isBeta: boolean | null;
    seasonBanners: string[] | null;
    seasonStartDate: Dayjs | null;
    seasonEndDate: Dayjs | null;
    claimableStartDate: Dayjs | null;
    claimableEndDate: Dayjs | null;
    silentPeriodEndDate: Dayjs | null;
    hasClaimableTask: boolean;
    seasonPoints?: Point[];
};
export declare const useTaskStore: import("zustand").UseBoundStore<Omit<Omit<Omit<import("zustand").StoreApi<TaskStore>, "getState" | "getInitialState" | "subscribe" | "destroy"> & Omit<import("zustand").StoreApi<TaskState & TaskActions & ComputedStore>, "setState">, "setState"> & {
    setState(nextStateOrUpdater: (TaskState & TaskActions & ComputedStore) | Partial<TaskState & TaskActions & ComputedStore> | ((state: import("immer").WritableDraft<TaskState & TaskActions & ComputedStore>) => void), shouldReplace?: boolean | undefined): void;
}, "setState"> & {
    setState<A extends string | {
        type: string;
    }>(nextStateOrUpdater: (TaskState & TaskActions & ComputedStore) | Partial<TaskState & TaskActions & ComputedStore> | ((state: import("immer").WritableDraft<TaskState & TaskActions & ComputedStore>) => void), shouldReplace?: boolean | undefined, action?: A | undefined): void;
}>;
export {};
