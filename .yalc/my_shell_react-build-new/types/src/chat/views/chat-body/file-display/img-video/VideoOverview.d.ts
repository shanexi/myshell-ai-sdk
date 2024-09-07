interface P {
    url: string;
    onViewVideo?: () => void;
    customClass?: string;
    showPlayBtn?: boolean;
    showRadius?: boolean;
    showLoading?: boolean;
}
declare function VideoOverview({ url, onViewVideo, customClass, showPlayBtn, showRadius, showLoading }: P): import("react/jsx-runtime").JSX.Element;
declare const MemorizedVideoOverview: import("react").MemoExoticComponent<typeof VideoOverview>;
export default MemorizedVideoOverview;
