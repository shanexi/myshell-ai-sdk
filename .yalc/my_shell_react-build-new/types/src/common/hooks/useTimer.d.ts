declare const useTimer: () => {
    timeFormatted: string;
    startClock: () => void;
    stopClock: () => void;
};
export default useTimer;
