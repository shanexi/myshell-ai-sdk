import { GolangPropItemInfo } from '../../../../../src/common/constants/interfaces/task';
export default function useRedeemAndUseSeasonPass(): {
    acting: boolean;
    handleRedeemAndUseSeasonPass: (successCb?: (usedItem: GolangPropItemInfo) => void) => Promise<void>;
};
