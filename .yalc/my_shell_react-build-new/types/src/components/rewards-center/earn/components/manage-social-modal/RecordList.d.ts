import { MediaShareRecord } from '../../../../../../../src/common/constants/interfaces/task.js';
interface IRecordListProps {
    records: MediaShareRecord[];
    isClaimed?: boolean;
    onClaimed?: () => void;
    onCancel?: () => void;
}
export default function RecordList({ records, isClaimed, onClaimed, onCancel }: IRecordListProps): import("react/jsx-runtime").JSX.Element;
export {};
