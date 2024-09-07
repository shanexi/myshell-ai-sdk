import { FieldValue, FieldValues } from 'react-hook-form';
import { IWidget } from './IWidget';
import { Input, Render } from './types';
export interface IState {
    type: 'state';
    name?: string;
    inputs?: {
        [input_name: string]: Input;
    };
    tasks?: IWidget[];
    render?: Render;
    outputs?: {
        [output_name: string]: {
            name: string;
            type: string;
            value: string;
        };
    };
    transitions?: {
        condition?: string;
        target?: string;
        target_inputs?: {
            [input_name: string]: FieldValue<FieldValues>;
        };
        error_message?: string;
    };
}
