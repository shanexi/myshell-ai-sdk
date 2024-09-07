interface P {
    question: string;
    handlePickQuestion: (question: string) => void;
    hasEnoughEnergy: boolean;
    isMobile?: boolean;
    disableClick?: boolean;
}
declare function QuestionItem({ question, handlePickQuestion, hasEnoughEnergy, isMobile, disableClick }: P): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof QuestionItem>;
export default _default;
