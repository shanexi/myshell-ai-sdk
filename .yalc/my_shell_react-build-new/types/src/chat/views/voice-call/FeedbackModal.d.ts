import { BotInfo } from '../../../../../src/common/constants/interfaces/bot.js';
type FeedbackProps = {
    botInfo?: BotInfo | null;
    isOpen: boolean;
    onClose: () => void;
};
type RatingProps = {
    rate: number;
    onRateChange: (rate: number) => void;
};
export declare function Rating(props: RatingProps): import("react/jsx-runtime").JSX.Element;
export default function FeedbackModal(props: FeedbackProps): import("react/jsx-runtime").JSX.Element;
export {};
