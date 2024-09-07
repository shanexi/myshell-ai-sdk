import React from 'react';
export interface ICardProps {
    name?: string;
    index?: number;
    children?: React.ReactNode;
    error?: boolean;
}
declare const Card: React.FC<ICardProps>;
export default Card;
