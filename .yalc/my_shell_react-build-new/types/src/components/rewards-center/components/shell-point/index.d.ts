import { PointTypeEnum } from '../../../../../../src/common/constants/enums/task.js';
interface P {
    type: PointTypeEnum;
    size: number;
    className?: string;
}
export declare const ShellPoint: ({ type, size, className }: P) => import("react/jsx-runtime").JSX.Element;
export {};
