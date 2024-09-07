import { ReactNode } from 'react';
interface WalletHeaderProps {
    logo?: string;
    name?: string;
    address?: string;
    chainSelector: ReactNode;
    isConnected?: boolean;
    logout: () => void;
}
export default function WalletHeader(props: WalletHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
