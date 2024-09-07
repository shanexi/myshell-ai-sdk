import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const Checkbox: React.ForwardRefExoticComponent<Omit<CheckboxPrimitive.CheckboxProps & React.RefAttributes<HTMLButtonElement>, "ref"> & VariantProps<(props?: ({
    variant?: "circle" | "checkbox" | "radio" | "circle-static" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string> & {
    label?: string;
    isCaption?: boolean;
    captionContent?: string;
} & React.RefAttributes<HTMLButtonElement>>;
export { Checkbox };
