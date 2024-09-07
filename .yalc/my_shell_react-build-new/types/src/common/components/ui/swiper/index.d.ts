import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/grid';
import 'swiper/css/pagination';
export interface SwiperProps {
    delay?: number;
    autoplay?: boolean;
    loop?: boolean;
    slidesPerView?: number | 'auto';
    dataList: any;
    swiperType: 'default' | 'banner' | 'featured' | 'grid';
    gridRows?: number;
    component?: React.ElementType;
    className?: string;
    componentClassName?: string;
    slideClassName?: string;
    rounded?: 'none' | 'sm' | 'default' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
    from?: string;
    centeredSlides?: boolean;
    spaceBetween?: number;
}
export declare function Swiper(props: SwiperProps): import("react/jsx-runtime").JSX.Element;
