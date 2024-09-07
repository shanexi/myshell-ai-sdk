export declare enum LoginMethod {
    Email = "Email",
    Google = "Google",
    Apple = "Apple",
    Metamask = "Metamask",
    OKX = "OKX",
    WalletConnect = "WalletConnect",
    BSC = "BSC",
    Facebook = "Facebook"
}
interface EmailLoginData {
    email: string;
}
interface LoginResponse {
    success: boolean;
    address?: string;
    error?: unknown;
}
type LoginData = EmailLoginData;
export default function usePrivyLogin(): {
    loading: boolean;
    connectedAddress: `0x${string}` | undefined;
    privyUser: import("@privy-io/react-auth").User | null;
    authenticated: boolean;
    login: ({ method, params, onFailed }: {
        method: LoginMethod;
        params?: LoginData;
        onFailed?: (error: unknown) => void;
    }) => Promise<LoginResponse>;
    emailLoginWithCode: ({ code }: import("@privy-io/react-auth").LoginWithCode) => Promise<void>;
    logout: ({ method, source }: {
        method: LoginMethod | "all";
        source?: string;
    }) => Promise<void>;
    getPrivyToken: () => Promise<string>;
    getWalletAddress: () => `0x${string}` | undefined;
};
export {};
