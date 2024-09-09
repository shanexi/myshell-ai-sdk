"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGetEnergyInfo;
const user_1 = require("../../apis/user");
const store_1 = require("../../services/store");
function useGetEnergyInfo() {
    const setEnergyInfo = (0, store_1.useUserStore)(state => state.setEnergyInfo);
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const getEnergyInfo = async (needSet = true) => {
        try {
            const { data } = await (0, user_1.getUserEnergyInfo)(userId);
            needSet && setEnergyInfo(data);
        }
        catch (e) {
        }
    };
    return {
        getEnergyInfo
    };
}
