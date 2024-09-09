import { useLoginWithEmail, useLogout, usePrivy } from '@privy-io/react-auth';
import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { openCenteredWindow } from '../../common/utils/common-helper.js';
import { useSensors } from '../../lib/sensors/index.js';
import { useGlobalStore, useUserStore } from '../../services/store/index.js';
import { useRouter } from 'next/navigation';
export var LoginMethod;
(function (LoginMethod) {
    LoginMethod["Email"] = "Email";
    LoginMethod["Google"] = "Google";
    LoginMethod["Apple"] = "Apple";
    LoginMethod["Metamask"] = "Metamask";
    LoginMethod["OKX"] = "OKX";
    LoginMethod["WalletConnect"] = "WalletConnect";
    LoginMethod["BSC"] = "BSC";
    LoginMethod["Facebook"] = "Facebook";
})(LoginMethod || (LoginMethod = {}));
export default function usePrivyLogin() {
    const { sendCode, loginWithCode: emailLoginWithCode } = useLoginWithEmail();
    const { logout: privyLogout } = useLogout();
    const { getAccessToken, user: privyUser, authenticated } = usePrivy();
    const { connectors, connectAsync: connect } = useConnect();
    const { disconnectAsync: disconnect } = useDisconnect();
    const { isConnected, address: extenalWalletAddress } = useAccount();
    const setLoginMethod = useUserStore(state => state.setLoginMethod);
    const toggleLoginModal = useGlobalStore(state => state.toggleLoginModal);
    const loginMethod = useUserStore(state => state.loginMethod);
    const sensors = useSensors();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
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
                    openCenteredWindow({ url: `/auth?provider=google&init=true`, title: 'Google OAuth', w: 400, h: 600 });
                    return { success: false };
                }
                case LoginMethod.Apple: {
                    openCenteredWindow({ url: `/auth?provider=apple&init=true`, title: 'Apple OAuth', w: 400, h: 600 });
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
