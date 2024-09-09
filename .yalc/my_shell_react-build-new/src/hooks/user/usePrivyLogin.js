"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginMethod = void 0;
exports.default = usePrivyLogin;
const react_auth_1 = require("@privy-io/react-auth");
const react_1 = require("react");
const wagmi_1 = require("wagmi");
const common_helper_1 = require("../../common/utils/common-helper");
const sensors_1 = require("../../lib/sensors");
const store_1 = require("../../services/store");
const navigation_1 = require("next/navigation");
var LoginMethod;
(function (LoginMethod) {
    LoginMethod["Email"] = "Email";
    LoginMethod["Google"] = "Google";
    LoginMethod["Apple"] = "Apple";
    LoginMethod["Metamask"] = "Metamask";
    LoginMethod["OKX"] = "OKX";
    LoginMethod["WalletConnect"] = "WalletConnect";
    LoginMethod["BSC"] = "BSC";
    LoginMethod["Facebook"] = "Facebook";
})(LoginMethod || (exports.LoginMethod = LoginMethod = {}));
function usePrivyLogin() {
    const { sendCode, loginWithCode: emailLoginWithCode } = (0, react_auth_1.useLoginWithEmail)();
    const { logout: privyLogout } = (0, react_auth_1.useLogout)();
    const { getAccessToken, user: privyUser, authenticated } = (0, react_auth_1.usePrivy)();
    const { connectors, connectAsync: connect } = (0, wagmi_1.useConnect)();
    const { disconnectAsync: disconnect } = (0, wagmi_1.useDisconnect)();
    const { isConnected, address: extenalWalletAddress } = (0, wagmi_1.useAccount)();
    const setLoginMethod = (0, store_1.useUserStore)(state => state.setLoginMethod);
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const loginMethod = (0, store_1.useUserStore)(state => state.loginMethod);
    const sensors = (0, sensors_1.useSensors)();
    const router = (0, navigation_1.useRouter)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const connectWallet = async ({ connector, onNotFound }) => {
        if (!connector) {
            onNotFound?.();
            return { address: '' };
        }
        if (isConnected) {
            await disconnect();
        }
        const { accounts } = await connect({ connector }).catch(e => {
            throw new Error('connect wallet inside hooks failed');
        });
        return { address: accounts[0] };
    };
    const logout = async ({ method, source }) => {
        if (method === LoginMethod.Metamask ||
            method === LoginMethod.OKX ||
            method === LoginMethod.WalletConnect ||
            method === LoginMethod.BSC ||
            method === 'all') {
            if (isConnected) {
                await disconnect();
            }
        }
        if (method === LoginMethod.Google || method === LoginMethod.Apple || method === 'all') {
            await privyLogout();
            window.localStorage.removeItem('oauth_status');
        }
        if (authenticated) {
            await privyLogout();
        }
        setLoginMethod(undefined);
        window.localStorage.removeItem('privy:wallets');
        if (source) {
            window.localStorage.setItem('logout_source', source);
        }
    };
    const login = async ({ method, params, onFailed }) => {
        try {
            await logout({ method: 'all' });
            window.localStorage.setItem('loginMethod', method);
            sensors?.track('StartLogin', {
                login_method: method
            });
            setLoading(true);
            switch (method) {
                case LoginMethod.Email: {
                    if (!params?.email)
                        throw new Error('email is required');
                    await sendCode({ email: params.email });
                    return { success: true };
                }
                case LoginMethod.Google: {
                    (0, common_helper_1.openCenteredWindow)({ url: `/auth?provider=google&init=true`, title: 'Google OAuth', w: 400, h: 600 });
                    return { success: false };
                }
                case LoginMethod.Apple: {
                    (0, common_helper_1.openCenteredWindow)({ url: `/auth?provider=apple&init=true`, title: 'Apple OAuth', w: 400, h: 600 });
                    return { success: false };
                }
                case LoginMethod.Facebook:
                    router.push('/account-merge');
                    return { success: false };
                case LoginMethod.Metamask: {
                    const connector = connectors.find(connector => {
                        return connector.id === 'io.metamask';
                    });
                    if (!connector) {
                        window.open('https://metamask.io/download/', '_blank');
                        return { success: false };
                    }
                    const { address } = await connectWallet({ connector });
                    return { success: true, address };
                }
                case LoginMethod.OKX: {
                    const connector = connectors.find(connector => connector.id === 'com.okex.wallet');
                    if (!connector) {
                        window.open('https://www.okx.com/download', '_blank');
                        return { success: false };
                    }
                    const { address } = await connectWallet({ connector });
                    return { success: true, address };
                }
                case LoginMethod.WalletConnect: {
                    const connector = connectors.find(connector => {
                        return connector.id === 'walletConnect';
                    });
                    const { address } = await connectWallet({ connector });
                    return { success: true, address };
                }
                case LoginMethod.BSC: {
                    const connector = connectors.find(connector => {
                        return connector.id === 'BinanceW3WSDK';
                    });
                    if (!connector) {
                        window.open('https://www.binance.com/download', '_blank');
                        return { success: false };
                    }
                    const { address } = await connectWallet({ connector });
                    return { success: true, address };
                }
                default:
                    return { success: false };
            }
        }
        catch (error) {
            console.log('error:', error);
            onFailed?.(error);
            return { success: false, error };
        }
        finally {
            setLoading(false);
        }
    };
    const getPrivyToken = async () => {
        return (await getAccessToken()) || window.localStorage.getItem('privy:token') || '';
    };
    const getWalletAddress = () => {
        const isWeb3 = loginMethod === LoginMethod.Metamask ||
            loginMethod === LoginMethod.WalletConnect ||
            loginMethod === LoginMethod.OKX ||
            loginMethod === LoginMethod.BSC;
        if (isWeb3) {
            return extenalWalletAddress;
        }
        return privyUser?.wallet?.address;
    };
    return {
        loading,
        connectedAddress: getWalletAddress(),
        privyUser,
        authenticated,
        login,
        emailLoginWithCode,
        logout,
        getPrivyToken,
        getWalletAddress
    };
}
