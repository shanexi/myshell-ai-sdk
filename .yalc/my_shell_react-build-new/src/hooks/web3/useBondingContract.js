"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBaseInfo = useBaseInfo;
exports.useBondingContract = useBondingContract;
exports.useTradeInfo = useTradeInfo;
const react_auth_1 = require("@privy-io/react-auth");
const react_query_1 = require("@tanstack/react-query");
const core_1 = require("@wagmi/core");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const viem_1 = require("viem");
const wagmi_1 = require("wagmi");
const connectors_1 = require("wagmi/connectors");
const constants_1 = require("../../common/constants/constants.js");
const useNotification_1 = require("../../common/hooks/useNotification.js");
const identityService_1 = require("../../common/services/identityService.js");
const usePrivyLogin_1 = require("../../hooks/user/usePrivyLogin.js");
const web3_1 = require("../../services/store/web3.js");
const useWalletInteraction_1 = __importDefault(require("./useWalletInteraction.js"));
const ABI = [
    {
        inputs: [],
        name: '_holdLimit',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'name',
                type: 'string'
            },
            {
                internalType: 'string',
                name: 'symbol',
                type: 'string'
            },
            {
                internalType: 'bytes',
                name: 'sig',
                type: 'bytes'
            },
            {
                internalType: 'uint256',
                name: 'validTill',
                type: 'uint256'
            }
        ],
        name: 'launchBonding',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'bid',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'share',
                type: 'uint256'
            },
            {
                internalType: 'bytes',
                name: 'sig',
                type: 'bytes'
            },
            {
                internalType: 'uint256',
                name: 'validTill',
                type: 'uint256'
            }
        ],
        name: 'buyBonding',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'bid',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'share',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'minOut',
                type: 'uint256'
            }
        ],
        name: 'sellBonding',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'bid',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256'
            }
        ],
        name: 'getBuyPriceAfterFee',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'bid',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256'
            }
        ],
        name: 'getSellPriceAfterFee',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: '_userNonce',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            },
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: '_userShare',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
function useBaseInfo() {
    const isWeb3 = (0, react_1.useMemo)(() => {
        const loginMethod = identityService_1.identityService.getLoginMethod();
        return (loginMethod &&
            [usePrivyLogin_1.LoginMethod.OKX, usePrivyLogin_1.LoginMethod.Metamask, usePrivyLogin_1.LoginMethod.WalletConnect, usePrivyLogin_1.LoginMethod.BSC].includes(loginMethod));
    }, []);
    const { wallets } = (0, react_auth_1.useWallets)();
    const { address: userAddress } = (0, useWalletInteraction_1.default)();
    const config = (0, wagmi_1.useConfig)();
    const embeddedWallet = wallets?.find(wallet => wallet.connectorType === 'embedded');
    const toggleNeedReLoginModal = (0, web3_1.useWeb3Store)(state => state.toggleNeedReLoginModal);
    const currentChainId = constants_1.bsc_chain_id_current_env;
    const requestWithPrivy = async (to, parameters) => {
        if (!embeddedWallet) {
            console.warn('toggleNeedReLoginModal...1');
            toggleNeedReLoginModal(true);
            return null;
        }
        embeddedWallet.switchChain(currentChainId);
        const encodedData = (0, viem_1.encodeFunctionData)(parameters);
        const provider = await embeddedWallet.getEthereumProvider();
        const response = await provider.request({
            method: 'eth_call',
            params: [
                {
                    to,
                    data: encodedData
                },
                'latest'
            ]
        });
        const value = (0, viem_1.decodeFunctionResult)({
            abi: parameters.abi,
            functionName: parameters.functionName,
            data: response
        });
        return value;
    };
    return {
        isWeb3,
        chainId: currentChainId,
        address: userAddress,
        config,
        requestWithPrivy
    };
}
function useBondingContract() {
    const { wallets } = (0, react_auth_1.useWallets)();
    const toggleNeedReLoginModal = (0, web3_1.useWeb3Store)(state => state.toggleNeedReLoginModal);
    const { warning } = (0, useNotification_1.useNotification)();
    const { isMetamask, isOKX, isWalletConnect, isBSC } = (0, useWalletInteraction_1.default)();
    const { connectAsync, connectors } = (0, wagmi_1.useConnect)();
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const [isWeb3, setIsWeb3] = (0, react_1.useState)();
    const { chainId, address: web3AccountAddress, isConnected: isConnectedFromWeb3 } = (0, wagmi_1.useAccount)();
    const { writeContractAsync } = (0, wagmi_1.useWriteContract)();
    const { switchChainAsync } = (0, wagmi_1.useSwitchChain)();
    const config = (0, wagmi_1.useConfig)();
    (0, react_1.useEffect)(() => {
        const loginMethod = identityService_1.identityService.getLoginMethod();
        if (!chainId &&
            loginMethod &&
            [usePrivyLogin_1.LoginMethod.OKX, usePrivyLogin_1.LoginMethod.Metamask, usePrivyLogin_1.LoginMethod.WalletConnect, usePrivyLogin_1.LoginMethod.BSC].includes(loginMethod)) {
            console.log('reconnect wallet=', config);
            (0, core_1.reconnect)(config, { connectors: [(0, connectors_1.injected)()] })
                .then(() => {
                console.log('reconnect wallet success');
            })
                .catch(error => {
                console.error('reconnect wallet error=', error);
            });
        }
    }, []);
    const embeddedWallet = wallets?.find(wallet => wallet.connectorType === 'embedded');
    const { sendTransaction } = (0, react_auth_1.useSendTransaction)();
    (0, react_1.useEffect)(() => {
        const loginMethod = identityService_1.identityService.getLoginMethod();
        if (loginMethod) {
            setIsWeb3([usePrivyLogin_1.LoginMethod.OKX, usePrivyLogin_1.LoginMethod.Metamask, usePrivyLogin_1.LoginMethod.WalletConnect, usePrivyLogin_1.LoginMethod.BSC].includes(loginMethod));
        }
    }, []);
    const getContractAddress = () => {
        const currentChainId = constants_1.bsc_chain_id_current_env;
        const contractAddress = constants_1.BADGE_CONTRACT_MAP[currentChainId];
        if (!contractAddress) {
            throw new Error(`Unsupported chainId: ${chainId}`);
        }
        return contractAddress;
    };
    const sendTransactionWithPrivy = async (parameters, request) => {
        if (!embeddedWallet) {
            console.warn('toggleNeedReLoginModal...2');
            toggleNeedReLoginModal(true);
            return null;
        }
        embeddedWallet.switchChain(constants_1.bsc_chain_id_current_env);
        const encodedData = (0, viem_1.encodeFunctionData)(parameters);
        const transaction = {
            to: getContractAddress(),
            data: encodedData,
            gasLimit: constants_1.GAS_LIMIT_LOW,
            chainId: constants_1.bsc_chain_id_current_env,
            ...request
        };
        const tx = await sendTransaction(transaction);
        return tx;
    };
    const requestWithPrivy = async (parameters) => {
        if (!embeddedWallet) {
            console.warn('toggleNeedReLoginModal...1');
            toggleNeedReLoginModal(true);
            return null;
        }
        const encodedData = (0, viem_1.encodeFunctionData)(parameters);
        const provider = await embeddedWallet.getEthereumProvider();
        const response = await provider.request({
            method: 'eth_call',
            params: [
                {
                    to: getContractAddress(),
                    data: encodedData
                },
                'latest'
            ]
        });
        const value = (0, viem_1.decodeFunctionResult)({
            abi: parameters.abi,
            functionName: parameters.functionName,
            data: response
        });
        return value;
    };
    const reconnectWallet = async (chainId) => {
        if (isMetamask) {
            const connector = connectors.find(connector => {
                return connector.id === 'io.metamask';
            });
            if (!connector) {
                console.error('connector not found');
                return;
            }
            await connectAsync({
                chainId,
                connector
            });
        }
        else if (isOKX) {
            const connector = connectors.find(connector => connector.id === 'com.okex.wallet');
            if (!connector) {
                console.error('connector not found');
                return;
            }
            await connectAsync({
                chainId,
                connector
            });
        }
        else if (isWalletConnect) {
            const connector = connectors.find(connector => {
                return connector.id === 'walletConnect';
            });
            if (!connector) {
                console.error('connector not found');
                return;
            }
            await connectAsync({
                chainId,
                connector
            });
        }
        else if (isBSC) {
            const connector = connectors.find(connector => connector.id === 'BinanceW3WSDK');
            if (!connector) {
                console.error('connector not found');
                return;
            }
            await connectAsync({
                chainId,
                connector
            });
        }
    };
    const preCheckForEOAWallets = async () => {
        if (!isConnectedFromWeb3) {
            warning({
                content: t('wallet_not_connect_tip')
            });
            await reconnectWallet(constants_1.bsc_chain_id_current_env);
        }
        if (chainId !== constants_1.bsc_chain_id_current_env) {
            await switchChainAsync({ chainId: constants_1.bsc_chain_id_current_env });
        }
    };
    return {
        isWeb3,
        launchBonding: async (params) => {
            if (isWeb3) {
                await preCheckForEOAWallets();
                const tx = await writeContractAsync({
                    abi: ABI,
                    address: getContractAddress(),
                    functionName: 'launchBonding',
                    chainId: constants_1.bsc_chain_id_current_env,
                    args: [params.name, params.symbol, params.sig, params.validTill]
                });
                return tx;
            }
            const transaction = await sendTransactionWithPrivy({
                abi: ABI,
                functionName: 'launchBonding',
                args: [params.name, params.symbol, params.sig, params.validTill]
            });
            return transaction?.transactionHash;
        },
        buyBonding: async (params) => {
            if (isWeb3) {
                await preCheckForEOAWallets();
                const tx = await writeContractAsync({
                    abi: ABI,
                    address: getContractAddress(),
                    functionName: 'buyBonding',
                    args: [params.bid, params.amount, params.sig, params.validTill],
                    value: params.value,
                    chainId: constants_1.bsc_chain_id_current_env
                });
                return tx;
            }
            const trnsaction = await sendTransactionWithPrivy({
                abi: ABI,
                functionName: 'buyBonding',
                args: [params.bid, params.amount, params.sig, params.validTill]
            }, {
                value: params.value
            });
            return trnsaction?.transactionHash;
        },
        sellBonding: async (params) => {
            if (isWeb3) {
                await preCheckForEOAWallets();
                const tx = await writeContractAsync({
                    abi: ABI,
                    address: getContractAddress(),
                    functionName: 'sellBonding',
                    args: [params.bid, params.amount, params.minOut],
                    chainId: constants_1.bsc_chain_id_current_env
                });
                return tx;
            }
            const transaction = await sendTransactionWithPrivy({
                abi: ABI,
                functionName: 'sellBonding',
                args: [params.bid, params.amount, params.minOut]
            });
            return transaction?.transactionHash;
        },
        getBadgePrice: async (params) => {
            const { bid, amount, slippage, isBuy } = params;
            const functionName = isBuy ? 'getBuyPriceAfterFee' : 'getSellPriceAfterFee';
            if (isWeb3 === undefined) {
                return {
                    value: BigInt(0),
                    formatted: '0'
                };
            }
            const response = isWeb3
                ? await (0, core_1.readContract)(config, {
                    abi: ABI,
                    address: getContractAddress(),
                    functionName,
                    chainId: constants_1.bsc_chain_id_current_env,
                    args: [bid, amount]
                })
                : await requestWithPrivy({
                    abi: ABI,
                    functionName,
                    args: [bid, amount]
                });
            const price = BigInt(response);
            const value = (price * BigInt((isBuy ? 1 + (slippage ?? 0) : 1 - (slippage ?? 0)) * 100)) / BigInt(100);
            return {
                value,
                formatted: (0, viem_1.formatUnits)(value, 18)
            };
        },
        getBadgeAmount: async (params) => {
            if (isWeb3 === undefined)
                return 0;
            const response = isWeb3
                ? await (0, core_1.readContract)(config, {
                    abi: ABI,
                    address: getContractAddress(),
                    functionName: '_userShare',
                    chainId: constants_1.bsc_chain_id_current_env,
                    args: [params.bid, params.address ?? web3AccountAddress]
                })
                : await requestWithPrivy({
                    abi: ABI,
                    functionName: '_userShare',
                    args: [params.bid, params.address ?? embeddedWallet?.address]
                });
            return Number(response);
        }
    };
}
function useTradeInfo(params) {
    const { isWeb3, config, chainId, address, requestWithPrivy } = useBaseInfo();
    const args = [address, params.bid, params.amount];
    const enabled = !!address && params.bid > 0 && params.amount >= 0 && !!chainId;
    const [cacheData, setCacheData] = (0, react_1.useState)(null);
    const query = (0, react_query_1.useQuery)({
        queryKey: [address, params.bid.toString(), params.amount],
        queryFn: async () => {
            if (!chainId) {
                throw new Error('chainId is undefined');
            }
            const contract = constants_1.BADGE_VIEW_CONTRACT_MAP[chainId];
            if (!contract) {
                throw new Error(`Unsupported chainId: ${chainId}`);
            }
            const abi = [
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: 'user',
                            type: 'address'
                        },
                        {
                            internalType: 'uint256',
                            name: 'bid',
                            type: 'uint256'
                        },
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256'
                        }
                    ],
                    name: 'getUserInfo',
                    outputs: [
                        {
                            components: [
                                {
                                    components: [
                                        {
                                            internalType: 'uint256',
                                            name: 'singlePrice',
                                            type: 'uint256'
                                        },
                                        {
                                            internalType: 'uint256',
                                            name: 'price',
                                            type: 'uint256'
                                        },
                                        {
                                            internalType: 'uint256',
                                            name: 'priceAfterFee',
                                            type: 'uint256'
                                        }
                                    ],
                                    internalType: 'struct ViewHelper.Price',
                                    name: 'buy',
                                    type: 'tuple'
                                },
                                {
                                    components: [
                                        {
                                            internalType: 'uint256',
                                            name: 'singlePrice',
                                            type: 'uint256'
                                        },
                                        {
                                            internalType: 'uint256',
                                            name: 'price',
                                            type: 'uint256'
                                        },
                                        {
                                            internalType: 'uint256',
                                            name: 'priceAfterFee',
                                            type: 'uint256'
                                        }
                                    ],
                                    internalType: 'struct ViewHelper.Price',
                                    name: 'sell',
                                    type: 'tuple'
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'bidBalance',
                                    type: 'uint256'
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'bnbBalance',
                                    type: 'uint256'
                                }
                            ],
                            internalType: 'struct ViewHelper.ViewUserInfo',
                            name: 'vi',
                            type: 'tuple'
                        }
                    ],
                    stateMutability: 'view',
                    type: 'function'
                }
            ];
            const response = isWeb3
                ? await (0, core_1.readContract)(config, {
                    abi,
                    address: contract,
                    functionName: 'getUserInfo',
                    args,
                    chainId: constants_1.bsc_chain_id_current_env
                })
                : await requestWithPrivy(contract, {
                    abi,
                    functionName: 'getUserInfo',
                    args
                });
            return response;
        },
        refetchInterval: 5_000,
        staleTime: 5_000,
        enabled
    });
    const toPrice = (value, decimals = 18) => ({
        value,
        formatted: (0, viem_1.formatUnits)(value, decimals)
    });
    const priceWithSlippage = (price, slippage, isBuy) => {
        const v = ((isBuy ? 1 + slippage : 1 - slippage) * 10000).toFixed(0);
        return (price * BigInt(v)) / BigInt(10000);
    };
    const data = (0, react_1.useMemo)(() => {
        const convertData = (originData, slippage) => {
            if (!originData) {
                return cacheData;
            }
            const { buy, sell, bidBalance, bnbBalance } = originData;
            const tradeInfo = {
                buySinglePrice: toPrice(buy.singlePrice),
                buyPrice: toPrice(buy.price),
                buyFee: toPrice(buy.priceAfterFee - buy.price),
                buyTotal: toPrice(priceWithSlippage(buy.priceAfterFee, slippage, true)),
                sellSinglePrice: toPrice(sell.singlePrice),
                sellPrice: toPrice(sell.price),
                sellFee: toPrice(sell.price - sell.priceAfterFee),
                sellTotal: toPrice(priceWithSlippage(sell.priceAfterFee, slippage, false)),
                userBalance: toPrice(bnbBalance),
                userBidAmount: Number(bidBalance)
            };
            setCacheData(tradeInfo);
            return tradeInfo;
        };
        return convertData(query.data, params.slippage ?? 0);
    }, [params.slippage, query.data]);
    return {
        ...query,
        data
    };
}
