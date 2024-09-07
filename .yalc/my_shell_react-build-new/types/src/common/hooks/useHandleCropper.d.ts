declare const useHandleCropper: () => {
    upLoadData: import("react").MutableRefObject<any>;
    scale: number;
    previewUrl: any;
    setPreviewUrl: import("react").Dispatch<any>;
    handleScale: (value: number) => void;
    handleScalePlus: () => void;
    handleScaleReduce: () => void;
    handleCropper: (imageRef: HTMLImageElement) => void;
    handleCropperScale: () => Promise<void>;
};
export default useHandleCropper;
