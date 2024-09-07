import React from 'react';
interface IVariableProps {
    id?: number | string;
    scope?: {
        [key: string]: TScope;
    };
}
export type TVariable = {
    name?: string;
    variable?: string;
};
export type TScope = TVariable[];
export interface IVariableProviderProps {
    children: React.ReactNode | React.ReactNode[];
}
export declare const useVariableContext: () => IVariableProps;
export declare const VariableProvider: React.FC<IVariableProviderProps>;
export {};
