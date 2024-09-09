import { useTranslations } from 'next-intl';
import { useContext, useState } from 'react';
import { LUIButtonInteractionContext } from '../../common/components/lui/luiContext.js';
import { useNotification } from '../../common/hooks/useNotification.js';
import useUserSettings from '../../common/hooks/useUserSettings.js';
import { checkGalleryUpdate, publishGallery } from '../../gallery/modal/api.js';
import useGetEnergyInfo from '../../hooks/user/useGetEnergyInfo.js';
import { useSensors } from '../../lib/sensors/index.js';
import { useChatStore, useUserStore } from '../../services/store/index.js';
export default function usePublishGallery() {
    const multiPublishMap = useChatStore(state => state.multiPublishMap);
    const clearMultiPublishMap = useChatStore(state => state.clearMultiPublishMap);
    const setHasUnRead = useChatStore(state => state.setHasUnRead);
    const t = useTranslations();
    const [publishing, setPublishing] = useState(false);
    const { success, warning, error } = useNotification();
    const { handleUpdateFirstPublishGallery } = useUserSettings();
    const { getEnergyInfo } = useGetEnergyInfo();
    const { selectedBot } = useContext(LUIButtonInteractionContext);
    const sensors = useSensors();
    const flagUserFirstPublishGallery = useUserStore(state => state.flagUserFirstPublishGallery);
    const checkGalleryUpdateHandle = async (botId) => {
        const res = await checkGalleryUpdate(botId);
        if (res.success) {
            setHasUnRead(res.data?.info?.[0]?.hasUpdate || false);
        }
    };
    const publishGalleryApi = async (list, successCb) => {
        try {
            setPublishing(true);
            const res = await publishGallery(list);
            if (res.success) {
                if (!flagUserFirstPublishGallery) {
                    success({
                        content: t('chat.suc_send')
                    });
                    handleUpdateFirstPublishGallery();
                }
                clearMultiPublishMap();
                const timer = setTimeout(() => {
                    list?.[0].botId && checkGalleryUpdateHandle(list[0].botId);
                    getEnergyInfo();
                    clearTimeout(timer);
                }, 3000);
                successCb?.();
            }
            else {
                error({
                    content: (res.reason === 'ERROR_REASON_BAD_REQUEST_ERROR' && res.msg) || t('chat.faild_send')
                });
            }
            sensors.track('PublishGallery', {
                bot_id: list[0].botId,
                bot_name: selectedBot?.name,
                picture_number: list.length,
                result: res.success
            });
        }
        catch (e) {
            error({
                content: t('chat.faild_send')
            });
        }
        finally {
            setPublishing(false);
        }
    };
    const publishGalleryList = async (successCb, list) => {
        const publishList = Object.keys(multiPublishMap).map(item => multiPublishMap[item]);
        publishGalleryApi(list || publishList, successCb);
    };
    return {
        publishing,
        publishGalleryList,
        checkGalleryUpdateHandle
    };
}
