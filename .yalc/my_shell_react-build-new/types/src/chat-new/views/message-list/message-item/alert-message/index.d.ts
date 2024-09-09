import { ButtonProps } from '../../../../../../../src/common/components/ui/button.js';
export interface IAlertInfoMap {
    [type: string]: {
        text: string;
        textClassName?: string;
        buttons?: ButtonProps[];
        variant: 'warning' | 'error' | 'info';
    };
}
export default function AlertMessage(): import("react/jsx-runtime").JSX.Element;
