"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerSkeleton = BannerSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
const swiper_1 = require("../../../common/components/ui/swiper/index.js");
function BannerSkeletonItem(props) {
    return ((0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "relative cursor-pointer w-full h-full min-h-[260px] md:min-h-[15.6vw] large:min-h-[264px]  bg-surface-container overflow-hidden px-[1.9vw] py-[0.98vw] md:py-[1.6vw] lg:px-[2.08vw] large:py-[2.91vw] rounded-2xl", children: (0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-4 left-0 px-4 md:px-4 md:relative md:bottom-0 md:left-0 text-white text-left md:max-w-[340px] min-h-[10.625vw] h-full flex flex-col justify-end items-start" }) }));
}
function BannerSkeleton() {
    const list = new Array(3).fill(1);
    return ((0, jsx_runtime_1.jsx)(swiper_1.Swiper, { dataList: list, autoplay: false, from: "Explore_Banner", swiperType: "banner", component: BannerSkeletonItem }));
}
