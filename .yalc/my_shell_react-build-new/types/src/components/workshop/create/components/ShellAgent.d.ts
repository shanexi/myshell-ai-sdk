import { FormApi } from '@tanstack/react-form';
import { WorkShopForm } from '../../../../../../src/common/constants/interfaces/bot.js';
type P = {
    form: FormApi<WorkShopForm>;
    onNoCodeChange: () => void;
    isMobile: boolean;
};
declare const ShellAgentMode: React.FC<P>;
export default ShellAgentMode;
