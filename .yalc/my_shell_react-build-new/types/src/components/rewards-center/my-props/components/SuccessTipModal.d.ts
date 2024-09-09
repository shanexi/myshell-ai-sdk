import { PropInfo, RewardInfo } from '../../../../../../src/common/constants/interfaces/task';
interface SuccessTipModalProps {
    isOpen: boolean;
    onClose: () => void;
    rewardInfo: PropInfo | RewardInfo;
    count: number;
    isLoading?: boolean;
}
export default function SuccessTipModal({ isOpen, onClose, rewardInfo, count, isLoading }: SuccessTipModalProps): import("react/jsx-runtime").JSX.Element;
export {};
