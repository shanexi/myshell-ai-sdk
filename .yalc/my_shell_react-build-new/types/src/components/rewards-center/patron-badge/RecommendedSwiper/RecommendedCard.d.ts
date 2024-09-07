export interface RecommendedCardProps {
    avatar?: string;
    tickerName: string;
    botName: string;
    price: string;
    holders: number;
    botId: string;
    symbol: string;
    curveTag: string;
    onClick?: (symbol: string) => void;
}
export default function RecommendedCard(props: RecommendedCardProps): import("react/jsx-runtime").JSX.Element;
