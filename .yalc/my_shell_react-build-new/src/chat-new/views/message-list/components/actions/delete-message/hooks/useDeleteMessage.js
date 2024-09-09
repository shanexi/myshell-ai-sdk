import { useTranslations } from 'next-intl';
import { useToggle } from 'react-use';
import { deleteHistory } from '../../../../../../../apis/new-chat.js';
import { useNotification } from '../../../../../../../common/hooks/useNotification.js';
export default function useDeleteMessage(type, id, deleteSpecifiedMessageId) {
    const t = useTranslations('workshop');
    const [deleting, setDeleting] = useToggle(false);
    const { success, error } = useNotification();
    const deleteMessage = async (msgId) => {
        try {
            setDeleting(true);
            const { success: apiSuccess } = await deleteHistory(type, msgId);
            if (apiSuccess) {
                success({
                    content: t('delete_widget_success')
                });
                deleteSpecifiedMessageId?.(msgId);
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
            setDeleting(false);
        }
    };
    return {
        deleting,
        deleteMessage
    };
}
