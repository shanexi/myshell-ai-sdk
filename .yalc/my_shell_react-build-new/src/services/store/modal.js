import { createStore, useStore } from 'zustand';
const modalStore = createStore(set => ({
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
export const openModal = modalStore.getState().openModal;
export const useModalProps = () => useStore(modalStore, state => state.modalProps);
