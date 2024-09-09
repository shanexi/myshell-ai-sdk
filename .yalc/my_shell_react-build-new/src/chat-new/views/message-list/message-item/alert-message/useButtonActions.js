import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { setMessageHandled } from '../../../../../apis/bot.js';
import { markMessageAsHandled } from '../../../../../apis/new-chat.js';
import { TRANSLATOR_BOT_ID } from '../../../../../common/utils/runtime-config.js';
import { useGlobalStore } from '../../../../../services/store/index.js';
const roomChatBot = `/chat/${TRANSLATOR_BOT_ID}`;
export default function useButtonActions(message, clearMemory, partialUpdateMessage) {
    const t = useTranslations('chat');
    const router = useRouter();
    useEffect(() => {
        router.prefetch(roomChatBot);
    }, []);
    const toggleLoginModal = useGlobalStore(state => state.toggleLoginModal);
    const onOpenLogin = () => toggleLoginModal(true);
    const onCreateRoom = () => {
        router.push(roomChatBot);
    };
    const onLoginAndCreateRoom = () => {
        router.push(roomChatBot);
        requestAnimationFrame(() => {
            onOpenLogin();
        });
    };
    const onMarked = async () => {
        try {
            const { success } = await markMessageAsHandled(message.id);
            if (success) {
                partialUpdateMessage?.(message.id, {
                    handled: true
                });
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    const onRemoveAndClearMemory = async () => {
        try {
            const { success } = await setMessageHandled(message.id);
            if (success) {
                partialUpdateMessage?.(message.id, {
                    handled: true
                });
                clearMemory?.();
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    return {
        onOpenLogin,
        onCreateRoom,
        onLoginAndCreateRoom,
        onMarked,
        onRemoveAndClearMemory
    };
}
