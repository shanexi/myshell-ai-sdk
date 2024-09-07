import { FormApi } from '@tanstack/react-form';
import { WorkShopForm } from '../../../../../../src/common/constants/interfaces/bot.js';
type P = {
    form: FormApi<WorkShopForm>;
    handleCheckNoCode: () => void;
    checking: boolean;
    onNoCodeChange: () => void;
    widgets: string[];
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isMobile: boolean;
};
declare const NoCodeMode: React.FC<P>;
export default NoCodeMode;
