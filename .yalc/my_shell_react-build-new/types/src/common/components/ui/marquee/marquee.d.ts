import { ReactNode, CSSProperties, FC, RefAttributes } from 'react';
import './index.css';
type MarqueeProps = {
    style?: CSSProperties;
    className?: string;
    autoFill?: boolean;
    play?: boolean;
    pauseOnHover?: boolean;
    direction?: 'left' | 'right' | 'up' | 'down';
    speed?: number;
    delay?: number;
    loop?: number;
    onFinish?: () => void;
    onCycleComplete?: () => void;
    children?: ReactNode;
} & RefAttributes<HTMLDivElement>;
declare const Marquee: FC<MarqueeProps>;
export default Marquee;
