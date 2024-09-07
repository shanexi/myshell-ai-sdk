import { RewardInfo } from '../../../../../../../src/common/constants/interfaces/task.js';
interface RewardDetailModalProps {
    isOpen: boolean;
    onClose: (count?: number) => void;
    rewardInfo: RewardInfo;
}
export default function ExchangeCoinModal({ isOpen, onClose, rewardInfo }: RewardDetailModalProps): import("react/jsx-runtime").JSX.Element;
export {};
