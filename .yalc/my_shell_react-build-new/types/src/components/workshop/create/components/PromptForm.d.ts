import { FormApi } from '@tanstack/react-form';
import { WorkShopForm, LLMModel } from '../../../../../../src/common/constants/interfaces/bot.js';
declare function AdvancedPromptForm({ form, isGuide, modelOptions, queryingModelOptions }: {
    form: FormApi<WorkShopForm>;
    isGuide: boolean;
    modelOptions: LLMModel[];
    queryingModelOptions: boolean;
}): import("react/jsx-runtime").JSX.Element;
export default AdvancedPromptForm;
