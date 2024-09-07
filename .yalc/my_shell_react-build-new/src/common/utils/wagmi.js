"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wagmiConfig = exports.MyshellTest = void 0;
const wagmi_1 = require("wagmi");
const chains_1 = require("wagmi/chains");
const connectors_1 = require("wagmi/connectors");
const w3w_wagmi_connector_v2_1 = require("@binance/w3w-wagmi-connector-v2");
const runtime_config_1 = require("./runtime-config.js");
exports.MyshellTest = {
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
exports.wagmiConfig = (0, wagmi_1.createConfig)({
    chains: [exports.MyshellTest, chains_1.opBNB, chains_1.opBNBTestnet, chains_1.mainnet, chains_1.bsc, chains_1.bscTestnet],
    connectors: [
        (0, connectors_1.walletConnect)({
            projectId: runtime_config_1.WC_PROJECT_ID,
            qrModalOptions: {
                themeVariables: {
                    '--wcm-z-index': '9999'
                }
            }
        }),
        (0, w3w_wagmi_connector_v2_1.getWagmiConnectorV2)()(),
    ],
    transports: {
        [chains_1.opBNB.id]: (0, wagmi_1.http)(),
        [chains_1.opBNBTestnet.id]: (0, wagmi_1.http)(),
        [chains_1.mainnet.id]: (0, wagmi_1.http)(),
        [exports.MyshellTest.id]: (0, wagmi_1.http)(),
        [chains_1.bsc.id]: (0, wagmi_1.http)(),
        [chains_1.bscTestnet.id]: (0, wagmi_1.http)()
    }
});
