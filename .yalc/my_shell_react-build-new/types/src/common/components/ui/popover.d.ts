import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';
declare const PopoverRoot: React.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverAnchor: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverAnchorProps & React.RefAttributes<HTMLDivElement>>;
interface PopoverContentExs {
    showArrow?: boolean;
    variant?: 'default' | 'info' | 'message';
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    modal?: boolean;
    container?: HTMLElement | null;
}
declare const PopoverContent: React.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & PopoverContentExs & React.RefAttributes<HTMLDivElement>>;
declare const Popover: ({ disabled, open, content, anchor, children, className, triggerClassName, hasOpenState, isMTooltip, modal, openChangeCallback, ...props }: Omit<React.ComponentProps<typeof PopoverPrimitive.Content>, "content"> & PopoverContentExs & {
    open?: boolean;
    disabled?: boolean;
    triggerClassName?: string;
    content?: string | React.ReactNode;
    anchor?: React.ReactNode;
    hasOpenState?: boolean;
    isMTooltip?: boolean;
    openChangeCallback?: (open: boolean) => void;
}) => import("react/jsx-runtime").JSX.Element;
export { Popover, PopoverAnchor, PopoverContent, PopoverRoot };
