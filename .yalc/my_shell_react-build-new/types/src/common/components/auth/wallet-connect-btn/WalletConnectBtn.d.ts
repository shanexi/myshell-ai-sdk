import { ReactNode } from 'react';
import { LoginMethod } from '../../../../../../src/hooks/user/usePrivyLogin.js';
type WalletConnectBtnProps = {
    children: ReactNode;
    id: string;
    loginMethod: LoginMethod;
    invitationCode?: string;
    className?: string;
    closeModal: () => void;
};
export declare const useWalletLogin: ({ invitationCode, closeModal, loginMethod }: any) => {
    loading: boolean;
    connectWallet: (id: string) => Promise<void>;
    signMessageModalVisible: boolean;
    verifySign: (signature?: string) => void;
    signLoading: boolean;
    handleSign: () => void;
};
declare function WalletConnectBtn({ children, id, loginMethod, invitationCode, className, closeModal }: WalletConnectBtnProps): import("react/jsx-runtime").JSX.Element;
export default WalletConnectBtn;
