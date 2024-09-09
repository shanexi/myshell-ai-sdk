import { EmbedObj } from '../../../../../../../../src/apis/common';
interface P {
    imgVideoList: EmbedObj[];
    activeIndex: number;
    open: boolean;
    onClose: () => void;
}
export default function ImgVideoPreview({ imgVideoList, activeIndex, open, onClose }: P): import("react/jsx-runtime").JSX.Element;
export {};
