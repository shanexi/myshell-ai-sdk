import { PropInfo } from '../../../../../src/common/constants/interfaces/task.js';
type LessOfEnergyProps = {
    isOpen: boolean;
    onResume: () => void;
    onStop: () => void;
    propItem?: PropInfo;
};
export default function UseEnergyPackModal(props: LessOfEnergyProps): import("react/jsx-runtime").JSX.Element;
export {};
