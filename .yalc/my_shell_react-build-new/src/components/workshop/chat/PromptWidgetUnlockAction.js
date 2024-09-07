"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PromptWidgetUnlockAction;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const framer_motion_1 = require("framer-motion");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const user_1 = require("../../../common/constants/enums/user.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const useShellCoin_1 = __importDefault(require("../../../hooks/user/useShellCoin.js"));
const usePromptWidgetAction_1 = __importDefault(require("../../../hooks/workshop/chat/usePromptWidgetAction.js"));
const store_1 = require("../../../services/store/index.js");
function PromptWidgetUnlockAction({ widgetInfo }) {
    const shellCoins = (0, store_1.useUserStore)(state => state.shellCoins);
    const setShellCoins = (0, store_1.useUserStore)(state => state.setShellCoins);
    const t = (0, next_intl_1.useTranslations)('workshop');
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const visitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const isVisitor = visitor === user_1.VisitorEnum.YES;
    const { queryShellCoins } = (0, useShellCoin_1.default)();
    (0, react_2.useEffect)(() => {
        if ((0, common_helper_1.isNullOrUndefined)(shellCoins)) {
            queryShellCoins();
        }
    }, [shellCoins]);
    const { acting, promptAction } = (0, usePromptWidgetAction_1.default)(widgetInfo);
    const markPromptWidgetAsUnlocked = (0, store_1.useWorkshopStore)(state => state.markPromptWidgetAsUnlocked);
    const handleUnlock = (0, react_2.useCallback)(() => {
        if (isVisitor) {
            toggleLoginModal(true);
            return;
        }
        promptAction({
            type: 'unlock',
            callback: () => {
                markPromptWidgetAsUnlocked(widgetInfo.id);
                if (Number(widgetInfo.sellPrice) !== 0) {
                    setShellCoins(shellCoins ?? 0 - Number(widgetInfo.sellPrice));
                }
            }
        });
    }, [promptAction, markPromptWidgetAsUnlocked, shellCoins, widgetInfo.id, widgetInfo.sellPrice, isVisitor]);
    return ((0, jsx_runtime_1.jsx)("div", { className: "h-9 overflow-hidden", children: (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { mode: "wait", children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { initial: { y: 18, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: -18, opacity: 0 }, transition: { duration: 0.3 }, children: (0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", className: "border border-default shadow-button-basic px-4 py-2 h-9 rounded-3xl text-on-surface text-sm flex space-x-[6px] font-normal", isLoading: acting, onClick: handleUnlock, children: (0, jsx_runtime_1.jsx)("span", { children: t('unlock_prompt') }) }) }, !widgetInfo.hasUnlocked ? 'unlock' : null) }) }));
}
