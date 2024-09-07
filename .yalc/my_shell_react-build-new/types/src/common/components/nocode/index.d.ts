import React from 'react';
import { IAutomata } from './types/IAutomata';
interface INoCodeProps {
    data?: IAutomata;
    loading?: boolean;
    widgetIds?: string[];
    onSave?: (data: IAutomata) => void;
    onChange?: (data: IAutomata) => void;
    onClose?: () => void;
}
declare const NoCode: React.FC<INoCodeProps>;
export { NoCode };
export type { IAutomata };
