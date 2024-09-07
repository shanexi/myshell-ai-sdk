"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useButtonActions;
const next_intl_1 = require("next-intl");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const bot_1 = require("../../../../../apis/bot.js");
const new_chat_1 = require("../../../../../apis/new-chat.js");
const runtime_config_1 = require("../../../../../common/utils/runtime-config.js");
const store_1 = require("../../../../../services/store/index.js");
const roomChatBot = `/chat/${runtime_config_1.TRANSLATOR_BOT_ID}`;
function useButtonActions(message, clearMemory, partialUpdateMessage) {
    const t = (0, next_intl_1.useTranslations)('chat');
    const router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(() => {
        router.prefetch(roomChatBot);
    }, []);
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
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
            const { success } = await (0, new_chat_1.markMessageAsHandled)(message.id);
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
            const { success } = await (0, bot_1.setMessageHandled)(message.id);
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
