"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = usePin;
const react_1 = require("react");
const react_use_1 = require("react-use");
const bot_1 = require("../../../../../apis/bot.js");
const workshop_1 = require("../../../../../apis/workshop.js");
function usePin(type, id, getList, pinned, partialUpdateDetail) {
    const [acting, setActing] = (0, react_use_1.useToggle)(false);
    const getApiFn = (0, react_1.useCallback)(() => {
        let apiFn;
        switch (type) {
            case 'widget':
                apiFn = workshop_1.pinnedWidgetInList;
                break;
            case 'bot':
            case 'ugc':
            default:
                apiFn = bot_1.setBotPinnedStatus;
                break;
        }
        return apiFn;
    }, [type]);
    const togglePinStatus = (0, react_1.useCallback)(async () => {
        try {
            setActing(true);
            const { success } = await getApiFn()(id, !pinned);
            if (success) {
                await getList?.();
                partialUpdateDetail?.({
                    pinned: !pinned
                });
            }
        }
        catch (e) {
        }
        finally {
            setActing(false);
        }
    }, [getApiFn, getList, id, partialUpdateDetail, pinned, setActing]);
    return {
        acting,
        togglePinStatus
    };
}
