interface WalletActionsProps {
    disablePrivySendAndReceive: boolean;
    openSend: () => void;
    openReceive: () => void;
    open2FA?: () => void;
    isBind2FA?: boolean;
}
export default function WalletActions(props: WalletActionsProps): import("react/jsx-runtime").JSX.Element;
export {};
