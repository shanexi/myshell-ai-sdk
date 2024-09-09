import { EmbedObj } from '../../../../../../../../../src/apis/common';
interface P {
    imgObj: EmbedObj;
    onPinchStart: () => void;
    onPinchEnd: () => void;
}
export default function PinchZoomImage({ imgObj, onPinchStart, onPinchEnd }: P): import("react/jsx-runtime").JSX.Element;
export {};
