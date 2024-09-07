declare const useCopyClipboard: (text: string, successText?: string, onSuccess?: () => void, notice?: boolean) => {
    onCopy: (value?: string) => void;
    onCopyImage: (url?: string) => void;
    value: string | null;
};
export default useCopyClipboard;
