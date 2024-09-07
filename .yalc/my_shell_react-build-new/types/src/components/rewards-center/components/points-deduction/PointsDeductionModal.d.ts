import { Point } from '../../../../../../src/common/constants/interfaces/task.js';
interface PointsDeductionModalProps {
    isOpen: boolean;
    onClose: () => void;
    points: Point[];
}
export default function PointsDeductionModal({ isOpen, onClose, points }: PointsDeductionModalProps): import("react/jsx-runtime").JSX.Element;
export {};
