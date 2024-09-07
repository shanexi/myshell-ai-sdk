import { ImComponent } from '../../../../../../src/common/constants/interfaces/workshop.js';
type P = {
    params: ImComponent;
    isOpen: boolean;
    setOpen: (value: boolean) => void;
    isMobile?: boolean;
    onSubmit: (values: any) => void;
    loading: boolean;
    formSubmitError: boolean;
    setFormSubmitError: (val: boolean) => void;
};
declare function LUIFormModal({ params, isOpen, setOpen, isMobile, onSubmit: handleSubmition, loading, formSubmitError, setFormSubmitError }: P): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof LUIFormModal>;
export default _default;
