type P = {
    onFileReadyToUpload: (file: File | Blob, fileSuffix: string, endCb: () => void, successCb: () => void) => void;
};
export default function PhotoUploader({ onFileReadyToUpload }: P): import("react/jsx-runtime").JSX.Element;
export {};
