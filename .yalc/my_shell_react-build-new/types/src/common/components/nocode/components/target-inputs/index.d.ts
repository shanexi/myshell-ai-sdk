import * as React from 'react';
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
export interface ITargetInputsProps {
    name: string;
}
declare const TargetInputs: (props: ITargetInputsProps) => import("react/jsx-runtime").JSX.Element | null;
export { TargetInputs };
