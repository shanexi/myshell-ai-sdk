import { useTranslations } from 'next-intl';
import { clearMemory } from '../../../../../../../apis/entity.js';
import { useNotification } from '../../../../../../../common/hooks/useNotification.js';
export default function useClearMemory(type, id, addMessage, name) {
    const commonT = useTranslations('common');
    const t = useTranslations('workshop');
    const { success, error } = useNotification();
    const handleClearMemory = async () => {
        try {
            const { success: apiSuccess, data } = await clearMemory(type, id);
            if (apiSuccess) {
                success({
                    content: `${name ?? ''} ${commonT('memory_cleared_with')}`
                });
                addMessage(data ?? []);
            }
        }
        catch (e) {
            error({
                content: t('clear_widget_error')
            });
        }
    };
    return handleClearMemory;
}
