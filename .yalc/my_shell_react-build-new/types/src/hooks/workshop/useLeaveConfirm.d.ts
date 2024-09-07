export declare function useExitConfirmation({ enabled, showConfirm }: {
    enabled: boolean;
    showConfirm: () => void;
}): {
    url: string;
    bypassExitConfirmation(value?: boolean): void;
};
