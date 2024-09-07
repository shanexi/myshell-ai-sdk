import * as React from 'react';
export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    rounded?: 'default' | 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | null | undefined;
    size?: 'xs' | 'sm' | 'md' | 'lg' | null | undefined;
    isFull?: boolean;
    border?: 'none' | 'default' | null | undefined;
    shadow?: 'none' | 'default' | null | undefined;
    outline?: 'none' | 'default' | null | undefined;
    background?: 'none' | 'default' | null | undefined;
};
declare const Input: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
    rounded?: "default" | "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full" | null | undefined;
    size?: "xs" | "sm" | "md" | "lg" | null | undefined;
    isFull?: boolean;
    border?: "none" | "default" | null | undefined;
    shadow?: "none" | "default" | null | undefined;
    outline?: "none" | "default" | null | undefined;
    background?: "none" | "default" | null | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export { Input };
