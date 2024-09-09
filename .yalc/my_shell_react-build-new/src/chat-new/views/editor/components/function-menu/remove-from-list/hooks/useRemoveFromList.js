import { useRouter } from 'next/navigation';
import { useToggle } from 'react-use';
import { removeBotFromChatList } from '../../../../../../../apis/bot.js';
import { removeRoomFromList } from '../../../../../../../apis/new-chat.js';
import { removeWidgetFromChatList } from '../../../../../../../apis/workshop.js';
import { usePathLocale } from '../../../../../../../common/hooks/usePathLocale.js';
export default function useRemoveFromList(type, id, getList) {
    const router = useRouter();
    const { isMobile, locale } = usePathLocale();
    const getApiFn = () => {
        let apiFn;
        switch (type) {
            case 'bot':
                apiFn = removeBotFromChatList;
                break;
            case 'widget':
                apiFn = removeWidgetFromChatList;
                break;
            case 'room':
                apiFn = removeRoomFromList;
                break;
            default:
                apiFn = removeBotFromChatList;
        }
        return apiFn;
    };
    const [removing, setRemoving] = useToggle(false);
    const removeSuccessRedirect = (list) => {
        if (isMobile) {
            let targetPath;
            switch (type) {
                case 'bot':
                case 'room':
                    targetPath = `/m/chat`;
                    break;
                case 'widget':
                    targetPath = `/m/workshop`;
                    break;
                default:
                    targetPath = `/m/chat`;
            }
            router.replace(targetPath);
            return;
        }
        let targetPath;
        const firstItem = list[0];
        switch (type) {
            case 'widget':
                targetPath = list.length ? `/robot-workshop/widget/${list[0].id}` : `/robot-workshop`;
                break;
            case 'bot':
            case 'room':
            default:
                if (firstItem) {
                    targetPath = `/${firstItem.type === 'bot' ? 'chat' : 'room'}/${firstItem.id}`;
                }
                else {
                    targetPath = `/explore`;
                }
                break;
        }
        router.replace(targetPath);
    };
    const remove = async () => {
        try {
            setRemoving(true);
            const { success } = await getApiFn()(id);
            if (success) {
                const data = await getList('remove');
                removeSuccessRedirect(data);
            }
            else {
                throw new Error();
            }
        }
        catch (e) {
            console.error(e);
            throw new Error();
        }
        finally {
            setRemoving(false);
        }
    };
    return {
        removing,
        remove
    };
}
