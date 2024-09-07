import { Task } from '../../../../../../src/common/constants/interfaces/task.js';
interface ClaimedTaskListModalProps {
    claimedTasks: Task[];
    onClose: () => void;
}
export default function ClaimedTaskListModal({ claimedTasks, onClose }: ClaimedTaskListModalProps): import("react/jsx-runtime").JSX.Element;
export {};
