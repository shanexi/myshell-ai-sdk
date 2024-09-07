declare const useLatency: () => {
    latency: number;
    startPing: () => void;
    stopPing: () => void;
};
export default useLatency;
