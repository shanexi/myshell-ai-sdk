import { getPointRecords } from '../../../../src/apis/user.js';
export default function useGetPoints(): {
    seasonPoints: import("../../common/constants/interfaces/task").Point[] | undefined;
    unclaimedPoints: import("../../common/constants/interfaces/task").Point[] | undefined;
    exchangePoints: import("../../common/constants/interfaces/task").ExchangePoint[];
    deductionPoints: import("../../common/constants/interfaces/task").Point[] | null;
    getPointRecords: typeof getPointRecords;
    setUnclaimedPoints: (points: import("../../common/constants/interfaces/task").Point[]) => void;
    setExchangePoints: (points: import("../../common/constants/interfaces/task").ExchangePoint[]) => void;
    setDeductionPoints: (points: import("../../common/constants/interfaces/task").Point[]) => void;
    queryPoints: () => Promise<void>;
    queryUnclaimedPoints: () => Promise<void>;
    queryDeductionPoints: () => Promise<void>;
};
