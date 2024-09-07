import { CurveSummary } from '../../../../../../../src/apis/apiTypes.js';
export interface ScamAlertModalProps {
    isOpen: boolean;
    curves?: CurveSummary[];
    onClose: () => void;
}
export default function ScamAlertModal({ isOpen, curves, onClose }: ScamAlertModalProps): import("react/jsx-runtime").JSX.Element;
