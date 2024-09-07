import { Variable } from "./types";
export interface IWidget {
    type: 'widget';
    name?: string;
    module_type?: string;
    module_config?: {
        widget_id: string;
        output_name: Variable;
        [key: string]: unknown;
    };
}
