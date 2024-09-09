import { GolangPropItemInfo } from '../../../../src/common/constants/interfaces/task';
interface UseSeasonPassSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    rewardInfo?: GolangPropItemInfo;
    isLoading?: boolean;
}
export default function UseSeasonPassSuccessModal({ isOpen, onClose, rewardInfo, isLoading }: UseSeasonPassSuccessModalProps): import("react/jsx-runtime").JSX.Element;
export {};
