import { CurveSummary, ICurve } from '../../../../../../../src/apis/apiTypes.js';
import { ButtonProps } from '../../../../../../../src/common/components/ui/button.js';
interface LaunchTradeBtnProps extends Omit<ButtonProps, 'onClick'> {
    curve?: ICurve;
    isSelf?: boolean;
    creatorFirst?: boolean;
    isBlock?: boolean;
    onLaunch?: () => void;
    onTrade?: ({ curve }: {
        curve?: CurveSummary;
    }) => void;
}
export default function LaunchTradeBtn(props: LaunchTradeBtnProps): import("react/jsx-runtime").JSX.Element | null;
export {};
