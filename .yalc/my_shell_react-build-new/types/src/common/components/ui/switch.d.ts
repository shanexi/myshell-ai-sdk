import * as SwitchPrimitives from '@radix-ui/react-switch';
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const Switch: React.ForwardRefExoticComponent<Omit<SwitchPrimitives.SwitchProps & React.RefAttributes<HTMLButtonElement>, "ref"> & VariantProps<(props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string> & React.RefAttributes<HTMLButtonElement>>;
export { Switch };
