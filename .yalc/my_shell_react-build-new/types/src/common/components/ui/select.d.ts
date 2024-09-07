import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';
export interface ISelectProps extends SelectPrimitive.SelectProps {
    options?: Array<{
        value: string;
        label: string;
        icon?: React.ReactNode;
        disabled?: boolean;
    }>;
    placeholder?: React.ReactNode;
}
declare const Select: React.ForwardRefExoticComponent<ISelectProps & React.RefAttributes<never>>;
declare const SelectGroup: React.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const SelectValue: React.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React.RefAttributes<HTMLSpanElement>>;
declare const SelectTrigger: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const SelectScrollUpButton: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollUpButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectScrollDownButton: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollDownButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectContent: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectLabel: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
interface ISelectIconProps {
    icon?: React.ReactNode;
}
interface ISelectItemProps extends SelectPrimitive.SelectItemProps, ISelectIconProps {
}
declare const SelectItem: React.ForwardRefExoticComponent<ISelectItemProps & React.RefAttributes<HTMLDivElement>>;
declare const SelectSeparator: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton };
