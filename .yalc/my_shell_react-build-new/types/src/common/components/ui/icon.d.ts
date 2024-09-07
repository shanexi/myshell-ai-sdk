import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const iconVariants: (props?: ({
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "2xs" | "xs" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | null | undefined;
    color?: "static" | "default" | "subtle" | "subtlest" | "disabled" | "inverse" | "brand" | "critical" | "warning" | "success" | null | undefined;
    rotate?: "45" | "90" | "-45" | "-90" | "180" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
export type IconProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof iconVariants> & {
    component?: React.ElementType;
};
declare const Icon: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & VariantProps<(props?: ({
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "2xs" | "xs" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | null | undefined;
    color?: "static" | "default" | "subtle" | "subtlest" | "disabled" | "inverse" | "brand" | "critical" | "warning" | "success" | null | undefined;
    rotate?: "45" | "90" | "-45" | "-90" | "180" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string> & {
    component?: React.ElementType;
} & React.RefAttributes<HTMLSpanElement>>;
export type Icon = React.ForwardRefExoticComponent<IconProps>;
export { Icon };
