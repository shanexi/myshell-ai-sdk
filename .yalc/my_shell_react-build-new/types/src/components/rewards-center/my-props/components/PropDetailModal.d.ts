import { PropInfo } from '../../../../../../src/common/constants/interfaces/task.js';
interface RewardDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    propInfo: PropInfo;
    onSuccess: (count: number) => void;
}
export default function PropDetailModal({ isOpen, onClose, propInfo, onSuccess }: RewardDetailModalProps): import("react/jsx-runtime").JSX.Element;
export {};
