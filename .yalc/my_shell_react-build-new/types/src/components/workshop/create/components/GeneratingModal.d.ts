import { FormApi } from '@tanstack/react-form';
import { WorkShopForm } from '../../../../../../src/common/constants/interfaces/bot.js';
interface GeneratingModalProps {
    isOpen: boolean;
    onClose: () => void;
    checkIfPromptIsExisted: () => void;
    loading: {
        loading: boolean;
        dirty: boolean;
    };
    form: FormApi<WorkShopForm>;
    setCurrentFormHandle: (data: object) => void;
}
declare function GeneratingModal(props: GeneratingModalProps): import("react/jsx-runtime").JSX.Element;
export default GeneratingModal;
