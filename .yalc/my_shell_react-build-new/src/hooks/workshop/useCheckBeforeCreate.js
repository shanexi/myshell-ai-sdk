"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useCheckBeforeCreate;
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const usehooks_ts_1 = require("usehooks-ts");
const user_1 = require("../../common/constants/enums/user.js");
const store_1 = require("../../services/store/index.js");
const useNotification_1 = require("../../common/hooks/useNotification.js");
function useCheckBeforeCreate() {
    const { warning } = (0, useNotification_1.useNotification)();
    const visitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const isVisitor = visitor === user_1.VisitorEnum.YES;
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const user = (0, store_1.useUserStore)(state => state.user);
    const sidebarMyBotList = (0, store_1.useWorkshopStore)(state => state.sidebarMyBotList);
    const commonT = (0, next_intl_1.useTranslations)('common');
    const { value: noAccessModalVisible, setTrue, setFalse } = (0, usehooks_ts_1.useBoolean)();
    const router = (0, navigation_1.useRouter)();
    const checkBeforeCreate = (0, react_1.useCallback)(() => {
        if (isVisitor) {
            toggleLoginModal(true);
            return;
        }
        const ownPrivateBots = (sidebarMyBotList ?? []).filter(bot => bot.isOfficalAssistantBot === false);
        if (user?.privateBotLimit && ownPrivateBots.length >= user?.privateBotLimit) {
            warning({ content: commonT('reached_limit') });
        }
        else {
            router.push('/robot-workshop/create');
        }
    }, [sidebarMyBotList, user?.privateBotLimit, user?.level, isVisitor]);
    return {
        noAccessModalVisible,
        setTrue,
        setFalse,
        checkBeforeCreate
    };
}
