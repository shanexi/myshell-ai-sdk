import * as React from 'react';
import { ISelectProps } from '../../../../../../../src/common/components/ui/select.js';
import { TValue } from '../../types';
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
export interface IEditTitleProps extends InputProps {
    path: string;
    options?: ISelectProps['options'];
    showDialog?: boolean;
    dialogConfig?: {
        title?: string;
        selectLabel?: string;
        inputLabel?: string;
    };
    validates?: Array<{
        pattern: string;
        message: string;
    }>;
    onKeyChange?: (key: string, value?: TValue) => void;
    changeKeyAndName?: boolean;
}
declare const EditTitle: React.ForwardRefExoticComponent<IEditTitleProps & React.RefAttributes<HTMLInputElement>>;
export { EditTitle };
