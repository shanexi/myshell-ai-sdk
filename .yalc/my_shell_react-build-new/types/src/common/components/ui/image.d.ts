import { ReactElement, SyntheticEvent } from 'react';
export interface ImageProps {
    src: string;
    width?: string | number;
    height?: string | number;
    placeholder?: boolean | ReactElement;
    fallback?: string;
    rounded?: 'none' | 'sm' | 'default' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
    object?: 'contain' | 'cover' | 'fill' | 'none';
    alt?: string;
    className?: string;
    imgClassName?: string;
    isBackgroud?: boolean;
    onError?: (event: SyntheticEvent<HTMLImageElement, Event>) => void;
}
export declare function Image({ className, imgClassName, placeholder, width, height, src, rounded, fallback, object, isBackgroud, ...otherProps }: ImageProps): import("react/jsx-runtime").JSX.Element;
