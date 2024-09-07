import { ISideBarTabProps } from '../../../src/common/constants/interfaces/common.js';
export default function useSideBar({ setSelectedTab, isMobile }: {
    setSelectedTab: (key: string) => void;
    isMobile?: boolean;
}): {
    tabs: {
        icon: import("react").ForwardRefExoticComponent<Omit<import("react").SVGProps<SVGSVGElement>, "ref"> & {
            title?: string;
            titleId?: string;
        } & import("react").RefAttributes<SVGSVGElement>>;
        text: string;
        href: string;
        mobileHref: string;
        key: string;
    }[];
    getTabKeyByPathname: (tabs: ISideBarTabProps[], pathname: string) => string;
    handleTabClick: (e: any, tab: ISideBarTabProps) => void;
};
