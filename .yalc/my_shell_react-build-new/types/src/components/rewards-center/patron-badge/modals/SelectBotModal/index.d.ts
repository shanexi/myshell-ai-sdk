interface SelectBotModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onBotConfirmed?: (botId: string) => void;
}
export default function SelectBotModal(props: SelectBotModalProps): import("react/jsx-runtime").JSX.Element;
export {};
