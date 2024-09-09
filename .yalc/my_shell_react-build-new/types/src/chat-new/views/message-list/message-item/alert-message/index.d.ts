import { ButtonProps } from '../../../../../../../src/common/components/ui/button';
export interface IAlertInfoMap {
    [type: string]: {
        text: string;
        textClassName?: string;
        buttons?: ButtonProps[];
        variant: 'warning' | 'error' | 'info';
    };
}
export default function AlertMessage(): import("react/jsx-runtime").JSX.Element;
