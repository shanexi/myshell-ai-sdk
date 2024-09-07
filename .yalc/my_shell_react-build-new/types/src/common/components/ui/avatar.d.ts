import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const AvatarRoot: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarProps & React.RefAttributes<HTMLSpanElement>, "ref"> & VariantProps<(props?: ({
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "xs" | "3xl" | "4xl" | "5xl" | "6xl" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string> & React.RefAttributes<HTMLSpanElement>>;
declare const AvatarImage: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarImageProps & React.RefAttributes<HTMLImageElement>, "ref"> & React.RefAttributes<HTMLImageElement>>;
declare const AvatarFallback: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarFallbackProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
declare const Avatar: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarImageProps & React.RefAttributes<HTMLImageElement>, "ref"> & VariantProps<(props?: ({
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "xs" | "3xl" | "4xl" | "5xl" | "6xl" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string> & {
    variant?: "bot" | "user" | "widget";
    rootStyle?: React.CSSProperties;
} & React.RefAttributes<HTMLImageElement>>;
export { Avatar, AvatarRoot, AvatarImage, AvatarFallback };
