import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
declare const Form: <TFieldValues extends FieldValues, TContext = any, TTransformedValues extends FieldValues | undefined = undefined>(props: import("react-hook-form").FormProviderProps<TFieldValues, TContext, TTransformedValues>) => React.JSX.Element;
declare function FormField<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>): import("react/jsx-runtime").JSX.Element;
declare const useFormField: () => {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    error?: import("react-hook-form").FieldError;
    id: string;
    name: string;
    formItemId: string;
    formDescriptionId: string;
    formMessageId: string;
};
interface IFormItemProps extends React.HTMLAttributes<HTMLDivElement> {
    layout?: 'Vertical' | 'Horizontal';
}
declare const FormItem: React.ForwardRefExoticComponent<IFormItemProps & React.RefAttributes<HTMLDivElement>>;
interface IFormLabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
    required?: boolean;
}
declare const FormLabel: React.ForwardRefExoticComponent<IFormLabelProps & React.RefAttributes<HTMLLabelElement>>;
declare const FormControl: React.ForwardRefExoticComponent<Omit<import("@radix-ui/react-slot").SlotProps & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>>;
declare const FormDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const FormMessage: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField };
