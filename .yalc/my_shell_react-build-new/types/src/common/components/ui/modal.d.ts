import * as DialogPrimitive from '@radix-ui/react-dialog';
import { FocusScopeProps } from '@radix-ui/react-focus-scope';
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const ModalOverlay: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ModalContent: React.ForwardRefExoticComponent<Omit<Omit<DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    onAnimationEnd?: (open: boolean) => void;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ModalRoot: React.FC<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Dialog>>;
declare const ModalTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const modalVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    zIndex?: 9 | 99 | 999 | 9999 | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
export type TModalState = 'info' | 'success' | 'warning' | 'error';
declare const Modal: React.FC<React.ComponentPropsWithoutRef<typeof ModalRoot> & {
    title?: string;
    description?: string;
    overlayClose?: boolean;
    hideClose?: boolean;
    modalOnly?: boolean;
    overlayClassName?: string;
    contentClassName?: string;
    closeClassName?: string;
    iconClassName?: string;
    fullScreen?: boolean;
    focusScopeOptions?: FocusScopeProps;
    isLogin?: boolean;
    isNotification?: boolean;
    state?: TModalState;
    isHorizontal?: boolean;
    confirmLoading?: boolean;
    cancelText?: string;
    confirmText?: string;
    onClose?: () => void;
    onConfirm?: () => void;
} & VariantProps<typeof modalVariants>>;
declare function ModalHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
declare namespace ModalHeader {
    var displayName: string;
}
declare function ModalFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
declare namespace ModalFooter {
    var displayName: string;
}
declare function ModalBody({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
declare namespace ModalBody {
    var displayName: string;
}
export { Modal, ModalHeader, ModalFooter, ModalTitle, ModalBody, ModalRoot, ModalOverlay, ModalContent };
