import { PropInfo, RewardInfo } from '../../common/constants/interfaces/task';
export default function useUseProp(): {
    acting: boolean;
    handleUseProp: (propId: string, prop: PropInfo | RewardInfo, count: number, successCb?: () => void) => Promise<void>;
};
se<void>;
};
