import { PointTypeEnum } from '../../../../../../src/common/constants/enums/task.js';
export interface Record {
    id: string;
    desc: string;
    createdDateUnix: number;
    isIncome: boolean;
    text: string;
    type: PointTypeEnum | 'SHELL_COIN';
    balance: string;
}
interface P {
    record: Record;
}
export default function RecordItem({ record }: P): import("react/jsx-runtime").JSX.Element;
export {};
