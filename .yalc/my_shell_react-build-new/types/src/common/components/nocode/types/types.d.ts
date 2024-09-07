import { TValues } from '../../form-engine/types';
type URLString = string;
type TextVar = {
    type: 'text';
    value?: string;
};
type ImageVar = {
    type: 'image';
    value?: string;
};
type AudioVar = {
    type: 'audio';
    value?: string;
};
type IMVar = {
    type: 'IM';
    value?: string;
};
export type Variable = (TextVar | ImageVar | AudioVar | IMVar) & {
    name?: string;
    label?: string;
};
type InputVariable<Var extends Variable> = Var & {
    default_value?: Var['value'];
    user_input?: boolean;
    description?: string;
};
export type Input = InputVariable<Variable>;
export type Button = {
    content: string;
    on_click: {
        event: string;
        payload: TValues;
    };
    description?: string;
};
export type Render = {
    text?: string;
    image?: URLString;
    audio?: URLString;
    video?: URLString;
    buttons?: Button[];
};
export {};
