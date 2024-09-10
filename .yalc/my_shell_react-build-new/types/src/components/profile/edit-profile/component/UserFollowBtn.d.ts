import { User } from '../../../../common/constants/interfaces/user';
export declare function UserFollowBtn({ detailData, followCallback, size, className }: {
    detailData: User | null | undefined;
    followCallback?: (isFollow?: boolean) => void;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
JSX.Element;
