import { Task } from '../../../../../../src/common/constants/interfaces/task';
interface BlockChainGuruModalProps {
    isOpen: boolean;
    onClose: () => void;
    blockChainInteractionState: BlockChainInteractionState;
    setBlockChainInteractionState: (state: BlockChainInteractionState) => void;
    task?: Task;
    txHash?: string;
    setTxHash: (txHash: `0x${string}`) => void;
}
export type BlockChainInteractionState = 'not_start' | 'acting' | 'on-chain' | 'confirmed' | 'error';
export default function BlockChainGuruModal({ isOpen, onClose, blockChainInteractionState, setBlockChainInteractionState, task, txHash, setTxHash }: BlockChainGuruModalProps): import("react/jsx-runtime").JSX.Element;
export {};
