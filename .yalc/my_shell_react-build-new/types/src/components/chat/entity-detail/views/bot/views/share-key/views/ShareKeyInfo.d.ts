import { CurveSummary, ITopHolder, ITopTradeOrder } from '../../../../../../../../../../src/apis/apiTypes.js';
type P = {
    id: string;
    name?: string;
    loading?: boolean;
    topTradeOrders?: ITopTradeOrder[];
    topHolers?: ITopHolder[];
    ticker?: string;
    price?: string;
    priceInUSD?: string;
    holdersCount?: number;
    openPrice?: string;
    isSticky?: boolean;
    curve: CurveSummary;
};
export default function ShareKeyInfo(props: P): import("react/jsx-runtime").JSX.Element;
export {};
