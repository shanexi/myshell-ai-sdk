import { RewardInfo } from '../../../../../../../src/common/constants/interfaces/task.js';
interface RedemptionSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUse: (count: number) => void;
    rewardInfo: RewardInfo;
    redeemedCount: number;
}
export default function RedemptionSuccessModal({ isOpen, onClose, onUse, rewardInfo, redeemedCount }: RedemptionSuccessModalProps): import("react/jsx-runtime").JSX.Element;
export {};
