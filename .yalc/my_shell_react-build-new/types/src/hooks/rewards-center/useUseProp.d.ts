import { PropInfo, RewardInfo } from '../../../../src/common/constants/interfaces/task.js';
export default function useUseProp(): {
    acting: boolean;
    handleUseProp: (propId: string, prop: PropInfo | RewardInfo, count: number, successCb?: () => void) => Promise<void>;
};
