import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';
import { Icon } from './icon';
type TItems = {
    label: string;
    value: string;
    count?: number | string;
    hoverText?: string;
    tooltipOpen?: boolean;
    icon?: Icon | React.ElementType;
    disabled?: boolean;
    link?: string;
    hasUnRead?: boolean;
    children?: string | React.ReactNode;
    onClickCallback?: () => void;
};
declare const Tabs: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    variant?: "button" | "underline";
    size?: "sm" | "md" | "lg";
    isLink?: boolean;
    listClassName?: string;
    items?: TItems[];
} & React.RefAttributes<HTMLDivElement>>;
declare const Tab: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & {
    variant?: "button" | "underline";
    size?: "sm" | "md" | "lg";
    isLink?: boolean;
    link?: string;
    count?: number | string;
    label: string;
    hoverText?: string;
    hasUnRead?: boolean;
    tooltipOpen?: boolean;
    onClickCallback?: () => void;
} & React.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { Tabs, Tab, TabsContent };
