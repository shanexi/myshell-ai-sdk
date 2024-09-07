interface LaunchModalProps {
    open: boolean;
    slippage?: string;
    onOpenChange: (open: boolean) => void;
    onSave: (slippage: string) => void;
    onBack?: () => void;
}
export default function SlippageModal(props: LaunchModalProps): import("react/jsx-runtime").JSX.Element;
export {};
