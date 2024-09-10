import { User } from '../../common/constants/interfaces/user';
export type ActiveContent = 'gallery' | 'widgets' | 'shares' | 'bots';
export default function UserDetail({ showInsideScroller, detailData, showTopActions, defaultTab, onClose, followCallback }: {
    showInsideScroller?: boolean;
    detailData: User | undefined;
    showTopActions?: boolean;
    defaultTab?: string;
    onClose?: () => void;
    followCallback?: () => void;
}): import("react/jsx-runtime").JSX.Element;
JSX.Element;
