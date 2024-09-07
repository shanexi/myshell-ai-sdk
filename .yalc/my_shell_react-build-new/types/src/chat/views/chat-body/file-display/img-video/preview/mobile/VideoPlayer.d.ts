interface P {
    src: string;
    triggerPlay?: boolean;
}
declare function VideoPlayer({ src, triggerPlay }: P): import("react/jsx-runtime").JSX.Element;
declare const MemorizedVideoPlayer: import("react").MemoExoticComponent<typeof VideoPlayer>;
export default MemorizedVideoPlayer;
