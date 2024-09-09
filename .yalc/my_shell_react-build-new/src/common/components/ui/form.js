import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { Controller, FormProvider, useFormContext } from 'react-hook-form';
import { Label } from '../../../common/components/ui/label.js';
import { cn } from '../../../lib/utils.js';
const Form = FormProvider;
const FormFieldContext = React.createContext({});
function FormField({ ...props }) {
    return (_jsx(FormFieldContext.Provider, { value: { name: props.name }, children: _jsx(Controller, { ...props }) }));
}
const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext);
    const itemContext = React.useContext(FormItemContext);
    const { getFieldState, formState } = useFormContext();
    const fieldState = getFieldState(fieldContext.name, formState);
    if (!fieldContext) {
        throw new Error('useFormField should be used within <FormField>');
    }
    const { id } = itemContext;
    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState
    };
};
const FormItemContext = React.createContext({});
const formLayoutVariants = cva('', {
    variants: {
        layout: {
            Vertical: 'space-y-1.5',
            Horizontal: 'flex flex-row items-center space-x-3'
        }
    },
    defaultVariants: {
        layout: 'Vertical'
    }
});
const FormItem = React.forwardRef(({ className, layout, ...props }, ref) => {
    const id = React.useId();
    const cls = cn(className, formLayoutVariants({ layout }));
    return (_jsx(FormItemContext.Provider, { value: { id }, children: _jsx("div", { ref: ref, className: cls, ...props }) }));
});
FormItem.displayName = 'FormItem';
const FormLabel = React.forwardRef(({ className, required, children, ...props }, ref) => {
    const { formItemId } = useFormField();
    return (_jsxs(Label, { ref: ref, className: className, htmlFor: formItemId, ...props, children: [required ? _jsx("span", { className: "text-[#EC2F0D] mr-1", children: "*" }) : null, children] }));
});
FormLabel.displayName = 'FormLabel';
const FormControl = React.forwardRef(({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    return (_jsx(Slot, { ref: ref, id: formItemId, "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`, "aria-invalid": !!error, ...props }));
});
FormControl.displayName = 'FormControl';
const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();
    return _jsx("p", { ref: ref, id: formDescriptionId, className: cn('text-sm text-subtler', className), ...props });
});
FormDescription.displayName = 'FormDescription';
const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;
    if (!body) {
        return null;
    }
    return (_jsx("p", { ref: ref, id: formMessageId, className: cn('text-sm font-medium text-critical', className), ...props, children: body }));
});
FormMessage.displayName = 'FormMessage';
export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField };
