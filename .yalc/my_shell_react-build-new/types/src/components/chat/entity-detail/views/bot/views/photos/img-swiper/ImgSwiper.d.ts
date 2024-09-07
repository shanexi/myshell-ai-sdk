import { PhotoInfo } from '../../../../../../../../../../src/common/constants/interfaces/bot.js';
interface ImgSwiperProps {
    imgList: PhotoInfo[];
    activeIndex: number;
    open: boolean;
    onClose: () => void;
    onDelete: (id: number) => void;
    deleting: boolean;
    deletable?: boolean;
}
export default function ImgSwiper({ imgList, activeIndex, open, onClose, onDelete, deleting, deletable }: ImgSwiperProps): import("react/jsx-runtime").JSX.Element;
export {};
