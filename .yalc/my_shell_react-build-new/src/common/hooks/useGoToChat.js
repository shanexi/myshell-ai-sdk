"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGoToChat = void 0;
const navigation_1 = require("next/navigation");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const store_1 = require("../../services/store/index.js");
const useGoToChat = ({ clickCallback, recommendationSpot } = {}) => {
    const router = (0, navigation_1.useRouter)();
    const { locale } = (0, usePathLocale_1.usePathLocale)();
    const setChatBodyType = (0, store_1.useChatStore)(state => state.setChatBodyType);
    const token = (0, store_1.useUserStore)(state => state.token);
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const isMobile = (0, usePathLocale_1.useIsMobile)();
    const goToChat = async (chatId, chatName, botUid, callback, chatType, spot) => {
        const from = spot || recommendationSpot ? `from=${spot || recommendationSpot}` : '';
        switch (chatType) {
            case 'WIDGET':
                if (!token) {
                    toggleLoginModal(true);
                }
                else {
                    router.push(`/robot-workshop/widget/${chatId}${from ? `?${from}` : ''}`);
                }
                break;
            default:
                setChatBodyType('');
                const botUrl = isMobile
                    ? `/m/chat/${chatId}${from ? `?${from}` : ''}`
                    : `/chat/${chatId}${from ? `?${from}` : ''}`;
                router.push(botUrl);
                break;
        }
        callback?.();
        clickCallback?.('Chat', chatId, chatName, chatType);
    };
    return goToChat;
};
exports.useGoToChat = useGoToChat;
