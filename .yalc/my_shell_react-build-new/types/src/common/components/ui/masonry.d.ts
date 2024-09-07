import React from 'react';
interface BreakpointColsObject {
    default: number;
    [key: number]: number;
}
interface MasonryProps {
    breakpointCols?: number | BreakpointColsObject;
    className?: string;
    columnClassName?: string;
    children?: React.ReactNode;
    columnAttrs?: React.HTMLAttributes<HTMLDivElement>;
}
declare const Masonry: React.FC<MasonryProps>;
export default Masonry;
