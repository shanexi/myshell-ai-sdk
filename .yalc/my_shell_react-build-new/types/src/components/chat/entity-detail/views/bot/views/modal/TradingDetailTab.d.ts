import { CurveSummary, ITopHolder, ITradeOrder } from '../../../../../../../../../src/apis/apiTypes.js';
interface TradingDetailTabProps {
    curve: CurveSummary;
    topTradeOrders: ITradeOrder[];
    topHolers: ITopHolder[];
    holdersCount?: number;
    isSticky?: boolean;
}
export default function TradingDetailTab(props: TradingDetailTabProps): import("react/jsx-runtime").JSX.Element;
export {};
