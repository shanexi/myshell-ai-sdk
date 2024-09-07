import { NormalCardProps } from '../model/interfaces';
type P = {
    item: NormalCardProps;
    setShowUserDetail?: (item: any) => void;
    isLine: boolean;
    showChat?: boolean;
    showTags?: boolean;
    size?: 'default' | 'sm';
    inBox?: boolean;
    className?: string;
    linkClassName?: string;
    from?: string;
    disableJumpToChat?: boolean;
    onClick?: (borId: string) => void;
    dividerClassName?: string;
};
declare function NormalCard(props: P): import("react/jsx-runtime").JSX.Element;
export default NormalCard;
