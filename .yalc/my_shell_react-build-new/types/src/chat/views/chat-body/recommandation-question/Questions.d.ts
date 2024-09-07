interface P {
    questions: string[];
    hasEnoughEnergy: boolean;
    handlePick: (question: string) => void;
    disableClick?: boolean;
}
export default function Questions({ questions, hasEnoughEnergy, handlePick, disableClick }: P): import("react/jsx-runtime").JSX.Element;
export {};
