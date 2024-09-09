"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chainIdNameScannerMap = void 0;
exports.default = useOnChainInteraction;
const react_auth_1 = require("@privy-io/react-auth");
const dayjs_1 = __importDefault(require("dayjs"));
const react_1 = require("react");
const viem_1 = require("viem");
const wagmi_1 = require("wagmi");
const chains_1 = require("viem/chains");
const task_1 = require("../../apis/task");
const enums_1 = require("../../chat/model/enums");
const constants_1 = require("../../common/constants/constants");
const identityService_1 = require("../../common/services/identityService");
const store_1 = require("../../services/store");
const usePrivyLogin_1 = require("../user/usePrivyLogin");
const useWalletInteraction_1 = require("../web3/useWalletInteraction");
const common_helper_1 = require("../../common/utils/common-helper");
exports.chainIdNameScannerMap = {
    '5611': {
        name: 'opBNBTestnet',
        scanner: 'https://opbnb-testnet.bscscan.com/tx'
    },
    '204': {
        name: 'opBNB',
        scanner: 'https://opbnbscan.com/tx'
    }
};
const contractABI = [
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'callerAddress', type: 'address' },
            { indexed: false, internalType: 'string', name: 'name', type: 'string' }
        ],
        name: 'CallerSet',
        type: 'event'
    },
    {
        inputs: [],
        name: 'getCaller',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'string', name: 'name', type: 'string' }],
        name: 'setCaller',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    }
];
function useOnChainInteraction(chainId, contractAddress) {
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const { wallets } = (0, react_auth_1.useWallets)();
    const setTxHash = (0, store_1.useTaskStore)(state => state.setTxHash);
    const setBlockChainInteractionState = (0, store_1.useTaskStore)(state => state.setBlockChainInteractionState);
    const [proccessingPrivyTransaction, setProccessingPrivyTransaction] = (0, react_1.useState)(false);
    const [wagmiErrorModalVisible, setWagmiErrorModalVisible] = (0, react_1.useState)(false);
    const [wagmiErrorType, setWagmiErrorType] = (0, react_1.useState)();
    const [needReLoginModalVisible, setNeedReLoginModalVisible] = (0, react_1.useState)(false);
    const loginMethod = (0, common_helper_1.isClient)() ? identityService_1.identityService.getLoginMethod() : null;
    const interactionType = (0, react_1.useMemo)(() => loginMethod === usePrivyLogin_1.LoginMethod.Metamask ||
        loginMethod === usePrivyLogin_1.LoginMethod.OKX ||
        loginMethod === usePrivyLogin_1.LoginMethod.WalletConnect ||
        loginMethod === usePrivyLogin_1.LoginMethod.BSC
        ? useWalletInteraction_1.InteractionType.Web3
        : useWalletInteraction_1.InteractionType.Web2, [loginMethod]);
    const wagmiConnectedChainId = (0, wagmi_1.useChainId)();
    const { switchChainAsync } = (0, wagmi_1.useSwitchChain)();
    const { writeContractAsync } = (0, wagmi_1.useWriteContract)();
    const { isConnected: isConnectedFromWagmi } = (0, wagmi_1.useAccount)();
    const { sendTransaction: sendTransactionWithPrivy } = (0, react_auth_1.useSendTransaction)({
        onSuccess: response => {
            if (proccessingPrivyTransaction) {
                setProccessingPrivyTransaction(false);
                setTxHash(response.hash);
                identityService_1.identityService.setBlockChainGuruHash(userId, response.hash);
                setBlockChainInteractionState('on-chain');
                identityService_1.identityService.setBlockChainTransactionCalled(userId, 'on-chain', (0, dayjs_1.default)().add(2, 'minute').valueOf());
            }
        }
    });
    const handleWagmiErrorModalClose = (0, react_1.useCallback)(() => {
        setWagmiErrorModalVisible(false);
        setWagmiErrorType(undefined);
    }, []);
    const onCallContractFunction = (0, react_1.useCallback)(async (setBlockChainInteractionState, setTxHash) => {
        if (!chainId || !contractAddress)
            return;
        if (interactionType === useWalletInteraction_1.InteractionType.Web2) {
            try {
                setProccessingPrivyTransaction(true);
                setBlockChainInteractionState('acting');
                let chain;
                switch (chainId) {
                    case '5611':
                        chain = chains_1.opBNBTestnet;
                        break;
                    case '204':
                        chain = chains_1.opBNB;
                        break;
                    default:
                        chain = chains_1.opBNB;
                        break;
                }
                const embeddedWallet = wallets.find(wallet => wallet.walletClientType === 'privy');
                if (!embeddedWallet) {
                    setNeedReLoginModalVisible(true);
                    setBlockChainInteractionState('error');
                    return;
                }
                await embeddedWallet?.switchChain(chain.id);
                const encodedData = (0, viem_1.encodeFunctionData)({
                    abi: contractABI,
                    functionName: 'setCaller',
                    args: ['myshell']
                });
                await sendTransactionWithPrivy({
                    chainId: chain.id,
                    to: contractAddress,
                    data: encodedData,
                    gasLimit: constants_1.GAS_LIMIT_LOW
                });
            }
            catch (e) {
                setBlockChainInteractionState('error');
                setProccessingPrivyTransaction(false);
            }
        }
        else {
            try {
                setBlockChainInteractionState('acting');
                let chain;
                switch (chainId) {
                    case '5611':
                        chain = chains_1.opBNBTestnet;
                        break;
                    case '204':
                        chain = chains_1.opBNB;
                        break;
                    default:
                        chain = chains_1.opBNB;
                        break;
                }
                if (!isConnectedFromWagmi) {
                    setNeedReLoginModalVisible(true);
                    setBlockChainInteractionState('error');
                    return;
                }
                await switchChainAsync({ chainId: chain.id });
                const tx = await writeContractAsync({
                    chainId: chain.id,
                    address: contractAddress,
                    abi: contractABI,
                    functionName: 'setCaller',
                    args: ['myshell']
                });
                if (!tx) {
                    throw new Error('contract call failed with no tx hash returned');
                }
                setTxHash(tx);
                identityService_1.identityService.setBlockChainGuruHash(userId, tx);
                setBlockChainInteractionState('on-chain');
                identityService_1.identityService.setBlockChainTransactionCalled(userId, 'on-chain', (0, dayjs_1.default)().add(2, 'minute').valueOf());
            }
            catch (e) {
                console.log('wallet contract call', e);
                const errStr = e.toString();
                if (errStr.includes(enums_1.OnchainInteractionError.OnWrongChain)) {
                    await switchChainAsync({ chainId: chains_1.opBNB.id });
                }
                if (e instanceof viem_1.TransactionExecutionError && e.cause instanceof viem_1.UserRejectedRequestError) {
                    setBlockChainInteractionState('not_start');
                    return;
                }
                setBlockChainInteractionState('error');
            }
        }
    }, [chainId, contractAddress, userId, interactionType, isConnectedFromWagmi, wallets, wagmiConnectedChainId]);
    const getInteractionState = (0, react_1.useCallback)(async (txHash, setBlockChainInteractionState) => {
        try {
            const { data } = await (0, task_1.getBlockChainInteractionState)(txHash);
            if (data.hasConfirmed) {
                setBlockChainInteractionState('confirmed');
            }
        }
        catch (e) {
        }
    }, []);
    return {
        onCallContractFunction,
        wagmiErrorModalVisible,
        wagmiErrorType,
        handleWagmiErrorModalClose,
        getInteractionState,
        needReLoginModalVisible,
        setNeedReLoginModalVisible
    };
}
