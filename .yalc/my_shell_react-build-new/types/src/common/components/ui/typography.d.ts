import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
type BlockProps = {
    underline?: boolean;
    strikethrough?: boolean;
    strong?: boolean;
    italic?: boolean;
    dangerous?: boolean;
};
export declare const Heading: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & VariantProps<(props?: ({
    size?: "h1" | "h2" | "h3" | "h4" | "h5" | null | undefined;
    color?: "static" | "default" | "subtle" | "subtlest" | "disabled" | "inverse" | "brand" | "critical" | "warning" | "success" | "subtler" | "inverse-primary" | "inverse-surface" | "static-black" | "critical-bolder" | "warning-bolder" | "success-bolder" | null | undefined;
    lineClamp?: 1 | 2 | 3 | 4 | 5 | 6 | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string> & BlockProps & React.RefAttributes<HTMLHeadingElement>>;
export declare const Display: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & VariantProps<(props?: ({
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "xs" | null | undefined;
    color?: "static" | "default" | "subtle" | "subtlest" | "disabled" | "inverse" | "brand" | "critical" | "warning" | "success" | "subtler" | "inverse-primary" | "inverse-surface" | "static-black" | "critical-bolder" | "warning-bolder" | "success-bolder" | null | undefined;
    lineClamp?: 1 | 2 | 3 | 4 | 5 | 6 | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string> & BlockProps & React.RefAttributes<HTMLElement & HTMLParagraphElement>>;
export declare const Title: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & VariantProps<(props?: ({
    size?: "h1" | "h2" | "h3" | "h4" | "h5" | null | undefined;
    color?: "static" | "default" | "subtle" | "subtlest" | "disabled" | "inverse" | "brand" | "critical" | "warning" | "success" | "subtler" | "inverse-primary" | "inverse-surface" | "static-black" | "critical-bolder" | "warning-bolder" | "success-bolder" | null | undefined;
    lineClamp?: 1 | 2 | 3 | 4 | 5 | 6 | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string> & BlockProps & React.RefAttributes<HTMLHeadingElement>>;
export declare const SubHeading: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & VariantProps<(props?: ({
    size?: "sm" | "lg" | null | undefined;
    color?: "static" | "default" | "subtle" | "subtlest" | "disabled" | "inverse" | "brand" | "critical" | "warning" | "success" | "subtler" | "inverse-primary" | "inverse-surface" | "static-black" | "critical-bolder" | "warning-bolder" | "success-bolder" | null | undefined;
    lineClamp?: 1 | 2 | 3 | 4 | 5 | 6 | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string> & React.RefAttributes<HTMLParagraphElement>>;
export declare const SubTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & VariantProps<(props?: ({
    size?: "sm" | "lg" | null | undefined;
    color?: "static" | "default" | "subtle" | "subtlest" | "disabled" | "inverse" | "brand" | "critical" | "warning" | "success" | "subtler" | "inverse-primary" | "inverse-surface" | "static-black" | "critical-bolder" | "warning-bolder" | "success-bolder" | null | undefined;
    lineClamp?: 1 | 2 | 3 | 4 | 5 | 6 | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string> & React.RefAttributes<HTMLParagraphElement>>;
export declare const Text: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & VariantProps<(props?: ({
    size?: "sm" | "lg" | "xs" | null | undefined;
    weight?: "medium" | "semibold" | "regular" | null | undefined;
    color?: "static" | "default" | "subtle" | "subtlest" | "disabled" | "inverse" | "brand" | "critical" | "warning" | "success" | "subtler" | "inverse-primary" | "inverse-surface" | "static-black" | "critical-bolder" | "warning-bolder" | "success-bolder" | null | undefined;
    lineClamp?: 1 | 2 | 3 | 4 | 5 | 6 | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string> & BlockProps & React.RefAttributes<HTMLElement & HTMLParagraphElement>>;
export declare const Paragraph: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & VariantProps<(props?: ({
    size?: "sm" | "lg" | "xs" | null | undefined;
    weight?: "medium" | "semibold" | "regular" | null | undefined;
    color?: "static" | "default" | "subtle" | "subtlest" | "disabled" | "inverse" | "brand" | "critical" | "warning" | "success" | "subtler" | "inverse-primary" | "inverse-surface" | "static-black" | "critical-bolder" | "warning-bolder" | "success-bolder" | null | undefined;
    lineClamp?: 1 | 2 | 3 | 4 | 5 | 6 | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string> & BlockProps & React.RefAttributes<HTMLElement & HTMLParagraphElement>>;
export declare const Description: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & VariantProps<(props?: ({
    size?: "sm" | "lg" | null | undefined;
    weight?: "medium" | "regular" | null | undefined;
    color?: "static" | "default" | "subtle" | "subtlest" | "disabled" | "inverse" | "brand" | "critical" | "warning" | "success" | "subtler" | "inverse-primary" | "inverse-surface" | "static-black" | "critical-bolder" | "warning-bolder" | "success-bolder" | null | undefined;
    lineClamp?: 1 | 2 | 3 | 4 | 5 | 6 | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string> & BlockProps & React.RefAttributes<HTMLParagraphElement>>;
export {};
