import { FormApi } from '@tanstack/react-form';
import { LLMModel, WorkShopForm } from '../../../../../../src/common/constants/interfaces/bot.js';
declare function BotModel({ form, isGuide, modelOptions, queryingModelOptions }: {
    form: FormApi<WorkShopForm>;
    isGuide: boolean;
    modelOptions: LLMModel[];
    queryingModelOptions: boolean;
}): import("react/jsx-runtime").JSX.Element;
export default BotModel;
