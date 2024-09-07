import { ControlProps, OptionProps, SingleValueProps } from 'react-select';
interface CustomControlProps extends ControlProps {
    children: React.ReactNode;
    selectProps: any;
}
export declare const Control: ({ children, ...props }: CustomControlProps) => import("react/jsx-runtime").JSX.Element;
export declare const Option: ({ children, ...props }: OptionProps) => import("react/jsx-runtime").JSX.Element;
export declare const SingleValue: ({ children, ...props }: SingleValueProps) => import("react/jsx-runtime").JSX.Element;
export interface Option {
    readonly label: string;
    readonly value: string;
}
declare const CustomeSelect: import("react").ForwardRefExoticComponent<Omit<any, "ref"> & import("react").RefAttributes<unknown>>;
export default CustomeSelect;
