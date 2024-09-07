import { ReactNode } from 'react';
type DisplayProps = {
    file: File | string;
};
export type SpecificDisplayProps = {
    name: string;
    size?: string;
    deleteEle: ReactNode;
    src?: string;
};
export default function Display({ file, onDelete }: DisplayProps & DeleteEleProps): import("react/jsx-runtime").JSX.Element;
type DeleteEleProps = {
    onDelete: () => void;
};
export {};
