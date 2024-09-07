import { FormApi } from '@tanstack/react-form';
import { WorkShopForm } from '../../../../../src/common/constants/interfaces/bot.js';
export default function SettingFooter({ onDiscardDraft, onSave, form, botId, loading, disable, setDisable }: {
    onDiscardDraft: (() => void) | undefined;
    onSave: () => void;
    form: FormApi<WorkShopForm>;
    botId: string;
    loading: boolean;
    disable: boolean;
    setDisable: (disable: boolean) => void;
}): import("react/jsx-runtime").JSX.Element;
