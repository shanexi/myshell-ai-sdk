import { WalletAsset } from '../../../../../../../../src/common/constants/interfaces/user.js';
interface BalancesProps {
    name: string;
    assets: WalletAsset[];
    loading: boolean;
}
export default function Balances(props: BalancesProps): import("react/jsx-runtime").JSX.Element;
export {};
