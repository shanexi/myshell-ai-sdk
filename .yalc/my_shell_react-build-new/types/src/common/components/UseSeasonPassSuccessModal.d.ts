import { GolangPropItemInfo } from '../../../../src/common/constants/interfaces/task.js';
interface UseSeasonPassSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    rewardInfo?: GolangPropItemInfo;
    isLoading?: boolean;
}
export default function UseSeasonPassSuccessModal({ isOpen, onClose, rewardInfo, isLoading }: UseSeasonPassSuccessModalProps): import("react/jsx-runtime").JSX.Element;
export {};
