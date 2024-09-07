declare global {
    interface Window {
        webkitAudioContext: typeof AudioContext;
    }
}
declare const useAudioPlayer: () => React.ComponentType | "audio";
export default useAudioPlayer;
