import { EmbedObj } from '../../../../../../../../../src/apis/common.js';
import 'swiper/css';
interface P {
    imgVideoList: EmbedObj[];
    activeIndex: number;
    onClose: () => void;
    publishing?: boolean;
    publishGalleryHandle?: (index: number) => void;
}
export default function MobilePreview({ imgVideoList, activeIndex, publishing, onClose, publishGalleryHandle }: P): import("react/jsx-runtime").JSX.Element;
export {};
