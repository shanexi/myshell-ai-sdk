import React from 'react';
export interface IBlockProps {
    name?: string;
    children?: React.ReactNode;
}
declare const Block: React.FC<IBlockProps>;
export default Block;
