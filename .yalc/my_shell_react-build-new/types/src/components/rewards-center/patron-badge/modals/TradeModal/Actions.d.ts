import { TradeAction } from '../../../../../../../src/components/rewards-center/patron-badge/modals/TradeModal/Trade.js';
interface ActionsProps {
    action?: TradeAction;
    disabled?: boolean;
    loading?: boolean;
    insufficientBalance?: boolean;
    onTrade?: () => void;
}
export default function Actions(props: ActionsProps): import("react/jsx-runtime").JSX.Element;
export {};
