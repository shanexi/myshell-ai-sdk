import { EmbedObj } from '../../../../../../../apis/common';
interface P {
    imgObj: EmbedObj;
    handleZoomIn: () => void;
    handleZoomOut: () => void;
    resetScaleValue: () => void;
    onClose: () => void;
}
export default function ImageItem({ imgObj, handleZoomIn, handleZoomOut, resetScaleValue, onClose }: P): import("react/jsx-runtime").JSX.Element;
export {};
;
export {};
