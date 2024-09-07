import { FormApi } from '@tanstack/react-form';
import { WorkShopForm } from '../../../../../../../src/common/constants/interfaces/bot.js';
type P = {
    form: FormApi<WorkShopForm>;
    handleCheckCode: () => void;
    checking: boolean;
    errorInfo?: string;
    onCodeChange: () => void;
    errorPath?: string;
    errorMsg?: {
        msg?: string;
        reason?: string;
    };
};
export default function DevMode(props: P): import("react/jsx-runtime").JSX.Element;
export {};
