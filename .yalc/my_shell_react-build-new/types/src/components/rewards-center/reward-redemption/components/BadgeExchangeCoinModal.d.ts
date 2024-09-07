import { RewardInfo } from '../../../../../../src/common/constants/interfaces/task.js';
interface BadgeExchangeCoinModalProps {
    isOpen: boolean;
    onClose: (count?: number) => void;
    rewardInfo: RewardInfo;
}
export default function BadgeExchangeCoinModal({ isOpen, onClose, rewardInfo }: BadgeExchangeCoinModalProps): import("react/jsx-runtime").JSX.Element;
export {};
