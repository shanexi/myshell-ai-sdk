import { UseFormSetValue } from 'react-hook-form';
type RenderFormP = {
    formEle: any;
    control: any;
    defaultValue?: any;
    setFormValue?: UseFormSetValue<any>;
    errors?: any;
    register?: any;
    defaultValues?: any;
    clearErrors?: (filed?: any) => void;
};
export default function RenderForm(props: RenderFormP): import("react/jsx-runtime").JSX.Element | null;
export {};
