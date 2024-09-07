import React from 'react';
import { ISchema, SchemaReactComponents, TValues, TMode } from './types';
export interface IFormEngineProps {
    id?: string;
    schema: ISchema;
    components: SchemaReactComponents;
    mode?: TMode;
    values?: TValues;
    onSubmit?: (values: TValues) => void;
    onChange?: (values: TValues) => void;
    children?: React.ReactNode;
    i18n?: any;
}
declare const FormEngine: React.FC<IFormEngineProps>;
declare const FieldsSlot: React.FC<{
    children: React.ReactNode;
}>;
declare const MemoizedFormEngine: React.FC<IFormEngineProps>;
export { FormEngine, FieldsSlot, MemoizedFormEngine };
export type { ISchema, TValues };
