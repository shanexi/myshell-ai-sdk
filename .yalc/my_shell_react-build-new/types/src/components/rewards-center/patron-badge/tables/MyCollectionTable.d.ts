import { CurveSummary, EarningStats } from '../../../../../../src/apis/apiTypes.js';
interface MyCollectionTableProps {
    openBotModal?: (botId: string) => void;
    openTradeModal?: ({ curve }: {
        curve?: CurveSummary;
    }) => void;
    openShareModal?: ({ curve, earningStats }: CurveWithEarningStats) => void;
}
interface CurveWithEarningStats {
    curve: CurveSummary;
    earningStats: EarningStats;
}
export default function MyCollectionTable(props: MyCollectionTableProps): import("react/jsx-runtime").JSX.Element;
export {};
