"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useChatSetting;
const react_1 = require("react");
const react_use_1 = require("react-use");
const entity_1 = require("../../apis/entity.js");
const entity_2 = require("../../services/store/entity.js");
function useChatSetting(type, id) {
    const [loading, setLoading] = (0, react_use_1.useToggle)(false);
    const chatSettingMap = (0, entity_2.useEntityStore)(state => state.chatSettingMap);
    const setChatSetting = (0, entity_2.useEntityStore)(state => state.setChatSetting);
    const chatSetting = (0, react_1.useMemo)(() => {
        const mapKey = `${type}-${id}`;
        return chatSettingMap[mapKey];
    }, [chatSettingMap, id, type]);
    const getApiFn = () => {
        let api;
        switch (type) {
            default:
                api = entity_1.getBotChatSetting;
                break;
        }
        return api;
    };
    const getChatSetting = async () => {
        try {
            setLoading(true);
            const { success, data, msg } = await getApiFn()(id);
            if (success) {
                setChatSetting(type, id, data);
            }
            else {
                console.error(msg);
            }
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    };
    const updateApiFn = () => {
        let api;
        switch (type) {
            default:
                api = entity_1.updateBotChatSetting;
                break;
        }
        return api;
    };
    const updateChatSetting = async (setting) => {
        try {
            setLoading(true);
            const { success, data, msg } = await updateApiFn()(id, setting);
            const { energyPerChat, energyPerLevelByPass } = data;
            if (success) {
                setChatSetting(type, id, setting);
            }
            else {
                console.error(msg);
            }
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    };
    (0, react_use_1.useEffectOnce)(() => {
        if (!chatSetting) {
            getChatSetting();
        }
    });
    return {
        loading,
        chatSetting,
        getChatSetting,
        updateChatSetting
    };
}
