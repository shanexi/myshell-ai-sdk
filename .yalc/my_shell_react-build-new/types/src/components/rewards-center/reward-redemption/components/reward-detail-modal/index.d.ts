import { RewardInfo } from '../../../../../../../src/common/constants/interfaces/task.js';
interface RewardDetailModalProps {
    isOpen: boolean;
    onClose: (count: number) => void;
    onConfirm: (shellCoin: number, count: number) => void;
    rewardInfo: RewardInfo;
    rewardConfirmed: boolean;
    redeemedCount?: number;
}
export default function RewardDetailModal({ isOpen, onClose, onConfirm, rewardInfo, rewardConfirmed, redeemedCount }: RewardDetailModalProps): import("react/jsx-runtime").JSX.Element;
export {};
