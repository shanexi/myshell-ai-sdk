"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModalProps = exports.openModal = void 0;
const zustand_1 = require("zustand");
const modalStore = (0, zustand_1.createStore)(set => ({
    modalProps: {},
    openModal: (modalProps) => set({
        modalProps: {
            ...modalProps,
            onOk: (sign) => {
                modalProps.onOk?.(sign);
                set({ modalProps: {} });
            },
            onCancel: () => {
                modalProps.onCancel?.();
                set({ modalProps: { open: false } });
            }
        }
    })
}));
exports.openModal = modalStore.getState().openModal;
const useModalProps = () => (0, zustand_1.useStore)(modalStore, state => state.modalProps);
exports.useModalProps = useModalProps;
