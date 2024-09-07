import { ImComponent } from '../../../../../../../src/common/constants/interfaces/workshop.js';
type LuiFormModelProps = {
    params: ImComponent;
    isOpen: boolean;
    setOpen: (value: boolean) => void;
    isMobile?: boolean;
    onSubmit: (values: any) => void;
    loading: boolean;
    formSubmitError: boolean;
    setFormSubmitError: (val: boolean) => void;
};
export default function LuiFormModel({ params, isOpen, setOpen, isMobile, onSubmit: handleSubmition, loading, formSubmitError, setFormSubmitError }: LuiFormModelProps): import("react/jsx-runtime").JSX.Element;
export {};
