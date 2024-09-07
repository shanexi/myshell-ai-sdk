import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as React from 'react';
import { ClassNameValue } from 'tailwind-merge';
declare const Accordion: React.ForwardRefExoticComponent<(AccordionPrimitive.AccordionSingleProps | AccordionPrimitive.AccordionMultipleProps) & React.RefAttributes<HTMLDivElement>>;
export type AccordionItemProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
    count?: number;
    label?: string;
    headerClassName?: ClassNameValue;
    triggerClassName?: ClassNameValue;
    sticky?: boolean;
    children: React.ReactNode;
};
declare const AccordionItem: React.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    count?: number;
    label?: string;
    headerClassName?: ClassNameValue;
    triggerClassName?: ClassNameValue;
    sticky?: boolean;
    children: React.ReactNode;
} & React.RefAttributes<HTMLDivElement>>;
declare const AccordionTrigger: React.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & {
    count?: number;
    label?: string;
    sticky?: boolean;
    headerClassName?: ClassNameValue;
} & React.RefAttributes<HTMLButtonElement>>;
declare const AccordionContent: React.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
