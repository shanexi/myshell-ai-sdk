interface P {
    url: string;
    imageModel?: string;
    onViewImage: () => void;
    customClass?: string;
    isImageGenerator?: boolean;
    messageId?: string;
    index?: number;
}
declare function ImageOverview({ url, imageModel, onViewImage, customClass, isImageGenerator, messageId, index }: P): import("react/jsx-runtime").JSX.Element;
declare const MemorizedImageOverview: import("react").MemoExoticComponent<typeof ImageOverview>;
export default MemorizedImageOverview;
