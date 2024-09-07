export type ToastType = 'success' | 'info' | 'warning' | 'error';
export interface CustomToasterProps {
    id?: string;
    type?: ToastType;
    title?: string;
    content: string;
    isClosable?: boolean;
    translateInToast?: boolean;
    reason?: string;
}
export declare function useNotification(): {
    addToast: (config: CustomToasterProps, duration?: number) => void;
    success: (config: CustomToasterProps) => void;
    error: (config: CustomToasterProps) => void;
    warning: (config: CustomToasterProps) => void;
    info: (config: CustomToasterProps, duration?: number) => void;
    close: (id: string) => void;
    message: (config: CustomToasterProps) => void;
};
export declare class Message {
    private static _toast;
    static success(config: CustomToasterProps): void;
    static error(config: CustomToasterProps): void;
    static info(config: CustomToasterProps): void;
    static warning(config: CustomToasterProps): void;
    static close(id: string): void;
}
