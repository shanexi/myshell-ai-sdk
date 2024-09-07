import { FormApi } from '@tanstack/react-form';
import { WorkShopForm, BotInfo, LLMModel, TagInfo } from '../../../../../../src/common/constants/interfaces/bot.js';
declare function PreviewCard({ form, bot, tagOptions, languageName, modelOptions, loading }: {
    loading?: boolean;
    form: FormApi<WorkShopForm>;
    bot: BotInfo | null;
    tagOptions: TagInfo[];
    languageName: string;
    modelOptions: LLMModel[];
}): import("react/jsx-runtime").JSX.Element;
export default PreviewCard;
