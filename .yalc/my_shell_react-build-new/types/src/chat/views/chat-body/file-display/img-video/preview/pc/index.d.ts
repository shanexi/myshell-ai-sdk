import { EmbedObj } from '../../../../../../../../../src/apis/common.js';
interface P {
    imgVideoList: EmbedObj[];
    activeIndex: number;
    onClose: () => void;
    publishing?: boolean;
    publishGalleryHandle?: (index: number) => void;
}
export default function Preview({ imgVideoList, activeIndex, publishing, onClose, publishGalleryHandle }: P): import("react/jsx-runtime").JSX.Element;
export {};
