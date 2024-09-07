import { FieldValue, FieldValues } from 'react-hook-form';
import { Input, Render, Variable } from './types';
interface IProConfig {
    id?: string;
    type?: 'automata';
    initial: string;
    states?: {
        [state_name: string]: IProConfigState;
    };
    context?: {
        [context_name: string]: {
            name: string;
            type: string;
            value: string;
        };
    };
    transitions: {
        [action_name: string]: string | {
            target?: string;
            condition?: string;
        };
    };
}
interface IProConfigState {
    type?: 'state';
    name?: string;
    inputs?: {
        [input_name: string]: Input;
    };
    tasks?: IProConfigWidget[];
    outputs?: {
        [output_name: string]: {
            name: string;
            type: string;
            value: string;
        };
    };
    render?: Render;
    transitions?: {
        condition?: string;
        target?: string;
        target_inputs?: {
            [input_name: string]: FieldValue<FieldValues>;
        };
        error_message?: string;
    };
}
interface IProConfigWidget {
    name?: string;
    module_type?: string;
    module_config?: {
        widget_id: string;
        output_name: Variable;
        [key: string]: unknown;
    };
}
export type { IProConfig, IProConfigState, IProConfigWidget };
