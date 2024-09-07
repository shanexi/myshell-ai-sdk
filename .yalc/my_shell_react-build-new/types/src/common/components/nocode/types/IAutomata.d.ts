import { IState } from './IState';
export interface IAutomata {
    type: 'automata';
    id: string;
    initial: string;
    states?: {
        [state_name: string]: IState;
    };
    transitions: {
        [action_name: string]: string | {
            target?: string;
            condition?: string;
        };
    };
    context?: {
        [context_name: string]: {
            name: string;
            type: string;
            value: string;
        };
    };
}
