import { useTranslations } from 'next-intl';
import { useToggle } from 'react-use';
import { clearHistory } from '../../../../../../../apis/new-chat.js';
import { useNotification } from '../../../../../../../common/hooks/useNotification.js';
export default function useClearHistory(type, id, deleteSpecifiedMessageId) {
    const t = useTranslations('workshop');
    const [clearing, setClearing] = useToggle(false);
    const { success, error } = useNotification();
    const deleteAll = async () => {
        try {
            setClearing(true);
            const { success: apiSuccess } = await clearHistory(type, id);
            if (apiSuccess) {
                success({
                    content: t('delete_widget_success')
                });
                deleteSpecifiedMessageId?.();
            }
            else {
                error({
                    content: t('delete_widget_error')
                });
            }
        }
        catch (e) {
            console.error(e);
            error({
                content: t('delete_widget_error')
            });
        }
        finally {
            setClearing(false);
        }
    };
    return {
        clearing,
        clearHistory: deleteAll
    };
}
