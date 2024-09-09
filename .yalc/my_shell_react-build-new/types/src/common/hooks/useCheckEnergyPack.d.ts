import { PropInfo } from '../../../../src/common/constants/interfaces/task';
export default function useCheckEnergyPack(): {
    usableEnergyPack: PropInfo | null;
    checkBeforePopupNoEnergy: () => void;
    getIsNoEnergy: () => boolean;
};
