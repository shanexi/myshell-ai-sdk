import { createConfig, http } from 'wagmi';
import { bsc, mainnet, opBNB, opBNBTestnet, bscTestnet } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors';
import { getWagmiConnectorV2 } from '@binance/w3w-wagmi-connector-v2';
import { WC_PROJECT_ID } from './runtime-config.js';
export const MyshellTest = {
    id: 202402181658,
    name: 'Myshell Testnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://myshell-testnet.alt.technology'],
            webSocket: ['wss://myshell-testnet.alt.technology/ws']
        }
    },
    blockExplorers: {
        default: {
            name: 'Myshell Testnet Scan',
            url: 'https://myshell-testnet-explorer.alt.technology'
        }
    }
};
export const wagmiConfig = createConfig({
    chains: [MyshellTest, opBNB, opBNBTestnet, mainnet, bsc, bscTestnet],
    connectors: [
        walletConnect({
            projectId: WC_PROJECT_ID,
            qrModalOptions: {
                themeVariables: {
                    '--wcm-z-index': '9999'
                }
            }
        }),
        getWagmiConnectorV2()(),
    ],
    transports: {
        [opBNB.id]: http(),
        [opBNBTestnet.id]: http(),
        [mainnet.id]: http(),
        [MyshellTest.id]: http(),
        [bsc.id]: http(),
        [bscTestnet.id]: http()
    }
});
