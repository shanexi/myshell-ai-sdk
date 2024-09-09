'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { FocusScope } from '@radix-ui/react-focus-scope';
import { cva } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { useMedia } from 'react-use';
import { Drawer as DrawerPrimitive } from 'vaul';
import { cn } from '../../../lib/utils.js';
import { Button } from './button.js';
import { IconButton } from './icon-button.js';
import { Display, Text } from './typography.js';
const ModalOverlay = React.forwardRef(({ className, onClick, ...props }, ref) => (_jsx(DialogPrimitive.Overlay, { ref: ref, className: cn('fixed inset-0 z-50 bg-alpha-mask-desktop data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0', className), onClick: e => {
        onClick && onClick(e);
    }, ...props })));
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => (_jsx(DrawerPrimitive.Overlay, { ref: ref, className: cn('fixed inset-0 z-50 bg-alpha-mask-desktop', className), ...props })));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;
const ModalContent = React.forwardRef(({ className, children, ...props }, ref) => (_jsx(DialogPrimitive.Content, { className: cn('absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2', 'duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] focus:outline-none', className), ...props, children: children })));
const ModalRoot = ({ children, ...props }) => (_jsx(DialogPrimitive.Dialog, { ...props, children: _jsx(DialogPrimitive.Portal, { children: children }) }));
const ModalTitle = React.forwardRef(({ className, ...props }, ref) => {
    const isMobile = useMedia('(max-width: 768px)');
    if (isMobile) {
        return (_jsx(DrawerPrimitive.Title, { ref: ref, ...props, className: cn('text-xl text-default font-medium line-clamp-1', className) }));
    }
    return (_jsx(DialogPrimitive.Title, { ref: ref, ...props, className: cn('text-xl text-default font-medium line-clamp-1', className) }));
});
ModalTitle.displayName = DialogPrimitive.Title.displayName;
const modalVariants = cva('', {
    variants: {
        size: {
            lg: 'w-[750px] max-h-[640px]',
            md: 'w-[620px] max-h-[640px]',
            sm: 'w-[380px] max-h-[640px]'
        },
        zIndex: {
            9: 'z-[9]',
            99: 'z-[99]',
            999: 'z-[999]',
            9999: 'z-[9999]'
        }
    },
    defaultVariants: {
        size: 'lg',
        zIndex: 99
    }
});
const Modal = ({ title, description, size = 'lg', zIndex = 99, hideClose = false, overlayClose = true, modalOnly = true, contentClassName, overlayClassName, iconClassName, closeClassName, fullScreen = false, focusScopeOptions, isLogin = false, isNotification = false, isHorizontal = false, state, confirmLoading = false, cancelText, confirmText, children, onClose, onConfirm, ...props }) => {
    const isMobile = useMedia('(max-width: 768px)');
    if (isMobile && !modalOnly && !isNotification) {
        const drawerContent = (_jsxs(DrawerPrimitive.Content, { className: cn('fixed inset-x-0 bottom-0 z-50 h-auto overflow-hidden no-scrollbar bg-surface-default shadow-modal-default focus:outline-none', fullScreen ? 'rounded-t-none max-h-full' : 'rounded-t-2xl max-h-[85vh]'), children: [title ? (_jsx(ModalHeader, { children: _jsx(ModalTitle, { children: title }) })) : null, _jsx("div", { className: cn('overflow-y-auto', fullScreen
                        ? title
                            ? 'max-h-[calc(100vh-60px)]'
                            : 'max-h-[100vh]'
                        : title
                            ? 'max-h-[calc(85vh-60px)]'
                            : 'max-h-[85vh]'), children: children }), !hideClose && (_jsxs(DrawerPrimitive.Close, { className: cn('absolute right-4 top-3', closeClassName), onClick: () => {
                        onClose && onClose();
                    }, children: [_jsx(IconButton, { icon: XMarkIcon, size: "md", variant: "ghost", color: "default", className: iconClassName }), _jsx("span", { className: "sr-only", children: "Close" })] }))] }));
        return (_jsx(DrawerPrimitive.Root, { ...props, children: _jsxs(DrawerPrimitive.Portal, { children: [_jsx(DrawerOverlay, { onClick: () => {
                            overlayClose && onClose && onClose();
                        }, className: overlayClassName }), focusScopeOptions ? _jsx(FocusScope, { ...focusScopeOptions, children: drawerContent }) : drawerContent] }) }));
    }
    const renderIcon = (state) => {
        switch (state) {
            case 'info':
                return _jsx(InformationCircleIcon, { className: "text-icon-brand w-6 h-6" });
            case 'success':
                return _jsx(CheckCircleIcon, { className: "text-icon-success w-6 h-6" });
            case 'warning':
                return _jsx(ExclamationTriangleIcon, { className: "text-icon-warning w-6 h-6" });
            case 'error':
                return _jsx(XCircleIcon, { className: "text-icon-critical w-6 h-6" });
        }
    };
    const getBackgroundColor = (state) => {
        switch (state) {
            case 'info':
                return 'bg-surface-accent-blue-subtler';
            case 'success':
                return 'bg-surface-accent-green-subtler';
            case 'warning':
                return 'bg-surface-accent-yellow-subtler';
            case 'error':
                return 'bg-surface-accent-red-subtler';
        }
    };
    const commonT = useTranslations('common');
    const dialogContent = (_jsxs(ModalContent, { className: cn('rounded-2xl bg-surface-default shadow-modal-default overflow-hidden', !isMobile ? modalVariants({ size, zIndex }) : isLogin ? 'w-[90%]' : 'w-[80%]', isNotification && 'w-[312px] md:w-[380px]', contentClassName), children: [isNotification ? (_jsxs(_Fragment, { children: [_jsx(ModalHeader, { className: cn(isNotification && 'border-none !pb-3'), children: state && (_jsx("div", { className: cn('flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 flex-grow-0', getBackgroundColor(state)), children: renderIcon(state) })) }), _jsxs("div", { className: "space-y-1.5", children: [title ? (_jsx("div", { className: "px-5", children: _jsx(Display, { size: "sm", children: title }) })) : null, description ? (_jsx("div", { className: "px-5", children: _jsx(Text, { size: "sm", weight: "regular", children: description }) })) : null] }), _jsxs(ModalFooter, { className: cn('gap-x-5 min-h-[76px] p-5 border-none justify-center w-full'), children: [_jsx(Button, { variant: "primary", color: "gray", onClick: onClose, className: "flex-1", children: cancelText || commonT('cancel') }), _jsx(Button, { variant: "primary", onClick: onConfirm, loading: confirmLoading, color: state === 'error' ? 'error' : state === 'warning' ? 'warning' : 'brand', className: "flex-1", children: confirmText || commonT('confirm') })] })] })) : (_jsxs(_Fragment, { children: [title ? (_jsx(ModalHeader, { children: _jsx(ModalTitle, { children: title }) })) : null, children] })), !hideClose && (_jsxs(DialogPrimitive.Close, { className: cn('absolute right-4 top-4', isNotification && 'top-5', closeClassName), onClick: () => {
                    onClose && onClose();
                }, children: [_jsx(IconButton, { icon: XMarkIcon, size: "md", variant: "ghost", color: "default", className: iconClassName }), _jsx("span", { className: "sr-only", children: "Close" })] }))] }));
    return (_jsxs(ModalRoot, { ...props, children: [_jsx(ModalOverlay, { onClick: () => {
                    overlayClose && onClose && onClose();
                }, className: overlayClassName }), focusScopeOptions ? _jsx(FocusScope, { ...focusScopeOptions, children: dialogContent }) : dialogContent] }));
};
function ModalHeader({ className, children, ...props }) {
    return (_jsx("div", { className: cn('border-b border-default flex flex-col py-4 md:py-5 px-4 justify-center', className), ...props, children: children }));
}
ModalHeader.displayName = 'ModalHeader';
function ModalFooter({ className, children, ...props }) {
    return (_jsx("div", { className: cn('border-t border-default flex justify-end p-4', className), ...props, children: children }));
}
ModalFooter.displayName = 'ModalFooter';
function ModalBody({ className, children, ...props }) {
    return (_jsx("div", { className: cn('py-3', className), ...props, children: children }));
}
ModalBody.displayName = 'ModalBody';
export { Modal, ModalHeader, ModalFooter, ModalTitle, ModalBody, ModalRoot, ModalOverlay, ModalContent };
