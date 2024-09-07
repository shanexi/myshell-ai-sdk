import { ReactNode } from 'react';
import { LoginMethod } from '../../../../../../src/hooks/user/usePrivyLogin.js';
interface EmailConnectProps {
    title?: string;
    description?: string | ReactNode;
    loadingAfterVerify?: boolean;
    errorMessage?: string;
    setCurrentMethod?: (method: LoginMethod | undefined) => void;
    onCodeSent?: () => void;
    onCodeVerified?: ({ method }: {
        method: LoginMethod;
    }) => void;
    setErrorMessage?: (message: string) => void;
    setLoadingAfterVerify?: (loading: boolean) => void;
}
export default function EmailConnect(props: EmailConnectProps): import("react/jsx-runtime").JSX.Element;
export {};
