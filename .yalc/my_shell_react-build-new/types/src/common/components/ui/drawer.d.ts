import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
declare function Drawer({ shouldScaleBackground, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare namespace Drawer {
    var displayName: string;
}
declare const DrawerTrigger: React.ForwardRefExoticComponent<import("@radix-ui/react-dialog").DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DrawerPortal: React.FC<import("@radix-ui/react-dialog").DialogPortalProps>;
declare const DrawerClose: React.ForwardRefExoticComponent<import("@radix-ui/react-dialog").DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const DrawerOverlay: React.ForwardRefExoticComponent<Omit<Omit<import("@radix-ui/react-dialog").DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DrawerContent: React.ForwardRefExoticComponent<Omit<Omit<import("@radix-ui/react-dialog").DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    onAnimationEnd?: (open: boolean) => void;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare function DrawerHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
declare namespace DrawerHeader {
    var displayName: string;
}
declare function DrawerFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
declare namespace DrawerFooter {
    var displayName: string;
}
declare const DrawerTitle: React.ForwardRefExoticComponent<Omit<import("@radix-ui/react-dialog").DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const DrawerDescription: React.ForwardRefExoticComponent<Omit<import("@radix-ui/react-dialog").DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription };
