import React from 'react';
export type INumberInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    rounded?: 'default' | 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | null | undefined;
    size?: 'xs' | 'sm' | 'md' | 'lg' | null | undefined;
    isFull?: boolean;
    controls?: boolean;
};
declare const NumberInput: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
    rounded?: "default" | "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full" | null | undefined;
    size?: "xs" | "sm" | "md" | "lg" | null | undefined;
    isFull?: boolean;
    controls?: boolean;
} & React.RefAttributes<HTMLInputElement>>;
export { NumberInput };
