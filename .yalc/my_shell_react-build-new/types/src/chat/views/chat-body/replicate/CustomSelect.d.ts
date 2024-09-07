import { ControlProps, OptionProps, SingleValueProps } from 'react-select';
interface CustomControlProps extends ControlProps {
    children: React.ReactNode;
    selectProps: any;
}
export declare function Control({ children, ...props }: CustomControlProps): import("react/jsx-runtime").JSX.Element;
export declare function Option({ children, ...props }: OptionProps): import("react/jsx-runtime").JSX.Element;
export declare function SingleValue({ children, ...props }: SingleValueProps): import("react/jsx-runtime").JSX.Element;
export interface Option {
    readonly label: string | number;
    readonly value: string | number;
    readonly iconUrl?: string;
}
declare const CustomSelect: import("react").ForwardRefExoticComponent<Omit<any, "ref"> & import("react").RefAttributes<unknown>>;
export default CustomSelect;
