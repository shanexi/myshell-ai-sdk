import { CurveSummary } from '../../../../../../src/apis/apiTypes.js';
export default function LabelActions({ address, setOpenHowToPlay, onLaunchComplete }: {
    address: `0x${string}` | undefined;
    setOpenHowToPlay: React.Dispatch<React.SetStateAction<boolean>>;
    onLaunchComplete: (curve: CurveSummary) => void;
}): import("react/jsx-runtime").JSX.Element;
