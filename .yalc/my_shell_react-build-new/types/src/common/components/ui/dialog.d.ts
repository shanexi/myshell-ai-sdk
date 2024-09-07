import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
declare const Dialog: React.FC<DialogPrimitive.DialogProps>;
declare const DialogPortal: React.FC<DialogPrimitive.DialogPortalProps>;
declare const DialogClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogTrigger: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const DialogOverlay: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DialogContent: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    maskClosable?: boolean;
    hideClose?: boolean;
    onClose?: () => void;
    overlayClose?: boolean;
    overlayClassName?: string;
    iconClassName?: string;
} & React.RefAttributes<HTMLDivElement>>;
declare function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
declare namespace DialogHeader {
    var displayName: string;
}
declare function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
declare namespace DialogFooter {
    var displayName: string;
}
declare const DialogTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
export { Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription };
