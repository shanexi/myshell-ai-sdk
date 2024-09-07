"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useRedeemAndUseSeasonPass;
const react_1 = require("react");
const user_1 = require("../../../apis/user.js");
const useNotification_1 = require("../../../common/hooks/useNotification.js");
function useRedeemAndUseSeasonPass() {
    const [acting, setActing] = (0, react_1.useState)(false);
    const { warning } = (0, useNotification_1.useNotification)();
    const handleRedeemAndUseSeasonPass = async (successCb) => {
        try {
            setActing(true);
            const { success, data, msg } = await (0, user_1.claimAndUseSeasonPass)();
            if (!success) {
                warning({
                    content: msg ?? ''
                });
                return;
            }
            successCb && successCb(data);
        }
        catch (e) {
        }
        finally {
            setActing(false);
        }
    };
    return {
        acting,
        handleRedeemAndUseSeasonPass
    };
}
