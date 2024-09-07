interface P {
    id: string;
    botId: string;
    successCb?: () => void;
}
declare function GalleryShareBtn({ id, botId, successCb }: P): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof GalleryShareBtn>;
export default _default;
