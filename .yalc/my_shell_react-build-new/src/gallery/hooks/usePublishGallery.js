"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = usePublishGallery;
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const luiContext_1 = require("../../common/components/lui/luiContext.js");
const useNotification_1 = require("../../common/hooks/useNotification.js");
const useUserSettings_1 = __importDefault(require("../../common/hooks/useUserSettings.js"));
const api_1 = require("../../gallery/modal/api.js");
const useGetEnergyInfo_1 = __importDefault(require("../../hooks/user/useGetEnergyInfo.js"));
const sensors_1 = require("../../lib/sensors/index.js");
const store_1 = require("../../services/store/index.js");
function usePublishGallery() {
    const multiPublishMap = (0, store_1.useChatStore)(state => state.multiPublishMap);
    const clearMultiPublishMap = (0, store_1.useChatStore)(state => state.clearMultiPublishMap);
    const setHasUnRead = (0, store_1.useChatStore)(state => state.setHasUnRead);
    const t = (0, next_intl_1.useTranslations)();
    const [publishing, setPublishing] = (0, react_1.useState)(false);
    const { success, warning, error } = (0, useNotification_1.useNotification)();
    const { handleUpdateFirstPublishGallery } = (0, useUserSettings_1.default)();
    const { getEnergyInfo } = (0, useGetEnergyInfo_1.default)();
    const { selectedBot } = (0, react_1.useContext)(luiContext_1.LUIButtonInteractionContext);
    const sensors = (0, sensors_1.useSensors)();
    const flagUserFirstPublishGallery = (0, store_1.useUserStore)(state => state.flagUserFirstPublishGallery);
    const checkGalleryUpdateHandle = async (botId) => {
        const res = await (0, api_1.checkGalleryUpdate)(botId);
        if (res.success) {
            setHasUnRead(res.data?.info?.[0]?.hasUpdate || false);
        }
    };
    const publishGalleryApi = async (list, successCb) => {
        try {
            setPublishing(true);
            const res = await (0, api_1.publishGallery)(list);
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
