import React from 'react';
export interface IGridProps {
    name?: string;
    children?: React.ReactNode;
}
declare const Grid: React.FC<IGridProps>;
export default Grid;
