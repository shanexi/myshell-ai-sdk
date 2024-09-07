import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';
declare const MTooltip: React.FC<PopoverPrimitive.PopoverProps>;
declare const MTooltipTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const MTooltipArrow: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverArrowProps & React.RefAttributes<SVGSVGElement>>;
declare const MTooltipContent: React.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { MTooltip, MTooltipTrigger, MTooltipContent, MTooltipArrow };
