import { FormApi } from '@tanstack/react-form';
import { BotInfo, WorkShopForm } from '../../../../../../src/common/constants/interfaces/bot.js';
export default function TTSForm({ form, disable, showLearnMore, isGuide, languageName, setLanguageName, bot, botId }: {
    form: FormApi<WorkShopForm>;
    disable: boolean;
    showLearnMore: (section: string) => void;
    isGuide: boolean;
    languageName: string;
    setLanguageName: (name: string) => void;
    bot: BotInfo;
    botId: string;
}): import("react/jsx-runtime").JSX.Element;
