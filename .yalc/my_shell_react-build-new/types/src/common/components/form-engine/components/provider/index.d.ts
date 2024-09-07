import React from 'react';
import { SchemaReactComponents, TFields, TPath, TValues, TValue } from '../../types';
export interface IFormEngineProviderProps {
    fields: TFields;
    components: SchemaReactComponents;
    children: React.ReactNode | React.ReactNode[];
}
export declare const useFormEngineContext: () => {
    components: SchemaReactComponents;
    fields: TFields;
    remove: (paht: TPath) => void;
    append: (path: TPath, key?: string, obj?: TValues) => void;
    replaceKey: (path: TPath, key: string, value?: TValue) => void;
    reorder: (path: TPath, startIndex: number, endIndex: number) => void;
};
export declare const FormEngineProvider: React.FC<IFormEngineProviderProps>;
