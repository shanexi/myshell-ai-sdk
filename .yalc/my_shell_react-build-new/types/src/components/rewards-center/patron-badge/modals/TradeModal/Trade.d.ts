import { ReactNode } from 'react';
export type TradeAction = 'buy' | 'sell';
interface TradeProps {
    curveId?: string;
    action?: TradeAction;
    tickerBalance?: number;
    total?: string;
    balanceOfBNB?: string;
    amount?: string;
    currencyLogo?: ReactNode;
    errorText?: string;
    ticker?: string;
    creatorFirst?: boolean;
    creatorFirstDDL?: string;
    bnbPrice?: string;
    loadingBnbPrice?: boolean;
    loading?: boolean;
    onAmountChange?: (amount: string) => void;
    setAction?: (action: TradeAction) => void;
}
export default function Trade(props: TradeProps): import("react/jsx-runtime").JSX.Element;
export {};
