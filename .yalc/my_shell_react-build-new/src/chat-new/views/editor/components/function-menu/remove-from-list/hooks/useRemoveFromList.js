"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useRemoveFromList;
const navigation_1 = require("next/navigation");
const react_use_1 = require("react-use");
const bot_1 = require("../../../../../../../apis/bot");
const new_chat_1 = require("../../../../../../../apis/new-chat");
const workshop_1 = require("../../../../../../../apis/workshop");
const usePathLocale_1 = require("../../../../../../../common/hooks/usePathLocale");
function useRemoveFromList(type, id, getList) {
    const router = (0, navigation_1.useRouter)();
    const { isMobile, locale } = (0, usePathLocale_1.usePathLocale)();
    const getApiFn = () => {
        let apiFn;
        switch (type) {
            case 'bot':
                apiFn = bot_1.removeBotFromChatList;
                break;
            case 'widget':
                apiFn = workshop_1.removeWidgetFromChatList;
                break;
            case 'room':
                apiFn = new_chat_1.removeRoomFromList;
                break;
            default:
                apiFn = bot_1.removeBotFromChatList;
        }
        return apiFn;
    };
    const [removing, setRemoving] = (0, react_use_1.useToggle)(false);
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
