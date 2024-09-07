import { ISideBarTabProps } from '../../../../src/common/constants/interfaces/common.js';
export default function SideBarItem({ tab, isSelected, children, unReadCount, isNew, showClaimable, handleTabClick }: {
    tab: ISideBarTabProps;
    isSelected: boolean;
    children?: React.ReactNode;
    unReadCount?: number;
    isNew?: boolean;
    showClaimable?: boolean;
    isVisitor?: boolean;
    handleTabClick: (e: any, tab: ISideBarTabProps) => void;
}): import("react/jsx-runtime").JSX.Element;
