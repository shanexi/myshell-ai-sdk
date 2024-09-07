import { FieldValue, FieldValues } from 'react-hook-form';
import { ISchema } from './schema';
import { IValidatorRules } from './validator';
export type XTypes = 'Section' | 'Block' | 'Control' | 'Card' | 'Grid' | 'Switch';
export type XLayouts = 'Vertical' | 'Horizontal';
export type XReactions = {
    when: string;
    target: string;
    fullfill?: {
        schema?: ISchema;
        state?: {
            value?: FieldValue<FieldValues>;
        };
    };
    otherwise?: {
        schema?: ISchema;
        state?: {
            value?: FieldValue<FieldValues>;
        };
    };
};
export interface IUISchema {
    'x-type'?: XTypes;
    'x-title-size'?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
    'x-layout'?: XLayouts;
    'x-component'?: string;
    'x-class'?: string;
    'x-component-props'?: {
        [key: string]: any;
    };
    'x-disabled'?: boolean;
    'x-read-only'?: boolean;
    'x-validator'?: IValidatorRules[];
    'x-reactions'?: XReactions | XReactions[];
    'x-collapsible'?: boolean;
    'x-role'?: string;
    'x-dropable'?: boolean;
    'x-draggable'?: boolean;
    'x-deletable'?: boolean;
    'x-addable'?: boolean;
    'x-switchable'?: boolean;
    'x-switchable-default'?: boolean;
    'x-switch-default-value'?: FieldValue<FieldValues>;
    'x-hidden'?: boolean;
    'x-value-prop-name'?: string;
    'x-onchange-prop-name'?: string;
    'x-empty'?: {
        text: string;
    };
    'x-raw'?: boolean;
    'x-key'?: string;
    'x-title-editable'?: boolean;
    'x-title-component-props'?: {
        [key: string]: any;
    };
    'x-inline'?: boolean;
    'x-suffix'?: string;
    'x-error-component'?: string;
}
