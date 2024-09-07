"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WagmiConfigWrapper = WagmiConfigWrapper;
exports.Providers = Providers;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_js_1 = require("@chakra-ui/next-js");
const react_1 = require("@chakra-ui/react");
const theme_1 = __importDefault(require("@chakra-ui/theme"));
const react_auth_1 = require("@privy-io/react-auth");
const react_query_1 = require("@tanstack/react-query");
const viem_1 = require("viem");
const chains_1 = require("viem/chains");
const wagmi_1 = require("wagmi");
const wagmi_2 = require("../../common/utils/wagmi.js");
const NextThemeProvider_1 = require("../../components/layouts/NextThemeProvider.js");
const tooltip_1 = require("../../common/components/ui/tooltip.js");
require("@/styles/chakra.css");
const VisitorIdProvider_1 = __importDefault(require("./VisitorIdProvider.js"));
const { Button, Modal, Spinner, Avatar, Input, Tag, Divider, Progress, Slider, Form, FormError, Alert, Heading, Menu, Switch, Textarea, Select, Table, Tooltip, Checkbox, Radio, Skeleton, Popover, NumberInput } = theme_1.default.components;
const theme = (0, react_1.extendBaseTheme)({
    styles: {
        global: {
            'html, body': {
                ' backgroundColor': 'var(--surface-container-high,#F5F7FA)'
            }
        }
    },
    colors: {
        brand: {
            50: '#EBEEFE',
            100: '#D7DEFE',
            200: '#AFBCFD',
            300: '#8D9FFC',
            400: '#657EFB',
            500: 'var(--primary)',
            600: '#062EF4',
            700: '#0523B8',
            800: '#031677',
            900: '#020B3C',
            950: '#01061E'
        }
    },
    components: {
        Switch,
        Button,
        Modal,
        Spinner,
        Avatar,
        Input,
        Tag,
        Divider,
        Progress,
        Slider,
        Form,
        FormError,
        Alert,
        Heading,
        Menu,
        Textarea,
        Select,
        Table,
        Tooltip,
        Checkbox,
        Radio,
        Skeleton,
        Popover,
        NumberInput
    }
});
const MyshellTest = (0, viem_1.defineChain)({
    id: 202402181658,
    name: 'Myshell Testnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://myshell-testnet.alt.technology']
        }
    },
    blockExplorers: {
        default: {
            name: 'Etherscan',
            url: 'https://myshell-testnet-explorer.alt.technology:443'
        }
    }
});
const queryClient = new react_query_1.QueryClient();
function WagmiConfigWrapper({ children }) {
    return ((0, jsx_runtime_1.jsx)(wagmi_1.WagmiProvider, { config: wagmi_2.wagmiConfig, children: (0, jsx_runtime_1.jsx)(react_query_1.QueryClientProvider, { client: queryClient, children: children }) }));
}
function Providers({ children }) {
    return ((0, jsx_runtime_1.jsx)(VisitorIdProvider_1.default, { children: (0, jsx_runtime_1.jsx)(react_auth_1.PrivyProvider, { appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID, config: {
                embeddedWallets: {
                    createOnLogin: 'users-without-wallets'
                },
                defaultChain: process.env.NEXT_PUBLIC_ENV === 'production' ? chains_1.bsc : chains_1.bscTestnet,
                supportedChains: [MyshellTest, chains_1.opBNB, chains_1.opBNBTestnet, chains_1.mainnet, chains_1.bscTestnet, chains_1.bsc]
            }, children: (0, jsx_runtime_1.jsx)(NextThemeProvider_1.ThemeProvider, { attribute: "class", defaultTheme: "system", enableSystem: true, children: (0, jsx_runtime_1.jsx)(next_js_1.CacheProvider, { children: (0, jsx_runtime_1.jsx)(react_1.ChakraBaseProvider, { theme: theme, children: (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, { delayDuration: 200, skipDelayDuration: 200, children: (0, jsx_runtime_1.jsx)(WagmiConfigWrapper, { children: children }) }) }) }) }) }) }));
}
