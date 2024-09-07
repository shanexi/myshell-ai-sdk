import { FormApi } from '@tanstack/react-form';
import { WorkShopForm } from '../../../../../src/common/constants/interfaces/bot.js';
export default function SocialMedia({ form, showLearnMore, isGuide }: {
    form: FormApi<WorkShopForm>;
    showLearnMore: (section: string) => void;
    isGuide: boolean;
}): import("react/jsx-runtime").JSX.Element;
