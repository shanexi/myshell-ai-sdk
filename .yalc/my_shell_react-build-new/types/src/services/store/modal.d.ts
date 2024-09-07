import React from 'react';
type ModalProps = {
    open?: boolean;
    title?: string;
    onlySign?: boolean;
    content?: React.ReactNode;
    onOk?: (sign: string) => void;
    onCancel?: () => void;
    triggerScene?: string;
};
export declare const openModal: (modalProps: ModalProps) => void;
export declare const useModalProps: () => ModalProps;
export {};
