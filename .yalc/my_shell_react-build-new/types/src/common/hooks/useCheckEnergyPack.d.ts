import { PropInfo } from '../../../../src/common/constants/interfaces/task.js';
export default function useCheckEnergyPack(): {
    usableEnergyPack: PropInfo | null;
    checkBeforePopupNoEnergy: () => void;
    getIsNoEnergy: () => boolean;
};
