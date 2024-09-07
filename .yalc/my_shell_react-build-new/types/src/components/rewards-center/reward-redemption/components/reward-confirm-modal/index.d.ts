import { RewardInfo } from '../../../../../../../src/common/constants/interfaces/task.js';
interface RewardConfirmModalProps {
    isOpen: boolean;
    rewardInfo: RewardInfo;
    onConfirm: () => void;
    onCancel: () => void;
    redeemedCount: number;
    redeemedShellCoin: number;
}
export default function RewardConfirmModal({ isOpen, onConfirm, onCancel, rewardInfo, redeemedCount, redeemedShellCoin, }: RewardConfirmModalProps): import("react/jsx-runtime").JSX.Element;
export {};
