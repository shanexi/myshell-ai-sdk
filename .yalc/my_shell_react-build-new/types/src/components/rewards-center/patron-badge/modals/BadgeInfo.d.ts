import { ReactNode } from 'react';
interface BadgeInfoProps {
    avatar?: string;
    botName?: string;
    badgeName?: string;
    author?: string;
    price?: string;
    currencyLogo?: ReactNode;
    showPrice?: boolean;
    tickerPriceChanged?: boolean;
    loading?: boolean;
    bnbPrice?: string;
    loadingBnbPrice?: boolean;
}
export default function BadgeInfo(props: BadgeInfoProps): import("react/jsx-runtime").JSX.Element;
export {};
