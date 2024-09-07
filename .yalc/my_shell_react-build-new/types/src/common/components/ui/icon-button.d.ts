import { type VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { Icon } from '../../../../../src/common/components/ui/icon.js';
import { HeroIcon } from '../../../../../src/common/constants/types/common.js';
declare const iconButtonVariants: (props?: ({
    variant?: "outline" | "primary" | "ghost" | null | undefined;
    color?: "gray" | "static" | "default" | "brand" | "warning" | "error" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof iconButtonVariants> {
    asChild?: boolean;
    loading?: boolean;
    disabled?: boolean;
    color?: 'default' | 'brand' | 'warning' | 'error' | 'gray' | 'static';
    icon?: HeroIcon | LucideIcon | Icon | React.ElementType;
}
declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { IconButton, iconButtonVariants };
