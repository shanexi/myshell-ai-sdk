import { ClassNameValue } from 'tailwind-merge';
export interface CascaderOption {
    label: string;
    value: string;
    children?: CascaderOption[];
}
interface CommonP {
    value?: string;
    onValueChange: (value: string) => void;
    className?: ClassNameValue;
}
interface P extends CommonP {
    options: CascaderOption[];
    showParentLabel?: boolean;
    placeholder?: string;
}
export default function Cascader(props: P): import("react/jsx-runtime").JSX.Element;
export {};
