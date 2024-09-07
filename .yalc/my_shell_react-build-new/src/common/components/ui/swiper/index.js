"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Swiper = Swiper;
const jsx_runtime_1 = require("react/jsx-runtime");
const class_variance_authority_1 = require("class-variance-authority");
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const modules_1 = require("swiper/modules");
const react_2 = require("swiper/react");
require("swiper/css");
require("swiper/css/navigation");
require("swiper/css/free-mode");
require("swiper/css/grid");
require("swiper/css/pagination");
const utils_1 = require("../../../../lib/utils.js");
const index_module_scss_1 = __importDefault(require("./index.module.scss"));
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const swiperVariants = (0, class_variance_authority_1.cva)('', {
    variants: {
        rounded: {
            none: 'rounded-none',
            sm: 'rounded-sm',
            default: 'rounded',
            md: 'rounded-md',
            lg: 'rounded-lg',
            xl: 'rounded-xl',
            '2xl': 'rounded-2xl',
            '3xl': 'rounded-3xl',
            full: 'rounded-full'
        }
    },
    defaultVariants: {
        rounded: 'none'
    }
});
function Swiper(props) {
    const { className, componentClassName, slideClassName, rounded = 'none', delay = 4000, loop = true, slidesPerView = 1, dataList = [], swiperType = 'default', from = '', component, autoplay, spaceBetween = 12, centeredSlides = true, gridRows = 3 } = props;
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const isBanner = swiperType === 'banner';
    const isFeatured = swiperType === 'featured';
    const isGrid = swiperType === 'grid';
    const router = (0, navigation_1.useRouter)();
    const Com = component || 'div';
    const swiperList = (0, react_1.useMemo)(() => {
        const { length } = dataList;
        if (length < 2 || isGrid || isFeatured) {
            return dataList;
        }
        const newList = dataList.slice(0);
        const last = newList.pop();
        newList.unshift(last);
        return newList;
    }, [dataList]);
    const autoPlayOptions = {
        delay
    };
    const swiperRef = (0, react_1.useRef)();
    const fgconfigs = {
        0: {
            slidesPerView: 1.014,
            spaceBetween: 12
        },
        590: {
            slidesPerView: 2.1,
            slidesPerGroup: 2
        },
        769: {
            slidesPerView: 1
        },
        1024: {
            slidesPerView: 2,
            slidesPerGroup: 2
        },
        1280: {
            slidesPerView: 3,
            slidesPerGroup: 3
        },
        1536: {
            slidesPerView: 4,
            slidesPerGroup: 4
        }
    };
    const breakpoints = {
        default: {},
        banner: {
            769: {
                spaceBetween: 20
            }
        },
        featured: fgconfigs,
        grid: fgconfigs
    };
    const swiperConfigs = {
        spaceBetween: isFeatured ? 20 : isGrid ? 0 : spaceBetween,
        autoplay: swiperList?.length > 1 && (autoplay || isBanner) ? autoPlayOptions : false,
        loop: !isFeatured && !isGrid && swiperList?.length > 1 ? loop : false,
        slidesPerView: isBanner ? 'auto' : slidesPerView,
        centeredSlides: isGrid || isFeatured ? false : centeredSlides,
        initialSlide: isBanner ? 1 : 0,
        navigation: !isGrid,
        freeMode: (isFeatured || isGrid) && !isMobile,
        scrollbar: (isFeatured || isGrid) && !isMobile,
        ...((isFeatured || isGrid) && !isMobile
            ? {
                mousewheel: {
                    forceToAxis: true
                }
            }
            : {}),
        ...(isGrid ? { grid: { rows: gridRows } } : {}),
        modules: [modules_1.Autoplay, modules_1.Navigation, modules_1.FreeMode, modules_1.Scrollbar, modules_1.Mousewheel, modules_1.Grid]
    };
    const [animate, setAnimate] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setTimeout(() => {
            setAnimate(true);
        }, 200);
    }, []);
    const handleSlideItemClick = (e, gotoUrl, index) => {
        const swiper = swiperRef.current;
        if (!swiper) {
            return;
        }
        if (swiper.realIndex === index) {
            const hasParam = gotoUrl.includes('?') ? '&' : '?';
            const fromParam = from ? `from=${from}` : '';
            const url = `${gotoUrl}${hasParam}${fromParam}`;
            if (!(url.startsWith('https') || url.startsWith('http'))) {
                router.push(url);
            }
            else {
                window.open(url);
            }
        }
        else if (e.target) {
            const rect = e.target?.getBoundingClientRect();
            const screenWidth = window.innerWidth;
            if (rect.left < screenWidth / 2 && rect.right < screenWidth / 2) {
                swiper.slidePrev();
            }
            else if (rect.left > screenWidth / 2 && rect.right > screenWidth / 2) {
                swiper.slideNext();
            }
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: index_module_scss_1.default.swiperBox, children: (0, jsx_runtime_1.jsx)(react_2.Swiper, { observer: true, observeParents: true, ...swiperConfigs, breakpoints: breakpoints[swiperType], className: (0, utils_1.cn)('w-[100vw] md:w-full h-auto flex-shrink-0', isBanner && 'banner-swiper h-[220px] md:h-auto', isFeatured && 'feature-swiper !pl-4 !pr-3 md:!px-4', isGrid && 'grid-swiper h-full !ml-auto !mr-auto !pl-4 !pr-3 md:!px-0', animate && index_module_scss_1.default.animate, className), onInit: swiper => {
                swiperRef.current = swiper;
            }, children: swiperList.map((item, index) => ((0, jsx_runtime_1.jsx)(react_2.SwiperSlide, { className: (0, utils_1.cn)(isBanner &&
                    'banner-swiper-slide !w-[90%] md:!w-[98%] h-[220px] md:h-auto max-w-[1200px] aspect-[4/1] rounded-2xl opacity-30', isFeatured && 'rounded-2xl !w-[100%-32px] md:!w-[100%-72px]', isGrid &&
                    'grid-swiper-slide !w-[100%-32px] md:!w-[100%-72px] !h-[100%/3] flex justify-center items-center rounded-2xl', 'text-clip', slideClassName), children: (0, jsx_runtime_1.jsx)(Com, { item: item, index: index, onClick: handleSlideItemClick, className: (0, utils_1.cn)(swiperVariants({ rounded }), (isBanner || isFeatured) && 'rounded-2xl', componentClassName), isLine: gridRows && (index + 1) % gridRows !== 0 }) }, index))) }) }));
}
