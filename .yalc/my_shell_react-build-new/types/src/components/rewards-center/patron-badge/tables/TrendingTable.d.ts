import { CurveSummary, OrderByFields } from '../../../../../../src/apis/apiTypes.js';
interface TrendingTableProps {
    openBotModal?: (botId: string) => void;
    openTradeModal?: ({ curve }: {
        curve?: CurveSummary;
    }) => void;
    defaultField?: OrderByFields;
    searchValue?: string;
    tagIds?: string[];
}
export default function TrendingTable(props: TrendingTableProps): import("react/jsx-runtime").JSX.Element;
export {};
