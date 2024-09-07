import { type FC } from 'react';
export interface BannerItemProps {
    title: string;
    description: string;
    imageUrl: string;
    mobileImageUrl: string;
    gotoUrl: string;
    gotoSchema: string;
    buttonText: string;
}
export type BannerFC = FC<{
    bannerList: BannerItemProps[];
    goToHandle?: (url: string) => void;
}>;
