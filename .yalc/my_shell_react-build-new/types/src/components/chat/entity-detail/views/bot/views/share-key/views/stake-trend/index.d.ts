import { CurveSummary } from '../../../../../../../../../../../src/apis/apiTypes.js';
interface P {
    ticker?: string;
    tickerPrice?: string;
    tickerPriceInUsd?: string;
    curve?: CurveSummary;
    openPrice?: string;
}
export default function StakeTrend({ ticker, tickerPrice, tickerPriceInUsd, curve }: P): import("react/jsx-runtime").JSX.Element;
export {};
