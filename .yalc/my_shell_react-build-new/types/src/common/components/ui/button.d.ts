import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const buttonVariants: (props?: ({
    variant?: "link" | "outline" | "static" | "primary" | "plain" | null | undefined;
    color?: "gray" | "default" | "brand" | "warning" | "error" | "chat" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
    icon?: React.ElementType;
    iconDirection?: 'left' | 'right';
    color?: 'default' | 'brand' | 'warning' | 'error' | 'gray' | 'chat';
    noStyle?: boolean;
    iconClassName?: string;
    iconOutBox?: boolean;
    isBlock?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };
