import React from 'react';
export interface ISectionProps {
    name?: string;
    children?: React.ReactNode;
}
declare const Section: React.FC<ISectionProps>;
export default Section;
