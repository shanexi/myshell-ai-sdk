import { Chain } from 'wagmi/chains';
export declare const MyshellTest: Chain;
export declare const wagmiConfig: import("wagmi").Config<readonly [Chain, {
    blockExplorers: {
        readonly default: {
            readonly name: "opbnbscan";
            readonly url: "https://mainnet.opbnbscan.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 512881;
        };
    };
    id: 204;
    name: "opBNB";
    nativeCurrency: {
        readonly name: "BNB";
        readonly symbol: "BNB";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://opbnb-mainnet-rpc.bnbchain.org"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("viem").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
}, {
    blockExplorers: {
        readonly default: {
            readonly name: "opbnbscan";
            readonly url: "https://testnet.opbnbscan.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 3705108;
        };
    };
    id: 5611;
    name: "opBNB Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "tBNB";
        readonly symbol: "tBNB";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://opbnb-testnet-rpc.bnbchain.org"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("viem").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
}, {
    blockExplorers: {
        readonly default: {
            readonly name: "Etherscan";
            readonly url: "https://etherscan.io";
            readonly apiUrl: "https://api.etherscan.io/api";
        };
    };
    contracts: {
        readonly ensRegistry: {
            readonly address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
        };
        readonly ensUniversalResolver: {
            readonly address: "0xce01f8eee7E479C928F8919abD53E553a36CeF67";
            readonly blockCreated: 19258213;
        };
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 14353601;
        };
    };
    id: 1;
    name: "Ethereum";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://cloudflare-eth.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("viem").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
}, {
    blockExplorers: {
        readonly default: {
            readonly name: "BscScan";
            readonly url: "https://bscscan.com";
            readonly apiUrl: "https://api.bscscan.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 15921452;
        };
    };
    id: 56;
    name: "BNB Smart Chain";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "BNB";
        readonly symbol: "BNB";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.ankr.com/bsc"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("viem").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
}, {
    blockExplorers: {
        readonly default: {
            readonly name: "BscScan";
            readonly url: "https://testnet.bscscan.com";
            readonly apiUrl: "https://testnet.bscscan.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 17422483;
        };
    };
    id: 97;
    name: "Binance Smart Chain Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "BNB";
        readonly symbol: "tBNB";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://data-seed-prebsc-1-s1.bnbchain.org:8545"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("viem").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
}], {
    [x: number]: import("viem").HttpTransport;
    204: import("viem").HttpTransport;
    5611: import("viem").HttpTransport;
    1: import("viem").HttpTransport;
    56: import("viem").HttpTransport;
    97: import("viem").HttpTransport;
}>;
