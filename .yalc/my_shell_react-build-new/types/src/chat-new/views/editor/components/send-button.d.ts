interface IFileUploader {
    loading?: boolean;
    disabled?: boolean;
    onSend?: () => void;
    energyPerChat?: number;
    showEnergyCostIcon?: boolean;
}
export declare function SendButton({ loading, disabled, onSend, energyPerChat, showEnergyCostIcon }: IFileUploader): import("react/jsx-runtime").JSX.Element;
export {};
