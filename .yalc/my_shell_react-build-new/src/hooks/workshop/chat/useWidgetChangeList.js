"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useWidgetChangeList;
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const workshop_1 = require("../../../apis/workshop.js");
const useNotification_1 = require("../../../common/hooks/useNotification.js");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const useGetListWidgets_1 = __importDefault(require("../../../hooks/workshop/useGetListWidgets.js"));
const store_1 = require("../../../services/store/index.js");
function useWidgetChangeList(widgetInfo) {
    const commonT = (0, next_intl_1.useTranslations)('common');
    const { success } = (0, useNotification_1.useNotification)();
    const { isMobile, locale } = (0, usePathLocale_1.usePathLocale)();
    const router = (0, navigation_1.useRouter)();
    const globalLoaded = (0, store_1.useGlobalStore)(state => state.globalLoaded);
    const globalLoading = (0, store_1.useGlobalStore)(state => state.globalLoading);
    const { getListWidgets } = (0, useGetListWidgets_1.default)();
    const removeBot = async (callback) => {
        if (widgetInfo) {
            globalLoading();
            const res = await (0, workshop_1.removeWidgetFromChatList)(widgetInfo.id);
            globalLoaded();
            if (res.success) {
                success({
                    content: commonT('removed')
                });
                getListWidgets((res) => {
                    if (res?.length > 0 && !isMobile) {
                        const firstWidgetId = res[0].id;
                        router.replace(`/robot-workshop/widget/${firstWidgetId}`);
                        callback?.();
                    }
                    else {
                        router.replace(`/robot-workshop`);
                        callback?.();
                    }
                });
            }
        }
    };
    return {
        removeBot
    };
}
