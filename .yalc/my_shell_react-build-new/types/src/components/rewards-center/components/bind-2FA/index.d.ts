interface Bind2FAModalProps {
    open: boolean;
    onClose: (isBind2FA?: boolean) => void;
}
export declare function useBind2FA(): boolean | undefined;
export default function Bind2FAModal(props: Bind2FAModalProps): import("react/jsx-runtime").JSX.Element;
export {};
