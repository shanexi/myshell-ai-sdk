import React from 'react';
type P = {
    fullscreen?: string;
    handleImageLoaded: (event: any, original: any) => void;
    isFullscreen: boolean;
    onImageError?: (event: any) => void;
    original: string;
    originalAlt?: string;
    originalHeight?: string;
    originalWidth?: string;
    sizes?: string;
    srcSet?: string;
    loading?: 'eager' | 'lazy' | undefined;
    [key: string]: any;
};
declare const Item: React.MemoExoticComponent<(props: P) => import("react/jsx-runtime").JSX.Element>;
export default Item;
