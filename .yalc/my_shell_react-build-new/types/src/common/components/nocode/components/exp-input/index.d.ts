import * as React from 'react';
type IExpValue = {
    target: {
        value: string | number;
    };
};
interface IExpInputProps {
    value?: string;
    onChange?: (e: IExpValue) => void;
    name: string;
    className?: string;
    placeholder?: string;
    singleLine?: boolean;
}
declare const ExpInput: React.FC<IExpInputProps>;
export { ExpInput };
