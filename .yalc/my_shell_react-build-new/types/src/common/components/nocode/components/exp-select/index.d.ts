import { ISelectProps } from '../../../../../../../src/common/components/ui/select.js';
type IExpValue = {
    target: {
        value: string | number;
    };
};
interface IExpSelectProps extends ISelectProps {
    value?: string;
    onChange?: (e: IExpValue) => void;
    name: string;
    className?: string;
    placeholder?: string;
}
declare const ExpSelect: (props: IExpSelectProps) => import("react/jsx-runtime").JSX.Element;
export { ExpSelect };
