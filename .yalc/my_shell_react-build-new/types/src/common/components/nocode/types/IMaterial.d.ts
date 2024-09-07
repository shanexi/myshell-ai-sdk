import { ISchema } from "../../form-engine";
interface IMaterial {
    type: 'automata' | 'state' | 'widget';
    canDelete?: boolean;
    schema?: ISchema;
}
export type { IMaterial };
