import { useSendTransaction, useWallets } from '@privy-io/react-auth';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { TransactionExecutionError, UserRejectedRequestError, encodeFunctionData } from 'viem';
import { useAccount, useChainId, useSwitchChain, useWriteContract } from 'wagmi';
import { opBNB, opBNBTestnet } from 'viem/chains';
import { getBlockChainInteractionState } from '../../apis/task.js';
import { OnchainInteractionError } from '../../chat/model/enums.js';
import { GAS_LIMIT_LOW } from '../../common/constants/constants.js';
import { identityService } from '../../common/services/identityService.js';
import { useTaskStore, useUserStore } from '../../services/store/index.js';
import { LoginMethod } from '../user/usePrivyLogin.js';
import { InteractionType } from '../web3/useWalletInteraction.js';
import { isClient } from '../../common/utils/common-helper.js';
export const chainIdNameScannerMap = {
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
export default function useOnChainInteraction(chainId, contractAddress) {
    const userId = useUserStore(state => state.userId);
    const { wallets } = useWallets();
    const setTxHash = useTaskStore(state => state.setTxHash);
    const setBlockChainInteractionState = useTaskStore(state => state.setBlockChainInteractionState);
    const [proccessingPrivyTransaction, setProccessingPrivyTransaction] = useState(false);
    const [wagmiErrorModalVisible, setWagmiErrorModalVisible] = useState(false);
    const [wagmiErrorType, setWagmiErrorType] = useState();
    const [needReLoginModalVisible, setNeedReLoginModalVisible] = useState(false);
    const loginMethod = isClient() ? identityService.getLoginMethod() : null;
    const interactionType = useMemo(() => loginMethod === LoginMethod.Metamask ||
        loginMethod === LoginMethod.OKX ||
        loginMethod === LoginMethod.WalletConnect ||
        loginMethod === LoginMethod.BSC
        ? InteractionType.Web3
        : InteractionType.Web2, [loginMethod]);
    const wagmiConnectedChainId = useChainId();
    const { switchChainAsync } = useSwitchChain();
    const { writeContractAsync } = useWriteContract();
    const { isConnected: isConnectedFromWagmi } = useAccount();
    const { sendTransaction: sendTransactionWithPrivy } = useSendTransaction({
        onSuccess: response => {
            if (proccessingPrivyTransaction) {
                setProccessingPrivyTransaction(false);
                setTxHash(response.hash);
                identityService.setBlockChainGuruHash(userId, response.hash);
                setBlockChainInteractionState('on-chain');
                identityService.setBlockChainTransactionCalled(userId, 'on-chain', dayjs().add(2, 'minute').valueOf());
            }
        }
    });
    const handleWagmiErrorModalClose = useCallback(() => {
        setWagmiErrorModalVisible(false);
        setWagmiErrorType(undefined);
    }, []);
    const onCallContractFunction = useCallback(async (setBlockChainInteractionState, setTxHash) => {
        if (!chainId || !contractAddress)
            return;
        if (interactionType === InteractionType.Web2) {
            try {
                setProccessingPrivyTransaction(true);
                setBlockChainInteractionState('acting');
                let chain;
                switch (chainId) {
                    case '5611':
                        chain = opBNBTestnet;
                        break;
                    case '204':
                        chain = opBNB;
                        break;
                    default:
                        chain = opBNB;
                        break;
                }
                const embeddedWallet = wallets.find(wallet => wallet.walletClientType === 'privy');
                if (!embeddedWallet) {
                    setNeedReLoginModalVisible(true);
                    setBlockChainInteractionState('error');
                    return;
                }
                await embeddedWallet?.switchChain(chain.id);
                const encodedData = encodeFunctionData({
                    abi: contractABI,
                    functionName: 'setCaller',
                    args: ['myshell']
                });
                await sendTransactionWithPrivy({
                    chainId: chain.id,
                    to: contractAddress,
                    data: encodedData,
                    gasLimit: GAS_LIMIT_LOW
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
                        chain = opBNBTestnet;
                        break;
                    case '204':
                        chain = opBNB;
                        break;
                    default:
                        chain = opBNB;
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
                identityService.setBlockChainGuruHash(userId, tx);
                setBlockChainInteractionState('on-chain');
                identityService.setBlockChainTransactionCalled(userId, 'on-chain', dayjs().add(2, 'minute').valueOf());
            }
            catch (e) {
                console.log('wallet contract call', e);
                const errStr = e.toString();
                if (errStr.includes(OnchainInteractionError.OnWrongChain)) {
                    await switchChainAsync({ chainId: opBNB.id });
                }
                if (e instanceof TransactionExecutionError && e.cause instanceof UserRejectedRequestError) {
                    setBlockChainInteractionState('not_start');
                    return;
                }
                setBlockChainInteractionState('error');
            }
        }
    }, [chainId, contractAddress, userId, interactionType, isConnectedFromWagmi, wallets, wagmiConnectedChainId]);
    const getInteractionState = useCallback(async (txHash, setBlockChainInteractionState) => {
        try {
            const { data } = await getBlockChainInteractionState(txHash);
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
