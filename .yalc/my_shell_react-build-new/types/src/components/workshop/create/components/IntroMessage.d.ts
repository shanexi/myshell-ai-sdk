import { FormApi } from '@tanstack/react-form';
import { WorkShopForm } from '../../../../../../src/common/constants/interfaces/bot.js';
declare function IntroMessage({ form, isGuide, loading }: {
    form: FormApi<WorkShopForm>;
    isGuide: boolean;
    loading: boolean;
}): import("react/jsx-runtime").JSX.Element;
export default IntroMessage;
