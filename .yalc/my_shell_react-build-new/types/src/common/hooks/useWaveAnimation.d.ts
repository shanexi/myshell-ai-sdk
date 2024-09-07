declare function useWaveAnimation(isImmediate?: boolean): {
    lottieRef: import("react").MutableRefObject<HTMLDivElement | null>;
    stopAnimation: () => void;
    startAnimation: () => void;
};
export default useWaveAnimation;
