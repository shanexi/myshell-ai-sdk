import * as React from 'react';
import { TValues } from '../../../../../../../src/common/components/form-engine/index.js';
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
export interface IPayloadConfigProps {
    name: string;
    value: TValues;
}
declare function PayloadConfig(props: IPayloadConfigProps): import("react/jsx-runtime").JSX.Element;
export { PayloadConfig };
