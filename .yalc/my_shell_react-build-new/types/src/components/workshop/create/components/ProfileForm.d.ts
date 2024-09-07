import { FormApi } from '@tanstack/react-form';
import { TagInfo, WorkShopForm } from '../../../../../../src/common/constants/interfaces/bot.js';
declare function ProfileForm({ form, disable, showLearnMore, isGuide, tagOptions, loading }: {
    form: FormApi<WorkShopForm>;
    disable: boolean;
    showLearnMore: (section: string) => void;
    isGuide: boolean;
    tagOptions: TagInfo[];
    loading: boolean;
}): import("react/jsx-runtime").JSX.Element;
export default ProfileForm;
