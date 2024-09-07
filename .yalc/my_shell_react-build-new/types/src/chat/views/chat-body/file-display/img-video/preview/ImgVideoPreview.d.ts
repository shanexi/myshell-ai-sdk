import { EmbedObj } from '../../../../../../../../src/apis/common.js';
interface P {
    imgVideoList: EmbedObj[];
    activeIndex: number;
    open: boolean;
    onClose: () => void;
}
export default function ImgVideoPreview({ imgVideoList, activeIndex, open, onClose }: P): import("react/jsx-runtime").JSX.Element;
export {};
