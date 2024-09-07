import 'driver.js/dist/driver.css';
export declare const useGuide: () => {
    driverGuide: ({ step, steps, showProgress, hasSkip, prevBtnText, nextBtnText, doneBtnText, nextMove, onDestroyed, onNextClick }: {
        step: string;
        steps: object[];
        hasSkip?: boolean;
        showProgress?: boolean;
        prevBtnText?: string;
        nextBtnText?: string;
        doneBtnText?: string;
        nextMove?: boolean;
        onDestroyed?: () => void;
        onNextClick?: (step: string) => void;
    }) => void;
};
