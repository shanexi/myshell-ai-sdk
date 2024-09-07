interface ImgDisplayProps {
    imgSrc: string;
    onOpenImgSwiperModal: () => void;
    onDeleteImg?: () => void;
    deletable?: boolean;
}
export default function ImgDisplay({ imgSrc, onOpenImgSwiperModal, onDeleteImg, deletable }: ImgDisplayProps): import("react/jsx-runtime").JSX.Element;
export {};
