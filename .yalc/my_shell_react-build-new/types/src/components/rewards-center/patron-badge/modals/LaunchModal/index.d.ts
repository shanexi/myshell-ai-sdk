interface LaunchModalProps {
    open: boolean;
    ticker?: string;
    onTickerChange?: (ticker: string) => void;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    loading: boolean;
}
export default function LaunchModal(props: LaunchModalProps): import("react/jsx-runtime").JSX.Element;
export {};
