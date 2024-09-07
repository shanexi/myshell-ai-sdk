import 'swiper/css';
interface P {
    questions: string[];
    hasEnoughEnergy: boolean;
    handlePick: (question: string) => void;
    disableClick?: boolean;
}
export default function QuestionsMobile({ questions, hasEnoughEnergy, handlePick, disableClick }: P): import("react/jsx-runtime").JSX.Element;
export {};
