import React from 'react';
type P = {
    children: React.ReactNode;
    className: string;
    delta: number;
    onSwiped: (data: any) => void;
    onSwiping: (data: any) => void;
};
declare const SwipeWrapper: (props: P) => import("react/jsx-runtime").JSX.Element;
export default SwipeWrapper;
