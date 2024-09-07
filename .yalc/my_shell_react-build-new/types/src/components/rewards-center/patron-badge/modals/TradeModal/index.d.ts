interface TradeModalProps {
    open: boolean;
    avatar?: string;
    author?: string;
    botName?: string;
    tickerName?: string;
    tickerBalance?: string;
    price?: string;
    creatorFirst?: boolean;
    creatorFirstDDL?: string;
    curveId?: string;
    trading?: boolean;
    setTrading?: (trading: boolean) => void;
    onClose?: () => void;
    onBack?: () => void;
    onTradeSubmitted?: (tx: `0x${string}`) => void;
    onTradeStart?: (action: string) => void;
}
export default function TradeModal(props: TradeModalProps): import("react/jsx-runtime").JSX.Element;
export {};
